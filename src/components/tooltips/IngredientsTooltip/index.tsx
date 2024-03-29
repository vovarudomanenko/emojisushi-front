import { SvgIcon, InfoSvg } from "~components";
import { AnimatedTooltip } from "../AnimatedTooltip";
import * as S from "./styled";
import { useTranslation } from "react-i18next";

export const IngredientsTooltip = ({ items = [] }) => {
  const { t } = useTranslation();
  const Content = () => {
    return (
      <S.Wrapper>
        <S.Title>{t("ingredients.ingredients")}</S.Title>
        <S.List>
          {items.map((item, i) => (
            <S.ListItem key={i}>{item}</S.ListItem>
          ))}
        </S.List>
      </S.Wrapper>
    );
  };

  return (
    <AnimatedTooltip placement={"bottom-start"} label={<Content />}>
      <S.IconWrapper>
        <SvgIcon width="100%" color={"#999"}>
          <InfoSvg />
        </SvgIcon>
      </S.IconWrapper>
    </AnimatedTooltip>
  );
};
