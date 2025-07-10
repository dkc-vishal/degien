"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home(){
    
    const router = useRouter() ; 

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token") ; 
        
        const refreshToken = localStorage.getItem("refresh_token") ; 

        if(accessToken && refreshToken){
            router.replace("/Dashboard") ; 
        }
        else{
            router.replace("/Auth/Login") ; 
        }

    }, [router])


    return null ; 

}  