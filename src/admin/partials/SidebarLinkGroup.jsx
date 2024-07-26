import React, { useState } from "react";

function SidebarLinkGroup({ children, activecondition }) {
  const [open, setOpen] = useState(activecondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li
      className={`mb-0.5 rounded-lg bg-[linear-gradient(135deg,var(--tw-gradient-stops))] py-2 pl-4 pr-3 last:mb-0 ${activecondition && "from-violet-500/[0.12] to-violet-500/[0.04] dark:from-violet-500/[0.24]"}`}
    >
      {children(handleClick, open)}
    </li>
  );
}

export default SidebarLinkGroup;
