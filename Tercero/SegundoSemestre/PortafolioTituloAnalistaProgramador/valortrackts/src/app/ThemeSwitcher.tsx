"use client"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
const ThemeSwitcher = ({ children, attribute }: { children: React.ReactNode, attribute: string }) => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null
    };

    return (
        <div>
            <button className="text-3xl transition duration-300 text-rose-600 hover:text-green-500" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme === "light" ? <FaSun/> : <FaMoon/> }</button>
        </div>
    );
}

export default ThemeSwitcher;