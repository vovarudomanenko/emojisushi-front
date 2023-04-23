import * as S from "./styled";
import { BurgerSvg, UserSvg } from "~components/svg";
import {
  SvgButton,
  AuthModal,
  LanguageSelector,
  MobMenuModal,
  CartModal,
  SvgIcon,
  CartButton,
  TinyCartButton,
} from "~components";
import {
  Await,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Suspense } from "react";
import { AwaitedCart } from "~components/AwaitedCart";
import { LayoutRouteLoaderData } from "~layout/Layout";

export const Right = ({ loading = false }: { loading?: boolean }) => {
  const { lang, spotSlug, citySlug } = useParams();
  const { cart, user } = useRouteLoaderData("layout") as LayoutRouteLoaderData;
  const navigate = useNavigate();

  return (
    <S.Right>
      <S.LanguageSelectorContainer>
        <LanguageSelector loading={loading} />
      </S.LanguageSelectorContainer>

      <CartModal>
        <S.CartBtn>
          <Suspense
            fallback={<Skeleton width={170} height={40} borderRadius={10} />}
          >
            <Await resolve={cart}>
              <AwaitedCart>
                {({ price, quantity }) => (
                  <CartButton count={quantity} total={price} />
                )}
              </AwaitedCart>
            </Await>
          </Suspense>
        </S.CartBtn>
      </CartModal>

      <CartModal>
        <S.TinyCartBtn>
          <Suspense fallback={<Skeleton width={55} height={40} />}>
            <Await resolve={cart}>
              <AwaitedCart>
                {({ price }) => <TinyCartButton price={price} />}
              </AwaitedCart>
            </Await>
          </Suspense>
        </S.TinyCartBtn>
      </CartModal>

      <S.BurgerBtn>
        {loading ? (
          <Skeleton width={32} height={32} />
        ) : (
          <MobMenuModal>
            <SvgIcon width={"32px"} color={"white"}>
              <BurgerSvg />
            </SvgIcon>
          </MobMenuModal>
        )}
      </S.BurgerBtn>

      {user ? (
        loading ? (
          <Skeleton width={40} height={40} />
        ) : (
          <S.UserBtn
            onClick={() => {
              navigate(
                "/" + [lang, citySlug, spotSlug, "account", "profile"].join("/")
              );
            }}
          >
            <SvgButton>
              <SvgIcon clickable={true} width={"25px"} color={"black"}>
                <UserSvg />
              </SvgIcon>
            </SvgButton>
          </S.UserBtn>
        )
      ) : (
        <S.UserBtn>
          {loading ? (
            <Skeleton width={40} height={40} borderRadius={10} />
          ) : (
            <AuthModal>
              <SvgButton>
                <SvgIcon clickable={true} width={"25px"} color={"black"}>
                  <UserSvg />
                </SvgIcon>
              </SvgButton>
            </AuthModal>
          )}
        </S.UserBtn>
      )}
    </S.Right>
  );
};
