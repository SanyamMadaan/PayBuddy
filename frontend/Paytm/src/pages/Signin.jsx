import { Heading } from "../Components/Heading";
import { SubTitle } from "../Components/SubTitle";
import { Inputs } from "../Components/Inputs";
import { Button } from "../Components/Button";
import { BottomWarning } from "../Components/BottomWarninng";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Signin(){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[button,setButton]=useState("Sign in");
    const navigate=useNavigate();

    async function handleClick(event){
        event.preventDefault();
        try{
            setButton("Signing in....");
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signin`,{
                email,
                password
            });
            console.log(response);
            const token=response.data.token;
            localStorage.setItem("authorization","Bearer "+token);
            navigate('/dashboard');
        }
        catch(e){
            setButton("Sign in");
            if(e.response.data.msg){
                alert(e.response.data.msg);
            }
            else{
                alert("Error while signing in..Please try after some time");
            }
            
        }
    }

return(
    <div className="bg-black h-screen flex justify-center items-center">
    <div className="bg-white h-max lg:w-1/4 md:w-1/2 p-3.5 rounded  px-4 m-4">
        <Heading title={"Sign In"} />
        <SubTitle subtitle={"Enter your crudentials to access your account"}/>

        <form onSubmit={handleClick}>
        <Inputs onChange={(e)=>{
                setEmail(e.target.value);
            }}placeholder={"Johndoe@example.com"} label={"Email"} type={"email"}/>
        <Inputs onChange={(e)=>{
                setPassword(e.target.value);
            }}placeholder={"password"} label={"Password"} type={"password"}/>
        <Button redirect={button}></Button>
        </form>
        <BottomWarning label={"Don't have an account ?"} to={"/signup"} buttontext={"Sign Up"}></BottomWarning>
    </div>
    </div>
)
}