import {Layout} from "../../layout/Layout";
import {ProductsGrid} from "../../components/ProductsGrid";
import {inject, observer} from "mobx-react";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {productsService} from "../../services/products.service";

export const WishlistRaw = (
    {
        ProductsStore,
        AppStore
    }
) => {
    useEffect(() => {
        AppStore.setLoading(true);
        productsService.fetchItems({
            limit: ProductsStore.step,
            wishlist: true,
        }).then(() => {
            AppStore.setLoading(false);
        });
    }, [])

    const {t} = useTranslation();

    const handleLoadMore = () => {
        const settings = {
            limit: ProductsStore.items.length + ProductsStore.step,
            wishlist: true,
        }
        productsService.fetchItems(settings);
    }

    return (
        <Layout withBanner={false}>
            <ProductsGrid
                loadable={ProductsStore.total > ProductsStore.items.length}
                loading={ProductsStore.loading}
                items={ProductsStore.items}
                handleLoadMore={handleLoadMore}
                title={t('common.favorite')}
            />
        </Layout>
    );
}

export const Wishlist = inject('ProductsStore', 'AppStore')(observer(WishlistRaw))
