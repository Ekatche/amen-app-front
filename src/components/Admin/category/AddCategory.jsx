import { useState } from "react";
import {
    FormControl,
    Input,
    FormLabel,
    Alert,
    AlertIcon,
    Button,
} from "@chakra-ui/react";
import useAxios from "../../../utils/useAxios";

const initalDetails = {
    name:"", 
    slug:"",
};

function AddCategory() {
    const api = useAxios();
    const [form, setForm] = useState(initalDetails);

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
                '/backoffice/categories/',form
            )
                .then(res => {
                    if (res.status === 201) {
                        alert("added category successfully")
                            (
                                <Alert status='success'>
                                    <AlertIcon />
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
        <form onSubmit={handleSubmit}>
            <FormLabel>Category Name</FormLabel>
            <FormControl isRequired>
                <Input
                    name="name"
                    value={form.name}
                    placeholder="category Name"
                    onChange={handleChange}
                />
                <FormLabel>Category Slug </FormLabel>
                <Input
                    name="slug"
                    value={form.slug}
                    placeholder="Category slug"
                    onChange={handleChange}
                />
                <Button colorScheme="teal" type="submit">
                    Add Category
                </Button>
            </FormControl>
        </form>

    )
}
export default AddCategory;