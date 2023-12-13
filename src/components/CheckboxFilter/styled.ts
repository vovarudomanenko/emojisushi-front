import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 10px;
`;

const Label = styled.label`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  border: 1px solid #393939;
  border-radius: 10px;
  padding: 10px;
  font-size: 15px;
  line-height: 18px;
  &:hover {
    background: #393939;
  }
`;

const CheckBoxWrapper = styled.div`
  background: #1c1c1c;
  overflow: hidden;
  margin-right: 10px;
  border-radius: 10px:
  display: flex
`;

const CheckBox = styled.input`
  display: none;
  :checked {
    ~ ${Label} {
      background: #393939;
    }
  }
`;

export { CheckBox, Label, Wrapper, CheckBoxWrapper };
