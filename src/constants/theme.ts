export type Theme = 'light' | 'dark';

export const themes: Theme[] = ['light', 'dark'];

export const ThemeConfig = {
    light: '亮色',
    dark: '暗色'
} as const;
