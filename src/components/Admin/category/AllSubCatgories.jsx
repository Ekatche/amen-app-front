import { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import useAxios from "../../../utils/useAxios";
import { Navigate, useNavigate } from "react-router-dom";
import './Categories.css'
import { AiFillDelete } from "react-icons/ai";
import { RxUpdate } from 'react-icons/rx'

function AllSubcategories() {
    const [data, setData] = useState([]);
    const API = useAxios()
    let navigate = useNavigate()

    useEffect(() => {
        try {
            API.get('/backoffice/subcategories/')
                .then((response) => {
                    setData(response.data.results)
                    console.log(response.data.results)
                })
        } catch (error) {
            Navigate('/admin/login')
            console.log(error);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function singlePage(id) {
        navigate(`../subcategory/${id}`);
    }
    return (
        <div className="table-layout">
            <div>
                <h1 className="category-title" >All SubCategories</h1>
            </div>
            <div className="container">
                <Table hover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>category</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((e) => (
                                <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.name}</td>
                                    <td>{e.category.name}</td>
                                    <td>
                                        <Button
                                            className="button"
                                            color="danger"
                                            outline
                                            size="sm"> <AiFillDelete /> Delete </Button>
                                        <Button
                                            color="primary"
                                            className="button"
                                            outline
                                            size="sm"
                                            onClick={() => singlePage(e.id)}
                                        > <RxUpdate /> Update </Button>
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