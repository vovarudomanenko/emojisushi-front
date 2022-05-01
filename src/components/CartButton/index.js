import * as S from "./styled";
import {FlexBox} from "../FlexBox";
import {SvgIcon} from "../svg/SvgIcon";
import {BagSvg} from "../svg/BagSvg";

export const CartButton = () => {
    return (
        <S.CartButton>
            <FlexBox alignItems={"center"}>
                <S.Icon>
                    <SvgIcon color={"black"} width={"25px"} height={"25px"}>
                        <BagSvg/>
                    </SvgIcon>
                </S.Icon>
                <S.Price>
                    308 ₴
                </S.Price>
                <S.Delimiter/>
                <S.Count>
                    2
                </S.Count>
            </FlexBox>
        </S.CartButton>
    );
}