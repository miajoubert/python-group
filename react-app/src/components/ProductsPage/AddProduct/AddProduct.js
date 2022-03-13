import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addAProduct } from "../../../store/products";
import { getCategories } from '../../../store/category';

const AddProduct = ({ onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const categoriesObj = useSelector(state => state.categories);
  const categories = Object.values(categoriesObj);

  const [name, setName] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
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
    if (!category_id) errors.push('Please provide a category');
    setErrorValidator(errors)
    dispatch(getCategories());
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
    <form className="new-product-container" onSubmit={newProductSubmit}>
      <h2>List Your Product</h2>
      <ul>
        {errorValidator.map((error) => (
          <li className="error-list" key={error}>{error}</li>
        ))}
      </ul>
      <div>
        <label> Name </label>
        <input
          id="form-label-name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="edit_product_input-bar"
        />
      </div>
      <div>
        <label> Image </label>
        <input
          id="form-label-image"
          type="text"
          placeholder="Image"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
          className="edit_product_input-bar"
        />
      </div>
      <div>
        <label> Description </label>
        <textarea
          id="form-label-description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="edit_product_description_input-bar"
        />
      </div>
      <div>
        <label> Price </label>
        <input
          id="form-label-price"
          type="number"
          min="1"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="edit_product_input-bar"
        />
      </div>
      <div className="category-input">
        <label> Category </label>
        <select
          id="form-label-category"
          value={category_id}
          onChange={(e) => setCategoryId(e.target.value)}
          className='edit_product_category_input_bar'
        >
          <option value=''>Please choose an option</option>
          {categories?.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
      </div>
      <div className="add-product">
        <button
          className="add-product-button"
          type="submit"
          disabled={errorValidator.length > 0}
        >
          Submit
        </button>
        <button className="cancel-add-button" type="true" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
