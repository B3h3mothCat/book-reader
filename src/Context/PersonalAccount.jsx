import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const AccountContext = createContext()

export const useAccount = () => useContext(AccountContext)

export default function AccountProvider({ children }) {


    return (
        <AccountContext.Provider value={{}}>
            {children}
        </AccountContext.Provider>
    )
}