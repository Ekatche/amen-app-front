import { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import useAxios from "../../../utils/useAxios";
import { useNavigate } from "react-router-dom";
import './Categories.css'
import { AiFillDelete } from "react-icons/ai";
import { RxUpdate } from 'react-icons/rx';
import { GrAddCircle } from 'react-icons/gr';

function AllCategories() {

    const [data, setData] = useState([]);
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

    function singlePage(id) {
        console.log("clicked");
        navigate(`../category/${id}`)  ;
    }


    useEffect(() => {
        const getCat = async () => {
            await API.get('/backoffice/categories/')
                .then((response) => {
                    setData(response.data.results)
                }).catch((error) => {
                    console.log(error);
                })
        };

        getCat();

        return () => {
            // this now gets called when the component unmounts
            console.log("data fetched");
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="table-layout">
                <div>
                    <h1 className="category-title">All Categories</h1>
                </div>
                <div className="container">
                    <Table hover>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>slug</th>
                                <th>is active</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((e) => (
                                    <tr key={e.id} >
                                        <td>{e.id}</td>
                                        <td>{e.name}</td>
                                        <td>{e.slug}</td>
                                        <td>{e.is_active ? "True" : "False"}</td>
                                        <td>
                                            <Button
                                                className="table-button"
                                                color="danger"
                                                outline
                                                onClick={() => deleteCat(e.id)}
                                                size="sm"> <AiFillDelete /> Delete </Button>
                                            <Button
                                                color="primary"
                                                className="table-button"
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
                    onClick={() => navigate("/admin/category/add")}>
                    <GrAddCircle className="addButton" />
                    Add Category
                </Button>
            </div>
        </>
    )
};

export default AllCategories;