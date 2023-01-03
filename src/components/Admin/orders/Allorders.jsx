import { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import useAxios from "../../../utils/useAxios";
import { AiFillDelete } from "react-icons/ai";
import { RxUpdate } from 'react-icons/rx';
import { GrAddCircle } from 'react-icons/gr';
import { useNavigate } from "react-router-dom";

export default function AllOrders() {
    const [data, setData] = useState([]);
    const API = useAxios()
    let navigate = useNavigate()

    useEffect(() => {
        try {
            API.get(`/backoffice/order/`)
                .then(res => {
                    setData(res.data.results);
                })
        } catch (error) {
            console.log(error);
        }
    }, []);


    return (
        <div className="table-layout">
            <div>
                <h1 className="page-title">All Orders </h1>
            </div>
            <div className="container">
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Date created</th>
                            <th>Date updated</th>
                            <th>Customer first name</th>
                            <th>Customer last name</th>
                            <th>Shipping </th>
                            <th>Amount due </th>
                            <th>Status </th>
                            <th>Reason </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((e) => (
                                <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.date_created}</td>
                                    <td>{e.date_updated}</td>
                                    <td>{e.customer.first_name}</td>
                                    <td>{e.customer.last_name}</td>
                                    <td>{e.shipping.id}</td>
                                    <td>{e.amount_due}</td>
                                    <td>{e.status}</td>
                                    <td>{e.reason}</td>
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
                                            onClick={() => console.log("clicked")}
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
                onClick={() => navigate("/admin/product/add")}>
                <GrAddCircle className="addButton" />
                Add New Product
            </Button>
        </div>

    )
}