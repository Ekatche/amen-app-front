import React from "react";
import { Link } from "react-router-dom";
import {BsPersonFillAdd, BsPersonFillLock, BsPersonFillX } from "react-icons/bs";
import "./Button.css";

function SingninButton() {
  return (
    <>
      <Link to="register">
        <button className="cstmbtn">
          <BsPersonFillAdd />
          <span>Sign Up</span>
        </button>
      </Link>
    </>
  );
}

export default SingninButton;

function LoginButton() {
  return (
    <>
      <Link to="login">
        <button className="cstmbtn">
          <BsPersonFillLock />
          <span>Log in</span>
        </button>
      </Link>
    </>
  );
}

function LogoutButton() {
  return (
    <>
      <Link>
        <button className="cstmbtn">
          <BsPersonFillX />
          <span>Log out</span>
        </button>
      </Link>
    </>
  );
}

export { LoginButton, LogoutButton}
