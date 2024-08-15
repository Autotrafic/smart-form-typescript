import styled from "styled-components";
import { colors } from "../../../utils/constants";
import Product from "./Product";
import { useState } from "react";

const Container = styled.div`
  margin: 1.5em 0;
  width: 100%;
  height: 340px;
  padding: 1em 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  align-items: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  @media (min-width: 520px) {
    padding: 1em 1.8em;
    gap: 1em;
  }

  @media (min-width: 390px) {
    gap: 1em;
    max-height: 210px;
  }

  @media (min-width: 367px) {
    height: 300px;
  }
`;

const Title = styled.span`
  font-size: 18px;
  max-height: 50px;
  color: ${colors.primaryColor};
  text-align: center;
  font-weight: 600;
  flex: 1;

  @media (min-width: 390px) {
    max-height: 30px;
  }
`;

const ProductsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.3em;
  flex: 5;

  @media (min-width: 390px) {
    gap: 1.5em;
    flex-direction: row;
    gap: 0.5em;
  }
`;

function CrossSelling({ handleProduct, setCrossSelected, ...props }) {
  const products = [
    {
      title: "Añadir informe DGT",
      description: "¡Conoce las cargas y el historial del vehículo!",
      price: 12.95,
      type: 1,
      id: "informeDgt",
    },
    {
      title: "Añadir etiqueta medioambiental",
      image:
        "https://www.autofacil.es/wp-content/uploads/2020/12/etiquetac.jpg",
      price: 6.95,
      type: 2,
      id: "etiquetaMedioambiental",
    },
  ];

  return (
    <Container>
      <Title>Te recomendamos que añadas:</Title>
      <ProductsContainer>
        {products.map((product) => (
          <Product
            key={product.title}
            title={product.title}
            description={product?.description}
            image={product?.image}
            price={product.price}
            handleProduct={handleProduct}
            handleSelect={(selected) =>
              setCrossSelected((prev) => ({ ...prev, [product.id]: selected }))
            }
            {...props}
          />
        ))}
      </ProductsContainer>
    </Container>
  );
}

export default CrossSelling;
