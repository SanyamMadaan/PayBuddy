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
    const navigate=useNavigate();

    async function handleClick(event){
        event.preventDefault();
        try{
            const response=await axios.post('http://localhost:3000/api/v1/user/signin',{
                email,
                password
            });
            console.log(response);
            const token=response.data.token;
            localStorage.setItem("authorization","Bearer "+token);
            alert('welcome back');
            navigate('/dashboard');
        }
        catch(e){
            alert(e.response.data.msg);
        }
    }

return(
    <div className="bg-slate-300 h-screen flex justify-center items-center">
    <div className="bg-white h-max w-2/4 p-3.5 rounded md:w-1/4 px-4">
        <Heading title={"Sign In"} />
        <SubTitle subtitle={"Enter your crudentials to access your account"}/>

        <form onSubmit={handleClick}>
        <Inputs onChange={(e)=>{
                setEmail(e.target.value);
            }}placeholder={"Johndoe@example.com"} label={"Email"} type={"email"}/>
        <Inputs onChange={(e)=>{
                setPassword(e.target.value);
            }}placeholder={"password"} label={"Password"} type={"password"}/>
        <Button redirect={"Sign in"}></Button>
        </form>
        <BottomWarning label={"Don't have an account ?"} to={"/signup"} buttontext={"Sign Up"}></BottomWarning>
    </div>
    </div>
)
}