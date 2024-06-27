import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
} 

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
}

