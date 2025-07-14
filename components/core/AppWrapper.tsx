"use client" ; 

import { useEffect, useState } from "react";
import OfflinePage from "./OfflinePage";

export default function AppWrapper({children} : {children: React.ReactNode}){
    
    const [isOnline, setIsOnline] = useState(true) ; 

    useEffect(() => {
        const updateStatus = () => setIsOnline(navigator.onLine) ; 

        window.addEventListener("online", updateStatus) ; 
        window.addEventListener("offline", updateStatus) ; 

        // setting initial status 

        updateStatus() ; 

        return () => {
            window.removeEventListener("online", updateStatus) ; 
            window.removeEventListener("offline", updateStatus) ; 
        }
    }, [])

    // showing the offline page if offline 

    if(!isOnline) return <OfflinePage/>

    return <>
        {children}
    </>

}