import {BaseModal} from "../BaseModal";
import * as S from "./styled";
import {LightCounter} from "../../Counter";
import {FlexBox} from "../../FlexBox";
import {Price} from "../../Price";
import {CloseModalIcon} from "../CloseModalIcon";
import {CloseIcon} from "../../CloseIcon";
import {ButtonOutline} from "../../buttons/Button";
import {useWindowSize} from "react-use";
import {useEffect, useState} from "react";
import {useDebounce} from "~common/hooks/useDebounce";
import {useBreakpoint} from "~common/hooks/useBreakpoint";
import {ConfirmActionPopover} from "../../popovers/ConfirmActionPopover";
import { useNavigate } from "react-router-dom";
import { observer} from "mobx-react";
import {Loader} from "../../Loader";
import {useTranslation} from "react-i18next";
import {SvgIcon} from "../../svg/SvgIcon";
import {LogoSvg} from "../../svg/LogoSvg";
import {SushiSvg} from "../../svg/SushiSvg";
import {useCartStore} from "~hooks/use-cart-store";
import {CartProduct} from "~models/CartProduct";

const CartItem = observer((
    {
        item,
    }: {
        item: CartProduct
    }
) => {
    const newPrice = item.product.getNewPrice(item.variant);
    const oldPrice = item.product.getOldPrice(item.variant);
    const nameWithMods = item.nameWithMods;
    const CartStore = useCartStore();

    const handleAdd = (product_id: number, variant_id: number | undefined) => {
        return (quantity) => {
            CartStore.addProduct({
                product_id,
                quantity,
                variant_id
            })
        }
    }
    const {t} = useTranslation();
    return (<S.Item>
        <S.Item.RemoveIcon>
            <ConfirmActionPopover onConfirm={({close}) => {
                CartStore.removeCartProduct(item.id);
                close();
            }} onCancel={({close}) => {
                close();
            }} text={t('cartModal.remove')}>
                <CloseIcon color={"#4A4A4A"}/>
            </ConfirmActionPopover>
        </S.Item.RemoveIcon>
        <S.Item.Img src={item.product.mainImage}>
            {!item.product.mainImage && (
                <SvgIcon color={"white"} width={"80%"} style={{opacity: 0.05}}>
                    <LogoSvg/>
                </SvgIcon>
            )}
        </S.Item.Img>
        <S.Item.Info>
            <S.Item.Name title={nameWithMods}>
                {nameWithMods}
            </S.Item.Name>
            <FlexBox justifyContent={"space-between"} alignItems={"flex-end"}>
                <S.Item.Counter>
                    <LightCounter handleIncrement={() => {
                        handleAdd(item.productId, item.variantId)(1);
                    }} handleDecrement={() => {
                        handleAdd(item.productId, item.variantId)(-1);
                    }} count={item.quantity}/>
                </S.Item.Counter>
                <Price newPrice={newPrice} oldPrice={oldPrice}/>
            </FlexBox>
        </S.Item.Info>
    </S.Item>)
})


export const CartModal = observer((
    {
        children,
    }) => {
    const cartStore = useCartStore();
    const {
        items,
        total,
        loading,
    } = cartStore;
    const navigate = useNavigate();
    const windowSize = useWindowSize();
    const [height, setHeight] = useState(windowSize.height);

    const debounceHeight = useDebounce(() => {
        setHeight(windowSize.height)
    }, 300)

    const breakpoint = useBreakpoint();

    const overlayStyles = {
        justifyItems: breakpoint === 'mobile' ? 'center':'end',
        alignItems: breakpoint === 'mobile' ? 'center': 'start',
        background: "rgba(0, 0, 0, 0.4)",
        display: 'grid',
        zIndex: 999999
    };

    // max cart items wrapper height is 500px and min is 300px
    // 252px is sum of heights another element in cart modal
    const finalHeight = Math.max(Math.min(height - 252, 500), 300);

    useEffect(() => {
        debounceHeight();
    }, [windowSize.height])
    const {t} = useTranslation();
    return <BaseModal overlayStyles={overlayStyles} render={({close}) => (
        <S.Wrapper>
            <Loader loading={loading}/>
            <S.CloseIcon>
                <CloseModalIcon close={close}/>
            </S.CloseIcon>


            <S.EmptyCartImgContainer>
                {items.length === 0 && <SushiSvg/> }
                <S.Title>
                    {items.length === 0 && t('cartModal.empty') }
                </S.Title>
            </S.EmptyCartImgContainer>

            <S.Items>
                <div style={{
                    minHeight: 362 + 'px',
                    maxHeight: finalHeight + 'px',
                    overflowY: 'auto'
                }}>

                    {items.map((item, i) => (
                        <CartItem key={i} item={item}/>
                    ))}

                </div>
            </S.Items>

            { items.length !== 0 && (
                <S.Footer>
                    <FlexBox alignItems={"center"} justifyContent={"space-between"}>
                        <S.Sum>{t('cartModal.sum_order')}</S.Sum>
                        <Price newPrice={total}/>
                    </FlexBox>
                    <S.Button>
                        <ButtonOutline disabled={items.length === 0} onClick={() => {
                            navigate('/checkout');
                        }} width={"100%"}>
                            {t('cartModal.checkout')}
                        </ButtonOutline>
                    </S.Button>

                </S.Footer>
            )}
        </S.Wrapper>
    )}>
        {children}
    </BaseModal>
})
