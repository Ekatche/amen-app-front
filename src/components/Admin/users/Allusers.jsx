import { useState, useEffect, useContext } from "react";
import {Button, Input, Table} from "reactstrap";
import useAxios from "../../../utils/useAxios";
import { useNavigate, NavLink } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { RxUpdate } from 'react-icons/rx';
import "./user.css"
import {FcNext, FcPrevious} from "react-icons/fc";

function AllUsers() {

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [nextUrl, setnextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");
    let navigate = useNavigate()
    const API = useAxios()

    useEffect(() => {
        try {
            API.get(`user/backoffice/user?term=${search}`)
                .then((response) => {
                    setData(response.data.results);
                     setnextUrl(response.data.next);
                    setPrevUrl(response.data.previous);
                })
        } catch (error) {
            console.log(error);
        }
    }, [search]);

        const paginationHandler = (url) => {
        try {
            API.get(url)
                .then((response) => {
                    setnextUrl(response.data.next);
                    setPrevUrl(response.data.previous);
                    setData(response.data.results);
                })
        } catch (e) {
            console.log(e);
        }
    }

    function singlePage(id) {
        console.log("clicked");
        navigate(`../user/${id}`)  ;
    }
    return (
        <div className="table-layout">
            <div>
                <h1 className="page-title ">All Users</h1>
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
                <Table className="table-layout">
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
                                            onClick={() => singlePage(e.id)}>
                                        <RxUpdate /> Update </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
             <div className={"row"}>
                <div className={"col-4"}>
                    {prevUrl && <Button
                        color="secondary"
                        className={"button"}
                        outline
                        onClick={() => paginationHandler(prevUrl)}>
                        <FcPrevious className="addButton"/>
                        Previous
                    </Button>}
                </div>
                <div className={"col-4"}>
                    {nextUrl && <Button
                        color="secondary"
                        outline
                        className={"button"}
                        onClick={() => paginationHandler(nextUrl)}
                    >
                        <FcNext className="addButton"/>
                        Next
                    </Button>}
                </div>
            </div>
        </div>
    )
}

export default AllUsers;