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
import patternStandard from "@/assets/images/patterns/standard.png";
import NewsSection from "@/components/dashboard/news/NewsSection";
import WorkshpSection from "@/components/dashboard/workshops/WorkshopSection";
import WorkshopSection from "@/components/dashboard/workshops/WorkshopSection";
import TemplatesSection from "@/components/dashboard/templates/TemplatesSection";
import RoomsSection from "@/components/dashboard/rooms/RoomsSection";
import { StyledTabs } from "@/components/ui/StyledTabs";
import { useTranslations } from "next-intl";

type ViewMode = "actualites" | "campaigns" | "templates" | "workshop";

interface MenuItem {
    id: ViewMode;
    label: string;
    icon: string;
}

export default function DashboardPage() {
    const { user, logout } = useAuthContext();
    const t = useTranslations("common");

    const [viewMode, setViewMode] = useState<ViewMode>("campaigns");
    const [selected, setSelected] = useState("campaigns");

    const menuItems: MenuItem[] = [
        { id: "actualites", label: "Actualités", icon: "icon-radio" },
        { id: "campaigns", label: "Vos Campagnes", icon: "icon-campground" },
        { id: "templates", label: "Vos Modèles", icon: "icon-scroll" },
        { id: "workshop", label: "Workshop", icon: "icon-boxes" },
    ];

    const activeIndex = menuItems.findIndex((item) => item.id === viewMode);

    return (
        <div className="container flex flex-col p-10 mx-auto gap-15">
            <div className="flex justify-center pt-4">
                <StyledTabs
                    fullWidth
                    aria-label="Tabs form"
                    selectedKey={selected}
                    size="lg"
                    floatingPanel
                    disableCursorAnimation
                    borderRadius="xl"
                    onSelectionChange={setSelected}
                    items={[
                        {
                            key: "campaigns",
                            title: t("campaigns"),
                            content: <RoomsSection />,
                        },
                        {
                            key: "templates",
                            title: t("templates"),
                            content: <TemplatesSection />,
                        },
                    ]}
                />
            </div>
        </div>
    );
}
