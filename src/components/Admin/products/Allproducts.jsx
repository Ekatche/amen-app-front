import {useEffect, useState} from "react";
import useAxios from "../../../utils/useAxios";
import {RxUpdate} from 'react-icons/rx';
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/material";
import Header from "../Header/Header";
import {DataGrid, GridActionsCellItem,} from "@mui/x-data-grid";
import DataGridCustomToolbar from "../ToolBar/CustomToolbar";
import {AiFillDelete} from "react-icons/ai";
import DataGridCustomFooter from "../Footer/Footer";


function AllProducts() {
    const [data, setData] = useState([]);
    const API = useAxios()
    let navigate = useNavigate()
    let name = "Product"
    let url = "/admin/product/add"
    // search purpose
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    // data pagination
    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        try {
            API.get(`/product?name=${search}`)
                .then((response) => {
                    setNextUrl(response.data.next);
                    setPrevUrl(response.data.previous);
                    setData(response.data.results);
                    setPage(1);
                })
        } catch (error) {
            console.log(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex: "auto",
        },
        {
            field: "name",
            headerName: "Product Name",
            flex: 0.7,
        },
        {
            field: "price",
            headerName: "Price",
            flex: 0.35,
            sortable: true,
            valueFormatter: (data) => `${Number(data.value).toFixed(2)} €`,
        },
        {
            field: "slug",
            headerName: "Slug",
            flex: "auto",
        },
        {
            field: "categories",
            headerName: "Categories",
            flex: "auto",
            valueGetter: (params) => {
                return `${params.row.categories[0].name}`
            }
        },
        {
            field: "subcategory",
            headerName: "Subcategory",
            flex: 0.5,
            valueGetter: (params) => {
                return `${params.row.subcategory.name}`
            }
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1,
        },
        {
            field: "product_inventory",
            headerName: "Available Quantity",
            flex: "auto",
            sortable: true,
            valueGetter: (params) => {
                return `${params.row.product_inventory.available_quantity}`
            }
        },
        {
            field: "product_inventory2",
            headerName: "Sold Quantity",
            flex: "auto",
            sortable: true,
            valueGetter: (params) => {
                return `${params.row.product_inventory.quantity_sold}`
            }
        },
        {
            headerName: "Actions",
            type: 'actions',
            flex: 0.5,
            getActions: (params) => [
                <GridActionsCellItem
                    label={"Update"}
                    color={"primary"}
                    icon={<RxUpdate/>}
                    onClick={() => singlePage(params.id)}
                />,
                <GridActionsCellItem
                    label={"Delete"}
                    color={"error"}
                    icon={<AiFillDelete/>}
                />
            ]
        }
    ];

    function singlePage(id) {
        console.log("clicked");
        navigate(`../product/${id}`);
        setPage(1);
    }

    return (
        <Box margin={"2rem"}>
            <Box>
                <Header title={"PRODUCTS"} subtitle={"Entire list of products"}/>

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

export default AllProducts;