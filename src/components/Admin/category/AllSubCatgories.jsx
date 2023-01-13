import {useEffect, useState} from "react";
import {Button, Input, Table} from "reactstrap";
import useAxios from "../../../utils/useAxios";
import {Navigate, useNavigate} from "react-router-dom";
import './Categories.css'
import {AiFillDelete} from "react-icons/ai";
import {RxUpdate} from 'react-icons/rx'

function AllSubcategories() {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search , setSearch] = useState("");
    const API = useAxios()
    let navigate = useNavigate()

    useEffect(() => {
        try {
            API.get(`/backoffice/subcategories?name=${search}`)
                .then((response) => {
                    setData(response.data.results)
                }).then(async () =>
                await API.get('/backoffice/categories/')
                    .then((response) => {
                        let resp_data = response.data.results
                        setCategories(resp_data);
                    })
            )
        } catch (error) {
            Navigate('/admin/login')
            console.log(error);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    function singlePage(id) {
        navigate(`../subcategory/${id}`);
    }

    return (
        <div className="table-layout">
            <div>
                <h1 className="category-title">All SubCategories</h1>
            </div>
            <div className="container">
                <div className="container search-bar mb-4">
                    <Input
                        onChange={e => setSearch(e.target.value)}
                        type="search"
                        placeholder="search..."
                        value={search}
                    />
                </div>
                <Table hover>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>category</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((e) => (
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{categories.map(
                                    (item) => {
                                        if (item.id === e.category) {
                                            return item.name
                                        }
                                        return false
                                    }
                                )
                                }</td>
                                <td>
                                    <Button
                                        className="button"
                                        color="danger"
                                        outline
                                        size="sm"> <AiFillDelete/> Delete </Button>
                                    <Button
                                        color="primary"
                                        className="button"
                                        outline
                                        size="sm"
                                        onClick={() => singlePage(e.id)}
                                    > <RxUpdate/> Update </Button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>
            <Button
                color="success"
                outline
                onClick={() => navigate("/admin/subcategory/add")}>
                Add New SubCategory
            </Button>
        </div>
    )
}

export default AllSubcategories;