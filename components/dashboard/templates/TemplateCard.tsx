"use client";

import { Template } from "@/lib/services/TemplateService";
import defaultTemplate from "@/assets/images/default/template.png";
import Link from "next/link";
import Image from "next/image";

const ToolIcon = () => (
    <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-[#f59e0b]/10 transition-colors hover:bg-[#f59e0b]/30">
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
        >
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
    </div>
);

export function TemplateCard({ props, _id }: Template) {
    console.log("TemplateCard props:", props);
    return (
        // <div className="group relative flex h-[300px] w-1/4 flex-col rounded-lg bg-[#3c3c3c] shadow-2xl">
        //     <div>
        //         <Image
        //             src={props?.image ? props?.image?.url : defaultTemplate}
        //             alt={props?.name}
        //             className="object-cover w-full h-40 rounded-t-lg"
        //         />
        //     </div>
        //     {/* Tags Zone */}
        //     <div className="flex flex-wrap justify-center gap-1 p-3 bg-black/10">
        //         {props.tags && props.tags.length > 0 ? (
        //             props.tags.slice(0, 4).map((tag, index) => (
        //                 <span
        //                     key={`${tag}-${index}`}
        //                     className="rounded-full bg-[#60677a] px-3 py-1 text-[9px] font-bold uppercase text-white/80"
        //                 >
        //                     {tag}
        //                 </span>
        //             ))
        //         ) : (
        //             <span className="rounded-full bg-[#60677a] px-3 py-1 text-[9px] font-bold uppercase text-white/80">
        //                 Template
        //             </span>
        //         )}
        //     </div>

        //     {/* Actions Bar */}
        //     <div className="flex items-center justify-around h-12 border-t border-white/5 bg-black/30">
        //         <Link href={`/templates/${_id}`}>
        //             <ToolIcon />
        //         </Link>
        //         <ToolIcon />
        //         <ToolIcon />
        //         <ToolIcon />
        //     </div>
        // </div>
        <div className="template-card h-[300px] shadow-2xl relative group">
            {/* Header Bar */}
            <div className="flex items-center justify-between h-10 px-3 border-b bg-black/20 border-white/5"></div>

            {/* Preview Area */}
            <div className="flex-1 bg-[#474e64] relative flex items-center justify-center overflow-hidden">
                {/* Map/Parchment Placeholder like in the image */}
                <div className="w-4/5 h-3/5 border-2 border-white/10 rounded-lg flex flex-col items-center justify-center bg-[#565e75] relative z-10">
                    <div className="mt-4 bg-black/40 px-6 py-1 rounded text-[10px] font-black tracking-widest text-white uppercase">
                        {props?.name}
                    </div>
                </div>
                {/* Faint background image */}
                <Image
                    src={props?.image ? props?.image.url : defaultTemplate}
                    alt={props?.name}
                    className="absolute inset-0 object-cover w-full h-full transition-opacity opacity-10 group-hover:opacity-20"
                />
            </div>

            {/* Tags Zone */}
            <div className="flex flex-wrap justify-center gap-1 p-3 bg-black/10">
                {props.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1 bg-[#60677a] rounded-full text-[9px] font-bold text-white/80 uppercase"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-around h-12 border-t bg-black/30 border-white/5"></div>
        </div>
    );
}
