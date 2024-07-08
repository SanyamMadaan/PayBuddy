import { Heading } from "./Heading";
import { SubTitle } from "./SubTitle";

export function Reciever_Info(props){
    return(
        <div className="mt-14">
            <div className="flex">
         <button className="border px-2 py-1 mr-2 text-center rounded-full bg-green-500">A</button>
         <h1 className="font-bold text-xl">Friend's Name</h1>
          </div>
         <h4 className="font-medium mb-3">Amount (in Rs)</h4>
        </div>
    )

}