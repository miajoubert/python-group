import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editOneProduct } from "../../../store/products";

const EditProduct = ({ onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const { id } = useParams();
  const product = useSelector((state) => state.productsReducer[id]);

  const [name, setName] = useState(product?.name || "");
  const [image_url, setImageUrl] = useState(product?.image_url || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [category_id, setCategoryId] = useState(product?.category_id || "");
  const [created_at, setCreatedAt] = useState(product?.created_at || "");
  const [errors, setErrors] = useState([]);

  const editProductValidation = (e) => {
    let validationErrors = [];
    if(!name) validationErrors.push("Please provide a name")
    if (!image_url.length) validationErrors.push("Please provide a valid URL");
    if (image_url.length > 0 && !image_url.match(/^https?:\/\/.+\/.+$/))
      validationErrors.push("Please provide a valid URL");
    if (!description)
      validationErrors.push("Please provide a description");
    if (!price) validationErrors.push("Please provide a price");
    if (!category_id) validationErrors.push("Please provide a category Id");

    if (validationErrors.length) {
      setErrors(validationErrors);
      console.log("validationErrors", validationErrors);
      return true;
    } else return false;
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setImageUrl(product.image_url);
      setDescription(product.description);
      setPrice(product.price);
      setCategoryId(product.category_id);
    }
  }, [product]);

  const handleEditSubmit = async (e) => {
    if (editProductValidation()) {
      e.preventDefault();
    } else {
      e.preventDefault();
      const payload = {
        ...product,
        name,
        image_url,
        description,
        price,
        category_id,
        created_at,
      };

      const updatedProduct = await dispatch(editOneProduct(payload));
      if (updatedProduct) {
        history.push(`/products/${product.id}`);
        onClose(false);
      }
    }
  };

  return (
    <div className="edit-product-container">
      <form className="edit-product" onSubmit={handleEditSubmit}>
        <h2>Edit Your Product</h2>
        <ul className='errors-list'>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
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
            step="0.01"
            pattern="^(./d{1,2}?$)"
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
            // required
            value={category_id}
            onChange={(e) => setCategoryId(e.target.value)}
          />
        </div>
        <div className="created-at-input">
          <input type="hidden" value={created_at} />
        </div>
        <button className="edit-product-button" type="submit">
          Submit
        </button>
        <button className="cancel-edit-button" onClick={onClose} >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
