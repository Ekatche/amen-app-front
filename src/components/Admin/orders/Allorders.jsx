import {useEffect, useState} from "react";
import useAxios from "../../../utils/useAxios";
import {AiFillDelete} from "react-icons/ai";
import {RxUpdate} from 'react-icons/rx';
import {useNavigate} from "react-router-dom";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {Box} from "@mui/material";
import Header from "../Header/Header";
import DataGridCustomToolbar from "../ToolBar/CustomToolbar";
import DataGridCustomFooter from "../Footer/Footer";

export default function AllOrders() {
    const [data, setData] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(1);
    const API = useAxios();
    let navigate = useNavigate();
    let name = "Order";
    let url = "";
    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");

    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex: "auto",
        },
        {
            field: "date_created",
            headerName: "Date Created",
            flex: "auto",
        },
        {
            field: "date_updated",
            headerName: "Date Updated",
            flex: 0.5,
        },
        {
            field: "customer",
            headerName: "Customer Name",
            flex: 0.5,
            valueGetter: (params) => {
                return customer
                    .filter((obj) => {
                            return obj.id === params.value
                        }
                    )
                    .map((item) => {
                        return `${item.first_name} ${item.last_name}`
                    })
            }
        },
        {
            field: "amount_due",
            headerName: "Amount due",
            flex: 0.5,
            valueFormatter: (data) => `${Number(data.value).toFixed(2)} €`,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 0.5,
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

    useEffect(() => {
        try {
            API.get(`/backoffice/order?term=${search}`)
                .then(res => {
                    setData(res.data.results);
                }).then(async () =>
                await API.get('/user/backoffice/user/')
                    .then(res => {
                        setCustomer(res.data.results);
                    })
            )
        } catch (error) {
            console.log(error);
        }
    }, [search]);

    function singlePage(id) {
        console.log("clicked");
        navigate(`../order/${id}`);
        setPage(1);
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
    );
}