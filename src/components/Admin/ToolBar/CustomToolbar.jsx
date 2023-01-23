import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import {Search} from "@mui/icons-material";
import {Box, IconButton, InputAdornment, TextField} from "@mui/material";
import AddButton from "./Addbutton";

function DataGridCustomToolbar({searchInput, setSearchInput, setSearch, name, url}) {

    return (
        <GridToolbarContainer>
            <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}>
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <GridToolbarColumnsButton/>
                    <GridToolbarFilterButton/>
                    <GridToolbarDensitySelector/>
                    <GridToolbarExport/>
                    {url ? <AddButton name={name} url={url}/> : null}


                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    { setSearch ?
                        <TextField
                        label={"Search..."}
                        sx={{mb: "0.5rem", width: "15rem"}}
                        onChange={(e) => setSearchInput(e.target.value)}
                        value={searchInput}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position={"end"}>
                                    <IconButton onClick={() => {
                                        setSearch(searchInput);
                                        setSearchInput('');
                                    }}>
                                        <Search/>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />:
                    null}
                </Box>
            </Box>
        </GridToolbarContainer>
    )
        ;
}

export default DataGridCustomToolbar;