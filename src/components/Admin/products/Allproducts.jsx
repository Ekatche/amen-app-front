import { useState, useEffect, useContext } from "react";
import { Button, Table } from "reactstrap";
import useAxios from "../../../utils/useAxios";
import AuthContext from "../../../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { RxUpdate } from 'react-icons/rx';
import { GrAddCircle } from 'react-icons/gr';



function AllProducts() {
    const [data, setData] = useState([]);
    const { loading } = useContext(AuthContext)
    let navigate = useNavigate()
    const API = useAxios()

    useEffect(() => {
        try {
            API.get('/backoffice/product/')
                .then((response) => {
                    setData(response.data.results)
                    console.log(response.data.results)
                })
        } catch (error) {
            console.log(error);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="table-layout">
            <div>
                <h1 className="page-title">All Products</h1>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Slug</th>
                        <th>Categories</th>
                        <th>Subcategories</th>
                        <th>Description</th>
                        <th>Quantity sold</th>
                        <th>Available quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((e) => (
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.price}</td>
                                <td>{e.slug}</td>
                                <td>{e.categories.map((cat) => <ul key={cat.id}>{cat.name}</ul>)}</td>
                                <td>{e.subcategory.name}</td>
                                <td>{e.description}</td>
                                <td>{e.product_inventory.quantity_sold}</td>
                                <td>{e.product_inventory.available_quantity}</td>
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
            <Button
                color="success"
                outline
            >
                <GrAddCircle />
                Add New Promotions
            </Button>
        </div>
    )
};

export default AllProducts;