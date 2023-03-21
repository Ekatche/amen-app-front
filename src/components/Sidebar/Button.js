import React from "react";
import { Link } from "react-router-dom";
import {BsPersonFillLock, BsPersonFillX } from "react-icons/bs";
import "./Button.css";

function LoginButton() {
  return (
    <>
      <Link to="login">
        <button className="cstmbtn">
          <BsPersonFillLock />
          <span> Compte </span>
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
