"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthCtx = {
  token: string | null;
  setToken: (t: string | null) => void;
};

const AuthContext = createContext<AuthCtx>({ token: null, setToken: ()=>{} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(()=>{
    const t = localStorage.getItem("tf_token");
    if(t) setTokenState(t);
  },[]);

  const setToken = (t: string | null) => {
    if(t) localStorage.setItem("tf_token", t);
    else localStorage.removeItem("tf_token");
    setTokenState(t);
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
