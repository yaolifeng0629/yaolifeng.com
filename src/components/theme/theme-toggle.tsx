'use client';

import { useTheme } from './theme-provider';
import { MoonIcon, SunIcon } from './theme-icons';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggleTheme}
            className="rounded-md w-6 h-6 flex items-center justify-center hover:bg-accent transition-colors"
            title={`当前主题：${theme}`}
        >
            {theme === 'dark' ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
        </button>
    );
}
