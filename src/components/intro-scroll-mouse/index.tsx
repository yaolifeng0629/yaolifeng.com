import { NextPage } from 'next';

const Index: NextPage = () => {
    return (
        <div className="relative grid h-[30px] w-[20px] justify-center rounded-full border-2 border-[#525252] pt-2 md:h-[38px] md:w-[26px]">
            <div className="h-[5px] w-[2px] animate-intro-scroll rounded-full bg-[#525252] md:h-[7px]"></div>
        </div>
    );
};

export default Index;
