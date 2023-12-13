import * as S from "./styled";
import { FlexBox } from "../FlexBox";
import { useId } from "react";
import { observer } from "mobx-react";

export const CheckboxFilter = observer(function CheckboxFilterObserved({
  children,
  handleOnChange,
  value = undefined,
  isChecked = () => undefined,
}) {
  const id = useId();
  return (
    <FlexBox>
      <S.CheckBoxWrapper>
        <S.CheckBox
          checked={isChecked()}
          onChange={handleOnChange}
          id={id}
          type="checkbox"
          value={value}
        />
        <S.Label htmlFor={id}>{children}</S.Label>
      </S.CheckBoxWrapper>
    </FlexBox>
  );
});
