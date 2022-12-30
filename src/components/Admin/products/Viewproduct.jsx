import { useEffect, useState } from "react";
import { Form, FormGroup, Label, Button, Input, Row, Col } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../utils/useAxios";

const initalDetails = {
    "id": 0,
    "name": "string",
    "price": "-293",
    "slug": "0gGcA8PctoGMNio7MtAWWzE2LdHrr_lnpGs_2Be4TAMjkF",
    "images": [
        0
    ],
    "inventory": 0,
    "categories": [
        0
    ],
    "subcategory": 0,
    "description": "string",
    "is_available": true,
    "on_promo": true,
    "promotion": "string",
    "promo_price": "string"
}



function ViewProduct() {
    const API = useAxios();
    const [data, setData] = useState(initalDetails);
    const [categories, setCategories] = useState([])
    const [subcategories, setSubcategories] = useState([])
    const [promotions, setPromotions] = useState([])
    const [inventory, setInventory] = useState([])
    const [images, setImages] = useState([])
    const navigate = useNavigate();
    let { id } = useParams();

    // fetch data 

    useEffect(() => {
        const getProduct = async () => {
            await API.get('/backoffice/categories/')
                .then((response) => {
                    let resp_data = response.data.results
                    setCategories(resp_data);
                })
                .then(
                    await API.get('/backoffice/subcategories/')
                        .then((response) => {
                            let resp_data = response.data.results
                            setSubcategories(resp_data);
                        })
                )
                .then(
                    await API.get('/backoffice/promotions/')
                        .then((response) => {
                            let resp_data = response.data.results
                            setPromotions(resp_data);
                        })
                )
                .then(
                    await API.get(`/backoffice/product/${id}/`)
                        .then((response) => {
                            setData(response.data)
                            return response.data
                        })
                        .then(async (data) => {
                            await API.get(`/inventory/${data.inventory}/`)
                                .then((response) => {
                                    let resp_data = response.data
                                    setInventory(resp_data);
                                })
                        })
                )
                .catch((error) => {
                    console.log(error);
                })
        };

        getProduct();

        return () => {
            // this now gets called when the component unmounts
            console.log(" Single data fetched");
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeCB = level => (e) => {
        const { name, checked } = e.target;
        if (!level) {
            setData(prevValue => {
                return {
                    ...prevValue,
                    [name]: checked ? true : false
                };
            });
        } else {
            let index = e.target.id
            setData(prevValue => {
                return {
                    ...prevValue,
                    [level]: prevValue.image.map((item, id) => {
                        if (Number(index) === id) {
                            return {
                                ...item,
                                [name]: checked ? true : false
                            }
                        }
                        return item

                    })
                };
            });
        }
    };

    const handleInventoryChange = e =>{
        console.log(e);
        setInventory({
            ...inventory,
            [e.target.name]: Number(e.target.value)
        })
    }

    const handleChange = level => e => {

        if (e.target.name === "promotion") {
            if (e.target.children[e.target.selectedIndex].value === "") {
                setData({
                    ...data,
                    [e.target.name]: null
                })
            } else {
                setData({
                    ...data,
                    [e.target.name]: Number(e.target.children[e.target.selectedIndex].id),
                })
            }
        }
        else if (!level) {
            // Assume root level
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
        else if (level === "subcategory") {
            setData({
                ...data,
                subcategory: Number(e.target.children[e.target.selectedIndex].id)
            })
        } else if (level === "categories") {
            setData({
                ...data,
                categories: [e.target.children[e.target.selectedIndex].id]
            })
        } else {
            setData({
                ...data,
                [level]: {
                    ...data[level],
                    [e.target.name]: e.target.value
                }
            })
        }
    };

    const removeImage = (imgId) => {
        console.log(imgId)

        setData(prev => {
            const items = prev.image.filter((item, id) => id !== Number(imgId))
            return {
                ...prev,
                items
            }
        })
    }


    const handleSubmit = async e => {
        e.preventDefault();
        console.log(data);
        try {
            await API.patch(
                `/inventory/${data.inventory}/`,
                {
                    "quantity_sold": inventory.quantity_sold,
                    "total": inventory.total
                  }
                
            ).then(
                await API.patch(
                    `/backoffice/product/${id}/`,
                    data
                ).then(res => {
                    if (res.status === 200) {
                        alert("updated product successfully")
                        navigate("../products")
                    }
                })
            )
        } catch (error) {
            console.log(error)
        };
    };

    return (
        <section>
            <div>
                <h2 className="formTitle"> Complete this form to Update Product</h2>
            </div>
            <div className="addForm container-md">
                <Form onSubmit={handleSubmit}>
                    <Label className="formlabel required">Product Name</Label>
                    <FormGroup>
                        <Input
                            name="name"
                            className="formInput"
                            placeholder="Name"
                            value={data.name}
                            onChange={handleChange()}
                        />
                        <Label className="formLabel">Product Price </Label>
                        <Input
                            name="price"
                            className="formInput"
                            value={data.price}
                            placeholder="price"
                            onChange={handleChange()}
                        />
                        <Label className="formLabel">Product Slug </Label>
                        <Input
                            name="slug"
                            className="formInput"
                            value={data.slug}
                            placeholder="slug"
                            onChange={handleChange()}
                        />
                        <Row>
                            <Col>
                                <Label> Inital stock </Label>
                                <Input
                                    name="total"
                                    className="formInput"
                                    value={inventory.total}
                                    placeholder="stock"
                                    onChange={handleInventoryChange}
                                />
                            </Col>
                            <Col>
                                <Label> Quantity Sold </Label>
                                <Input
                                    name="quantity_sold"
                                    className="formInput"
                                    value={inventory.quantity_sold}
                                    placeholder="quantiy sold"
                                    onChange={handleInventoryChange}
                                />
                            </Col>
                            <Col>
                                <Label> Available quantity </Label>
                                <Input
                                    name="available_quantity"
                                    className="formInput"
                                    readOnly
                                    value={inventory.available_quantity}
                                    placeholder="available quantity"
                                    onChange={handleInventoryChange}
                                />
                            </Col>
                        </Row>


                        <Label className="formLabel"> Product Categories </Label>
                        <Input
                            name="name"
                            className="formInput"
                            placeholder="product category"
                            type="select"
                            onChange={handleChange("categories")}
                            value={data.categories[0]}
                        >
                            {
                                categories.map((cat) => (
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
                        <Label className="formLabel">Product SubCategory </Label>
                        <Input
                            name="name"
                            className="formInput"
                            placeholder="product subcategory"
                            type="select"
                            onChange={handleChange("subcategory")}
                            value={data.subcategory}
                        >
                            {
                                subcategories.map((subcat) => (
                                    <option
                                        key={subcat.id}
                                        id={subcat.id}
                                        value={subcat.id}
                                    >
                                        {subcat.name}
                                    </option>
                                ))
                            }

                        </Input>

                        <Label className="formLabel">Product description </Label>
                        <Input
                            name="description"
                            className="formInput"
                            placeholder="Product description"
                            onChange={handleChange()}
                            value={data.description}
                            type="textarea"
                        />
                        {/* <Label className="formLabel">Product Images </Label>
                        <Row>
                            <Col sm={2} lg={2} md={2} className="imgButtonCol">
                                <Input
                                    id={0}
                                    name="is_feature"
                                    className="formCheckBox"
                                    // checked={data.image[0].is_feature?data.image[0].is_feature:false}
                                    type="checkbox"
                                    onChange={onChangeCB("image")}
                                />{'  '} <Label>is Feature ?</Label>
                            </Col>
                            <Col sm={8} lg={8} md={8}>
                                <Input
                                    id={0}
                                    name="image"
                                    className="formInput"
                                    onChange={handleChange("image")}
                                    type="file"
                                ></Input>
                            </Col>
                            <Col sm={2} lg={2} md={2}> <Button onClick={() => removeImage(0)}> delete</Button> </Col>
                        </Row>
                        <Row>
                            <Col sm={2} lg={2} md={2} className="imgButtonCol">
                                <Input
                                    id={1}
                                    name="is_feature"
                                    className="formCheckBox"
                                    checked={data.image[1] ? data.image[1].is_feature : false}
                                    type="checkbox"
                                    onChange={onChangeCB("image")}
                                />{'  '} <Label>is Feature ?</Label>
                            </Col>
                            <Col sm={8} lg={8} md={8}>
                                <Input
                                    id={1}
                                    name="image"
                                    className="formInput"
                                    onChange={handleChange("image")}
                                    type="file"
                                ></Input>
                            </Col>
                            <Col sm={2} lg={2} md={2}> <Button onClick={() => removeImage(1)}> delete</Button> </Col>
                        </Row>
                        <Row>
                            <Col sm={2} lg={2} md={2} className="imgButtonCol">
                                <Input
                                    id={2}
                                    name="is_feature"
                                    className="formCheckBox"
                                    checked={data.image[2] ? data.image[2].is_feature : false}
                                    type="checkbox"
                                    onChange={onChangeCB("image")}
                                />{'  '} <Label>is Feature ?</Label>
                            </Col>
                            <Col sm={8} lg={8} md={8}>
                                <Input
                                    id={2}
                                    name="image"
                                    className="formInput"
                                    defaultValue={data.image[2] ? data.image[2].image : null}
                                    onChange={handleChange("image")}
                                    type="file"
                                ></Input>
                            </Col>
                            <Col sm={2} lg={2} md={2}> <Button onClick={() => removeImage(2)}> delete</Button> </Col>
                        </Row> */}

                        <Row className="checkbox">
                            <Col className="checkbox-div">
                                <Input
                                    id="selectOnISavailable"
                                    name="is_available"
                                    className="formCheckBox"
                                    defaultValue={data.is_available}
                                    checked={data.is_available}
                                    type="checkbox"
                                    onChange={onChangeCB()}
                                    sm={2}
                                />{'  '} <Label>is Available ?</Label>
                            </Col>
                            <Col>
                                <Input
                                    id="selectOnPromo"
                                    name="on_promo"
                                    className="formCheckBox"
                                    defaultValue={data.on_promo}
                                    type="checkbox"
                                    checked={data.on_promo}
                                    onChange={onChangeCB()}
                                    sm={2}
                                />{'  '} <Label>On promotion ?</Label>
                            </Col>
                        </Row>

                        <FormGroup >
                            <Label className="formLabel">Promotion </Label>
                            <Input
                                name="promotion"
                                className="formInput"
                                value={(data.on_promo === true) && (data.promotion) ? data.promotion : ""}
                                type="select"
                                disabled={data.on_promo === true ? false : true}
                                readOnly={data.on_promo === true ? false : true}
                                onChange={handleChange()}
                            >
                                <option></option>
                                {
                                    promotions.map((promotion) => (
                                        <option
                                            key={promotion.id}
                                            id={promotion.id}
                                            name="name"
                                            value={promotion.id}
                                        >
                                            {promotion.name}
                                        </option>
                                    )
                                    )
                                }
                            </Input>
                            <Label for="promoPrice" className="formLabel">Promotion price </Label>
                            <Input
                                id="promoPrice"
                                name="promo_price"
                                className="formInput"
                                onChange={handleChange()}
                                disabled={data.on_promo === true ? false : true}
                                readOnly
                                value={data.on_promo ? data.promo_price : ""}
                            />
                        </FormGroup>

                        <div className="formButton">
                            <Button
                                color="success"
                                outline
                                type="submit"
                                style={{ "textAlign": "center", "marginRight": "0.5rem" }}>
                                Update Product
                            </Button>
                            <Button
                                color="danger"
                                outline
                                onClick={() => navigate("../products")}>
                                Back to Products
                            </Button>
                        </div>
                    </FormGroup>
                </Form>
            </div>
        </section>
    )
}
export default ViewProduct;