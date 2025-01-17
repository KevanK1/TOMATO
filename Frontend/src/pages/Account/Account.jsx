import React, { useEffect, useState } from "react";
import "./Account.css";

const Account = () => {
  const [accountDetails, setAccountDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmailAndAccountDetails = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        // Call the backend to get the email from the token
        const emailResponse = await fetch("http://localhost:3000/api/get-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Send token in headers
          },
        });

        if (!emailResponse.ok) {
          throw new Error("Failed to retrieve email from token");
        }

        const emailData = await emailResponse.json();
        const email = emailData.email;

        if (!email) {
          throw new Error("Email not retrieved from token");
        }

        // Call the account details API with the retrieved email
        const accountResponse = await fetch("http://localhost:3000/api/account", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Email: email, // Send email in headers
          },
        });

        if (!accountResponse.ok) {
          throw new Error("Failed to fetch account details");
        }

        const accountData = await accountResponse.json();
        setAccountDetails(accountData.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmailAndAccountDetails();
  }, []);

  if (loading) {
    return <div className="account-container">Loading...</div>;
  }

  if (error) {
    return <div className="account-container error">Error: {error}</div>;
  }

  return (
    <div className="account-container">
      <h1>Account Details</h1>
      {accountDetails ? (
        <div className="account-details">
          <div className="user-info">
            <h2>User Information</h2>
            <p>
              <b>Name:</b> {accountDetails.name}
            </p>
            <p>
              <b>Email:</b> {accountDetails.email}
            </p>
          </div>

          <div className="address-info">
            <h2>Address</h2>
            <p>
              <b>Street:</b> {accountDetails.address.street}
            </p>
            <p>
              <b>City:</b> {accountDetails.address.city}
            </p>
            <p>
              <b>State:</b> {accountDetails.address.state}
            </p>
            <p>
              <b>Zip Code:</b> {accountDetails.address.zip}
            </p>
            <p>
              <b>Country:</b> {accountDetails.address.country}
            </p>
          </div>

          <div className="order-history">
            <h2>Order History</h2>
            {accountDetails.orders.length > 0 ? (
              <ul>
                {accountDetails.orders.map((order, index) => (
                  <li key={index}>
                    
                    <p>
                      <b>Items:</b>
                    </p>
                    <ul>
                      
                        <li>
                          Dish: {order.name} <br />
                          Quantity: {order.quantity} Cost: ${order.price} <br />
                          Toatal: {order.total}
                        </li>
                      
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders placed yet.</p>
            )}
          </div>
          
        </div>
      ) : (
        <p>No account details available.</p>
      )}
    </div>
  );
};

export default Account;
