import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import OrderPlacedPopup from '../../components/OrderPlacedPopup/OrderPlacedPopup';

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, food_list } = useContext(StoreContext);

  // Local state for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
  });

  // State for controlling popup visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Prepare cart items data
  const prepareCartItemsData = () => {
    return Object.keys(cartItems).map((itemId) => {
      const item = food_list.find((food) => food._id === itemId);
      if (item) {
        return {
          itemId: item._id,
          name: item.name,
          price: item.price,
          quantity: cartItems[itemId],
          total: item.price * cartItems[itemId],
        };
      }
      return null;
    }).filter(item => item !== null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      totalAmount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2), // Adding delivery fee
      cartItems: prepareCartItemsData(), // Add cart items data
    };

    console.log(orderData); // Debugging: log the orderData object

    try {
      const response = await fetch('http://localhost:3000/placeorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Order placed successfully:', data);
        setIsPopupOpen(true); // Show the popup upon successful order placement
      } else {
        console.error('Error placing order:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <form className="place-order" onSubmit={handleSubmit}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Logged In e-mail"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleInputChange}
          />
          <div className="multi-fields">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="multi-fields">
            <input
              type="text"
              name="zip"
              placeholder="Zip Code"
              value={formData.zip}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>SubTotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type="submit">Proceed to Payment</button>
          </div>
        </div>
      </form>

      {/* OrderPlacedPopup Integration */}
      <OrderPlacedPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
};

export default PlaceOrder;


// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅
// import React, { useContext, useState } from 'react';
// import './PlaceOrder.css';
// import { StoreContext } from '../../context/StoreContext';
// import OrderPlacedPopup from '../../components/OrderPlacedPopup/OrderPlacedPopup';

// const PlaceOrder = () => {
//   const { getTotalCartAmount, cartItems, food_list } = useContext(StoreContext);

//   // Local state for form fields
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     zip: '',
//     country: '',
//     phone: '',
//   });

//   // Handle form data change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Prepare cart items data
//   const prepareCartItemsData = () => {
//     return Object.keys(cartItems).map((itemId) => {
//       const item = food_list.find((food) => food._id === itemId);
//       if (item) {
//         return {
//           itemId: item._id,
//           name: item.name,
//           price: item.price,
//           quantity: cartItems[itemId],
//           total: item.price * cartItems[itemId],
//         };
//       }
//       return null;
//     }).filter(item => item !== null);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const orderData = {
//       ...formData,
//       totalAmount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2), // Adding delivery fee
//       cartItems: prepareCartItemsData(), // Add cart items data
//     };

//     console.log(orderData);  // Debugging: log the orderData object

//     try {
//       const response = await fetch('http://localhost:3000/placeorder', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(orderData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Order placed successfully:', data);
//         // You can show a success message or redirect the user here
//       } else {
//         console.error('Error placing order:', response.statusText);
//         // Handle error here (e.g., show an error message)
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <form className="place-order" onSubmit={handleSubmit}>
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input
//             type="text"
//             name="firstName"
//             placeholder="First Name"
//             value={formData.firstName}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="lastName"
//             placeholder="Last Name"
//             value={formData.lastName}
//             onChange={handleInputChange}
//           />
//         </div>
//         <input
//           type="email"
//           name="email"
//           placeholder="Logged In e-mail"
//           value={formData.email}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="street"
//           placeholder="Street"
//           value={formData.street}
//           onChange={handleInputChange}
//         />
//         <div className="multi-fields">
//           <input
//             type="text"
//             name="city"
//             placeholder="City"
//             value={formData.city}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="state"
//             placeholder="State"
//             value={formData.state}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="multi-fields">
//           <input
//             type="text"
//             name="zip"
//             placeholder="Zip Code"
//             value={formData.zip}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="country"
//             placeholder="Country"
//             value={formData.country}
//             onChange={handleInputChange}
//           />
//         </div>
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone"
//           value={formData.phone}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>SubTotal</p>
//               <p>${getTotalCartAmount()}</p>
//             </div>
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
//             </div>
//           </div>
//           <button type="submit">Proceed to Payment</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;


// import React, { useContext } from 'react'
// import './PlaceOrder.css'
// import { StoreContext } from '../../context/StoreContext'


// const PlaceOrder = () => {

//   const {getTotalCartAmount}=useContext(StoreContext)

//   return (
//     <form className='place-order'>
//       <div className="place-order-left">
//         <p className='title'>Delivery Information</p>
//         <div className="multi-fields">
//           <input type="text" placeholder='First Name'/>
//           <input type="text" placeholder='Last Name' />
//         </div>
//         <input type="email" placeholder='Logged In e-mail'/>
//         <input type="text" placeholder='Street'/>
//         <div className="multi-fields">
//           <input type="text" placeholder='City'/>
//           <input type="text" placeholder='State' />
//         </div>
//         <div className="multi-fields">
//           <input type="text" placeholder='Zip Code'/>
//           <input type="text" placeholder='Country' />
//         </div>
//         <input type="text" placeholder='Phone' />
//       </div>
//       <div className="place-order-right">
//       <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>SubTotal</p>
//               <p>${getTotalCartAmount()}</p>
//             </div>
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>${getTotalCartAmount()===0?0:2}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
//             </div>
//           </div>
//             <button>Proceed to Payment</button>
//         </div>
//       </div>
//     </form>
//   )
// }

// export default PlaceOrder