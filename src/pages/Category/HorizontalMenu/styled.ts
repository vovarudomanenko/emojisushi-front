import styled, { css } from "styled-components";
import { ifProp, theme } from "styled-tools";
import { ActiveNavLink } from "~components/ActiveNavLink";

const Categories = styled.div`
  position: relative;
  padding-top: 50px;
  .slick-slide {
    margin-right: 20px;
  }

  .slick-list {
    overflow: visible;
  }
`;

const HorizontalContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex-wrap: nowrap;
`;

const Hint = styled.div`
  position: absolute;
  top: 15px;
  right: 0;
`;

const Category = styled(ActiveNavLink)`
  display: flex;
  text-transform: uppercase;
  line-height: 20px;
  font-weight: 500;
  cursor: pointer;
  color: white;
  text-decoration: none;
  margin-right: 16px;

  &:hover {
    color: ${theme("link.active")};
    border: 1px solid ${theme("link.active")};
  }

  flex-shrink: 0;
  border: 1px solid white;
  border-radius: 5px;
  padding: 9px 23px;

  ${ifProp(
    "isActive",
    css`
      color: ${theme("link.active")};
      border: 1px solid ${theme("link.active")};
    `
  )}
`;

export { Categories, Category, Hint, HorizontalContainer };
