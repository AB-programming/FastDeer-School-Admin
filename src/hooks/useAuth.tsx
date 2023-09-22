import React, {createContext, useEffect, useState} from "react";
import {useLoginStatus} from "./useLoginStatus.ts";
export const AuthContext = createContext<AuthOption>({} as AuthOption);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const checkLogin = async () => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const isLogin = await useLoginStatus();
            if (isLogin) {
                setIsAuthenticated(true)
            }
        }
        checkLogin().then()
    }, []);

    const login = (token: string) => {
        localStorage.setItem(import.meta.env.VITE_TOKEN, token)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem(import.meta.env.VITE_TOKEN)
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={
            {
                isAuthenticated,
                login,
                logout,
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}