import { ProductsGrid } from "~components/ProductsGrid";
import { observer } from "mobx-react";
import { Navigate, useParams } from "react-router-dom";
import { useProductsStore } from "~hooks/use-categories-store";
import { ProductsStore } from "~stores";
import { toJS } from "mobx";
import { useCategoriesStore, useSpot } from "~hooks";
import { FlexBox } from "~components/FlexBox";
import { Banner } from "./Banner";
import { useIsDesktop } from "~common/hooks/useBreakpoint";
import { Sidebar } from "~pages/Category/Sidebar";

export const Category = observer(() => {
  const ProductsStore = useProductsStore();
  const { categorySlug } = useParams();
  const categories = useCategoriesStore().publishedCategories;
  const selectedCategory = categories.find((category) => {
    return category.slug === categorySlug;
  });
  const title = selectedCategory?.name;
  const isDesktop = useIsDesktop();
  const selectedSpot = useSpot();

  const handleLoadMore = () => {
    const settings = {
      limit: ProductsStore.items.length + ProductsStore.step,
      category_slug: categorySlug,
    };
    ProductsStore.fetchItems(settings);
  };

  if (!categories.length) {
    return <>...no categories</>;
  }

  if (!selectedCategory && categories.length > 0) {
    return <Navigate to={categories[0].slug} />;
  }

  return (
    <>
      {false && <Banner />}
      <FlexBox flexDirection={isDesktop ? "row" : "column"}>
        <Sidebar />
        <ProductsGrid
          handleLoadMore={handleLoadMore}
          title={title}
          loadable={ProductsStore.total > ProductsStore.items.length}
          loading={ProductsStore.loading}
          items={ProductsStore.items.filter(
            (product) => !product.isHiddenInSpot(selectedSpot)
          )}
        />
      </FlexBox>
    </>
  );
});

export const Component = Category;

Object.assign(Component, {
  displayName: "LazyCategoryPage",
});

export const loader = async ({ params }) => {
  await ProductsStore.fetchItems({
    category_slug: params.categorySlug,
    limit: ProductsStore.step,
    spot_id_or_slug: params.spotSlug,
  });

  return {
    products: toJS(ProductsStore.items),
  };
};
