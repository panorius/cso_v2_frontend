import { Template } from "@/lib/services/TemplateService";
import defaultTemplate from "@/assets/images/default/template.png";
import Image from "next/image";
import React from "react";

interface TemplateListProps {
    templates: Template[];
}

const TemplateList: React.FC<TemplateListProps> = ({ templates }) => {
    return (
        <>
            <style>
                {`.template-card {
            background: #363b4e;
            // border-radius: 12px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            // border-bottom: 4px solid transparent;
            transition: all 0.2s;
        }
        .template-card:hover {
            transform: translateY(-5px);
            // border-bottom-color: #f59e0b;
        }
        .action-circle {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.1s;
        }
        .action-circle:active { transform: scale(0.9); }`}
            </style>
            {templates.map(({ props, _id }) => (
                <div
                    key={_id}
                    className="template-card h-[300px] shadow-2xl relative group border-8 border-white/80 hover:border-orange rounded-3xl"
                >
                    {/* Header Bar */}
                    {/* <div className="flex items-center justify-between h-10 px-3 border-b bg-black/20 border-white/5">
                        <div className="flex items-center justify-center w-4 h-4 border rounded border-white/20">
                            <i className="icon-user" />
                        </div>
                        <div className="flex items-center justify-center w-4 h-4 border rounded border-white/20">
                            <i className="icon-earth" />
                        </div>
                    </div> */}

                    {/* Preview Area */}
                    <div className="flex-1 bg-[#474e64] relative flex items-center justify-center overflow-hidden">
                        {/* Map/Parchment Placeholder like in the image */}
                        <div className="w-4/5 h-10 border-2 border-white/10 rounded-lg flex flex-col items-center justify-center bg-[#565e75] relative z-10">
                            <i className="icon-parchment" />
                            <div className="bg-black/40 px-6 py-1 rounded text-[10px] font-black tracking-widest text-white uppercase">
                                {props.name}
                            </div>
                        </div>
                        {/* Faint background image */}
                        <Image
                            src={
                                props?.image
                                    ? props?.image.url
                                    : defaultTemplate
                            }
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
                    <div className="flex items-center justify-around h-12 px-10 border-t bg-black/30 border-white/5">
                        <i className="cursor-pointer icon-pen text-orange" />
                        <i className="cursor-pointer icon-edit text-orange" />
                        <i className="cursor-pointer icon-print text-orange" />
                        <i className="cursor-pointer icon-solar-system text-orange" />
                        <i className="cursor-pointer text-red-500/80 icon-trash-alt" />
                    </div>
                </div>
            ))}
        </>
    );
};

export default TemplateList;
