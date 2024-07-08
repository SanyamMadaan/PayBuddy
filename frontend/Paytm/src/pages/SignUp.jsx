import { Heading } from "../Components/Heading";
import { SubTitle } from "../Components/SubTitle";
import { Inputs } from "../Components/Inputs";
import { Button } from "../Components/Button";
import { BottomWarning } from "../Components/BottomWarninng";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[button,setButton]=useState("Sign Up");
  const navigate = useNavigate();

  async function handleSubmit(event){
        event.preventDefault();
        try {
          setButton("Creating account...");
          console.log("try block before request");
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`,
            {
              email,
              firstname,
              lastname,
              password,
            }
          );
          console.log("after request");
          console.log(response);
          const token = response.data.token;
          localStorage.setItem("authorization","Bearer "+ token);
          alert("Congratulations..Your account has been created successfully");
          navigate("/dashboard");
        } catch (e) {
          if(e.response.data.msg){
            alert(e.response.data.msg);
        }
        else{
            setButton("Sign Up");
            alert("Error while signing in..Please try after some time");
        }
        
        }
      }

  return (
    <div className="bg-black h-screen flex justify-center items-center">
    <div className="bg-white h-max lg:w-1/4 md:w-1/2 p-3.5 rounded  px-4 m-4">
        <Heading title={"Sign Up"}></Heading>
        <SubTitle subtitle={"Enter your information to create an account"}></SubTitle>
        <form onSubmit={handleSubmit}>
          <Inputs
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            label={"First Name"}
            type={"text"}
            placeholder={"John"}
          />
          <Inputs
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            label={"Last Name"}
            type={"text"}
            placeholder={"Doe"}
          />
          <Inputs
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label={"Email"}
            type={"email"}
            placeholder={"johndoe@example.com"}
          />
          <Inputs
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            type={"password"}
          />
          <Button
            redirect={button}
          ></Button>
          </form>
        <BottomWarning
          label={"Already have an account? "}
          to={"/"}
          buttontext={"Sign in"}
        ></BottomWarning>
      </div>
    </div>
  );
}