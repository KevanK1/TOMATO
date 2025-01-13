import React, { useContext} from 'react';
import './FoodItem.css'; // CSS file for styling
import { assets } from '../../assets/assets'; // Replace with the correct path to your assets object
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const {cartItems,addToCart,removeFromCart}=useContext(StoreContext);


  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt={name} />
        {!cartItems[id] ? (
          <img className='add'
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add item"
          />
        ) : (
          <div className='food-item-counter'>
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove item"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add item"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p> 
          <div className="rating">
            {[5, 4, 3, 2, 1].map((star) => (
            <React.Fragment key={star}>
            <input
        value={star}
        name={`rating-${id}`} // Unique name for each food item
        id={`star-${star}-${id}`} // Unique id for the label
        type="radio"
      />
      <label
        title={`${star} star${star > 1 ? 's' : ''}`}
        htmlFor={`star-${star}-${id}`}
      >
        <svg
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2"
          stroke="#000000"
          fill="none"
          viewBox="0 0 24 24"
          height="20" // Reduced size
          width="20" // Reduced size
          xmlns="http://www.w3.org/2000/svg"
          className="svgOne"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <svg
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2"
          stroke="#000000"
          fill="none"
          viewBox="0 0 24 24"
          height="20" // Reduced size
          width="20" // Reduced size
          xmlns="http://www.w3.org/2000/svg"
          className="svgTwo"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <div className="ombre"></div>
      </label>
    </React.Fragment>
  ))}
</div>

        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
