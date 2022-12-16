import React from "react";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./login.css"

const AdminLoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const { loginUser } = useContext(AuthContext)
    const handleSubmit = async e => {
        e.preventDefault();
        try {

            console.log("button cliked");
            loginUser(email, password);

        } catch (error) {
            alert(error)
        };
    }

    return (
        <section className="vh-100 gradient-custom" >
            <div className="container-custom py-5 h-100" >
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" >
                            <div className="card-body p-5 text-center">
                                <div className="pageTitle">
                                    <h4> Welcome to the App admin panel </h4>
                                </div>
                                <Form onSubmit={handleSubmit}>
                                <div>
                                    <FormGroup>
                                        <Label for="email">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            placeholder="Please write email address"
                                            type="email"
                                            required
                                            onChange={e => setEmail(e.target.value)}

                                        />
                                    </FormGroup>
                                    </div>
                                    <div>
                                    <FormGroup>
                                        <Label for="password">
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            required
                                            placeholder="Please write down your password"
                                            type="password"
                                            onChange={(e) => { setPassword(e.target.value) }}
                                        />
                                    </FormGroup>
                                    </div>
                                    <Button type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default AdminLoginPage;
