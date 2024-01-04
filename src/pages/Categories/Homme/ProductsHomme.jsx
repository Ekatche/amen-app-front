import { useEffect, useState } from "react";
import useAxios from "../../../utils/useAxios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Products from "../../../components/Products/Products";
import DropdownFilter from "../../../components/Products/ProductFilters";
import { mobile } from "../../responsive";

// Page container

const Container = styled.div`
  padding: 20px;
  margin: 0 12em 0 12em;
`;

const PageContainer = styled.div`
  /* display: flex; */
`;

// text elements
const Title = styled.h1`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const FilterHeader = styled.span`
  font-size: 15px;
  font-weight: normal;
  ${mobile({ marginRight: "0px" })}
`;

// filter container
const MainContent = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-around;
  width: 100%;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: start;
  padding: 10px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterDropDown = styled.div`
  margin: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const FilterSection = styled.div`
  margin: 20px;
  width: 100%;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;
// div pour les header des filtres
const FilterOptions = styled.div`
  flex-wrap: nowrap;
  text-align: center;
`;

export default function ProduitsHommes() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  let navigate = useNavigate();
  const API = useAxios();

  useEffect(() => {
    try {
      API.get("/product/", {
        category_name: "Homme",
      }).then((response) => {
        setData(response.data.results);
        console.log(response.data.results);
      });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = [
    { value: "nouveautées", label: "Nouveautées" },
    { value: "parfums", label: "Parfums" },
    { value: "deodorants", label: "Déodorants" },
  ];

  const collections = [
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
    { value: "yellow", label: "Yellow" },
    { value: "orange", label: "Orange" },
    { value: "pink", label: "Pink" },
    { value: "purple", label: "Purple" },
  ];

  const sensation = [
    { value: "hespéridés", label: "Hespéridés" },
    { value: "fleuries", label: "Fleuries" },
    { value: "boisés", label: "Boisés" },
    { value: "chyprés", label: "Chyprés" },
    { value: "aromatiques", label: "Aromatiques" },
  ];

  const fragrance = [
    { value: "eaudetoilette", label: "Eau de Toilette" },
    { value: "eaudeparfum", label: "Eau de Parfum" },
    { value: "eaudecologne", label: "Eau de cologne" },
    { value: "eauete", label: "Eau d'été" },
    { value: "parfum", label: "Parfums" },
  ];

  const contenance = [
    { value: "50ml", label: "50 ml" },
    { value: "80 ml", label: "80 ml" },
    { value: "100ml", label: "100 ml" },
    { value: "150ml", label: "150 ml" },
  ];

  const order = [
    { value: "new", label: "Newest" },
    { value: "price(desc)", label: "Price (desc)" },
    { value: "price(asc)", label: "Price (asc)" },
    { value: "onpromo", label: "Promotion" },
  ];

  function singlePage(id) {
    navigate(`../homme/${id}`);
  }

  return (
    <Container>
      <Title> Parfums hommes </Title>
      <PageContainer>
        <FilterContainer>
          <FilterSection>
            <FilterText> Filtres </FilterText>
            <MainContent>

              <FilterDropDown>
                <FilterHeader> Collections </FilterHeader>

                <DropdownFilter
                  isMulti
                  placeholder="Select..."
                  options={collections}
                  onChange={(value) => console.log(value)}
                />
              </FilterDropDown>
              <FilterDropDown>
                <FilterHeader> Univers olfactifs </FilterHeader>
                <DropdownFilter
                  isMulti
                  placeholder="Select..."
                  options={sensation}
                  onChange={(value) => console.log(value)}
                />
              </FilterDropDown>
              <FilterDropDown>
                <FilterHeader> Fragrance </FilterHeader>
                <DropdownFilter
                  isMulti
                  placeholder="Select..."
                  options={fragrance}
                  onChange={(value) => console.log(value)}
                />
              </FilterDropDown>
              <FilterDropDown>
                <FilterHeader> Contenance </FilterHeader>
                <DropdownFilter
                  isMulti
                  placeholder="Select..."
                  options={contenance}
                  onChange={(value) => console.log(value)}
                />
              </FilterDropDown>
              <FilterDropDown>
                <FilterHeader> Sort Products </FilterHeader>

                <DropdownFilter
                  placeholder="Select..."
                  options={order}
                  onChange={(value) => console.log(value)}
                />
              </FilterDropDown>
            </MainContent>
          </FilterSection>
        </FilterContainer>
        <Products products={data} singlePage={singlePage} />
      </PageContainer>
    </Container>
  );
}
