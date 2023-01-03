import { useEffect, useState } from "react";
import useAxios from "../../../utils/useAxios";
import { Form, FormGroup, Label, Button, Input, Row, Col } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";

const initalDetails = {
    "name": "",
    "code": "",
    "discount": 0,
    "is_active": true
}

export default function AddCoupon() {
    const API = useAxios();
    const [data, setData] = useState(initalDetails);
    const navigate = useNavigate();
    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        try {
            await API.post(
                `/backoffice/coupons/`,
                data
            )
        } catch (error) {
            console.log(error);
        }
    }

    function onChangeCB(e) {
        const { name, checked } = e.target;
        setData(prevValue => {
            return {
                ...prevValue,
                [name]: checked ? true : false
            };
        });
    }

    return (
        <>
            <div>
                <h2 className="formTitle"> Complete this form to create a new coupon</h2>
            </div>
            <div className="addForm container-md">
                <Form onSubmit={handleSubmit}>
                    <Label className="formlabel required">Coupon Name</Label>
                    <FormGroup>
                        <Input
                            name="name"
                            className="formInput"
                            placeholder="Name"
                            value={data.name}
                            onChange={handleChange}
                        />
                        <Row>
                            <Col>
                                <Label className="formLabel">Coupon code </Label>
                                <Input
                                    name="code"
                                    className="formInput"
                                    value={data.code}
                                    placeholder="Code"
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col>
                                <Label className="formLabel"> Coupon discount </Label>
                                <Input
                                    name="discount"
                                    className="formInput"
                                    value={data.discount}
                                    placeholder="Discount"
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>

                        <Row className="checkbox">
                            <Col className="checkbox-div">
                                <Input
                                    id="selectOnISavailable"
                                    name="is_active"
                                    className="formCheckBox"
                                    defaultValue={data.is_active}
                                    checked={data.is_active}
                                    type="checkbox"
                                    onChange={onChangeCB}
                                    sm={2}
                                />{'  '} <Label>Is active ?</Label>
                            </Col>
                        </Row>
                        <div className="formButton">
                            <Button
                                color="success"
                                outline
                                type="submit"
                                style={{ "textAlign": "center", "marginRight": "0.5rem" }}>
                                Create coupon
                            </Button>
                            <Button
                                color="danger"
                                outline
                                onClick={() => navigate("../coupons")}>
                                Back to coupons
                            </Button>
                        </div>
                    </FormGroup>
                </Form>
            </div>
        </>
    )
}