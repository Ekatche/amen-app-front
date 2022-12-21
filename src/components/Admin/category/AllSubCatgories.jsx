import { useState, useEffect, useContext } from "react";
import { Button, Table } from "reactstrap";
import useAxios from "../../../utils/useAxios";
import AuthContext from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";
import './Categories.css'
import { AiFillDelete } from "react-icons/ai";
import { RxUpdate } from 'react-icons/rx'

function AllSubcategories() {
    const [data, setData] = useState([]);
    const { loading } = useContext(AuthContext)
    const API = useAxios()

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

    return (
        <div className="table-layout">
            <div>
                <h1 className="category-title" >All SubCategories</h1>
            </div>
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
                                <td>{e.categories}</td>
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
                                    > <RxUpdate /> Update </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <Button>
                Add New SubCategory
            </Button>
        </div>
    )
}

export default AllSubcategories;