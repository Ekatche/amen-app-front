import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminHome = () => {
    const { user } = useContext(AuthContext)
    return (
        <>
            <div>
                {user ?
                    <div className="home">
                        <h1>Admin Home</h1>
                    </div>
                    :
                    Navigate("/admin/login")
                }

            </div>

        </>
    )
}

export default AdminHome;