import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
    className?: string;
};

const Sponsor = ({ className }: Props) => {
    return (
        <Link
            href="https://yaolifeng.com/sponsor.html"
            target='_blank'
            className="text-muted-foreground hover:text-foreground"
            title='Sponsor'
        >
            <Image
                src="/other/like.svg"
                alt="Sponsor me"
                width={40}
                height={40}
                className="h-5 w-5"
            />
        </Link>
    );
};

export default Sponsor;
