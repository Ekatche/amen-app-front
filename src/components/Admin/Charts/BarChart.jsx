import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useTheme} from "@mui/material";
import {tokens} from "../../../pages/Admin/themes";
import {useEffect, useState} from "react";
import useAxios from "../../../utils/useAxios";

const DataBarChart = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState();
    const API = useAxios();


    const getData = async () => {
        await API.get(`/backoffice/get-data/products/`)
            .then((response) => {
                setData(response.data);
            }).catch((error) => {
                console.log(error);
            })
    };


    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart width={730} height={250} data={data}
            margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"/>
                <YAxis yAxisId="left" orientation="left"
                       stroke="#8884d8" padding={{top:10}}
                />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" padding={{top:10}} />
                <Tooltip contentStyle={theme.palette.mode ==="dark" ?
                    {"backgroundColor":colors.primary["500"]}
                    :
                    {"backgroundColor":colors.grey["900"]}}/>
                <Legend/>
                <Bar yAxisId="left" dataKey="quantity_sold" fill="#8884d8" barSize={4}/>
                <Bar yAxisId="right" dataKey="total_revenue" fill="#82ca9d" barSize={4}/>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default DataBarChart;