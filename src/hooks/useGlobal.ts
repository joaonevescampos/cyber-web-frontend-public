import { useContext } from "react";
import { GlobalContext } from "../context/GlobalProvider";

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used inside of GlobalProvider");
  }
  return context;
};
