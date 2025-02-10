import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { SocialMedia } from '@/components/home';
import { Wrapper } from '@/components/wrapper';

const services = [
    {
        title: '项目合作',
        description: '如果你有有趣的项目想法，欢迎一起探讨合作机会！',
        icon: '🤝',
        contact: '私聊',
    },
    {
        title: '技术帮助',
        description: '解答前端开发中遇到的问题',
        icon: '💡',
        contact: '私聊',
    },
    {
        title: '独家优惠',
        description: '为您提供各大云服务优惠福利',
        icon: '🎁',
        items: [
            {
                name: '腾讯云',
                link: 'https://curl.qcloud.com/K74TLg2E',
            },
            {
                name: '阿里云',
                link: 'https://www.aliyun.com/minisite/goods?userCode=frcdyvj6',
            },
            {
                name: '流光卡片',
                link: 'https://fireflycard.shushiai.com/?invitationCode=N94YYR6E',
                code: '7折优惠码：YFDASI',
            },
            {
                name: 'httpsok—SSL证书自动续期',
                link: 'https://httpsok.com/p/4M2d',
                code: '8.2折优惠码：V4BWENTD',
            },
        ],
    },
    {
        title: '分享推广',
        description: '帮你推广到推特、INDIE TOOLS公告、文章、博客等平台',
        icon: '🌟',
        contact: '私聊',
    },
];

export default function ServicesPage() {
    return (
        <Wrapper className="flex flex-col px-6 pb-24 pt-8">
            <h2 className="text-3xl font-bold md:text-4xl">我的服务</h2>
            <p className="text-muted-foreground text-base max-w-2xl my-8">如果你需要，而我刚好有</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {services.map((service, index) => (
                    <Card
                        key={index}
                        className="group p-5 hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 h-full"
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex items-start space-x-4">
                                <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>
                                <div className="space-y-1.5 flex-1">
                                    <h2 className="text-lg font-semibold text-foreground/90">{service.title}</h2>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </div>

                            {service.items ? (
                                <div className="mt-4 pl-11">
                                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                                        {service.items.map((item, idx) => (
                                            <div key={idx} className="flex flex-col">
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:text-primary/80 transition-colors text-sm whitespace-nowrap"
                                                >
                                                    <span className="border-b border-primary/0 hover:border-primary/40">
                                                        {item.name}
                                                    </span>
                                                </a>
                                                {item.code && (
                                                    <p className="text-xs text-muted-foreground/80 mt-0.5">
                                                        {item.code}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                service.contact && (
                                    <div className="mt-auto pt-4 pl-11">
                                        <p className="text-xs text-muted-foreground/90">联系方式：{service.contact}</p>
                                    </div>
                                )
                            )}
                        </div>
                    </Card>
                ))}
            </div>

            <div className="mt-10 text-center space-y-4">
                <h2 className="text-3xl font-semibold text-foreground/90">联系我</h2>
                <p className="text-md text-muted-foreground max-w-xl mx-auto">你可以通过👇下面任意一种方式联系我</p>
                <ul className="!mb-0 flex !list-none justify-center items-center space-x-4 !pl-0 pb-20">
                    {SocialMedia.map((el) => (
                        <li key={el.link}>
                            <Button asChild variant="outline" size="icon">
                                <Link href={el.link} target="_blank">
                                    {el.icon}
                                </Link>
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </Wrapper>
    );
}
