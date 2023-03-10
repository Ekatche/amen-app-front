import { useEffect, useState } from "react";
import { Form, FormGroup, Label, Button, Input, Row, Col } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../utils/useAxios";

const initalDetails = {
    "name": "",
    "price": "",
    "slug": "",
    "inventory": 0,
    "categories": [
        0
    ],
    "subcategory": 0,
    "description": "",
    "is_available": true,
    "on_promo": false,
    "promotion": null
}

const initalDetailsInventory = {
    "quantity_sold": 0,
    "total": ""
}

const initalDetailsImage = [{
    "image": "",
    "is_feature": false
}]

export default function AddProduct() {
    const API = useAxios();
    const [data, setData] = useState(initalDetails);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [images, setImages] = useState(initalDetailsImage);
    const [inventory, setInventory] = useState(initalDetailsInventory);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
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
                ).catch((error) => {
                    console.log(error);
                })
        };

        getData();

        return () => {
            // this now gets called when the component unmounts
            console.log("data fetched");
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Checkbox changes
    const onChangeCB = (e) => {
        const { name, checked } = e.target;
        setData(prevValue => {
            return {
                ...prevValue,
                [name]: checked ? true : false
            };
        });
    };
    const onChangeImagesCB = imgId => (e) => {
        const { name, checked } = e.target;
        setImages(prevValue => {
            if (prevValue[imgId]) {
                return prevValue.map((item, id) => {
                    if (Number(imgId) === id) {
                        return {
                            ...item,
                            [name]: checked ? true : false
                        }
                    } return item;
                }
                );
            };
            return [...prevValue, {
                [name]: checked ? true : false
            }]
        })
    }

    // form submission
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await API.post(
                `/inventory/`,
                {
                    "quantity_sold": inventory.quantity_sold,
                    "total": inventory.total
                }
            ).then(
                (response) => {
                    const inv = response.data
                    return inv
                }
            ).then(async (inv) =>

                await API.post(
                    `/backoffice/product/`,
                    {
                        ...data,
                        "inventory": inv.id
                    }
                ).then(res => {
                    if (res.status === 201) {
                        const prod = res.data
                        return prod
                    };
                }).then(async (prod) => {
                    await API.post(
                        `/backoffice/media/`, images.map(item => {
                            return {
                                ...item,
                                "product": prod.id,
                            }
                        })
                    ).then((response) => {
                        if (response.status === 201) {
                            alert(`Created product ${response.data.product} successfully`);
                            navigate("../products");
                        };

                    })
                })
            );

        } catch (error) {
            console.log(error)
        };
    };

    // Inventory data changes 
    const handleInventoryChange = e => {
        setInventory({
            ...inventory,
            [e.target.name]: Number(e.target.value)
        })
    };

    // Images changes 
    const handleImageChange = e => {
        let index = e.target.id
        let file_name = e.target.files[0].name
        console.log(file_name);

        setImages(prevValue => {
            if (prevValue[index]) {
                return prevValue.map((item, id) => {
                    if (Number(index) === id) {
                        return {
                            ...item,
                            [e.target.name]: e.target.value,
                        }
                    } return item;
                }
                );
            };
            return [...prevValue, {
                [e.target.name]: e.target.value,
                "is_feature": false,
            }]
        })
    }

    // global form completion changes monitoring 

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
                categories: [Number(e.target.children[e.target.selectedIndex].id)]
            })
        }
        else {
            setData({
                ...data,
                [level]: {
                    ...data[level],
                    [e.target.name]: e.target.value
                }
            })
        }
    };

    // Image deletion 
    const removeImage = (imgId) => {
        setImages((oldState) => oldState.filter((item, index) => index !== Number(imgId)));
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
                            placeholder="Product Name"
                            value={data.name}
                            onChange={handleChange()}
                        />
                        <Label className="formLabel">Product Price </Label>
                        <Input
                            name="price"
                            className="formInput"
                            value={data.price}
                            placeholder="Product price"
                            onChange={handleChange()}
                        />
                        <Label className="formLabel">Product Slug </Label>
                        <Input
                            name="slug"
                            className="formInput"
                            value={data.slug}
                            placeholder="Product Slug"
                            onChange={handleChange()}
                        />
                        <Row md={4} lg={4} sm={4}>
                            <Col>
                                <Label> Inital stock </Label>
                                <Input
                                    name="total"
                                    className="formInput"
                                    value={inventory.total}
                                    placeholder=" Initial stock"
                                    onChange={handleInventoryChange}
                                />
                            </Col>
                        </Row>


                        <Label className="formLabel"> Product Categories </Label>
                        <Input
                            name="name"
                            className="formInput"
                            type="select"
                            onChange={handleChange("categories")}
                            value={data.categories[0]}
                        >
                            <option> Select a category </option>
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
                            type="select"
                            onChange={handleChange("subcategory")}
                            value={data.subcategory}
                        >
                            <option> Select a Subcategory </option>
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
                    </FormGroup>
                    <FormGroup>

                        {/* Images  */}

                        <Label className="formLabel">Product Images </Label>
                        <Row>
                            <Col sm={2} lg={2} md={2} className="imgButtonCol">
                                <Input
                                    id={0}
                                    name="is_feature"
                                    className="formCheckBox"
                                    type="checkbox"
                                    value={images[0] ? images[0].is_feature : false}
                                    onChange={onChangeImagesCB(0)}
                                />{'  '} <Label>is Feature ?</Label>
                            </Col>
                            <Col sm={8} lg={8} md={8}>
                                <Input
                                    id={0}
                                    name="image"
                                    className="formInput"
                                    type="file"
                                    accept="image/jpeg,image/png,image/"
                                    onChange={handleImageChange}
                                    value={images[0] ? images[0].image : ""}
                                />
                            </Col>
                            <Col sm={2} lg={2} md={2}> <Button onClick={() => removeImage(0)}> delete</Button> </Col>
                        </Row>
                        <Row>
                            <Col sm={2} lg={2} md={2} className="imgButtonCol">
                                <Input
                                    id={1}
                                    name="is_feature"
                                    className="formCheckBox"
                                    type="checkbox"
                                    value={images[1] ? images[1].is_feature : false}
                                    onChange={onChangeImagesCB(1)}
                                />{'  '} <Label>is Feature ?</Label>
                            </Col>
                            <Col sm={8} lg={8} md={8}>
                                <Input
                                    id={1}
                                    name="image"
                                    className="formInput"
                                    type="file"
                                    accept="image/jpeg,image/png,image/"
                                    value={images[1] ? images[1].image : ""}
                                    onChange={handleImageChange}
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
                                    type="checkbox"
                                    value={images[2] ? images[2].is_feature : false}
                                    onChange={onChangeImagesCB(2)}
                                />{'  '} <Label>is Feature ?</Label>
                            </Col>
                            <Col sm={8} lg={8} md={8}>
                                <Input
                                    id={2}
                                    name="image"
                                    className="formInput"
                                    type="file"
                                    accept="image/jpeg,image/png,image/"
                                    value={images[2] ? images[2].image : ""}
                                    onChange={handleImageChange}
                                ></Input>
                            </Col>
                            <Col sm={2} lg={2} md={2}> <Button onClick={() => removeImage(2)}> delete</Button> </Col>
                        </Row>

                        <Row className="checkbox">
                            <Col className="checkbox-div">
                                <Input
                                    id="selectOnISavailable"
                                    name="is_available"
                                    className="formCheckBox"
                                    defaultValue={data.is_available}
                                    checked={data.is_available}
                                    type="checkbox"
                                    onChange={onChangeCB}
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
                                    onChange={onChangeCB}
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
                        </FormGroup>

                        <div className="formButton">
                            <Button
                                color="success"
                                outline
                                type="submit"
                                style={{ "textAlign": "center", "marginRight": "0.5rem" }}>
                                Add Product
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