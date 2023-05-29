import { useEffect, useState } from "react";
import useAxios from "../../../utils/useAxios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Products from "../../../components/Products/Products";
import {mobile} from "../../responsive"

const Container = styled.div`
  padding: 20px;
  margin: 0 12em 0 12em;
`;

const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

export default function ProduitsEnfants() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  let navigate = useNavigate();
  const API = useAxios();

  useEffect(() => {
    try {
      API.get("/product/", {
        category_name: "Enfants",
      }).then((response) => {
        setData(response.data.results);
        console.log(response.data.results);
      });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function singlePage(id) {
    navigate(`../femme/${id}`);
}

  return (
    <Container>
      <Title> Parfums Enfants </Title>
      <FilterContainer>
        <Filter>
          <FilterText> Filter Products:</FilterText>
          <Select>
            <Option disabled selected>
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText> Sort Products:</FilterText>
          <Select>
            <Option selected>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products products={data} singlePage={singlePage} />
    </Container>
  );
}
