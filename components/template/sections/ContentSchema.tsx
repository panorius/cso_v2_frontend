import React from "react";

export default function contentSchema({ text }: { text: string }) {
    return (
        <div className="w-[606px] h-[642px] relative">
            <div className="w-[606px] h-[642px] left-0 top-0 absolute bg-neutral-700 rounded-[20px] shadow-[0px_2px_0px_0px_rgba(38,38,38,1.00)]" />
            <div className="w-[549px] h-28 left-[29px] top-[199px] absolute bg-neutral-800 rounded-[10px] shadow-[0px_2px_0px_0px_rgba(30,30,30,1.00)]" />
            <div className="w-[549px] h-7 left-[29px] top-[199px] absolute bg-stone-900 rounded-tl-[10px] rounded-tr-[10px]" />
            <div className="left-[49px] top-[208px] absolute justify-start text-white text-xs font-normal font-['Belanosima']">
                Gauge
            </div>
            <div className="w-[3px] h-2.5 left-[41px] top-[210px] absolute bg-white" />
            <div className="w-5 left-[552px] top-[202px] absolute inline-flex flex-col justify-start items-start">
                <div className="w-5 h-5 p-1.5 bg-red-500 rounded-md shadow-[0px_2.109375px_0px_0px_rgba(192,57,43,1.00)] outline outline-[0.53px] outline-offset-[-0.53px] outline-orange-700 inline-flex flex-col justify-center items-center gap-[2.64px]">
                    <div className="relative w-3 h-3 overflow-hidden">
                        <div className="w-2 h-2.5 left-[1.90px] top-[0.95px] absolute bg-white" />
                    </div>
                </div>
            </div>
            <div className="w-5 left-[526px] top-[202px] absolute inline-flex flex-col justify-start items-start">
                <div className="w-5 h-5 p-1.5 bg-gray-400 rounded-md shadow-[0px_2.109375px_0px_0px_rgba(127,140,141,1.00)] outline outline-[0.53px] outline-offset-[-0.53px] outline-gray-500 inline-flex flex-col justify-center items-center gap-[2.64px]">
                    <div className="relative w-3 h-3 overflow-hidden">
                        <div className="w-2 h-2.5 left-[2.50px] top-[1.25px] absolute bg-white" />
                    </div>
                </div>
            </div>
            <div className="w-5 left-[500px] top-[202px] absolute inline-flex flex-col justify-start items-start">
                <div className="w-5 h-5 py-1.5 bg-amber-400 rounded-md shadow-[0px_2.109375px_0px_0px_rgba(175,135,77,1.00)] outline outline-[0.53px] outline-offset-[-0.53px] outline-stone-500 inline-flex flex-col justify-center items-center gap-[2.64px]">
                    <div className="relative w-3 h-3 overflow-hidden">
                        <div className="w-2 h-2 left-[1.90px] top-[1.90px] absolute bg-white" />
                    </div>
                </div>
            </div>
            <div className="w-5 pt-0.5 left-[474px] top-[202px] absolute inline-flex flex-col justify-start items-start">
                <div className="w-5 h-5 p-1.5 bg-zinc-600 rounded-md inline-flex flex-col justify-center items-center gap-[2.64px]">
                    <div className="relative w-3 h-3 overflow-hidden">
                        <div className="w-2 h-[1.27px] left-[2.16px] top-[5.80px] absolute bg-white" />
                    </div>
                </div>
            </div>
            <div className="w-7 h-7 px-3 py-2 left-[44px] top-[261px] absolute bg-neutral-800 rounded-[5px] border border-gray-500" />
            <div
                data-propriété-1="Par défaut"
                className="w-32 h-7 px-3 py-2 left-[87px] top-[261px] absolute bg-neutral-800 rounded-[5px] outline outline-1 outline-offset-[-1px] outline-gray-500 inline-flex justify-start items-center"
            >
                <div className="justify-start text-gray-400 text-base font-normal font-['Beiruti']">
                    Label
                </div>
            </div>
            <div
                data-propriété-1="Par défaut"
                className="w-32 h-7 px-3 py-2 left-[223px] top-[261px] absolute bg-neutral-800 rounded-[5px] outline outline-1 outline-offset-[-1px] outline-gray-500 inline-flex justify-start items-center"
            >
                <div className="justify-start text-gray-400 text-base font-normal font-['Beiruti']">
                    Label
                </div>
            </div>
            <div
                data-propriété-1="Par défaut"
                className="w-32 h-7 px-3 py-2 left-[438px] top-[261px] absolute bg-neutral-800 rounded-[5px] outline-1 outline-offset-[-1px] outline-gray-500 inline-flex justify-start items-center"
            >
                <div className="justify-start text-gray-400 text-base font-normal font-['Beiruti']">
                    Label
                </div>
            </div>
            <div
                data-propriété-1="Par défaut"
                className="w-12 h-12 left-[363px] top-[240px] absolute"
            >
                <div className="w-9 h-4 left-[13.75px] top-[28.75px] absolute bg-neutral-800 rounded-xl border border-gray-500" />
                <div className="left-[8.75px] top-[2px] absolute justify-start text-white text-base font-normal font-['Belanosima']">
                    Label
                </div>
                <div className="w-7 h-7 left-0 top-[23.75px] absolute bg-gray-500 rounded-full" />
            </div>
            <div className="w-64 h-0 left-[329px] top-[169px] absolute outline-1 outline-offset-[-0.50px] outline-gray-500"></div>
            <div className="w-64 h-0 left-[29px] top-[169px] absolute outline-1 outline-offset-[-0.50px] outline-gray-500"></div>
            <div
                data-propriété-1="Middle:hover"
                className="w-24 pt-[5px] left-[101px] top-[76px] absolute inline-flex flex-col justify-center items-center"
            >
                <div className="self-stretch h-12 px-5 py-3 bg-stone-500 outline-[1.25px] outline-offset-[-1.25px] outline-stone-500 flex flex-col justify-center items-center">
                    <div className="relative w-6 h-6 overflow-hidden">
                        <div className="w-5 h-4 left-[1.88px] top-[3.13px] absolute bg-grey-darken" />
                    </div>
                </div>
            </div>
            <div
                data-propriété-1="Middle"
                className="w-24 h-12 left-[202px] top-[76px] absolute"
            >
                <div className="w-24 h-12 px-5 py-3 left-0 top-0 absolute bg-amber-400 shadow-[0px_5px_0px_0px_rgba(175,135,77,1.00)] outline-[1.25px] outline-offset-[-1.25px] outline-stone-500 inline-flex flex-col justify-center items-center">
                    <div className="relative w-6 h-6 overflow-hidden">
                        <div className="w-5 h-4 left-[1.88px] top-[3.13px] absolute bg-white" />
                    </div>
                </div>
            </div>
            <div
                data-propriété-1="Middle"
                className="w-24 h-12 left-[301px] top-[76px] absolute"
            >
                <div className="w-24 h-12 px-5 py-3 left-0 top-0 absolute bg-amber-400 shadow-[0px_5px_0px_0px_rgba(175,135,77,1.00)] outline-[1.25px] outline-offset-[-1.25px] outline-stone-500 inline-flex flex-col justify-center items-center">
                    <div className="relative w-6 h-6 overflow-hidden">
                        <div className="w-5 h-4 left-[1.88px] top-[3.13px] absolute bg-white" />
                    </div>
                </div>
            </div>
            <div
                data-propriété-1="Middle"
                className="w-24 h-12 left-[402px] top-[76px] absolute"
            >
                <div className="w-24 h-12 px-5 py-3 left-0 top-0 absolute bg-amber-400 shadow-[0px_5px_0px_0px_rgba(175,135,77,1.00)] outline-[1.25px] outline-offset-[-1.25px] outline-stone-500 inline-flex flex-col justify-center items-center">
                    <div className="relative w-6 h-6 overflow-hidden">
                        <div className="w-5 h-4 left-[1.88px] top-[3.13px] absolute bg-white" />
                    </div>
                </div>
            </div>
            <div
                data-propriété-1="Middle"
                className="w-24 h-12 left-[503px] top-[76px] absolute"
            >
                <div className="w-24 h-12 px-5 py-3 left-0 top-0 absolute bg-amber-400 shadow-[0px_5px_0px_0px_rgba(175,135,77,1.00)] outline-[1.25px] outline-offset-[-1.25px] outline-stone-500 inline-flex flex-col justify-center items-center">
                    <div className="relative w-6 h-6 overflow-hidden">
                        <div className="w-4 h-4 left-[3.75px] top-[3.75px] absolute bg-white" />
                    </div>
                </div>
            </div>
            <div
                data-propriété-1="GreyMid"
                className="w-24 h-12 left-0 top-[76px] absolute"
            >
                <div className="w-24 h-12 px-5 py-3 left-0 top-0 absolute bg-gray-400 shadow-[0px_5px_0px_0px_rgba(127,140,141,1.00)] outline-[1.25px] outline-offset-[-1.25px] outline-gray-500 inline-flex flex-col justify-center items-center">
                    <div className="relative w-6 h-6 overflow-hidden">
                        <div className="w-5 h-5 left-[2.50px] top-[2.50px] absolute bg-white" />
                    </div>
                </div>
            </div>
            <div className="w-9 left-[285px] top-[146px] absolute inline-flex flex-col justify-start items-start">
                <div className="w-9 h-9 py-2.5 bg-amber-400 rounded-[10px] shadow-[0px_3.75px_0px_0px_rgba(175,135,77,1.00)] outline-1 outline-offset-[-0.94px] outline-stone-500 inline-flex flex-col justify-center items-center gap-1">
                    <div className="relative w-6 h-6 overflow-hidden">
                        <div className="w-4 h-4 left-[3.38px] top-[3.38px] absolute bg-white" />
                    </div>
                </div>
            </div>
            <div className="w-64 h-0 left-[329px] top-[531px] absolute outline-1 outline-offset-[-0.50px] outline-gray-500"></div>
            <div className="w-64 h-0 left-[29px] top-[531px] absolute outline-1 outline-offset-[-0.50px] outline-gray-500"></div>
            <div className="w-9 left-[285px] top-[508px] absolute inline-flex flex-col justify-start items-start">
                <div className="w-9 h-9 py-2.5 bg-amber-400 rounded-[10px] shadow-[0px_3.75px_0px_0px_rgba(175,135,77,1.00)] outline-1 outline-offset-[-0.94px] outline-stone-500 inline-flex flex-col justify-center items-center gap-1">
                    <div className="relative w-6 h-6 overflow-hidden">
                        <div className="w-4 h-4 left-[3.38px] top-[3.38px] absolute bg-white" />
                    </div>
                </div>
            </div>
            <div className="w-[549px] h-28 left-[29px] top-[380px] absolute bg-neutral-800 rounded-[10px] shadow-[0px_2px_0px_0px_rgba(30,30,30,1.00)]" />
            <div className="w-[549px] h-7 left-[29px] top-[380px] absolute bg-stone-900 rounded-tl-[10px] rounded-tr-[10px]" />
            <div className="left-[49px] top-[389px] absolute justify-start text-white text-xs font-normal font-['Belanosima']">
                Gauge
            </div>
            <div className="w-[3px] h-2.5 left-[41px] top-[391px] absolute bg-white" />
            <div className="w-5 left-[552px] top-[383px] absolute inline-flex flex-col justify-start items-start">
                <div className="w-5 h-5 p-1.5 bg-red-500 rounded-md shadow-[0px_2.109375px_0px_0px_rgba(192,57,43,1.00)] outline-[0.53px] outline-offset-[-0.53px] outline-orange-700 inline-flex flex-col justify-center items-center gap-[2.64px]">
                    <div className="relative w-3 h-3 overflow-hidden">
                        <div className="w-2 h-2.5 left-[1.90px] top-[0.95px] absolute bg-white" />
                    </div>
                </div>
            </div>
            <div className="w-5 left-[526px] top-[383px] absolute inline-flex flex-col justify-start items-start">
                <div className="w-5 h-5 p-1.5 bg-gray-400 rounded-md shadow-[0px_2.109375px_0px_0px_rgba(127,140,141,1.00)] outline-[0.53px] outline-offset-[-0.53px] outline-gray-500 inline-flex flex-col justify-center items-center gap-[2.64px]">
                    <div className="relative w-3 h-3 overflow-hidden">
                        <div className="w-2 h-2.5 left-[2.50px] top-[1.25px] absolute bg-white" />
                    </div>
                </div>
            </div>
            <div className="w-5 left-[500px] top-[383px] absolute inline-flex flex-col justify-start items-start">
                <div className="w-5 h-5 py-1.5 bg-amber-400 rounded-md shadow-[0px_2.109375px_0px_0px_rgba(175,135,77,1.00)] outline-[0.53px] outline-offset-[-0.53px] outline-stone-500 inline-flex flex-col justify-center items-center gap-[2.64px]">
                    <div className="relative w-3 h-3 overflow-hidden">
                        <div className="w-2 h-2 left-[1.90px] top-[1.90px] absolute bg-white" />
                    </div>
                </div>
            </div>
            <div className="w-5 pt-0.5 left-[474px] top-[383px] absolute inline-flex flex-col justify-start items-start">
                <div className="w-5 h-5 p-1.5 bg-zinc-600 rounded-md inline-flex flex-col justify-center items-center gap-[2.64px]">
                    <div className="relative w-3 h-3 overflow-hidden">
                        <div className="w-2 h-[1.27px] left-[2.16px] top-[5.80px] absolute bg-white" />
                    </div>
                </div>
            </div>
            <div className="w-7 h-7 px-3 py-2 left-[44px] top-[442px] absolute bg-neutral-800 rounded-[5px] border border-gray-500" />
            <div
                data-propriété-1="Par défaut"
                className="w-32 h-7 px-3 py-2 left-[87px] top-[442px] absolute bg-neutral-800 rounded-[5px] outline-1 outline-offset-[-1px] outline-gray-500 inline-flex justify-start items-center"
            >
                <div className="justify-start text-gray-400 text-base font-normal font-['Beiruti']">
                    Label
                </div>
            </div>
            <div
                data-propriété-1="Par défaut"
                className="w-32 h-7 px-3 py-2 left-[223px] top-[442px] absolute bg-neutral-800 rounded-[5px] outline-1 outline-offset-[-1px] outline-gray-500 inline-flex justify-start items-center"
            >
                <div className="justify-start text-gray-400 text-base font-normal font-['Beiruti']">
                    Label
                </div>
            </div>
            <div
                data-propriété-1="Par défaut"
                className="w-32 h-7 px-3 py-2 left-[438px] top-[442px] absolute bg-neutral-800 rounded-[5px] outline-1 outline-offset-[-1px] outline-gray-500 inline-flex justify-start items-center"
            >
                <div className="justify-start text-gray-400 text-base font-normal font-['Beiruti']">
                    Label
                </div>
            </div>
            <div
                data-propriété-1="Par défaut"
                className="w-12 h-12 left-[364px] top-[421px] absolute"
            >
                <div className="w-9 h-4 left-[13.75px] top-[28.75px] absolute bg-neutral-800 rounded-xl border border-gray-500" />
                <div className="left-[8.75px] top-[2px] absolute justify-start text-white text-base font-normal font-['Belanosima']">
                    Label
                </div>
                <div className="w-7 h-7 left-0 top-[23.75px] absolute bg-gray-500 rounded-full" />
            </div>
            <div className="w-64 h-0 left-[329px] top-[350px] absolute outline-1 outline-offset-[-0.50px] outline-gray-500"></div>
            <div className="w-64 h-0 left-[29px] top-[350px] absolute outline-1 outline-offset-[-0.50px] outline-gray-500"></div>
            <div className="w-9 left-[285px] top-[327px] absolute inline-flex flex-col justify-start items-start">
                <div className="w-9 h-9 py-2.5 bg-amber-400 rounded-[10px] shadow-[0px_3.75px_0px_0px_rgba(175,135,77,1.00)] outline-1 outline-offset-[-0.94px] outline-stone-500 inline-flex flex-col justify-center items-center gap-1">
                    <div className="relative w-6 h-6 overflow-hidden">
                        <div className="w-4 h-4 left-[3.38px] top-[3.38px] absolute bg-white" />
                    </div>
                </div>
            </div>
            <div className="left-[500px] top-[15px] absolute inline-flex flex-col justify-start items-start">
                <div className="self-stretch h-9 px-5 py-2.5 bg-amber-400 rounded-[10px] shadow-[0px_3.75px_0px_0px_rgba(175,135,77,1.00)] outline outline-1 outline-offset-[-0.94px] outline-stone-500 inline-flex justify-between items-center">
                    <div className="text-center justify-start text-white text-sm font-normal font-['Belanosima']">
                        Level
                    </div>
                </div>
            </div>
            <div
                data-propriété-1="Par défaut"
                className="w-32 h-7 px-3 py-2 left-[29px] top-[26px] absolute bg-neutral-800 rounded-[5px] outline outline-1 outline-offset-[-1px] outline-gray-500 inline-flex justify-start items-center"
            >
                <div className="justify-start text-gray-400 text-base font-normal font-['Beiruti']">
                    Label
                </div>
            </div>
            <div
                data-propriété-1="Par défaut"
                className="w-32 h-7 px-3 py-2 left-[185px] top-[26px] absolute bg-neutral-800 rounded-[5px] outline outline-1 outline-offset-[-1px] outline-gray-500 inline-flex justify-start items-center"
            >
                <div className="justify-start text-gray-400 text-base font-normal font-['Beiruti']">
                    Label
                </div>
            </div>
            <div
                data-propriété-1="Par défaut"
                className="w-32 h-7 px-3 py-2 left-[341px] top-[26px] absolute bg-neutral-800 rounded-[5px] outline outline-1 outline-offset-[-1px] outline-gray-500 inline-flex justify-start items-center"
            >
                <div className="justify-start text-gray-400 text-base font-normal font-['Beiruti']">
                    Label
                </div>
            </div>
        </div>
    );
}
