import React from "react";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import "./login.css"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { loginUser } = useContext(AuthContext)
    const handleSubmit = async e => {
        e.preventDefault();
        console.log("button cliked");
        loginUser(email, password);
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container-custom py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" >
                            <div className="card-body p-5 text-center">

                                <form onSubmit={handleSubmit}>
                                    <p>Please login to your account</p>
                                    {/* <!-- Email input --> */}
                                    <div className="form-outline mb-4">
                                        <input type="email" id="email" className="form-control" required 
                                            onChange={e=> setEmail(e.target.value)}
                                        />
                                        <label className="form-label" htmlFor="email">Email address</label>
                                    </div>

                                    {/* <!-- Password input --> */}
                                    <div className="form-outline mb-4">
                                        <input type="password" id="password" className="form-control" required
                                        onChange={e=> setPassword(e.target.value)} />
                                        <label className="form-label" htmlFor="password">Password</label>
                                    </div>

                                    {/* <!-- Submit button --> */}
                                    <button type="submit" className="btn btn-primary btn-block mb-4">Log in</button>

                                    {/* <!-- Register buttons --> */}
                                    <div className="text-center">
                                        <p>Not a member? <a href="/register">Register</a></p>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage;