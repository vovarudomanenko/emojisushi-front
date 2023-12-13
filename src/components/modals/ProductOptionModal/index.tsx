import * as S from "./styled";
import { Modal } from "../Modal";
import { Product } from "~models";
import { CheckboxFilter } from "~components/CheckboxFilter";
import { FlexBox } from "~components/FlexBox";
import { observer } from "mobx-react";
import { isObservable, makeAutoObservable } from "mobx";
import { useBreakpoint2 } from "~common/hooks";
import { MinusSvg, PlusSvg } from "~components/svg";
import { SvgIcon } from "~components/SvgIcon";
import { useState } from "react";

export type Props = {
  product?: Product;
  loading?: boolean;
  children: JSX.Element;
};

export const ProductOptionModal = ({ children }: Props) => {
  const { isMobile, isTablet } = useBreakpoint2();
  return (
    <Modal
      width={isMobile ? "100vw" : isTablet ? "100vw" : "620px"}
      render={() => <Content />}
    >
      {children}
    </Modal>
  );
};
class Store {
  activeFilterId: undefined | number = undefined;
  filters: Filter[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  setActiveFilterId(id: number | undefined) {
    this.activeFilterId = id;
  }
  setFilters(filters: Filter[]) {
    this.filters = filters;
  }
}
const store = new Store();
class Filter {
  id: undefined | number;
  title: string;
  store: Store;
  constructor(store: Store, id: undefined | number, title: string) {
    this.id = id;
    this.title = title;
    this.store = store;
    makeAutoObservable(this, {
      store: false,
    });
  }
  get isActive() {
    return this.id == this.store.activeFilterId;
  }
}
store.setFilters([
  new Filter(store, 1, "маленька"),
  new Filter(store, 2, "середня"),
  new Filter(store, 3, "велика"),
]);
const Content = observer(function ContentObserved() {
  const handleChange = (e) => {
    store.setActiveFilterId(e.target.value);
  };

  const [counter, setCounter] = useState(0);

  const increase = () => {
    setCounter((count) => count + 1);
  };

  const decrease = () => {
    if (counter > 0) {
      setCounter((count) => count - 1);
    }
  };

  return (
    <S.Wrapper>
      <S.TopContentWrapper>
        <S.Left>
          <img style={{ border: "1px black solid" }} />
        </S.Left>
        <S.Right>
          <S.Title>Піца 4 сири</S.Title>
          <S.Text style={{ paddingTop: "10px" }}>
            Інгредієнти: Соус білий, Сир моцарела, Сир Чеддр, Сир Дорблю, Сир
            Пармезан{" "}
          </S.Text>
          <S.Text style={{ paddingTop: "15px" }}>Розмір:</S.Text>
          <S.CheckBoxWrapper style={{ paddingTop: "5px" }}>
            {store.filters.map((filter) => (
              <CheckboxFilter
                value={filter.id}
                isChecked={() => {
                  console.log(isObservable(filter.isActive));
                  return filter.isActive;
                }}
                handleOnChange={handleChange}
              >
                {filter.title}
              </CheckboxFilter>
            ))}
          </S.CheckBoxWrapper>

          <FlexBox style={{ alignItems: "center", paddingTop: "15px" }}>
            <S.Text>Тісто:</S.Text>
          </FlexBox>

          <S.CheckBoxWrapper style={{ paddingTop: "5px" }}>
            <CheckboxFilter handleOnChange={handleChange}>Тонке</CheckboxFilter>
            <CheckboxFilter handleOnChange={handleChange}>
              Товсте
            </CheckboxFilter>
          </S.CheckBoxWrapper>
          <FlexBox style={{ alignItems: "center", paddingTop: "15px" }}>
            <S.Text>Тип бортику:</S.Text>
          </FlexBox>
          <S.CheckBoxWrapper style={{ paddingTop: "5px" }}>
            <CheckboxFilter handleOnChange={handleChange}>
              Сирний
            </CheckboxFilter>
            <CheckboxFilter handleOnChange={handleChange}>
              З сосисками
            </CheckboxFilter>
          </S.CheckBoxWrapper>
        </S.Right>
      </S.TopContentWrapper>

      <S.MidContentWrapper>
        <S.MediumTitle style={{ paddingTop: "30px", paddingBottom: "10px" }}>
          Додатки
        </S.MediumTitle>
        <S.ProductsGrid>
          <S.ProductCard>
            <S.ProductImg />
            <S.PhonePriceWrapper>
              <S.ProductName>Баварські ковбаски</S.ProductName>
              <S.ProductPriceWrapper>29 ₴</S.ProductPriceWrapper>
            </S.PhonePriceWrapper>

            <FlexBox style={{ justifyContent: "end" }}>
              <S.FilterButtonWrapper>
                <SvgIcon
                  color="#141414"
                  onClick={decrease}
                  width="20px"
                  height="20px"
                  clickable
                >
                  <MinusSvg />
                </SvgIcon>
                <S.CountGoods>{counter}</S.CountGoods>
                <SvgIcon
                  color="#141414"
                  onClick={increase}
                  width="20px"
                  height="20px"
                  clickable
                >
                  <PlusSvg />
                </SvgIcon>
              </S.FilterButtonWrapper>
            </FlexBox>
          </S.ProductCard>
        </S.ProductsGrid>
      </S.MidContentWrapper>

      <S.BotContentWrapper>
        <S.ButtonWrapper style={{ paddingBottom: "30px", paddingTop: "30px" }}>
          <S.RemoveButton>
            <SvgIcon clickable color="#6A6A6A">
              <MinusSvg />
            </SvgIcon>
          </S.RemoveButton>
          <S.Title>1</S.Title>
          <S.AddButton>
            <SvgIcon clickable>
              <PlusSvg />
            </SvgIcon>
          </S.AddButton>
        </S.ButtonWrapper>
        <S.AddToCartButton>До кошика</S.AddToCartButton>
        <S.PriceSum>189 ₴</S.PriceSum>
      </S.BotContentWrapper>
    </S.Wrapper>
  );
});
