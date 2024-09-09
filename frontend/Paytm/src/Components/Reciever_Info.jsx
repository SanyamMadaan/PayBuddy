import { Heading } from "./Heading";
import { SubTitle } from "./SubTitle";
import { useState } from "react";

export function Reciever_Info(props){
    const [amount,setAmount]=useState(0);
    return(
        <div className="mt-14">
            <div className="flex">
         <button className="border px-2 py-1 mr-2 text-center rounded-full bg-green-500">{props.name[0].toUpperCase()}</button>
         <h1 className="font-bold text-xl">{props.name.toUpperCase()}</h1>
          </div>
         <h4 className="font-medium mb-3" onChange={(e)=>setAmount(a.target.value)}>Amount (in Rs)</h4>
        </div>
    )

}