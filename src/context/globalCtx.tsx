import React, { useEffect, useMemo, useState } from 'react';

interface GlobalCtx {
  desktop?: any;
}

export const GlobalCtx = React.createContext<GlobalCtx>({});

export const GlobalCtxProvider = ({ children }: any) => {
  const [desktop, setDesktop]: any = useState();
  useEffect(() => {
    function handleWindowResize() {
      setDesktop(window.innerWidth > 1024);
    }
    setDesktop(window.innerWidth > 1024);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <GlobalCtx.Provider value={{desktop}}>{children}</GlobalCtx.Provider>
  );
};
