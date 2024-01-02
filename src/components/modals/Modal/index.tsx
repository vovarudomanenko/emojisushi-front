import { BaseModal, IBaseModalProps } from "~components";
import * as S from "./styled";
import { CloseModalIcon } from "~components";
import { ReactNode } from "react";
import { IAlignItems, IJustifyContent } from "~components/FlexBox";

export type IModalProps = {
  alignItems?: IAlignItems;
  justifyContent?: IJustifyContent;
  render: (props: { close: () => void }) => ReactNode;
  width?: string;
  closable?: boolean;
  alignCenter?: boolean;
} & Omit<IBaseModalProps, "overlayStyles" | "render">;

export const Modal = ({
  children,
  alignItems = "center",
  justifyContent = "center",
  render,
  width,
  alignCenter,
  closable,
  ...rest
}: IModalProps) => {
  const overlayStyles = {
    display: "grid",
    justifyContent,
    alignItems,
    background: "rgba(0, 0, 0, 0.4)",
    zIndex: 999999,
  };
  return (
    <BaseModal
      closable={closable}
      overlayStyles={overlayStyles}
      render={({ close }) => (
        <S.Container width={width} alignCenter={alignCenter}>
          {closable && (
            <S.CloseIcon>
              <CloseModalIcon close={close} />
            </S.CloseIcon>
          )}

          {render({ close })}
        </S.Container>
      )}
      {...rest}
    >
      {children}
    </BaseModal>
  );
};
