import React from "react";
import NiceModal from "@ebay/nice-modal-react";
import { useModal } from "~modal";
import { BaseModal, Price, SkeletonWrap, SvgIcon } from "~components";
import * as S from "./styled";
import { useTheme } from "styled-components";
import { Times } from "~assets/ui-icons";
import MyCounter from "~components/MyCounter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  cartQuery,
  DEFAULT_PRODUCTS_LIMIT,
  PRODUCT_ID_SEARCH_QUERY_PARAM,
  productsQuery,
} from "~queries";
import Skeleton from "react-loading-skeleton";
import { CartProduct, Product } from "~models";
import { useUpdateProduct } from "~hooks/use-update-product";
import { useAddProduct } from "~hooks/use-add-product";
import { findInCart } from "~components/ProductCard/utils";
import { useTranslation } from "react-i18next";
import { CategorySlug } from "~domains/category/constants";

export const ProductModal = NiceModal.create(() => {
  const modal = useModal();
  const theme = useTheme();

  const { t } = useTranslation();

  const overlayStyles = {
    zIndex: theme.zIndices.modals,
    background: "rgba(0, 0, 0, 0.4)",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  };

  const [searchParams] = useSearchParams();

  const { data, isLoading } = useQuery(
    productsQuery({
      category_slug: CategorySlug.Menu,
      limit: DEFAULT_PRODUCTS_LIMIT,
    })
  );

  const { data: cart } = useQuery(cartQuery);

  const navigate = useNavigate();

  const closeModal = () => {
    modal.remove();
    searchParams.delete(PRODUCT_ID_SEARCH_QUERY_PARAM);
    navigate({ search: searchParams.toString() });
  };

  const productRaw = (data?.data || []).find((products) => {
    return products.id === +searchParams.get(PRODUCT_ID_SEARCH_QUERY_PARAM);
  });
  const product = productRaw && new Product(productRaw);

  const oldPrice = product?.getOldPrice(undefined)?.price_formatted;
  const newPrice = product?.getNewPrice(undefined)?.price_formatted;

  const { mutate: updateProductQuantity } = useUpdateProduct();
  const { mutate: addProductToCart } = useAddProduct();

  const cartProducts = cart?.data.map((json) => new CartProduct(json)) || [];

  const cartProduct = product && findInCart(cartProducts, product, undefined);

  const count = cartProduct?.quantity || 0;

  const handleQuantityUpdate = (quantity: number) => {
    if (count) {
      updateProductQuantity({
        product: product,
        quantity: quantity,
      });
    } else {
      addProductToCart({
        product: product,
        quantity: quantity,
      });
    }
  };

  return (
    <BaseModal
      overlayStyles={overlayStyles}
      open={modal.visible}
      onClose={closeModal}
    >
      {() => (
        <S.Wrapper>
          <S.CloseIcon>
            <SvgIcon
              onClick={closeModal}
              color={"white"}
              hoverColor={theme.colors.brand}
              style={{
                cursor: "pointer",
                width: 35,
              }}
            >
              <Times />
            </SvgIcon>
          </S.CloseIcon>
          <S.TopWrapper>
            <SkeletonWrap loading={isLoading}>
              <S.Image
                style={{
                  backgroundImage: `url("${product?.mainImage}")`,
                }}
              />
            </SkeletonWrap>
            <S.DescriptionWrapper>
              <S.ProductName>{product?.name || <Skeleton />}</S.ProductName>
              <S.Description>
                {product?.descriptionShort != null ? (
                  product.descriptionShort
                ) : (
                  <Skeleton />
                )}
              </S.Description>
              <S.ProductPrice>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <Price newPrice={newPrice} oldPrice={oldPrice} />
                )}
              </S.ProductPrice>
            </S.DescriptionWrapper>
          </S.TopWrapper>
          <S.BotWrapper>
            <SkeletonWrap loading={isLoading}>
              {count ? (
                <MyCounter
                  count={count}
                  handleIncrement={() => handleQuantityUpdate(1)}
                  handleDecrement={() => handleQuantityUpdate(-1)}
                />
              ) : (
                <S.CartButton onClick={() => handleQuantityUpdate(1)}>
                  {t("order.modal_order_btn")}
                </S.CartButton>
              )}
            </SkeletonWrap>
          </S.BotWrapper>
        </S.Wrapper>
      )}
    </BaseModal>
  );
});
