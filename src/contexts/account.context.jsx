import { createContext, useState } from "react";

export const AccountContext = createContext({
    // properties
    email: null,
    // methods
    setEmail: () => null,
    clear: () => null,
    isAuth: () => null
});

export const AccountProvider = ({ children }) => {

    const [email, setEmail] = useState(null);
    const clear = () => setEmail(null);
    const isAuth = () => email !== null;

    const value = { email, setEmail, clear, isAuth };

    return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}