import { useEffect, useState } from "react";
import { Form, FormGroup, Label, Button, Input } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../utils/useAxios";

const initalDetails = {
    name: "",
    category: "",
};
function ViewSubCategory() {
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
    };

    useEffect(() => {
        const getCat = async () => {
            await API.get(`/backoffice/subcategories/${id}/`)
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
                `/backoffice/subcategories/${id}/`, data
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
                <h2 className="formTitle"> Complete this form to Update Subcategory</h2>
            </div>
            <div className="addForm">
                <Form onSubmit={handleSubmit}>
                    <Label className="formlabel required">SubCategory Name</Label>
                    <FormGroup>
                        <Input
                            name="name"
                            className="formInput"
                            value={data.name}
                            placeholder="subcategory Name"
                            onChange={handleChange}
                        />
                        <Label className="formLabel">SubCategory Category </Label>
                        <Input
                            name="slug"
                            className="formInput"
                            value={data.category.name}
                            placeholder="subcategory category"
                            onChange={handleChange}
                        />
                        
                        <div className="formButton">
                            <Button
                                color="success"
                                outline
                                type="submit"
                                style={{ "textAlign": "center", "marginRight": "0.5rem" }}>
                                Update Subcategory
                            </Button>
                            <Button
                                color="danger"
                                outline
                                onClick={() => navigate("../subcategories")}>
                                Back to subcategories
                            </Button>
                        </div>
                    </FormGroup>
                </Form>
            </div>
        </section>
    )
}
export default ViewSubCategory;