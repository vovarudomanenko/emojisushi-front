import { cloneElement } from "react";
import { BaseModal } from "../BaseModal";
import * as S from "./styled";
import { ContactsModal } from "../ContactsModal";
import { NavLinkUnderline } from "../../NavLinkUnderline";
import { FlexBox } from "../../FlexBox";
import { LocationPickerPopover } from "../../popovers/LocationPickerPopover";
import { SvgIcon } from "../../svg/SvgIcon";
import { HeartSvg } from "../../svg/HeartSvg";
import { useTranslation } from "react-i18next";
import { UserSvg } from "../../svg/UserSvg";
import { AuthModal } from "../AuthModal";
import { LanguageSelector } from "../../LanguageSelector";
import { useCity, useSpot } from "~hooks";

export const MobMenuModal = ({ children }) => {
  const overlayStyles = {
    justifyItems: "end",
    alignItems: "start",
    background: "rgba(0, 0, 0, 0.4)",
    display: "grid",
    zIndex: 999999,
  };
  const { t } = useTranslation();
  const city = useCity();
  const spot = useSpot();
  return (
    <BaseModal
      overlayStyles={overlayStyles}
      render={({ close }) => (
        <S.Wrapper>
          <S.Item>
            <LanguageSelector />
          </S.Item>
          <S.Item style={{ height: "25px" }}>
            <LocationPickerPopover
              width={"226px"}
              backgroundColor={"#1C1C1C"}
            />
          </S.Item>
          <S.Item>
            <AuthModal>
              <FlexBox alignItems={"center"}>
                <SvgIcon width={"25px"} style={{ marginRight: "10px" }}>
                  <UserSvg />
                </SvgIcon>
                Вход в аккаунт
              </FlexBox>
            </AuthModal>
          </S.Item>
          <S.Item>
            <ContactsModal>
              <div>{t("mobMenuModal.contacts")}</div>
            </ContactsModal>
          </S.Item>
          <S.Item>
            <NavLinkUnderline
              to={"/" + city.slug + "/" + spot.slug + "/dostavka-i-oplata"}
            >
              <div>{t("mobMenuModal.delivery")}</div>
            </NavLinkUnderline>
          </S.Item>
          <S.Item>
            <FlexBox justifyContent={"space-between"} alignItems={"center"}>
              <NavLinkUnderline
                to={"/" + city.slug + "/" + spot.slug + "/wishlist"}
              >
                <div>{t("common.favorite")}</div>
              </NavLinkUnderline>
              <SvgIcon color={"#FFE600"} width={"25px"}>
                <HeartSvg />
              </SvgIcon>
            </FlexBox>
          </S.Item>
        </S.Wrapper>
      )}
    >
      {cloneElement(children)}
    </BaseModal>
  );
};
