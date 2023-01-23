import {useEffect, useState} from "react";
import useAxios from "../../../utils/useAxios";
import {useNavigate} from "react-router-dom";
import './Categories.css'
import {AiFillDelete} from "react-icons/ai";
import {RxUpdate} from 'react-icons/rx';
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {Box} from "@mui/material";
import Header from "../Header/Header";
import DataGridCustomToolbar from "../ToolBar/CustomToolbar";
import DataGridCustomFooter from "../Footer/Footer";

function AllCategories() {

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(1);
    let navigate = useNavigate();
    let name = "Category";
    let url = "/admin/category/add";
    const API = useAxios();
    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");


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

    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex: "auto",
        },
        {
            field: "name",
            headerName: "Category Name",
            flex: 0.7,
        },
        {
            field: "slug",
            headerName: "Category Slug",
            flex: 0.7,
        },
        {
            field: "is_active",
            headerName: "Is Active",
            flex: 0.25,
        },
        {
            headerName: "Actions",
            type: 'actions',
            flex: 0.5,
            getActions: (params) => [
                <GridActionsCellItem
                    label={"Update"}
                    icon={<RxUpdate/>}
                    color={"primary"}
                    onClick={() => singlePage(params.id)}
                />,
                <GridActionsCellItem
                    label={"Delete"}
                    color={"error"}
                    icon={<AiFillDelete/>}
                    onClick={() => deleteCat(params.id)}
                />
            ]
        }

    ]

    function singlePage(id) {
        navigate(`../category/${id}`);
    }

    const getCat = async () => {
        await API.get(`/backoffice/categories?name=${search}`)
            .then((response) => {
                setNextUrl(response.data.next);
                setPrevUrl(response.data.previous);
                setData(response.data.results);
                setPage(1);
            }).catch((error) => {
                console.log(error);
            })
    };


    useEffect(() => {
        getCat();
    }, [search]);

    return (
        <Box margin={"2rem"}>
            <Box>
                <Header title={name} subtitle={`Entire list of ${name}`}/>

                <Box height={"80vh"}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        rowsPerPageOptions={[10, 20, 30]}
                        components={
                            {
                                Toolbar: DataGridCustomToolbar,
                                Footer: DataGridCustomFooter,
                            }
                        }
                        componentsProps={
                            {
                                toolbar: {searchInput, setSearchInput, setSearch, name, url},
                                footer: {setNextUrl, setPrevUrl, setData, nextUrl, prevUrl, page, setPage},
                            }
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default AllCategories;