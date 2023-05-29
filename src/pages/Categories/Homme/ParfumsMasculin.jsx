import {useEffect, useState} from "react";
import useAxios from "../../../utils/useAxios";
import {useNavigate} from "react-router-dom";

export default function ParfumsMasculin() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(1);
    let navigate = useNavigate();
    const API = useAxios();

    useEffect(() => {
        try {
            API.get('/product/',
            {
                "category_name" : "Homme",
                "sub_category":"parfums_masculins",
            }
            )
                .then((response) => {
                    setData(response.data.results);
                    console.log(data);
                })
        } catch (error) {
            console.log(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

}