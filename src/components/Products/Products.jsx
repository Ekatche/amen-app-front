import Product from "./Product";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({products, singlePage}) => {
  return (
    <Container>
      {products.map((item) => (
        <Product item={item} key={item.id} singlePage={singlePage}/>
      ))}
    </Container>
  );
};

export default Products;