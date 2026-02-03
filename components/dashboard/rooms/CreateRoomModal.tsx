"use client";

import { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Select,
    SelectItem,
    Switch,
} from "@heroui/react";
import { RoomService, CreateRoomInput } from "@/lib/services/RoomService";
import { Template } from "@/lib/services/TemplateService";
import { toast } from "sonner";

interface CreateRoomModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    templates: Template[];
}

export function CreateRoomModal({
    isOpen,
    onClose,
    onSuccess,
    templates,
}: CreateRoomModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<CreateRoomInput>({
        name: "",
        templateId: "",
        isPrivate: false,
        password: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const input: CreateRoomInput = {
                ...formData,
                image: imageFile || undefined,
            };

            const result = await RoomService.createRoom(input);

            if (result.success) {
                toast.success("Room créée avec succès !");
                onSuccess?.();
                handleClose();
            } else {
                toast.error(result.error || "Erreur lors de la création");
            }
        } catch (error) {
            toast.error("Une erreur est survenue");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            name: "",
            templateId: "",
            isPrivate: false,
            password: "",
        });
        setImageFile(null);
        setImagePreview("");
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="2xl"
            scrollBehavior="inside"
        >
            <ModalContent>
                <form onSubmit={handleSubmit}>
                    <ModalHeader>Créer une nouvelle room</ModalHeader>
                    <ModalBody className="space-y-4">
                        {/* Nom de la room */}
                        <Input
                            label="Nom de la room"
                            placeholder="Ma super campagne"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            isRequired
                        />

                        {/* Sélection du template */}
                        {templates.length > 0 ? (
                            <Select
                                label="Template"
                                placeholder="Choisissez un template"
                                selectedKeys={
                                    formData.templateId
                                        ? [formData.templateId]
                                        : []
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        templateId: e.target.value,
                                    })
                                }
                                isRequired
                            >
                                {templates.map((template) => (
                                    <SelectItem key={template._id}>
                                        {template.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        ) : (
                            <div className="p-4 text-center border-2 border-dashed rounded-lg border-warning">
                                <p className="text-sm text-warning">
                                    Aucun template disponible. Vous devez
                                    d'abord créer un template pour pouvoir créer
                                    une room.
                                </p>
                            </div>
                        )}

                        {/* Upload d'image */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Image de la room (optionnel)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                            />
                            {imagePreview && (
                                <div className="mt-2">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="object-cover w-32 h-32 rounded-lg"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Room privée */}
                        <Switch
                            isSelected={formData.isPrivate}
                            onValueChange={(value) =>
                                setFormData({ ...formData, isPrivate: value })
                            }
                        >
                            Room privée (nécessite un mot de passe)
                        </Switch>

                        {/* Mot de passe (si privée) */}
                        {formData.isPrivate && (
                            <Input
                                type="password"
                                label="Mot de passe"
                                placeholder="Entrez un mot de passe"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                isRequired={formData.isPrivate}
                            />
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="danger"
                            variant="light"
                            onPress={handleClose}
                            isDisabled={isLoading}
                        >
                            Annuler
                        </Button>
                        <Button
                            color="primary"
                            type="submit"
                            isLoading={isLoading}
                            isDisabled={templates.length === 0}
                        >
                            Créer
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}
