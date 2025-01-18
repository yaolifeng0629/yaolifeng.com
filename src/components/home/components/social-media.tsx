import {
    IconBrandBilibili,
    IconBrandGithub,
    IconLogoJuejin,
    IconLogoOfficialAccount,
    IconLogoTwitter,
    IconLogoWeChat,
    IconLogoYoutube,
    IconSkillGmail,
    IconSkillGmailDark,
    IconSkillGmailLight,
    IconsLogoGitee,
} from '@/components/icons';

import {
    BILIBILI_PAGE,
    EMAIL,
    GITEE,
    GITHUB_PAGE,
    JUEJIN_PAGE,
    TWITTER,
    WECHAT,
    WEIXIN_OFFICIAL,
    YOUTUBE,
} from '@/constants';

const socialMediaList: Array<{
    icon: React.ReactNode;
    label: string;
    link: string;
}> = [
    {
        icon: <IconBrandGithub className="text-2xl" />,
        label: 'Github(yaolifeng0629)',
        link: GITHUB_PAGE,
    },
    {
        icon: <IconLogoWeChat className="text-2xl" />,
        label: '微信号(15829485647)',
        link: WECHAT,
    },
    // {
    //     icon: <IconLogoYoutube className="text-2xl" />,
    //     label: 'Youtube(Immerse)',
    //     link: YOUTUBE,
    // },
    {
        icon: <IconLogoOfficialAccount className="text-2xl" />,
        label: '微信公众号(非同质前端札记)',
        link: WEIXIN_OFFICIAL,
    },
    // {
    //     icon: <IconsLogoGitee className="text-2xl" />,
    //     label: 'Gitee(yaolifeng0529)',
    //     link: GITEE,
    // },
    {
        icon: <IconLogoTwitter className="text-2xl" />,
        label: 'Twitter(Immerse_code)',
        link: TWITTER,
    },
    {
        // icon: (
        //     <>
        //         <IconSkillGmailDark className="hidden text-2xl dark:inline-block" />
        //         <IconSkillGmailLight className="text-2xl dark:hidden" />
        //     </>
        // ),
        icon: <IconSkillGmail className="text-2xl" />,
        label: 'Gmail(yaolifeng666@gmail.com)',
        link: `mailto:${EMAIL}`,
    },
    // {
    //     icon: <IconBrandBilibili className={`text-2xl text-[#00AEEC]`} />,
    //     label: '哔哩哔哩(Immerse_001)',
    //     link: BILIBILI_PAGE
    // },
    // {
    //     icon: <IconLogoJuejin className={`text-2xl text-[#2985fc]`} />,
    //     label: '掘金(Immerse)',
    //     link: JUEJIN_PAGE,
    // },
];

export default socialMediaList;
