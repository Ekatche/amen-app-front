import {useEffect, useState} from "react";
import useAxios from "../../../utils/useAxios";
import {useNavigate} from "react-router-dom";
import {AiFillDelete} from "react-icons/ai";
import {RxUpdate} from 'react-icons/rx';
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {Box} from "@mui/material";
import Header from "../Header/Header";
import DataGridCustomToolbar from "../ToolBar/CustomToolbar";
import DataGridCustomFooter from "../Footer/Footer";

export default function AllCoupons() {

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(1);
    let navigate = useNavigate();
    let name = "Coupons";
    let url = "/admin/coupon/add";
    const API = useAxios();
    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");

    const deleteCoupon = async (id) => {
        await API.delete(`/backoffice/coupons/${id}`)
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
            headerName: "Coupon Name",
            flex: 0.7,
        },
        {
            field: "code",
            headerName: "Coupon Code",
            flex: 0.7,
        },
        {
            field: "discount",
            headerName: "Reduction",
            flex: 0.25,
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
                    color={"primary"}
                    icon={<RxUpdate/>}
                    onClick={() => singlePage(params.id)}
                />,
                <GridActionsCellItem
                    label={"Delete"}
                    color={"error"}
                    icon={<AiFillDelete/>}
                    onClick={() => deleteCoupon(params.id)}
                />
            ]
        }

    ]


    useEffect(() => {
        try {
            API.get('/backoffice/coupons/')
                .then((response) => {
                    setData(response.data.results);
                    setNextUrl(response.data.next);
                    setPrevUrl(response.data.previous);
                    setPage(1);
                })
        } catch (error) {
            console.log(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    function singlePage(id) {
        console.log("clicked");
        navigate(`../coupon/${id}`);
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
    // return (
    //     <div className="table-layout">
    //         <div>
    //             <h1 className="page-title">All Coupons</h1>
    //         </div>
    //         <div className="container">
    //             <Table>
    //                 <thead>
    //                     <tr>
    //                         <th>id</th>
    //                         <th>name</th>
    //                         <th>code</th>
    //                         <th>Discount</th>
    //                         <th>is active</th>
    //                         <th> Actions</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {
    //                         data.map((e) => (
    //                             <tr key={e.id}>
    //                                 <td>{e.id}</td>
    //                                 <td>{e.name}</td>
    //                                 <td>{e.code}</td>
    //                                 <td>{e.discount}</td>
    //                                 <td>{e.is_active ? "Yes" : "No"}</td>
    //                                 <td>
    //                                     <Button
    //                                         className="button"
    //                                         color="danger"
    //                                         outline
    //                                         size="sm"> <AiFillDelete /> Delete </Button>
    //                                     <Button
    //                                         color="primary"
    //                                         className="button"
    //                                         outline
    //                                         size="sm"
    //                                         onClick={() => singlePage(e.id)}
    //                                     > <RxUpdate /> Update </Button>
    //                                 </td>
    //                             </tr>
    //                         ))
    //                     }
    //                 </tbody>
    //             </Table>
    //         </div>
    //         <Button
    //             color="success"
    //             outline
    //             onClick={() => navigate("/admin/coupon/add")}
    //         >
    //             <GrAddCircle />
    //             Add New Coupon
    //         </Button>
    //     </div>
    // )
};

