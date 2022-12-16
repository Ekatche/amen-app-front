import React from "react";
import "./MyAccount.css"
import { Link } from "react-router-dom";

function UserInfo({ user }) {
    return (
      <section>
      <div id="my_account">
        <h1>Hello {user }</h1>
      </div>
      <div id="shopping_info">
      <p><Link to="/ShoppingCart">Check Your Shopping Cart.</Link></p>
      <p><Link to="/Order">Check Your order.</Link></p>
      </div>
      </section>
    );
  }
  
export default UserInfo;