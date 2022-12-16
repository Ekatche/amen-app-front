import React, { useContext } from "react";
import UserInfo from "../../components/My_account/myAccount";
import AuthContext from "../../context/AuthContext";

const Home = () => {
    const { user } = useContext(AuthContext)
    return (
        <>
            <section>
                <div>
                {user ? <UserInfo user={user} /> : null }
                <h1> Welcome to the Home page</h1>
                </div>
            </section>

        </>
    )
}

export default Home;

