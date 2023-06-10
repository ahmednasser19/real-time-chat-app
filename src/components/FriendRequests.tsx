"use client"
import axios from "axios";
import { CheckIcon, UserPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

interface FriendRequestsProps {
    IncomingFriendRequest: IncomingFriendRequest[]
    sessionId: string
}

const FriendRequests: FC<FriendRequestsProps> = ({ IncomingFriendRequest }) => {

    const router = useRouter()
    const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(IncomingFriendRequest)


    const acceptFriend = async (senderId: string) => {
        await axios.post('/api/friends/accept', { id: senderId })

        setFriendRequests((prev) => prev.filter((request) => request.senderId !== senderId))

        router.refresh()
    }


    const denyFriend = async (senderId: string) => {
        await axios.post('/api/friends/deny', { id: senderId })

        setFriendRequests((prev) => prev.filter((request) => request.senderId !== senderId))

        router.refresh()
    }


    return (<>
        {
            friendRequests.length === 0 ? (
                <p className="text-sm text-zinc-500">Nothing to show here...</p>
            ) : (
                friendRequests.map((friendRequest) => (
                    <div className="flex gap-4 items-center" key={friendRequest.senderId}>
                        <UserPlus className="text-black" />

                        <p className="font-medium text-lg">{friendRequest.senderEmail}</p>

                        <button onClick={() => acceptFriend(friendRequest.senderId)} aria-label="accept friend" className="w-8 h-8 bg-indigo-500 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-medium"><CheckIcon className="font-semibold text-white w-3/4 h-3/4" /></button>

                        <button onClick={() => denyFriend(friendRequest.senderId)} aria-label="deny friend" className="w-8 h-8 bg-red-500 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-medium"><X className="font-semibold text-white w-3/4 h-3/4" /></button>

                    </div>
                ))
            )
        }
    </>);
}

export default FriendRequests;