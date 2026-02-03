"use client";

import { Room } from "@/lib/services/RoomService";
import Link from "next/link";

interface RoomCardProps {
    room: Room;
    onDelete?: (roomId: string) => void;
}

const D20Icon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#94a3b8"
        strokeWidth="1.5"
    >
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z"></path>
        <path d="M12 22V12"></path>
        <path d="M12 12L3 7"></path>
        <path d="M12 12l9-5"></path>
    </svg>
);

const CharacterIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#94a3b8"
        strokeWidth="1.5"
    >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const TrashIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
    >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
);

const DoorIcon = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
    >
        <path d="M3 3h18v18H3z"></path>
        <path d="M9 3v18"></path>
        <path d="M15 3v18"></path>
        <path d="M3 9h18"></path>
        <path d="M3 15h18"></path>
    </svg>
);

export function RoomCard({ room, onDelete }: RoomCardProps) {
    return (
        <div className="flex items-center gap-6 rounded-lg bg-gradient-to-r from-[#1e1e2e] to-[#2a2a3a] p-4 shadow-lg transition-all hover:shadow-xl">
            {/* Avatar */}
            <div className="relative w-20 h-20 shrink-0">
                {room.image?.url ? (
                    <img
                        src={room.image.url}
                        alt={room.name}
                        className="h-full w-full rounded-full border-4 border-[#f59e0b] object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full border-4 border-[#f59e0b] bg-gradient-to-br from-primary-400 to-secondary-400">
                        <span className="text-3xl font-bold text-white">
                            {room.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                )}
                {room.isPrivate && (
                    <div className="absolute -right-1 -top-1 rounded-full bg-[#ef4444] p-1">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="white"
                            stroke="white"
                            strokeWidth="2"
                        >
                            <rect
                                x="3"
                                y="11"
                                width="18"
                                height="11"
                                rx="2"
                                ry="2"
                            ></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                )}
            </div>

            {/* Infos */}
            <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                    <h3 className="text-xl font-bold tracking-tight text-white uppercase truncate">
                        {room.name}
                    </h3>
                    <span className="text-sm font-medium truncate text-slate-400">
                        Créée le {new Date(room.createdAt).toLocaleDateString()}
                    </span>
                </div>

                {/* Galerie Personnages */}
                <div className="flex gap-2 mt-2">
                    {room.note && room.note.length > 0 ? (
                        room.note.slice(0, 5).map((_, i) => (
                            <div
                                key={i}
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#4a4a5a]"
                            >
                                {i % 2 === 0 ? <D20Icon /> : <CharacterIcon />}
                            </div>
                        ))
                    ) : (
                        <>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#4a4a5a]">
                                <D20Icon />
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#4a4a5a] opacity-50">
                                <CharacterIcon />
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                {onDelete && (
                    <button
                        onClick={() => onDelete(room.id)}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ef4444] shadow-md transition-all hover:bg-red-600 hover:shadow-lg"
                    >
                        <TrashIcon />
                    </button>
                )}
                <Link
                    href={`/rooms/${room.id}`}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f59e0b] shadow-lg shadow-orange-900/20 transition-all hover:bg-[#fbbf24] hover:shadow-xl"
                >
                    <DoorIcon />
                </Link>
            </div>
        </div>
    );
}
