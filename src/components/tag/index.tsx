import React from 'react';

interface TagProps {
    text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
    return (
        <span className="dark:bg-[#18181880] bg-muted flex-shrink-0 dark:text-gray-400 text-muted-foreground text-xs font-medium px-2.5 py-0.5 rounded dark:border-[#1f1f1f] border-muted whitespace-nowrap overflow-hidden text-ellipsis hover:text-primary border">
            #&nbsp;{text}
        </span>
    );
};

export default Tag;
