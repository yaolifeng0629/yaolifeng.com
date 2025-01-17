import { Card, Text } from '@radix-ui/themes';
import { NextPage } from 'next';
import Link from 'next/link';
import { ProgressiveImage } from '@/components/progressive-image';
import { Wrapper } from '@/components/wrapper';

import { getShort, Short } from '@/api/shorts';

// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//     title: '姚利锋 | 片段',
//     description: '姚利锋 | 片段'
// };
export const revalidate = 60;

const Page: NextPage = async () => {
    const shorts = await getShort();

    return (
        <Wrapper className="flex flex-col px-6 pb-24 pt-8">
            <h2 className="pb-8 text-3xl font-bold md:text-4xl">最新片段</h2>
            <div className="columns-3xs gap-4 space-y-4">
                {shorts.map((short: any) => (
                    <ShortItem key={short.id} short={short} />
                ))}
            </div>
        </Wrapper>
    );
};

function ShortItem({ short }: { short: Short }) {
    const photo = short.url;

    return (
        <Card size="1" className="border dark:border-[#2f2f2f] border-border/40 rounded-[8px] p-0 overflow-hidden break-inside-avoid">
            <Link href={`/shorts/${short.slug}`}>
                <ProgressiveImage
                    src={photo}
                    alt={short.title}
                    width={300}
                    height={200}
                    layout="responsive"
                    className="w-full"
                />
                <Text as="p" size="2" className="px-3 py-2 text-foreground/90">
                    {short.title || short.description}
                </Text>
            </Link>
        </Card>
    );
}

export default Page;
