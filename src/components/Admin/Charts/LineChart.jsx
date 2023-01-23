import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import useAxios from "../../../utils/useAxios";
import {useTheme} from "@mui/material";
import {tokens} from "../../../pages/Admin/themes";
import {useEffect, useState} from "react";

const DataLineChart = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState();
    const API = useAxios();

    const getData = async () => {
        await API.get(`/backoffice/get-data/counts/`)
            .then((response) => {
                setData(response.data);
                console.log(response.data)
            }).catch((error) => {
                console.log(error);
            })

    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="total_order" stroke="#8884d8" activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="total_quantity_sold" stroke={colors.greenAccent[200]} activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="avg_order_amount" stroke={colors.redAccent[200]} activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" activeDot={{r: 8}}/>
            </LineChart>
        </ResponsiveContainer>
    )

}

export default DataLineChart;