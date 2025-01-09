import { useState } from "react";
import Debit from "./Debit";
import Cash from './Cash';

export default function Payment() {
    const [tabValue, setTabValue] = useState("Debit");
    return (
        <>
            <div className="flex w-full mt-4">
                <button
                    onClick={() => setTabValue("Debit")}
                    className={`py-2 w-1/2 text-center rounded-l-md focus:outline-none 
                        ${tabValue === "Debit" ? "bg-white border border-gray-300" : "bg-gray-100 border border-transparent hover:bg-gray-50"}`}
                >
                    Debit / Credit Card
                </button>
                <button
                    onClick={() => setTabValue("Cash")}
                    className={`py-2 w-1/2 text-center rounded-r-md focus:outline-none 
                        ${tabValue === "Cash" ? "bg-white border border-gray-300" : "bg-gray-100 border border-transparent hover:bg-gray-50"}`}
                >
                    Cash On Delivery
                </button>
            </div>
            <div className="mt-4 w-full">
                {tabValue === "Debit" ? <Debit /> : <Cash />}
            </div>
        </>
    );
}
