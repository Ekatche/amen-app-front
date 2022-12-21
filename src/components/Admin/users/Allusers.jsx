import { useState, useEffect, useContext } from "react";
import { Button, Table } from "reactstrap";
import useAxios from "../../../utils/useAxios";
import AuthContext from "../../../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { RxUpdate } from 'react-icons/rx';
import { GrAddCircle } from 'react-icons/gr';

function AllUsers() {

    const [data, setData] = useState([]);
    const { loading } = useContext(AuthContext)
    let navigate = useNavigate()
    const API = useAxios()

    useEffect(() => {
        try {
            API.get('user/backoffice/user/')
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
        <div className="">
            <div>
                <h1 className= "page-title ">All Users</h1>
            </div>
            <Table variant="striped" colorScheme="teal">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>email</th>
                        <th>first name</th>
                        <th>last name</th>
                        <th>gender</th>
                        <th>birth date</th>
                        <th>phone prefix</th>
                        <th>phone number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((e) => (
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.email}</td>
                                <td>{e.first_name}</td>
                                <td>{e.last_name}</td>
                                <td>{e.gender}</td>
                                <td>{e.birth_date}</td>
                                <td>{e.phone_prefix}</td>
                                <td>{e.phone_number}</td>
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
        </div>
    )
}

export default AllUsers;