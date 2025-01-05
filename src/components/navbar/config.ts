import { PATHS, PATHS_MAP } from '@/constants';

export const navItems: Array<{
    label?: string;
    link: string;
    external?: boolean;
}> = [
    {
        label: PATHS_MAP[PATHS.SITE_HOME],
        link: PATHS.SITE_HOME
    },
    {
        label: PATHS_MAP[PATHS.SITE_BLOG],
        link: PATHS.SITE_BLOG
    },
    {
        label: PATHS_MAP[PATHS.SITE_SNIPPET],
        link: PATHS.SITE_SNIPPET
    },
    {
        label: PATHS_MAP[PATHS.SITE_PROJECT],
        link: PATHS.SITE_PROJECT
    },
    {
        label: PATHS_MAP[PATHS.SITE_ABOUT],
        link: PATHS.SITE_ABOUT
    },
    {
        label: PATHS_MAP[PATHS.SITE_LINKS],
        link: PATHS.SITE_LINKS,
        external: true // 标记为外部链接，不在主导航显示
    },
];
