import styled from "styled-components";
import { ifProp, theme } from "styled-tools";

const Link = styled.span<{
  isActive: boolean;
  end: boolean;
}>`
  font-weight: 400;
  text-decoration: none;
  font-size: 15px;
  line-height: 18px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  color: ${(props) =>
    ifProp("isActive", props.theme.colors.brand, "#FFFFFF")(props)};
  :hover {
    color: ${theme("colors.brand")};
  }
  :after {
    border-bottom: none;
  }
`;

export { Link };
