import { useState, useEffect, useContext } from "react";
import { Button, Table } from "reactstrap";
import useAxios from "../../../utils/useAxios";
import AuthContext from "../../../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import './Categories.css'
import { AiFillDelete } from "react-icons/ai";
import { RxUpdate } from 'react-icons/rx';
import { GrAddCircle } from 'react-icons/gr';

function AllCategories() {

    const [data, setData] = useState([]);
    const { loading } = useContext(AuthContext)
    let navigate = useNavigate()
    const API = useAxios()


    const deleteCat = async (id) => {
        await API.delete(`/backoffice/categories/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    alert("successfully deleted the category")
                }
            })
            .catch(error => {

                console.log(error);
            })
    };

    useEffect(() => {
        try {
            API.get('/backoffice/categories/')
                .then((response) => {
                    setData(response.data.results)
                    console.log(response.data.results)
                })
        } catch (error) {
            navigate("/admin/login")
            console.log(error);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="table-layout">
                <div>
                    <h1 className="category-title" >All Categories</h1>
                </div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>slug</th>
                            <th>is active</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((e) => (
                                <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.name}</td>
                                    <td>{e.slug}</td>
                                    <td>{e.is_active ? "True" : "False"}</td>
                                    <td>
                                        <Button
                                            className="button"
                                            color="danger"
                                            outline
                                            onClick={() => deleteCat(e.id)}
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
                <Button
                    color="success"
                    outline
                    onClick={() => navigate("/admin/categories/add")}>
                    <GrAddCircle />
                    Add Category
                </Button>
            </div>
        </>
    )
};

export default AllCategories;