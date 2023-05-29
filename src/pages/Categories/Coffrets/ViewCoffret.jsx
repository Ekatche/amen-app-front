import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../utils/useAxios";
import styled from "styled-components";
import React from "react";
import SingleProductPage from "../../SingleProduct.jsx";

const Container = styled.div``;

const initalDetails = {
  name: "",
  price: "",
  category: "",
};

export const ViewCoffret = () => {
  const API = useAxios();
  const [data, setData] = useState(initalDetails);
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      await API.get(`/product/${id}/`)
        .then((response) => {
          setData(response.data[0]);
          console.log(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getProduct();

    return () => {
      // this now gets called when the component unmounts
      console.log(" Single data fetched");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <SingleProductPage data={data} key={data.id}/>
    </Container>
  );
};
