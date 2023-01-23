import Header from "../Header/Header";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useAxios from "../../../utils/useAxios";
import {Button, Col, Form, Input, Label, Row} from "reactstrap";

const initialState = {
    "id": 0,
    "product": {
        "name": "",
        "price": ""
    },
    "order": 0,
    "quantity": 5,
    "date_created": "2023-01-23T15:32:35.425Z",
    "date_updated": "2023-01-23T15:32:35.425Z"
};
export default function ViewOrderItems() {
    const API = useAxios();
    const [data, setData] = useState(initialState);
    const navigate = useNavigate();
    let {id} = useParams();
    const getOrderItems = async () => {
        //get order_items using its id
        await API.get(`backoffice/order-items/${id}/`)
            .then((res) => {
                setData(res.data[0]);
            })
            .catch((e) => {
                console.log(e);
            })
    }
    //fetch data
    useEffect(() => {
        getOrderItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = level => e => {
        if (!level) {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        } else {
            setData({
                    ...data,
                    [level]: {
                        ...data[level],
                        [e.target.name]: e.target.value
                    }
                }
            )
        }
    };
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await API.patch(
                `/backoffice/order-items/${id}/`,
                data,
            )
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section>
            <Header title={`Order Item`}/>
            <div className="container">
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Label> Product Name</Label>
                            <Input
                                name="name"
                                className="formInput"
                                placeholder="Name"
                                value={data.product.name}
                                onChange={handleChange("product")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label> Quantity</Label>
                            <Input
                                name="price"
                                className="formInput"
                                placeholder="Quantity"
                                value={data.quantity}
                                onChange={handleChange()}
                            />
                        </Col>
                        <Col>
                            <Label> Price </Label>
                            <Input
                                name="quantity"
                                className="formInput"
                                placeholder="Price"
                                value={data.product.price}
                                readOnly={true}
                            />

                        </Col>
                    </Row>
                    <div className="formButton">
                        <Button
                            color="success"
                            outline
                            type="submit"
                            style={{"textAlign": "center", "marginRight": "0.5rem"}}>
                            Update
                        </Button>
                        <Button
                            color="danger"
                            outline
                            onClick={() => navigate(`../order/${data.order.id}`)}>
                            Back to Order {data.order.id}
                        </Button>
                    </div>

                </Form>

            </div>
        </section>
    )
}