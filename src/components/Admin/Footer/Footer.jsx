import {GridFooterContainer} from "@mui/x-data-grid";
import {FcNext, FcPrevious} from "react-icons/fc";
import useAxios from "../../../utils/useAxios";
import Button from '@mui/material/Button';
import {Box, Typography} from "@mui/material";


function DataGridCustomFooter({setNextUrl, setPrevUrl, setData, nextUrl, prevUrl, page, setPage}) {
    const API = useAxios();

    const paginationHandler = (url) => {
        console.log(url)
        try {
            API.get(url)
                .then((response) => {
                    setNextUrl(response.data.next);
                    setPrevUrl(response.data.previous);
                    setData(response.data.results);
                })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <GridFooterContainer>
            <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}>
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}>
                    {
                        prevUrl ?
                            <Button
                                color="secondary"
                                outline
                                onClick={() => {
                                    paginationHandler(prevUrl);
                                    setPage(count => count - 1)
                                }}>
                                <FcPrevious className="addButton"/>
                            </Button> :
                            null
                    }
                </Box>
                <Box>
                    <Typography>
                        Page : {page}
                    </Typography>
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    {
                        nextUrl ?
                            <Button
                                color="secondary"
                                outline
                                onClick={() => {
                                    paginationHandler(nextUrl);
                                    setPage(count => count + 1)
                                }}
                            >
                                <FcNext className="addButton"/>
                            </Button> :
                            null
                    }
                </Box>
            </Box>
        </GridFooterContainer>
    )
}

export default DataGridCustomFooter;
