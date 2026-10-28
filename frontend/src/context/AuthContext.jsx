import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

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

        const fetchProfile = async () => {

            if (!token) {

                setLoading(false);

                return;

            }

            try {

                const res = await getProfile(token);

                setUser(res.data);

            }

            catch (error) {

                console.error(error);

                logout();

            }

            finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, [token]);

    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                logout,
                setUser
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);