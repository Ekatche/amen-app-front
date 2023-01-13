import {useEffect, useState} from "react";
import {Button, Input, Table} from "reactstrap";
import useAxios from "../../../utils/useAxios";
import {AiFillDelete} from "react-icons/ai";
import {RxUpdate} from 'react-icons/rx';
import {GrAddCircle} from 'react-icons/gr';
import {useNavigate} from "react-router-dom";
import {FcNext, FcPrevious} from "react-icons/fc";


function AllProducts() {
    const [data, setData] = useState([]);
    const API = useAxios()
    let navigate = useNavigate()
    const [search, setSearch] = useState("");
    const [nextUrl, setnextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");

    useEffect(() => {
        try {
            API.get(`/product?name=${search}`)
                .then((response) => {
                    setnextUrl(response.data.next);
                    setPrevUrl(response.data.previous);
                    setData(response.data.results);
                })
        } catch (error) {
            console.log(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        navigate(`../product/${id}`);
    }

    return (
        <div className="table-layout">
            <div>
                <h1 className="page-title">All Products</h1>
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
                <Table hover>
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
                                        size="sm"> <AiFillDelete/> Delete </Button>
                                    <Button
                                        color="primary"
                                        className="button"
                                        outline
                                        size="sm"
                                        onClick={() => singlePage(e.id)}
                                    > <RxUpdate/> Update </Button>
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
                        outline
                        onClick={() => paginationHandler(prevUrl)}>
                        <FcPrevious className="addButton"/>
                        Previous
                    </Button>}
                </div>
                <div className={"col-4"}>
                    <Button
                        color="success"
                        outline
                        onClick={() => navigate("/admin/product/add")}>
                        <GrAddCircle className="addButton"/>
                        Add New Product
                    </Button>
                </div>
                <div className={"col-4"}>
                    {nextUrl && <Button
                        color="secondary"
                        outline
                        onClick={() => paginationHandler(nextUrl)}
                    >
                        <FcNext className="addButton"/>
                        Next
                    </Button>}
                </div>
            </div>
        </div>
    )
};

export default AllProducts;