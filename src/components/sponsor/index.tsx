import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

type Props = {
    className?: string;
};

const Sponsor = ({ className }: Props) => {
    return (
        <Link
            href="https://yaolifeng.com/sponsor.html"
            target="_blank"
            className="text-muted-foreground hover:text-foreground"
            title="Sponsor"
        >
            <div className="scale-125">☕</div>
            {/* <Image
                src="/other/like.svg"
                alt="Sponsor me"
                width={40}
                height={40}
                className="h-5 w-5"
            /> */}
        </Link>
    );
};

export default Sponsor;
