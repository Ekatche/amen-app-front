import { useState } from "react";
import useAxios from "../../utils/useAxios"; 

const initalDetails = {
    name:"", 
    slug:"",
};

function AddCategory() {
    const [form, setForm] = useState(initalDetails)

    const handleChange= (e)=> {
        const {name: key, value}= e.taget;
        setForm({
            ...form,
            [key]:value,
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        setForm(initalDetails)
    }
}