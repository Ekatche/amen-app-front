import {useEffect, useState} from "react";
import useAxios from "../../../utils/useAxios";
import {useNavigate} from "react-router-dom";
import {AiFillDelete} from "react-icons/ai";
import {RxUpdate} from 'react-icons/rx';
import "./user.css"
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {Box} from "@mui/material";
import Header from "../Header/Header";
import DataGridCustomToolbar from "../ToolBar/CustomToolbar";
import DataGridCustomFooter from "../Footer/Footer";

function AllUsers() {

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");
    let name = "User";
    let url = "";
    let navigate = useNavigate();
    const API = useAxios();
    const [page, setPage] = useState(1);

    useEffect(() => {
        try {
            API.get(`user/backoffice/user?term=${search}`)
                .then((response) => {
                    setData(response.data.results);
                    setNextUrl(response.data.next);
                    setPrevUrl(response.data.previous);
                    setPage(1);
                })
        } catch (error) {
            console.log(error);
        }
    }, [search]);

    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex: "auto",
        },
        {
            field: "email",
            headerName: "Email",
            flex: 0.7,
        },
        {
            field: "first_name",
            headerName: "First Name",
            flex: 0.35,
            sortable: true,
        },
        {
            field: "last_name",
            headerName: "Last Name",
            flex: "auto",
        },
        {
            field: "gender",
            headerName: "Gender",
            flex: "auto",
        },
        {
            field: "birth_date",
            headerName: "Birth Date",
            flex: 0.5,
        },
        {
            field: "phone_prefix",
            headerName: "Phone Prefix",
            flex:0.25
        },
        {
            field: "phone_number",
            headerName: "Phone Number",
            flex: 1,
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

                />
            ]
        }
    ]

    function singlePage(id) {
        console.log("clicked");
        navigate(`../user/${id}`);
    }

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
    )
}

export default AllUsers;