import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") || "system"
    );


    useEffect(() => {

        const root = document.documentElement;

        root.classList.remove(
            "light-theme",
            "dark-theme"
        );


        if (theme === "light") {

            root.classList.add("light-theme");

        }


        if (theme === "dark") {

            root.classList.add("dark-theme");

        }


        if (theme === "system") {

            const mediaQuery = window.matchMedia(
                "(prefers-color-scheme: dark)"
            );


            root.classList.add(
                mediaQuery.matches
                    ? "dark-theme"
                    : "light-theme"
            );


            const handleSystemThemeChange = (event) => {

                root.classList.remove(
                    "light-theme",
                    "dark-theme"
                );


                root.classList.add(
                    event.matches
                        ? "dark-theme"
                        : "light-theme"
                );

            };


            mediaQuery.addEventListener(
                "change",
                handleSystemThemeChange
            );


            return () => {

                mediaQuery.removeEventListener(
                    "change",
                    handleSystemThemeChange
                );

            };

        }


        localStorage.setItem(
            "theme",
            theme
        );

    }, [theme]);


    const changeTheme = (newTheme) => {

        setTheme(newTheme);

    };


    return (

        <ThemeContext.Provider
            value={{
                theme,
                changeTheme
            }}
        >

            {children}

        </ThemeContext.Provider>

    );

};


export const useTheme = () => {

    return useContext(ThemeContext);

};