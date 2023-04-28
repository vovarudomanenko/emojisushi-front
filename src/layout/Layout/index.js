import {Header} from "../Header";
import {Container} from "../../components/Container";
import {Footer} from "../Footer";
import {Banner} from "../Banner";
import {Sidebar} from "../Sidebar";
import * as S from "./styled";
import {RestaurantClosed} from "../../components/modals/RestaurantClosed";
import {Preloader} from "../Preloader";
import {inject, observer} from "mobx-react";
import {SpotsModal} from "../../components/modals/SpotsModal";
import {isClosed} from "../../utils/time.utils";
import {useLocation, useWindowScroll} from "react-use";
import {CartModal} from "../../components/modals/CartModal";
import {TinyCartButton} from "../../components/TinyCartButton";
import {Sticky} from "../../components/Sticky";
import {StickyToTopBtn} from "../../components/StickyToTopBtn";
import {useEffect} from "react";

export const LayoutRaw = (
    {
        children,
        withBanner = false,
        withSidebar = true,
        withRestaurantClosedModal = true,
        withSpotsModal = true,
        mainProps = {},
        containerProps = {},
        AppStore: {
            loading,
        },
        ProductsStore,
        CartStore,
        SpotsStore,
        ...rest
    }) => {
    const {x, y} = useWindowScroll();
    const location = useLocation();

    const showStickyCart = y > 100;

    const closed = isClosed({
        start: [10, 0],
        end: [21, 45],
    });

    useEffect(() => {
        ProductsStore.clearSearch();
    }, [location.pathname])

    return (
      <S.Layout {...rest}>
        {loading && <Preloader />}
        <Header />
        <S.Main {...mainProps}>
          <Container {...containerProps}>
            {withBanner && <Banner />}
            <S.FlexBox>
              {withSidebar && <Sidebar />}
              <S.Content>{children}</S.Content>
            </S.FlexBox>
          </Container>
        </S.Main>
        <Footer />
        {withRestaurantClosedModal && <RestaurantClosed open={closed} />}
        {withSpotsModal && (
          <SpotsModal open={!SpotsStore.userSelectedSpot && !closed} />
        )}

        <Sticky top={"30px"} right={"30px"} show={showStickyCart}>
          <CartModal>
            <div>
              <TinyCartButton price={CartStore.total} />
            </div>
          </CartModal>
        </Sticky>
        <StickyToTopBtn />
      </S.Layout>
    );
}

export const Layout = inject('AppStore', 'CartStore', 'SpotsStore', 'ProductsStore')(observer(LayoutRaw));