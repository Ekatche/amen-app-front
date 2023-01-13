import { useEffect, useState } from "react";
import { Form, FormGroup, Label, Button, Input } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../utils/useAxios";

const initalDetails = {
    name: "",
    category: "",
};
function ViewCategory() {
    const API = useAxios();
    const [data, setData] = useState(initalDetails);
    const navigate = useNavigate();
    let { id } = useParams();



    function handleChange(e) {
        const { name, value } = e.target;
        setData(prevValue => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    }

    useEffect(() => {
        const getCat = async () => {
            await API.get(`/backoffice/categories/${id}/`)
                .then((response) => {
                    setData(response.data)
                    console.log(response.data)
                }).catch((error) => {
                    console.log(error);
                })
        };

        getCat();

        return () => {
            // this now gets called when the component unmounts
            console.log(" Single data fetched");
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleSubmit = async e => {
        e.preventDefault();
        console.log(data);
        try {
            await API.patch(
                `/backoffice/categories/${id}/`, data
            )
                .then(res => {
                    if (res.status === 200) {
                        alert("updated category successfully")
                        navigate("../")
                    }
                });
        } catch (error) {
            console.log(error)
        };
    };

    return (
        <section>
            <div>
                <h2 className="formTitle"> Complete this form to Update category</h2>
            </div>
            <div className="addForm">
                <Form onSubmit={handleSubmit}>
                    <Label className="formlabel">Category Name</Label>
                    <FormGroup>
                        <Input
                            name="name"
                            className="formInput"
                            value={data.name}
                            placeholder="category Name"
                            onChange={handleChange}
                        />
                        <Label className="formLabel">Category Slug</Label>
                        <Input
                            name="slug"
                            className="formInput"
                            value={data.slug}
                            placeholder="Category slug"
                            onChange={handleChange}
                        />
                        <Label className="formLabel">Category status</Label>
                        <Input
                            name="status"
                            className="formInput"
                            value={data.is_active}
                            placeholder="Category status"
                            onChange={handleChange}
                        />

                        <div className="formButton">
                            <Button
                                color="success"
                                outline
                                type="submit"
                                style={{ "textAlign": "center", "marginRight": "0.5rem" }}>
                                Update Category
                            </Button>
                            <Button
                                color="danger"
                                outline
                                onClick={() => navigate("../categories")}>
                                Back to Category
                            </Button>
                        </div>
                    </FormGroup>
                </Form>
            </div>
        </section>
    )
}
export default ViewCategory;