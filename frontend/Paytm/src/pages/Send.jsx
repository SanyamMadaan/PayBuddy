import { Heading } from "../Components/Heading";
import { Reciever_Info } from "../Components/Reciever_Info";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export  function Send() {
  let [searchParams, setSearchParams] = useSearchParams();
  let name = searchParams.get("name");
  let id = searchParams.get("id");
  const navigate=useNavigate();
  const [amount,setAmount]=useState(0);
  const [btn,setBtn]=useState('Inititate Transfer');
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="bg-white md:h-2/4 h-fit w-2/3 md:w-1/3 m-5 p-5 rounded-lg">
        <Heading title="Send Money"></Heading>
        <Reciever_Info name={name}></Reciever_Info>
        <div className="border-none">
          <input
            className=" w-full mt-1 p-1 mb-3 border-solid border border-neutral-400 rounded"
            placeholder="Enter Amount"
            type="text"
            required
            onChange={(e)=>setAmount(e.target.value)}
          />
        </div>
        <button className="bg-green-500 text-white p-1.5 rounded text-center cursor-pointer mb-2 w-full" type="submit" onClick={async()=>{
            try{
              setBtn("Initiating...");
                const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/account/transfer`,{
                    to:id,
                    amount
                },{
                    headers:{
                        authorization:localStorage.getItem('authorization')
                    }
                })
    
                console.log(response);
    
                
                if(response.status===200){
                    alert('transfer Successfull...Redirecting to dashboard');
                    navigate('/dashboard');
                }
                else{
                  setBtn('Inititate Transfer');
                    alert('Not Success!!')
                    navigate('/dashboard');
                }
            }catch(e){
              setBtn('Inititate Transfer');
                (e.response.data.msg)?alert(e.response.data.msg):("Transaction failed");
                navigate('/dashboard');
            }
            
        }} >{btn}</button>
      </div>
    </div>
  );
}
