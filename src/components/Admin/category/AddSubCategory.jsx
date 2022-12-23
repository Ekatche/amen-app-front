import { useState } from "react";
import { Form, FormGroup, Label, Button, Input, Alert } from "reactstrap";
import useAxios from "../../../utils/useAxios";
import { useNavigate } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs"
const initalDetails = {
    name: "",
    category: "",
};

function AddSubCategory() {
    const api = useAxios();
    const [form, setForm] = useState(initalDetails);
    let navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prevValue => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(form);
        try {
            await api.post(
                '/backoffice/categories/', form
            )
                .then(res => {
                    if (res.status === 201) {
                        alert("added category successfully")
                            (
                                <Alert status='success'>
                                    <BsFillCheckCircleFill />
                                    The Category was added successfully
                                </Alert>
                            )
                        setForm(initalDetails)
                    }
                });
        } catch (error) {
            console.log(error)
        };
    };

    return (
        <section>
            <div>
                <h2 className="formTitle"> Complete this form to add a new Sub category</h2>
            </div>
            <div className="addForm container">
                <Form onSubmit={handleSubmit}>
                    <Label className="formlabel">SubCategory Name</Label>
                    <FormGroup>
                        <Input
                            name="name"
                            className="formInput"
                            value={form.name}
                            placeholder="Subcategory Name"
                            onChange={handleChange}
                        />
                        <Label className="formLabel">SubCategory Category </Label>
                        <Input
                            name="slug"
                            className="formInput"
                            value={form.category}
                            placeholder="Subcategory Category"
                            onChange={handleChange}
                        />
                        <div className="formButton">
                            <Button
                                color="success"
                                outline
                                type="submit"
                                style={{ "textAlign": "center", "marginRight":"0.5rem" }}>
                                Add Category
                            </Button>
                            <Button
                                color="danger"
                                outline
                                onClick={() => navigate("../subcategories")}>
                                Back to Category
                            </Button>
                        </div>

                    </FormGroup>
                </Form>
            </div>
        </section>
    )
}
export default AddSubCategory;