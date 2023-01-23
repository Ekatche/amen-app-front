import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useAxios from "../../../utils/useAxios";
import {Box, Container} from "@mui/material";
import Header from "../Header/Header";
import {DataGrid, GridActionsCellItem, GridFooterContainer, GridPagination} from "@mui/x-data-grid";
import {RxUpdate} from "react-icons/rx";
import {AiFillDelete} from "react-icons/ai";
import DataGridCustomToolbar from "../ToolBar/CustomToolbar";
import Button from "@mui/material/Button";


export default function ViewOrder() {
    const API = useAxios();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    let {id} = useParams();
    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex: 0.2
        },
        {
            field: "product",
            headerName: "Products Name",
            flex: 1.2,
            valueGetter: (params) => `${params.row.product.name}`
        },
        {
            field: "quantity",
            headerName: "Quantity",
            flex: 0.4,
        },
        {
            field: "productPrice",
            headerName: "Price",
            flex: 0.5,
            valueGetter: (params) => `${Number(params.row.product.price).toFixed(2)} €`
        },
        {
            field: "totalDue",
            headerName: "Total",
            flex: 0.5,
            valueGetter: (params) => {
                const price = params.row.product.price
                const quantity = params.row.quantity
                const total = price * quantity
                return `${Number(total).toFixed(2)} €`
            }
        },
        {
            field: "actions",
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
                    icon={<AiFillDelete/>}
                    color={"error"}

                />
            ]
        }
    ]

    //function to get data

    const getOrderItems = async () => {
        //get order order_items using order_id
        await API.get(`backoffice/order-items/${id}/`)
            .then((res) => {
                setData(res.data);
            })
            .catch((e) => {
                console.log(e)
            })
    }

    //fetch data
    useEffect(() => {
        getOrderItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function singlePage(id) {
        navigate(`../order-item/${id}`);
    }

    return (
        <Box margin={"3rem"}>
            <Box>
                <Header title={`Order n°${id}`}/>
            </Box>
            <Container >
                <Box sx={{height: '63vh', width: 'auto', display: 'flex'}}>
                    <DataGrid columns={columns} rows={data}
                              rowsPerPageOptions={[10, 20, 30,100]}

                              components={
                                  {
                                      Toolbar: DataGridCustomToolbar,
                                      Footer: (() => (

                                          <GridFooterContainer>
                                              <Button
                                                  color={"primary"}
                                                  sx={{marginLeft: "1rem"}}
                                                  onClick={() => navigate("../orders")}
                                              >
                                                  Back to Orders
                                              </Button>
                                              <GridPagination/>
                                          </GridFooterContainer>
                                      ))
                                  }
                              }
                    />
                </Box>
            </Container>
        </Box>
    )
}