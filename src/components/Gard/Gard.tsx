import React from "react";
import { Navigate } from "react-router-dom";

export default function Gard({ children }: any) {
  if (localStorage.getItem("token") != null) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigate to={"/"} />
    </>
  );
}

export function AuthGard({ children }: any) {
  if (localStorage.getItem("token") == null) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigate to={"/masarat/home"} />
    </>
  );
}
