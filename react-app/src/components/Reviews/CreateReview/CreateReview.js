import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addAReview } from "../../../store/reviews";

const CreateReview = ({ onClose }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.productsReducer[id]);
  const history = useHistory();

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  console.log('!!!!!!',product)
  console.log('??????',user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      buyer_id: user.id,
      product_id: product.id,
      review,
      rating,
    };
    console.log('33333333', payload)
    const newReview = await dispatch(addAReview(payload));
    if (newReview) {
      history.push(`/products/${product.id}`);
      onClose(false)
    }
  };

  return (
    <div>
      <form className="new-review-form" onSubmit={handleSubmit}>
        <div className="new-review-title">Add Your Review!!!</div>
        <div className="review">
          <label> Review </label>
          <input
            type="text"
            placeholder="Review"
            required
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <div className="rating">
          <label> Rating </label>
          <input
            type="number"
            min="1"
            max="5"
            step='1'
            placeholder="Rating"
            required
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <button className="add-product-button" type="submit">
          Submit
        </button>
        <button className="cancel-add-button" type="true" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
