import styled from "styled-components";
import { colors } from "../../../utils/constants";
import Checkbox from "../../core/design-system/Checkbox";

const ProductItem = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.5em;
  cursor: pointer;
`;

const CheckboxContainer = styled.div`
  width: 100%;
  height: 26px;
  display: flex;
  align-items: center;
`;

const ItemTitle = styled.span`
  display: inline-block;
  max-width: 100%;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: ${colors.black};
  white-space: normal;
  flex-grow: 1;
  text-align: center;
`;

const ItemDescription = styled.span`
  text-align: center;
  font-size: 14px;
  color: ${colors.black};
`;

const ItemImage = styled.img`
  width: 55px;
  height: auto;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.black};
`;

function Product({
  title,
  description,
  image,
  price,
  type,
  addedPrice,
  modifyPrice,
  handleSelect,
}) {
  const handlePrice = (e) => {
    if (e.target.checked) {
      handleSelect(true);
      modifyPrice((prevState) => prevState + price);
    } else if (!e.target.checked && addedPrice) {
      handleSelect(false);
      modifyPrice((prevState) => prevState - price);
    }
  };

  return (
    <ProductItem htmlFor={title}>
      <CheckboxContainer>
        <Checkbox id={title} onChange={handlePrice} />
        <ItemTitle $isOneLine={type === 1}>{title}</ItemTitle>
      </CheckboxContainer>
      {description && <ItemDescription>{description}</ItemDescription>}
      {image && <ItemImage src={image} />}
      <Price>{price} €</Price>
    </ProductItem>
  );
}

export default Product;
