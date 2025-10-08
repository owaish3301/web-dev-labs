import { useState } from "react";
import { useNavigate, NavLink } from "react-router";

export default function SignUp(){
    const navigate = useNavigate();
    const [formInputs,setFormInputs] = useState({
        email:"",
        pass:"",
        name:""
    });

    function handleFormChange(e){
        const {name,value} = e.target;
        setFormInputs(prev=>({...prev,[name]:value}))
    }
    async function handleSubmit(e){
        e.preventDefault();
        const response = await fetch("http://localhost:3000/signup",{
            method:"POST",
            credentials:"include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formInputs)
        });
        if(response.ok){
            navigate("/")
        }
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                 value={formInputs.name}
                  placeholder="name"
                   name="name"
                    type="text"
                     onChange={handleFormChange}
                />
                <input
                 value={formInputs.email}
                  placeholder="email"
                   name="email"
                    type="email"
                     onChange={handleFormChange}
                />
                <input
                 value={formInputs.pass}
                  type="password"
                   name="pass" 
                    placeholder="pass"
                     onChange={handleFormChange}
                />
                <button type="submit">SignUp</button>
            </form>
            <NavLink to='/signin'>SignIn</NavLink>
        </div>
    )
}