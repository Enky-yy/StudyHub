'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { isLoggedIn } from "@/libs/auth"

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoutes({children}:Props){
    const router = useRouter();

    useEffect( ()=>
        {
            if(!isLoggedIn()){
                router.replace('/login')
            }
        },[router]);

    if(!isLoggedIn()){
        return null;
    }

    return <>{children}</>;
}