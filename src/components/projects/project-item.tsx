import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ProjectItemProps {
    name: string;
    description: string;
    link: string;
    author: string;
    author_link: string;
    avatar: string;
    home_link: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
    name,
    description,
    link,
    author,
    author_link,
    avatar,
    home_link,
}) => {
    return (
        <div className="relative block overflow-hidden rounded-lg border dark:border-[#18181b] border-border/40 no-underline p-3 md:p-4 hover:bg-accent/50 transition-colors">
            <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-bold truncate mt-0" title={name}>
                        {name}
                    </h3>

                    <Link
                        href={author_link}
                        target="_blank"
                        className="mt-1 text-xs font-medium text-muted-foreground no-underline hover:text-foreground transition-colors"
                    >
                        {author}
                    </Link>
                </div>

                <div className="flex-shrink-0">
                    <img
                        src={avatar}
                        alt="Project Author Avatar"
                        className="w-12 h-12 md:w-14 md:h-14 rounded-xl object-cover shadow-sm mt-0"
                    />
                </div>
            </div>

            <p className="mt-3 mb-4 text-sm text-muted-foreground line-clamp-2 min-h-10" title={description}>
                {description}
            </p>

            <div className="flex justify-start gap-3">
                <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="text-xs md:text-sm min-w-[90px] rounded-[6px]"
                >
                    <Link href={home_link} target="_blank">
                        查看首页
                    </Link>
                </Button>
                <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="text-xs md:text-sm min-w-[80px] rounded-[6px]"
                >
                    <Link href={link} target="_blank">
                        Github
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default ProjectItem;
