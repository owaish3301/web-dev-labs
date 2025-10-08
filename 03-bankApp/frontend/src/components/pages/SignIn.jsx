import { useState } from "react"
import { useNavigate } from "react-router";

export default function SignIn(){
    const navigate = useNavigate();
    const [emailInput,setEmailInput] = useState("");
    const [passInput, setPassInput] = useState("");
    const submitHandler = async (e) =>{
      e.preventDefault();
      const payload = {email:emailInput, password:passInput};
      const response =  await fetch(`${import.meta.env.VITE_API_URI}/auth/signin`,{
        method:"POST",
        credentials:"include",
        headers:{ "content-Type":"application/json"},
        body:JSON.stringify(payload)
      })
      if(response.ok){
        navigate('/');
      }
      else{
        alert('Auth Error');
      }
    }
    return (
      <div className="flex flex-col gap-4 justify-center items-center min-h-screen max-w-2xl mx-auto bg-gray-50 shadow">
        <form className="flex flex-col" onSubmit={submitHandler}>
          <label htmlFor="email">Enter email: </label>
          <input
            type="email"
            placeholder="email"
            name="email"
            className="border-2 border-black px-4 py-2 mb-4"
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.target.value);
            }}
          />
          <label htmlFor="pass">Enter Pass: </label>
          <input
            type="password"
            placeholder="password"
            name="pass"
            className="border-2 border-black px-4 py-2"
            value={passInput}
            onChange={(e) => {
              setPassInput(e.target.value);
            }}
          />
          <button
            type="submit"
            className="mt-4 border-2 border-gray-400 px-4 py-2 bg-gray-200 rounded-lg"
          >
            SignIn
          </button>
        </form>
        <button
         className="w-[215px] border-2 border-gray-400 px-4 py-2 bg-gray-200 rounded-lg"
         onClick={()=>{navigate("/signup");}}
         >
            SignUp
        </button>
      </div>
    );
}