import React, { ReactElement, useState } from "react";
const defaultRenderContainer = ({ Header, Panel }): ReactElement => {
  return React.createElement("div", null, [Header(), Panel()]);
};

export const Collapsible = ({
  renderHeader,
  headerTag = "h3",
  renderPanel,
  renderContainer = defaultRenderContainer,
}) => {
  const [opened, setOpened] = useState(false);
  const Header = React.createElement(
    headerTag,
    {
      onClick: () => {
        setOpened(!opened);
      },
    },
    renderHeader && renderHeader({ opened })
  );
  const Panel = React.createElement(
    "div",
    null,
    opened && renderPanel && renderPanel({ opened })
  );

  return renderContainer({
    Header: () => Header,
    Panel: () => Panel,
  });
};
