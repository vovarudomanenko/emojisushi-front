import { DropdownPopover } from "../DropdownPopover";
import { SortOrderButton } from "../../buttons/SortOrderButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useProductsStore } from "~hooks/use-categories-store";

const SortingPopoverRaw = () => {
  const ProductsStore = useProductsStore();
  const initialSelectedIndex = ProductsStore.sortOptions.indexOf(
    ProductsStore.sort
  );
  const [selectedIndex, setSelectedIndex] = useState(
    initialSelectedIndex === -1 ? 0 : initialSelectedIndex
  );
  const { t } = useTranslation();
  return (
    <DropdownPopover
      asFlatArray={true}
      options={ProductsStore.sortOptions}
      resolveOptionName={({ option }) => {
        return t(`sort.${option}`);
      }}
      selectedIndex={selectedIndex}
      onSelect={({ option, index, close }) => {
        close();
        setSelectedIndex(index);
        ProductsStore.setSort(option);
        ProductsStore.fetchItems({
          ...ProductsStore.lastParams,
        });
      }}
    >
      {({ selectedOption }) => (
        <SortOrderButton text={t(`sort.${selectedOption}`)} />
      )}
    </DropdownPopover>
  );
};

export const SortingPopover = SortingPopoverRaw;
