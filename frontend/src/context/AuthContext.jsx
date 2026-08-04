import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const login = (jwt) => {

        localStorage.setItem("token", jwt);

        setToken(jwt);

    };

    const logout = () => {

        localStorage.removeItem("token");

        setToken(null);

        setUser(null);

        navigate("/login", { replace: true });

    };

    useEffect(() => {

        if (!token) return;

        const fetchProfile = async () => {

            try {

                const res = await getProfile(token);

                setUser(res.data);

            }

            catch {

                logout();

            }

        };

        fetchProfile();

    }, [token]);

    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);