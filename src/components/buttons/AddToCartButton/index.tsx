import { ButtonCounter, ButtonOutline } from "~components";
import { useTranslation } from "react-i18next";
import { forwardRef } from "react";

type AddToCartButtonProps = {
  loading: boolean;
  count: number;
  handleAdd: (count: number) => void;
  submitting: boolean;
};

export const AddToCartButton = forwardRef<
  HTMLButtonElement,
  AddToCartButtonProps
>(({ count, handleAdd, loading = false, submitting = false }, ref) => {
  const { t } = useTranslation();

  if (count) {
    return (
      <ButtonCounter
        ref={ref}
        handleIncrement={() => {
          handleAdd(1);
        }}
        handleDecrement={() => {
          handleAdd(-1);
        }}
        count={count}
      />
    );
  }
  return (
    <ButtonOutline
      ref={ref}
      loading={loading}
      submitting={submitting}
      onClick={() => {
        handleAdd(1);
      }}
    >
      {t("order.order_btn")}
    </ButtonOutline>
  );
});
