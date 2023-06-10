"use client"
import { CheckIcon, UserPlus, X } from "lucide-react";
import { FC, useState } from "react";

interface FriendRequestsProps {
    IncomingFriendRequest: IncomingFriendRequest[]
    sessionId: string
}

const FriendRequests: FC<FriendRequestsProps> = ({ IncomingFriendRequest }) => {
    const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(IncomingFriendRequest)

    return (<>
        {
            friendRequests.length === 0 ? (
                <p className="text-sm text-zinc-500">Nothing to show here...</p>
            ) : (
                friendRequests.map((friendRequest) => (
                    <div className="flex gap-4 items-center" key={friendRequest.senderId}>
                        <UserPlus className="text-black" />

                        <p className="font-medium text-lg">{friendRequest.senderEmail}</p>

                        <button aria-label="accept friend" className="w-8 h-8 bg-indigo-500 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-medium"><CheckIcon className="font-semibold text-white w-3/4 h-3/4" /></button>

                        <button aria-label="deny friend" className="w-8 h-8 bg-red-500 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-medium"><X className="font-semibold text-white w-3/4 h-3/4" /></button>

                    </div>
                ))
            )
        }
    </>);
}

export default FriendRequests;