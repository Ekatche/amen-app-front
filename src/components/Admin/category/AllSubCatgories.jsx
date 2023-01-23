import {useEffect, useState} from "react";
import useAxios from "../../../utils/useAxios";
import {useNavigate} from "react-router-dom";
import './Categories.css'
import {AiFillDelete} from "react-icons/ai";
import {RxUpdate} from 'react-icons/rx'
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {Box} from "@mui/material";
import Header from "../Header/Header";
import DataGridCustomToolbar from "../ToolBar/CustomToolbar";
import DataGridCustomFooter from "../Footer/Footer";

function AllSubcategories() {

    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(1);
    const API = useAxios();
    let name = "SubCategory";
    let url = "/admin/subcategory/add";
    let navigate = useNavigate();
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
            headerName: "Subcategory Name",
            flex: 0.5,
        },
        {
            field: 'category',
            headerName: "Category",
            flex: 0.5,
            valueGetter: (params) => {
                return categories
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
    ]

    useEffect(() => {
        try {
            API.get(`/backoffice/subcategories?name=${search}`)
                .then((response) => {
                    setData(response.data.results)
                }).then(async () =>
                await API.get('/backoffice/categories/')
                    .then((response) => {
                        let resp_data = response.data.results
                        setCategories(resp_data);
                    })
            )
        } catch (error) {
            console.log(error);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    function singlePage(id) {
        navigate(`../subcategory/${id}`);
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

export default AllSubcategories;