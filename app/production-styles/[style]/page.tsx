"use client" ; 

import React from "react";
import { useRouter } from "next/navigation";

// Sample vendor data 

const vendors = [
    {name: 'Naval', id: 'naval'}, 
    {name: 'NS Black Thermal', id: 'naval-black'}
]

const VendorPage = ({params}: {params: {style: string}}) => {
    
    const router = useRouter() ; 
    const {style} = params ; 

    const handleVendorClick = (vendorId: string) => {
        router.push(`/production-styles/${style}/${vendorId}`) ;
    }

    return (
        <div className="px-6 py-8">
            <h1 className="text-2xl font-bold mb-6">Vendors</h1>
            <div className="flex flex-wrap gap-6">
                {
                    vendors.map((vendor) => (
                        <div
                            key={vendor.id}
                            className="cursor-pointer w-[220px] h-[120px] border border-gray-200 bg-white rounded-xl shadow-sm hover:shadow-md flex items-center justify-center text-center text-lg font-semibold text-gray-800 hover:border-blue-500 transition-all"
                            onClick={() => handleVendorClick(vendor.id)}
                        >
                            {vendor.name}
                        </div>
                    ))
                }
            </div>
        </div>
    )

}

export default VendorPage