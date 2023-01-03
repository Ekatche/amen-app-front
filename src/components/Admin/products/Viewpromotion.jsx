import { useEffect, useState } from "react";
import useAxios from "../../../utils/useAxios";
import { Form, FormGroup, Label, Button, Input, Row, Col } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";

const initalDetails = {
    "id": 0,
    "name": "string",
    "period": 0,
    "coupons": 0,
    "is_active": true,
    "is_schedule": true,
    "date_start": "2023-01-02",
    "date_end": "2023-01-02"
}

export default function ViewPromotion() {
    const API = useAxios();
    const [data, setData] = useState(initalDetails)
    const [coupons, setCoupons] = useState([])
    const navigate = useNavigate();
    let { id } = useParams();

    useEffect(() => {
        try {
            API.get(`/backoffice/promotions/${id}`)
                .then((response) => {
                    setData(response.data)
                    console.log(response.data)
                }).then(async () =>
                    await API.get('/backoffice/coupons/')
                        .then((response) => {
                            setCoupons(response.data.results)
                            console.log(response.data);
                        }
                        )
                )
        } catch (error) {
            console.log(error);
        }
    }, []);

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
            await API.patch(
                `/backoffice/promotions/${data.id}/`,
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
                <h2 className="formTitle"> Complete this form to Update Promotion</h2>
            </div>
            <div className="addForm container-md">
                <Form onSubmit={handleSubmit}>
                    <Label className="formlabel required">Promotion Name</Label>
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
                                <Label className="formLabel">Date Start </Label>
                                <Input
                                    type="Date"
                                    name="date_start"
                                    className="formInput"
                                    value={data.date_start}
                                    placeholder="Date start"
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col>
                                <Label className="formLabel"> Date end </Label>
                                <Input
                                    type="Date"
                                    name="date_end"
                                    className="formInput"
                                    value={data.date_end}
                                    placeholder="Date end"
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
                            <Col>
                                <Input
                                    id="selectOnPromo"
                                    name="is_schedule"
                                    className="formCheckBox"
                                    defaultValue={data.is_schedule}
                                    type="checkbox"
                                    checked={data.is_schedule}
                                    onChange={onChangeCB}
                                    sm={2}
                                />{'  '} <Label>Is scheduled ?</Label>
                            </Col>
                        </Row>
                        <Label className="formLabel"> Promotion coupon </Label>
                        <Input
                            name="coupons"
                            className="formInput"
                            placeholder="product category"
                            type="select"
                            onChange={handleChange}
                            value={data.coupons}
                        >
                            {
                                coupons.map((cat) => (
                                    <option
                                        key={cat.id}
                                        id={cat.id}
                                        value={cat.id}
                                    >
                                        {cat.name}
                                    </option>
                                )
                                )
                            }
                        </Input>
                        <div className="formButton">
                            <Button
                                color="success"
                                outline
                                type="submit"
                                style={{ "textAlign": "center", "marginRight": "0.5rem" }}>
                                Update promotion
                            </Button>
                            <Button
                                color="danger"
                                outline
                                onClick={() => navigate("../promotions")}>
                                Back to promotions
                            </Button>
                        </div>
                    </FormGroup>
                </Form>
            </div>
        </>
    )
}