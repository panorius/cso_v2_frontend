import React, { useEffect, useState } from "react";
import patternStandard from "@/assets/images/patterns/standard.png";
import { Title } from "@/components/ui/Title";
import { Room, RoomService } from "@/lib/services/RoomService";
import { Button, Card, CardBody, Spinner, useDisclosure } from "@heroui/react";
import { toast } from "sonner";
import { RoomCard } from "./RoomCard";
import { CreateRoomModal } from "./CreateRoomModal";

export default function RoomsSection() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoadingRooms, setIsLoadingRooms] = useState(true);

    useEffect(() => {
        loadRooms();
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

    return (
        <section className="flex flex-col gap-10">
            <div className="flex items-center gap-3">
                <i className="icon-campground" />
                <Title withDecorations level="h2" className="">
                    Mes campagnes{" "}
                    <span className="ml-2 font-medium text-slate-500 opacity-70">
                        ({rooms.length}/999)
                    </span>
                </Title>
            </div>

            {isLoadingRooms ? (
                <div className="flex justify-center py-8">
                    <Spinner size="lg" />
                </div>
            ) : rooms.length === 0 ? (
                <Card>
                    <CardBody
                        className="flex flex-col gap-10 py-20 space-y-8 text-center border-8 border-white/50 rounded-3xl"
                        style={{
                            backgroundImage: patternStandard.src
                                ? `url(${patternStandard.src})`
                                : undefined,
                            backgroundSize: 200,
                        }}
                    >
                        <p className="text-default-500">
                            Vous n'avez pas encore de campagne. Créez-en une
                            pour commencer !
                        </p>
                        {/* {templates.length === 0 && (
                                    <p className="mt-2 text-sm text-warning">
                                        Note : Vous devez d'abord créer ou
                                        obtenir un template pour créer une
                                        campagne.
                                    </p>
                                )} */}
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
            {/* Modal de création de room */}
            {/* <CreateRoomModal
                isOpen={isOpen}
                onClose={onClose}
                onSuccess={handleRoomCreated}
                templates={templates}
            /> */}
        </section>
    );
}
