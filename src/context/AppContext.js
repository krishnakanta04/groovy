"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export default function AppProvider({ children }) {
  const [playlist, setPlaylist] = useState({});
  const [index, setIndex] = useState(0);
  const value = { playlist, setPlaylist, index, setIndex };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
