import {Box, IconButton, useTheme} from "@mui/material";
import {useContext} from "react";
import {ColorModeContext} from "./themes";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const Topbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext)
    return (
        <Box display={"flex"} justifyContent={"right"} p={2}>
            {/*    Icons */}
            <Box display={"flex"}>
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'light' ?
                        <DarkModeOutlinedIcon/> :
                        <LightModeOutlinedIcon/>
                    }
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon/>
                </IconButton>
            </Box>
        </Box>
    )
};

export default Topbar;