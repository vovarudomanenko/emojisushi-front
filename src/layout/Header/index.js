import { LocationPickerPopover } from "../../components/LocationPickerPopover";
import * as S from "./styled";
import { Logo } from "../../components/Logo";
import {Container } from "../../components/Container";
import {FlexBox} from "../../components/FlexBox";
import {CartButton} from "../../components/CartButton";
import {BurgerIcon} from "../../components/icons/BurgerIcon";
import {TinyCartButton} from "../../components/TinyCartButton";
import {NavLink} from "../../components/NavLink";
import {ContactsDialog} from "../../components/dialogs/ContactsDialog";


export const Header = () => {
    return (
        <S.Header>
            <Container>
                <FlexBox justifyContent={"space-between"} alignItems={"center"}>
                    <S.Left>
                        <S.Link to={"/"}>
                            <Logo/>
                        </S.Link>
                        <S.PcHeaderItem>
                            <LocationPickerPopover/>
                        </S.PcHeaderItem>


                                <ContactsDialog>
                                    <S.PcHeaderItem>
                                        Контакты
                                    </S.PcHeaderItem>

                                </ContactsDialog>



                        <S.PcHeaderItem>
                            <NavLink to={"/dostavka-i-oplata"}>
                                Доставка и оплата
                            </NavLink>
                        </S.PcHeaderItem>
                    </S.Left>
                    <S.Right>

                        <S.CartBtn>
                            <CartButton/>
                        </S.CartBtn>
                        <S.TinyCartBtn>
                            <TinyCartButton/>
                        </S.TinyCartBtn>

                        <S.BurgerBtn>
                            <BurgerIcon/>
                        </S.BurgerBtn>
                    </S.Right>
                </FlexBox>
            </Container>
        </S.Header>
    )
}

