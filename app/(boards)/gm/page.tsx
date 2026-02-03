"use client";

import { useEffect, useState } from "react";
import { Title } from "@/components/ui/Title";
import { useAuthContext } from "@/lib/contexts/AuthContext";
import { Button, Card, CardBody, Spinner, useDisclosure } from "@heroui/react";
import { RoomService, Room } from "@/lib/services/RoomService";
import { TemplateService, Template } from "@/lib/services/TemplateService";
import { RoomCard } from "@/components/dashboard/rooms/RoomCard";
import { TemplateCard } from "@/components/dashboard/templates/TemplateCard";
import { CreateRoomModal } from "@/components/dashboard/rooms/CreateRoomModal";
import { toast } from "sonner";
import TemplateList from "@/components/dashboard/templates/TemplateList";
import { vi } from "zod/v4/locales";

type ViewMode = "actualites" | "campaigns" | "templates" | "workshop";

interface MenuItem {
    id: ViewMode;
    label: string;
    icon: string;
}

export default function GmPage() {
    const { user, logout } = useAuthContext();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [viewMode, setViewMode] = useState<ViewMode>("campaigns");

    const [rooms, setRooms] = useState<Room[]>([]);
    const [templates, setTemplates] = useState<Template[]>([]);
    const [isLoadingRooms, setIsLoadingRooms] = useState(true);
    const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);

    useEffect(() => {
        loadRooms();
        loadTemplates();
    }, []);

    const loadRooms = async () => {
        setIsLoadingRooms(true);
        try {
            const result = await RoomService.getUserRooms();
            if (result.success && result.data) {
                setRooms(result.data);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des rooms:", error);
        } finally {
            setIsLoadingRooms(false);
        }
    };

    const loadTemplates = async () => {
        setIsLoadingTemplates(true);
        try {
            const result = await TemplateService.getUserTemplates();
            if (result.success && result.data) {
                console.log(result.data);
                setTemplates(result.data);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des templates:", error);
        } finally {
            setIsLoadingTemplates(false);
        }
    };

    const handleDeleteRoom = async (roomId: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette room ?")) {
            return;
        }

        try {
            const result = await RoomService.deleteRoom(roomId);
            if (result.success) {
                toast.success("Room supprimée avec succès");
                loadRooms();
            } else {
                toast.error(result.error || "Erreur lors de la suppression");
            }
        } catch (error) {
            toast.error("Une erreur est survenue");
        }
    };

    const handleRoomCreated = () => {
        loadRooms();
    };

    const menuItems: MenuItem[] = [
        { id: "actualites", label: "Actualités", icon: "icon-news" },
        { id: "campaigns", label: "Vos Campagnes", icon: "icon-campground" },
        { id: "templates", label: "Vos Modèles", icon: "icon-scroll" },
        { id: "workshop", label: "Workshop", icon: "icon-boxes" },
    ];

    const activeIndex = menuItems.findIndex((item) => item.id === viewMode);

    return (
        <div className="container flex flex-col p-10 mx-auto gap-30 bg-purple-main/80 rounded-2xl">
            {/* Section Profil utilisateur */}
            {/* <section className="space-y-4">
                <Title withDecorations level="h2" className="mb-4">
                    Bienvenue, {user?.pseudo || "Aventurier"}
                </Title>

                <Card className="max-w-md">
                    <CardBody className="space-y-2">
                        <p>
                            <strong>Email:</strong> {user?.email}
                        </p>
                        <p>
                            <strong>ID:</strong> {user?.id}
                        </p>
                        <p>
                            <strong>Langue:</strong> {user?.lang || "fr"}
                        </p>
                        <Button
                            color="danger"
                            variant="flat"
                            onPress={logout}
                            className="mt-4"
                        >
                            Se déconnecter
                        </Button>
                    </CardBody>
                </Card>
            </section> */}

            <div className="flex justify-center pt-4">
                <div
                    className="bg-[#2d2b38] p-1.5 rounded-full flex items-center shadow-2xl border border-white/5 relative overflow-hidden"
                    style={{ minWidth: "400px" }}
                >
                    {/* Background Slider Indicator - Width and Transform are dynamic */}
                    <div
                        className="absolute top-1.5 bottom-1.5 left-1.5 bg-[#f59e0b] rounded-full transition-all duration-300 ease-in-out shadow-lg shadow-orange-900/40"
                        style={{
                            width: `calc(${100 / menuItems.length}% - 3px)`,
                            transform: `translateX(${activeIndex * 100}%)`,
                        }}
                    />

                    {/* Map through menu items to create buttons */}
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setViewMode(item.id);
                                console.log(item.id);
                            }}
                            className={`relative z-10 flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${viewMode === item.id ? "text-white" : "text-slate-400 hover:text-white cursor-pointer"}`}
                        >
                            <i className={item?.icon}></i> {item.id}
                        </button>
                    ))}
                </div>
            </div>

            {/* Section Campagnes/Rooms */}
            {viewMode === "campaigns" ? (
                <section className="flex flex-col gap-10">
                    <div className="flex items-center justify-between">
                        <Title withDecorations level="h2" className="mb-4">
                            Mes Campagnes
                        </Title>
                        <Button color="primary" onPress={onOpen}>
                            + Créer une campagne
                        </Button>
                    </div>

                    {isLoadingRooms ? (
                        <div className="flex justify-center py-8">
                            <Spinner size="lg" />
                        </div>
                    ) : rooms.length === 0 ? (
                        <Card>
                            <CardBody className="py-8 text-center">
                                <p className="text-default-500">
                                    Vous n'avez pas encore de campagne. Créez-en
                                    une pour commencer !
                                </p>
                                {templates.length === 0 && (
                                    <p className="mt-2 text-sm text-warning">
                                        Note : Vous devez d'abord créer ou
                                        obtenir un template pour créer une
                                        campagne.
                                    </p>
                                )}
                            </CardBody>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {rooms.map((room) => (
                                <RoomCard
                                    key={room.id}
                                    room={room}
                                    onDelete={handleDeleteRoom}
                                />
                            ))}
                        </div>
                    )}
                </section>
            ) : null}

            {/* Section Modèles de fiche */}
            {viewMode === "templates" ? (
                <section className="flex flex-col gap-10">
                    <div className="flex items-center justify-between">
                        <Title withDecorations level="h2" className="mb-4">
                            Mes Modèles de Fiche
                        </Title>
                    </div>

                    {isLoadingTemplates ? (
                        <div className="flex justify-center py-8">
                            <Spinner size="lg" />
                        </div>
                    ) : templates.length === 0 ? (
                        <Card>
                            <CardBody className="py-8 text-center">
                                <p className="text-default-500">
                                    Vous n'avez pas encore de template. Créez-en
                                    un ou utilisez un template public !
                                </p>
                            </CardBody>
                        </Card>
                    ) : (
                        // <div className="flex flex-wrap w-full gap-6">
                        //     {templates.map((template) => (
                        //         <TemplateCard
                        //             key={template._id}
                        //             props={template.props}
                        //             _id={template._id}
                        //         />
                        //     ))}
                        // </div>
                        <TemplateList templates={templates} />
                    )}
                </section>
            ) : null}

            {viewMode === "workshop" ? (
                <section className="flex flex-col gap-10 py-20 space-y-8 text-center border bg-black/20 rounded-3xl border-white/5">
                    <div className="flex flex-col items-center gap-4">
                        <i className="icon-boxes" />
                        <h2 className="text-4xl italic font-black text-white uppercase">
                            WORKSHOP COMMUNAUTAIRE
                        </h2>
                        <p className="max-w-md text-slate-400">
                            Découvrez des milliers de modèles créés par la
                            communauté CSO.
                        </p>
                        <button className="mt-8 px-10 py-4 bg-[#f59e0b] text-white font-black rounded-full shadow-xl hover:scale-105 transition-transform">
                            EXPLORER LE WORKSHOP
                        </button>
                    </div>
                </section>
            ) : null}

            {/* Modal de création de room */}
            <CreateRoomModal
                isOpen={isOpen}
                onClose={onClose}
                onSuccess={handleRoomCreated}
                templates={templates}
            />
        </div>
    );
}
