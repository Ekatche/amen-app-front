import {useEffect, useState} from "react";
import useAxios from "../../../utils/useAxios";
import {useNavigate} from "react-router-dom";
import {AiFillDelete} from "react-icons/ai";
import {RxUpdate} from 'react-icons/rx';
import "./Products.css"
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {Box} from "@mui/material";
import Header from "../Header/Header";
import DataGridCustomToolbar from "../ToolBar/CustomToolbar";
import DataGridCustomFooter from "../Footer/Footer";

export default function AllPromotion() {
    const [data, setData] = useState([]);
    const [coupon, setCoupons] = useState([])
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(1);
    let navigate = useNavigate();
    const API = useAxios();
    let name = "Promotion";
    let url = "/admin/promotion/add";
    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");
    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex: "auto",
        },
        {
            field: "name",
            headerName: "Promotion Name",
            flex: 0.5,
        },
        {
            field: "period",
            headerName: "Period",
            flex: "auto",
        },
        {
            field: "coupons",
            headerName: "Coupon Name",
            flex: 0.5,
            valueGetter: (params) => {
                return coupon
                    .filter((obj) => {
                            return obj.id === params.value
                        }
                    )
                    .map((item) => {
                        return item.name
                    })
            }
        },
        {
            field: "is_active",
            headerName: "Is Active",
            flex: "auto",
        },
        {
            field: "is_schedule",
            headerName: "Is Schedule",
            flex: 0.5,
        },
        {
            field: "date_start",
            headerName: "Date Start",
            flex: "auto",
        },
        {
            field: "date_end",
            headerName: "Date End",
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
            API.get('/backoffice/promotions/')
                .then((response) => {
                    setData(response.data.results);
                })
                .then(async () => await
                    API.get('/backoffice/coupons/')
                        .then((response) => {
                            setCoupons(response.data.results)
                        })
                )
        } catch (error) {
            console.log(error);
        }
    }, [search]);

    function singlePage(id) {
        navigate(`../promotion/${id}`);
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