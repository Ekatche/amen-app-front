import { useState, useEffect, useContext } from "react";
import { Button, Table } from "reactstrap";
import useAxios from "../../../utils/useAxios";
import AuthContext from "../../../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { RxUpdate } from 'react-icons/rx';
import { GrAddCircle } from 'react-icons/gr';
import "./Products.css"

export default function AllPromotion() {
    const [data, setData] = useState([]);
    const { loading } = useContext(AuthContext)
    let navigate = useNavigate()
    const API = useAxios()

    useEffect(() => {
        try {
            API.get('/backoffice/promotions/')
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
                <h1 className = "page-title">All Promotions</h1>
            </div>
            <Table >
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>Period</th>
                        <th>Coupons</th>
                        <th>Is scheduled</th>
                        <th>Is active</th>
                        <th>Date end </th>
                        <th>Date start</th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((e) => (
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.period}</td>
                                <td>{e.coupons.id}</td>
                                <td>{e.is_schedule?"True":"False"}</td>
                                <td>{e.is_active?"True":"False"}</td>
                                <td>{e.date_start}</td>
                                <td>{e.date_end}</td>
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
                    Add New Promotion
                </Button>
        </div>
    )

}