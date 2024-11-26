import React from "react";

export default function Mainbutn({
  isloading,
  children,
  pading,
  bg,
  hvr,
  transiton,
  border,
  text,
  onClick,
}: {
  isloading?: any;
  children: React.ReactNode;
  pading?: string;
  bg?: string;
  hvr?: string;
  transiton?: string;
  border?: string;
  text?: string;
  disabled?: any;
  onClick?: () => void;
}) {
  return (
    <button
      className={` rounded-lg ${pading} ${bg} ${hvr} ${text} ${border} transition   `}
      onClick={onClick}
      disabled={isloading === true}
    >
      {children}
    </button>
  );
}
