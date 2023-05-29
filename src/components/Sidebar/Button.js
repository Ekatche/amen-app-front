import React from "react";
import { Link } from "react-router-dom";
import { BsPersonFillLock, BsPersonFillX, BsPerson } from "react-icons/bs";
import {MdOutlineManageAccounts} from "react-icons/md"
import "./Button.css";

export const LoginButton = () => {
  return (
    <>
      <Link to="/login">
        <button className="cstmbtn">
          <BsPersonFillLock />
          <span> Compte </span>
        </button>
      </Link>
    </>
  );
};

export const LogoutButton = ({ logoutUser }) => {
  return (
    <>
      <Link>
        <button onClick={logoutUser} className="cstmbtn">
          <BsPersonFillX />
          <span>Log out</span>
        </button>
      </Link>
    </>
  );
};

export const AccountButton = ({account}) => {
  return (
    <>
      <Link to={"/account"}>
        <button className="cstmbtn">
          <BsPerson />
          <span> Account</span>
        </button>
      </Link>
    </>
  );
};
