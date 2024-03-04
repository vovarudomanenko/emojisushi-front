import * as S from "./styled";
import { ButtonDark, NavLink, Container } from "~components";
import { useTranslation } from "react-i18next";
import { Outlet, useMatches, useNavigate } from "react-router-dom";
import { AuthLoader, useLogout } from "~hooks/use-auth";
import { queryClient } from "~query-client";
import { cartQuery, wishlistsQuery } from "~queries";
import { ROUTES } from "~routes";
import { Page } from "~components/Page";

const CabinetLayout = () => {
  const { t } = useTranslation();
  const matches = useMatches();
  const match = matches[matches.length - 1];
  const logout = useLogout();
  const navigate = useNavigate();

  return (
    <Page>
      <Container>
        <S.Wrapper>
          <S.LeftSide>
            <S.Cabinet>
              <S.Container>
                <S.Navbar>
                  <S.NavbarHeader>{t("account.cabinet")}</S.NavbarHeader>
                  <S.HorizontalBar />
                  <NavLink to={ROUTES.ACCOUNT.PROFILE.path}>
                    {t("account.profile.title")}
                  </NavLink>
                  <NavLink to={ROUTES.ACCOUNT.ORDER.path}>
                    {t("account.orders.title")}
                  </NavLink>
                  <NavLink to={ROUTES.ACCOUNT.PASSWORD_RECOVERY.path}>
                    {t("account.changePassword.title")}
                  </NavLink>
                  <NavLink to={ROUTES.ACCOUNT.SAVED_ADDRESSES.path}>
                    {t("account.addresses.title")}
                  </NavLink>
                  <div style={{ marginTop: "10px" }}>
                    <ButtonDark
                      onClick={async () => {
                        logout.mutate({});
                        queryClient.invalidateQueries(wishlistsQuery.queryKey);
                        queryClient.invalidateQueries(cartQuery.queryKey);
                        navigate(ROUTES.CATEGORY.path);
                      }}
                      minWidth={"201px"}
                    >
                      {t("common.logout")}
                    </ButtonDark>
                  </div>
                </S.Navbar>
              </S.Container>
            </S.Cabinet>
          </S.LeftSide>

          <S.RightSide>
            <S.Heading>{(match.handle as any)?.title()}</S.Heading>
            <AuthLoader
              renderLoading={() => <div>...loading user</div>}
              renderUnauthenticated={() => {
                return <div>not logged in</div>;
              }}
            >
              <Outlet />
            </AuthLoader>
          </S.RightSide>
        </S.Wrapper>
      </Container>
    </Page>
  );
};

export const Component = CabinetLayout;

Object.assign(Component, {
  displayName: "LazyCabinetLayout",
});
