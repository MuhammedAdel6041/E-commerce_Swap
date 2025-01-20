import { useState } from "react";
 
import Cash from './Cash';

export default function Payment() {
    const [tabValue, setTabValue] = useState("Debit");
    return (
        <>
            <div className="flex w-full mt-4">
            <button
                    onClick={() => setTabValue("Cash")}
                    className={`py-2 w-1/2 text-center rounded-r-md focus:outline-none 
                        ${tabValue === "Cash" ? "bg-white border border-gray-300" : "bg-gray-100 border border-transparent hover:bg-gray-50"}`}
                >
                    Cash On Delivery
                </button>
               
                
            </div>
            <div className="mt-4 w-full capitalize">
                {tabValue === "Cash" ? <Cash /> : ''}
            </div>
        </>
    );
}
