import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addAProduct } from "../../../store/products";

const AddProduct = ({ onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [name, setName] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [errorValidator, setErrorValidator] = useState([]);

  useEffect(() => {
    const errors = [];
    if (!name) errors.push("Please provide a name");
    if (!image_url.length) errors.push("Please provide a valid URL");
    if (image_url.length > 0 && !image_url.match(/^https?:\/\/.+\/.+$/))
      errors.push("Please provide a valid URL");
    if (!description) errors.push("Please provide a description");
    if (!price) errors.push("Please provide a price");
    if (category_id < 1 || category_id > 8) errors.push("Category Id must be between 1 to 8");
    setErrorValidator(errors)
  }, [name, image_url, description, price, category_id]);


  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

  const newProductSubmit = async (e) => {

      e.preventDefault();
      const payload = {
        userId: user.id,
        name,
        image_url,
        description,
        price,
        category_id,
      };
      const newProduct = await dispatch(addAProduct(payload));
      if (newProduct) {
        history.push(`/products/${newProduct.id}`);
      }

  };

  return (
    <div>
      <form className="new-product-form" onSubmit={newProductSubmit}>
        <h2>List Your Product</h2>
        <ul>
        {errorValidator.map((error) => (
          <li className="error-list" key={error}>{error}</li>
        ))}
        </ul>
        <div className="name-input">
          <label> Name </label>
          <input
            id="form-label-name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="image-input">
          <label> Image </label>
          <input
            id="form-label-image"
            type="text"
            placeholder="Image"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="description-input">
          <label> Description </label>
          <textarea
            id="form-label-description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="price-input">
          <label> Price </label>
          <input
            id="form-label-price"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="price-input">
          <label> Category Id </label>
          <input
            id="form-label-price"
            type="number"
            placeholder="Category Id"
            value={category_id}
            onChange={(e) => setCategoryId(e.target.value)}
          />
        </div>
        <button className="add-product-button" type="submit" disabled={errorValidator.length > 0}>
          Submit
        </button>
        <button className="cancel-add-button" type="true" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
