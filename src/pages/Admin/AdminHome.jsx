import {Navigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../context/AuthContext";
import {ColorModeContext, tokens, useMode} from "./themes";
import {Box, CssBaseline, ThemeProvider, Typography} from "@mui/material";
import Topbar from "./topbar";
import Header from "../../components/Admin/Header/Header";
import StatBox from "../../components/Admin/Charts/StatBox";
import SellIcon from '@mui/icons-material/Sell';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonIcon from '@mui/icons-material/Person';
import useAxios from "../../utils/useAxios";
import DataBarChart from "../../components/Admin/Charts/BarChart";
import DataLineChart from "../../components/Admin/Charts/LineChart";

const AdminHome = () => {
    const [data, setData] = useState([]);
    const {user} = useContext(AuthContext);
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const API = useAxios();

    const getStats = async () => {
        await API.get(`/backoffice/get-data/stats/`)
            .then((response) => {
                setData(response.data);
            }).catch((error) => {
                console.log(error);
            })
    };


    useEffect(() => {
        getStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Topbar/>
                <div>
                    <div className={"container"} style={{textAlign: "center"}}>
                        {user
                            ?
                            <Box m={"20px"}>
                                {/* Header */}
                                <Box display={"flex"}
                                     alignItems={"center"}
                                     flexDirection={"column"}
                                >
                                    <Header title={"DASHBOARD"} subtitle={"Welcome to the dashboard"}/>
                                </Box>
                                {/* GRID & CHART */}
                                <Box
                                    display="grid"
                                    gridTemplateColumns="repeat(12, 1fr)"
                                    gridAutoRows="140px"
                                    gap="20px"
                                >
                                    {/*  row 1 */}
                                    <Box
                                        gridColumn="span 4"
                                        backgroundColor={tokens(theme.palette.mode).primary[400]}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <StatBox
                                            title={data.map(e => {
                                                    return e.total_quantity_sold
                                                }
                                            )}
                                            subtitle="Product sold"
                                            increase="+14%"
                                            icon={
                                                <SellIcon
                                                    sx={{color: colors.greenAccent[600], fontSize: "26px"}}
                                                />
                                            }
                                        />

                                    </Box>
                                    <Box
                                        gridColumn="span 4"
                                        backgroundColor={colors.primary[400]}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <StatBox
                                            title={data.map(e => {
                                                    return e.revenue
                                                }
                                            )}
                                            subtitle="Revenue generated"
                                            progress="0.50"
                                            increase="+21%"
                                            icon={
                                                <PointOfSaleIcon
                                                    sx={{color: colors.greenAccent[600], fontSize: "26px"}}
                                                />
                                            }
                                        />
                                    </Box>
                                    <Box
                                        gridColumn="span 4"
                                        backgroundColor={colors.primary[400]}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <StatBox
                                            title={data.map(e => {
                                                    return e.clients
                                                }
                                            )}
                                            subtitle="Number of clients"
                                            progress="0.50"
                                            increase="+21%"
                                            icon={
                                                <PersonIcon
                                                    sx={{color: colors.greenAccent[600], fontSize: "26px"}}
                                                />
                                            }
                                        />
                                    </Box>
                                    {/*    ROW 2 */}
                                    <Box
                                        gridColumn="span 12"
                                        gridRow="span 3"
                                        backgroundColor={colors.primary[400]}
                                    >
                                        <Box
                                            mt="25px"
                                            p="0 30px"
                                            display="flex "
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Box>
                                                <Typography
                                                    variant="h5"
                                                    fontWeight="600"
                                                    color={colors.grey[100]}
                                                >
                                                    Sales per Products
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box height="350px" >
                                            <DataBarChart/>
                                        </Box>
                                    </Box>
                                    {/*    ROW 3 */}
                                    <Box
                                        gridColumn="span 12"
                                        gridRow="span 3"
                                        backgroundColor={colors.primary[400]}
                                    >
                                        <Box
                                            mt="25px"
                                            p="0 30px"
                                            display="flex "
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Box>
                                                <Typography
                                                    variant="h5"
                                                    fontWeight="600"
                                                    color={colors.grey[100]}
                                                >
                                                    Data per month
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box height="350px" >
                                            <DataLineChart/>
                                        </Box>
                                    </Box>

                                </Box>
                            </Box>
                            :
                            Navigate("/admin/login")
                        }
                    </div>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default AdminHome;

