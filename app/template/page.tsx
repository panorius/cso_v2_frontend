// "use client";

// import { Sidebar } from "@/components/template/Sidebar";
// import { MainCanvas } from "@/components/template/MainCanvas";
// import {
//     CharacterSheetTemplate,
//     ModuleType,
//     ModuleCategory,
// } from "@/components/template/types";
// import { useState } from "react";

// const INITIAL_TEMPLATE: CharacterSheetTemplate = {
//     name: "Donjons & Dragons 5E",
//     gameSystem: "D20 System",
//     description: "Modèle officiel pour la 5ème édition.",
//     theme: {
//         primaryColor: "#f59e0b", // Ambre / Orange
//         accentColor: "#b91c1c", // Rouge
//         backgroundColor: "#241b2f", // Violet sombre
//         headerColor: "#f59e0b",
//     },
//     sections: [
//         {
//             id: "sec-1",
//             title: "Caractéristiques",
//             icon: "user",
//             modules: [
//                 {
//                     id: "mod-1",
//                     type: "points",
//                     category: ModuleCategory.MINI,
//                     label: "Points de Vie",
//                     config: { label: "Points de Vie (PV)", max: 20 },
//                 },
//                 {
//                     id: "mod-2",
//                     type: "stat_mod",
//                     category: ModuleCategory.CARACTERISTIQUE,
//                     label: "Force",
//                     config: { label: "Force (FOR)", fieldLabels: ["Force"] },
//                 },
//             ],
//         },
//         {
//             id: "sec-2",
//             title: "Inventaire",
//             icon: "folder",
//             modules: [],
//         },
//     ],
// };

// export default function TemplateCreate() {
//     const [sheet, setSheet] =
//         useState<CharacterSheetTemplate>(INITIAL_TEMPLATE);

//     const handleAddModule = (
//         type: ModuleType,
//         category: ModuleCategory,
//         label: string
//     ) => {
//         const newModule = {
//             id: Math.random().toString(36).substr(2, 9),
//             type,
//             category,
//             label,
//             config: { label: label },
//         };

//         const updatedSections = [...sheet.sections];
//         if (updatedSections.length > 0) {
//             updatedSections[0].modules.push(newModule);
//             setSheet({ ...sheet, sections: updatedSections });
//         }
//     };

//     return (
//         <div className="flex h-screen w-full bg-[#1a1423] overflow-hidden text-white">
//             {/* Left Sidebar - App Context */}
//             <div className="w-20 bg-[#140e1b] border-r border-[#241b2f] flex flex-col items-center py-8 gap-10">
//                 {/* <div className="flex items-center justify-center w-12 h-12 transition-transform transform shadow-2xl cursor-pointer bg-orange rounded-2xl shadow-orange/30 rotate-12 hover:rotate-0">
//                     <i className="w-6 h-6 text-white icon-text" />
//                 </div> */}

//                 <nav className="flex flex-col flex-1 gap-6 text-center">
//                     <div className="flex items-center justify-center w-12 h-12 text-white border cursor-pointer bg-orange rounded-2xl border-orange/80">
//                         <i className="content-center w-6 h-6 icon-user" />
//                     </div>
//                     <div className="flex items-center justify-center w-12 h-12 transition-all cursor-pointer bg-grey-light rounded-2xl text-gray-light hover:text-white hover:bg-orange/80">
//                         <i className="content-center w-full h-full icon-paw-claws" />
//                     </div>
//                     <div className="flex items-center justify-center w-12 h-12 transition-all cursor-pointer bg-grey-light rounded-2xl text-gray-light hover:text-white hover:bg-orange/80">
//                         <i className="content-center w-6 h-6 icon-dice-d6" />
//                     </div>
//                 </nav>

//                 {/* <div className="flex items-center justify-center w-12 h-12 transition-all cursor-pointer bg-grey-light rounded-2xl text-gray-light hover:text-orange">
//                     <i className="w-6 h-6 icon-dice-d6" />
//                 </div> */}
//             </div>

//             <MainCanvas sheet={sheet} setSheet={setSheet} />

//             <Sidebar onAddModule={handleAddModule} />
//         </div>
//     );
// }
