import { Heading } from "../Components/Heading"
import { Inputs } from "../Components/Inputs"
import { Transfer_btn } from "../Components/Transfer_btn"
import { Reciever_Info } from "../Components/Reciever_Info"

export function Send(){
    return(
        <div className="bg-slate-300 h-screen flex justify-center items-center">
            <div className="bg-white h-2/4 w-1/4 m-5 p-5 rounded-lg">
                <Heading title="Send Money"></Heading>
                <Reciever_Info></Reciever_Info>
                <Inputs type="text" placeholder="Enter amount"></Inputs>
                <Transfer_btn redirect="Initiate Transfer"></Transfer_btn>
            </div>
        </div>
    )
}