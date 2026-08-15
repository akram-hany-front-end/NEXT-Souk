"use client";

import { useEffect, useState } from "react"

type UserData = {
    name: string;
    email: string;
    phone: string;
    city: string;
    age: string;
    nationalId: string;
    role: string;
};
const Page = () => {
    const [name, setName] = useState<UserData | null>(null)

    // get user From api 

    const fetchedProfile = async () => {
        const res = await fetch("/api/profile")
        if (!res.ok) {
            console.error("Failed to Get user")
            return;
        }
        const data = await res.json()
        setName(data.user)

    }
    useEffect(()=>{
        const load = async () => {
            await fetchedProfile()
        }
        load()
    },[])
    return (
        <div className="text-center mt-10 ">
<h1 className="text-4xl text-white ">Welcome back {name?.name}</h1>
        </div>
    )
}
export default Page