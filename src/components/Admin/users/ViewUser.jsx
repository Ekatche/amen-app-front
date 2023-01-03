import { useEffect, useState } from "react";
import { Form, FormGroup, Label, Button, Row, Col, Input } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../utils/useAxios";

const initalDetails = {
    "id": 0,
    "email": "",
    "phone_prefix": "",
    "phone_number": "",
    "gender": "",
    "first_name": "",
    "last_name": "",
    "birth_date": "",
    "shippingaddress": [
        0
    ],
    "billingaddress": [
        0
    ]
}

export default function ViewUser() {
    const API = useAxios();
    const [data, setData] = useState(initalDetails);
    const [billingaddress, setBillingAddress] = useState([])
    const [shippingaddress, setShippingAddress] = useState([])
    const navigate = useNavigate();
    let { id } = useParams();



    useEffect(() => {
        const getUser = async () => {
            await API.get(`user/backoffice/user/${id}/`)
                .then((response) => {
                    setData(response.data)
                    console.log(response.data)
                    return response.data
                })
                .then(async (data) => {
                    API.get(`user/backoffice/shippingaddress/${data.shippingaddress}/`)
                        .then((response) => {
                            console.log(response.data);
                            setShippingAddress(response.data);
                        })
                    return data
                })
                .then(async (data) => {
                    API.get(`user/backoffice/billingaddress/${data.billingaddress}/`)
                        .then((response) => {
                            console.log(response.data);
                            setBillingAddress(response.data);
                        })
                })
                .catch((error) => {
                    console.log(error);
                })
        };

        getUser();

        return () => {
            // this now gets called when the component unmounts
            console.log(" Single data fetched");
        };
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(data);
        try {
            await API.patch(
                `user/backoffice/user/${id}/`, data
                )
                .then(async () => {
                    await API.patch(
                        `user/backoffice/shippingaddress/${shippingaddress.id}/`,
                        shippingaddress
                    );
                })
                .then(async () => {
                    await API.patch(
                        `user/backoffice/billingaddress/${billingaddress.id}/`,
                        billingaddress
                    );
                })
                .then(res => {
                    if (res.status === 200) {
                        alert("updated user successfully")
                        navigate("../users")
                    };
                });
        } catch (error) {
            console.log(error)
        };
    };

    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })

    }
    function handleChangeBilling(e) {
        setBillingAddress({
            ...billingaddress,
            [e.target.name]: e.target.value
        })
    }
    function handleChangeShipping(e) {
        setShippingAddress({
            ...shippingaddress,
            [e.target.name]: e.target.value
        })

    }
    return (
        <section>
            <div>
                <h2 className="formTitle"> Complete this form to Users informations </h2>
            </div>
            <div className="container">
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label> First name </Label>
                        <Input
                            name="first_name"
                            className="formInput"
                            value={data.first_name}
                            placeholder="user first name"
                            onChange={handleChange}
                        />
                        <Label> Last name </Label>
                        <Input
                            name="last_name"
                            className="formInput"
                            value={data.last_name}
                            placeholder="user last name"
                            onChange={handleChange}
                        />
                        <Label> Birth date </Label>
                        <Input
                            name="birth_date"
                            className="formInput"
                            value={data.birth_date}
                            placeholder="user birth date"
                            onChange={handleChange}
                            type="date"
                        />
                        <Label> Email </Label>
                        <Input
                            name="email"
                            className="formInput"
                            value={data.email}
                            placeholder="user email"
                            onChange={handleChange}
                        />
                        <Label> Gender </Label>
                        <Input
                            name="gender"
                            className="formInput"
                            value={data.gender}
                            type="select"
                            onChange={handleChange}
                        >
                            <option>m</option>
                            <option>f</option>
                        </Input>
                        <Row>
                            <Col>
                                <Label> Phone prefix </Label>
                                <Input
                                    name="phone_prefix"
                                    className="formInput"
                                    value={data.phone_prefix}
                                    placeholder="country phone prefix"
                                    onChange={handleChange}
                                />

                            </Col>
                            <Col>
                                <Label> Phone number </Label>
                                <Input
                                    name="phone_number"
                                    className="formInput"
                                    value={data.phone_number}
                                    placeholder="phone number"
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                    <h4> Shipping Address</h4>
                    <FormGroup>
                        <Label> Building number</Label>
                        <Input
                            name="building_number"
                            className="formInput"
                            value={shippingaddress.building_number}
                            onChange={handleChangeShipping}
                        />
                        <Label> Street </Label>
                        <Input
                            name="street"
                            className="formInput"
                            value={shippingaddress.street}
                            onChange={handleChangeShipping}
                        />
                        <Row>

                            <Col>
                                <Label> Street</Label>
                                <Input
                                    name="city"
                                    className="formInput"
                                    value={shippingaddress.city}
                                    onChange={handleChangeShipping}
                                />
                            </Col>
                            <Col>
                                <Label> Post Code </Label>
                                <Input
                                    name="postcode"
                                    className="formInput"
                                    value={shippingaddress.postcode}
                                    onChange={handleChangeShipping}
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                    <h4> Billing Address</h4>
                    <FormGroup>
                        <Label> Building number</Label>
                        <Input
                            name="building_number"
                            className="formInput"
                            value={billingaddress.building_number}
                            onChange={handleChangeBilling}
                        />
                        <Label> Street </Label>
                        <Input
                            name="street"
                            className="formInput"
                            value={billingaddress.street}
                            onChange={handleChangeBilling}
                        />
                        <Row>
                            <Col>
                                <Label> Street</Label>
                                <Input
                                    name="city"
                                    className="formInput"
                                    value={billingaddress.city}
                                    onChange={handleChangeBilling}
                                />
                            </Col>
                            <Col>
                                <Label> Post Code </Label>
                                <Input
                                    name="postcode"
                                    className="formInput"
                                    value={billingaddress.postcode}
                                    onChange={handleChangeBilling}
                                />
                            </Col>
                        </Row>
                        <div className="formButton">
                            <Button
                                color="success"
                                outline
                                type="submit"
                                style={{ "textAlign": "center", "marginRight": "0.5rem" }}>
                                Update user
                            </Button>
                            <Button
                                color="danger"
                                outline
                                onClick={() => navigate("../users")}>
                                Back to users
                            </Button>
                        </div>
                    </FormGroup>
                </Form>
            </div>
        </section>
    )
}