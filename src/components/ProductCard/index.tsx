import * as S from "./styled";
import { EqualHeightElement } from "react-equal-height";
import { useMemo, useState } from "react";
import { CartProduct, Product, Variant } from "~models";
import {
  Image,
  Weight,
  Modificators,
  Ingredients,
  FavoriteButton,
  Name,
} from "./components";
import { findInCart } from "./utils";
import { Price } from "~components/Price";
import { AddToCartButton, Button } from "~components/buttons";
import { useMutation } from "@tanstack/react-query";
import { cartApi } from "~api";
import { queryClient } from "~query-client";
import { cartQuery } from "~queries";
import { ICartProduct, IGetCartRes, IGetWishlistRes } from "~api/types";
import { formatUAHPrice } from "~utils/price.utils";
import { arrImmutableReplaceAt, arrImmutableDeleteAt } from "~utils/arr.utils";
import { ProductOptionModal } from "~components/modals/ProductOptionModal";

export type TProductCardProps = {
  product?: Product;
  loading?: boolean;
  cart?: IGetCartRes;
  wishlists?: IGetWishlistRes;
};

export const ProductCard = ({
  product,
  loading = false,
  cart,
  wishlists,
}: TProductCardProps) => {
  const cartProducts = cart?.data.map((json) => new CartProduct(json)) || [];

  const initialModificatorsState = product?.modGroups.reduce((acc, group) => {
    return {
      ...acc,
      [group.property.id]: +group.property.options[0].poster_id,
    };
  }, {});

  const [modificators, setModificators] = useState(initialModificatorsState);

  const getVariant = (product: Product) => {
    return product?.variants.find((variant) => {
      return !!Object.values(modificators).includes(variant.posterId);
    });
  };

  const variant = useMemo(() => getVariant(product), [product, modificators]);

  const cartProduct = useMemo(
    () => (product ? findInCart(cartProducts, product, variant) : undefined),
    [product, variant]
  );

  const favorite = product?.isInWishlists(wishlists || []);

  const oldPrice = product?.getOldPrice(variant)?.price_formatted;
  const newPrice = product?.getNewPrice(variant)?.price_formatted;

  const mutation = useMutation({
    mutationFn: ({
      product,
      quantity,
      variant,
    }: {
      product: Product;
      quantity: number;
      variant?: Variant;
    }) => {
      return cartApi.addProduct({
        product_id: product.id,
        quantity,
        variant_id: variant?.id,
      });
    },
    onMutate: async ({ product, variant, quantity }) => {
      await queryClient.cancelQueries(cartQuery);

      const previousCart = queryClient.getQueryData(cartQuery.queryKey);

      queryClient.setQueryData(cartQuery.queryKey, (old: IGetCartRes) => {
        const cartProduct = old.data.find(
          (cartProduct) =>
            cartProduct.product.id === product.id &&
            (!variant || variant.id === cartProduct.variant.id)
        );

        if (cartProduct) {
          const index = old.data.indexOf(cartProduct);
          const optimisticQuantity = cartProduct.quantity + quantity;

          if (optimisticQuantity > 0) {
            const optimisticCartProduct = {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
            const optimisticCartProducts = arrImmutableReplaceAt(
              old.data,
              index,
              optimisticCartProduct
            );
            const optimisticTotal = optimisticCartProducts.reduce(
              (acc, cartProduct: ICartProduct) => {
                return (
                  acc + (cartProduct.quantity * cartProduct.price.UAH) / 100
                );
              },
              0
            );

            return {
              ...old,
              data: optimisticCartProducts,
              total: formatUAHPrice(optimisticTotal),
              totalQuantity: optimisticCartProducts.reduce(
                (acc, item: ICartProduct) => acc + item.quantity,
                0
              ),
            };
          } else {
            const optimisticCartProducts = arrImmutableDeleteAt(
              old.data,
              index
            );
            const optimisticTotal = optimisticCartProducts.reduce(
              (acc, cartProduct: ICartProduct) => {
                return (
                  acc + (cartProduct.quantity * cartProduct.price.UAH) / 100
                );
              },
              0
            );

            return {
              ...old,
              data: optimisticCartProducts,
              total: formatUAHPrice(optimisticTotal),
              totalQuantity: optimisticCartProducts.reduce(
                (acc, item: ICartProduct) => acc + item.quantity,
                0
              ),
            };
          }
        }

        const optimisticCartProduct = {
          product: product.json,
          product_id: product.id,
          variant: variant,
          variant_id: variant?.id,
          quantity: quantity,
          weight: product.weight,
          price: {
            UAH: product.getNewPrice(variant).price,
          },
        };

        const optimisticCartProducts = [...old.data, optimisticCartProduct];

        const optimisticTotal = optimisticCartProducts.reduce(
          (acc, cartProduct: ICartProduct) => {
            return acc + (cartProduct.quantity * cartProduct.price.UAH) / 100;
          },
          0
        );

        return {
          ...old,
          data: [...old.data, optimisticCartProduct],
          total: formatUAHPrice(optimisticTotal),
          totalQuantity: optimisticCartProducts.reduce(
            (acc, item: ICartProduct) => acc + item.quantity,
            0
          ),
        };
      });

      return {
        previousCart,
      };
    },
    onError: (err, newCartProduct, context) => {
      queryClient.setQueryData(cartQuery.queryKey, context.previousCart);
    },
  });

  const handleAdd = async (quantity: number) => {
    mutation.mutate({
      variant: variant,
      product: product,
      quantity: quantity,
    });
  };

  return (
    <S.Wrapper>
      <FavoriteButton
        loading={loading}
        cartProduct={cartProduct}
        product={product}
        favorite={favorite}
      />
      <Image product={product} loading={loading} />

      <EqualHeightElement name={"product-name"}>
        <Name loading={loading} product={product} />
        <Modificators
          loading={loading}
          product={product}
          modificators={modificators}
          setModificators={setModificators}
        />
      </EqualHeightElement>
      <EqualHeightElement name={"description"}>
        <S.Description>
          <Weight product={product} loading={loading} />
          <Ingredients product={product} loading={loading} />
        </S.Description>
      </EqualHeightElement>

      <S.Footer>
        <Price loading={loading} oldPrice={oldPrice} newPrice={newPrice} />
        <ProductOptionModal>
          <div>
            <AddToCartButton
              submitting={false}
              loading={loading}
              count={cartProduct?.quantity || 0}
              handleAdd={handleAdd}
            />
          </div>
        </ProductOptionModal>
      </S.Footer>
    </S.Wrapper>
  );
};
