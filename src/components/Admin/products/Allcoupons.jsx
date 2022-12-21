import { useState, useEffect, useContext } from "react";
import { Button, Table } from "reactstrap";
import useAxios from "../../../utils/useAxios";
import AuthContext from "../../../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { RxUpdate } from 'react-icons/rx';
import { GrAddCircle } from 'react-icons/gr';

export default function AllCoupons() {

    const [data, setData] = useState([]);
    const { loading } = useContext(AuthContext)
    let navigate = useNavigate()
    const API = useAxios()

    useEffect(() => {
        try {
            API.get('/backoffice/coupons/')
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
                <h1 className="page-title">All Coupons</h1>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>code</th>
                        <th>Discount</th>
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
                                <td>{e.code}</td>
                                <td>{e.discount}</td>
                                <td>{e.is_active ? "Yes" : "No"}</td>
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
                    Add New Coupon
                </Button>
        </div>
    )
};

