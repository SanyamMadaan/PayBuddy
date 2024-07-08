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
  const navigate = useNavigate();

  async function handleSubmit(event){
        event.preventDefault();
        try {
          console.log("try block before request");
          const response = await axios.post(
            "http://localhost:3000/api/v1/user/signup",
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
          console.log("inside catch block");
          alert(e.response.data.msg);
          console.log(e);
        }
      }

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="bg-white h-max w-2/4 p-3.5 px-4 rounded md:w-1/4">
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
            redirect={"Sign Up"}
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