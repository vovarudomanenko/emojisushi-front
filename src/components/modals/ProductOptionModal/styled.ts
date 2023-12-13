import styled from "styled-components";
import media from "../../../common/custom-media";

const Title = styled.div`
  text-transform: uppercase;
  font-size: 22px;
  font-weight: 600;
  color: #fff;
  line-height: normal;
  display: flex;
  align-items: center;
`;
const MediumTitle = styled.p`
  color: #fff;
  font-size: 17px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Wrapper = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.lessThan("tablet")`
        
    `}
`;
const TopContentWrapper = styled.div`
    display: flex;
    width: 540px;
    justify: content: center;
    ${media.lessThan("tablet")`
        flex-direction: column;
        align-items: center;
        width: 350px;
    `} 
`;
const Left = styled.div`
  width: 160px;
  height: 160px;
`;

const Right = styled.div`
  width: 350px;
  padding-left: 30px;
  box-sizing: border-box;
`;

const Text = styled.div`
  fonst-size: 14px;
  font-weight: 400;
  line-height: normal;
  color: #fff;
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  width: 350px;
`;

const MidContentWrapper = styled.div`
  ${media.lessThan("tablet")`
    width: 350px;
  `}
`;

const ProductsGrid = styled.div`
  width: 540px;
  height: 270px;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3);
  ${media.lessThan("tablet")`
        display: flex;
        flex-direction: column;
        width: 350px;
    `}
`;

const ProductCard = styled.div`
  border-radius: 15px;
  background: #272727;
  box-shadow: 0px 4px 15px 0px rgba(28, 28, 28, 0.3);
  margin-bottom: 10px;
  display: flex;
  width: 173px;
  height: 240px;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  ${media.lessThan("tablet")`
        flex-direction: row;
        width: 350px;
        height: 90px;
        
    `}
`;

const ProductImg = styled.img`
  width: 130px;
  height: 130px;
  ${media.lessThan("tablet")`
        width: 70px;
        height: 70px;
    `}
`;

const ProductName = styled.div`
  color: #fff;
  font-size: 15px;
  font-weight: 400;
  text-align: center;
  ${media.lessThan("tablet")`
        width: 117px;
        display: flex;
        justify-content: flex-start;
        text-align: left;
    `}
`;

const ProductPriceWrapper = styled.div`
  background: #202020;
  border-radius: 8px;
  padding: 5px;
  position: absolute;
  left: 120px;
  top: 10px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  height: 28px;
  width: auto;
  white-space: nowrap;
  ${media.lessThan("tablet")`
        background: none;
        position: static;
        padding: 5px 0px 0px 0px;
    `}
`;

const PhonePriceWrapper = styled.div`
  ${media.lessThan("tablet")`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
    `}
`;

const BotContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  ${media.lessThan("tablet")`
      width: 350px;
  `}
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 140px;
`;
const AddButton = styled.button`
  border-radius: 10px;
  border: 1px solid yellow;
  width: 40px;
  height: 40px;
  color: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RemoveButton = styled.button`
  border-radius: 10px;
  border: 1px solid #6a6a6a;
  width: 40px;
  height: 40px;
  color: yellow;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AddToCartButton = styled.button`
  display: flex;
  width: 540px;
  height: 50px;
  padding: 7px 10px;
  justify-content: center;
  align-items: center;
  background: var(--Yellow, #ffe600);
  border-radius: 10px;
  color: black;
  font-weight: 600;
  font-size: 15px;
  ${media.lessThan("tablet")`
      width: 350px;
  `}
`;

const PriceSum = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  position: absolute;
  top: 50px;
  right: 0px;
`;

const FilterButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #ffe600;
  border-radius: 10px;
  width: 113px;
  height: 34px;
`;
const CountGoods = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: #141414;
  user-select: none;
`;

export {
  Title,
  Wrapper,
  TopContentWrapper,
  Right,
  Left,
  Text,
  CheckBoxWrapper,
  MidContentWrapper,
  MediumTitle,
  ProductsGrid,
  ProductCard,
  ProductImg,
  ProductName,
  ProductPriceWrapper,
  BotContentWrapper,
  ButtonWrapper,
  RemoveButton,
  AddButton,
  AddToCartButton,
  PriceSum,
  PhonePriceWrapper,
  FilterButtonWrapper,
  CountGoods,
};
