import { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router";

export default function Home(){
    const [user,setUser] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        async function checkAuth() {
            const response = await fetch("http://localhost:3000/verify",{
                credentials:"include"
            })
            if(response.ok){
                const responseJson = await response.json();
                setUser(responseJson.name);
            }
            else{
                navigate('/signin')
            }
        }
        checkAuth()
    },[])
    return(
        <div>
            <p>Hey</p>
            <p>{user}</p>

            <button onClick={async()=>{
                const response = await fetch('http://localhost:3000/signout',{
                    credentials:"include"
                })
                if(response.ok){
                    navigate('/signin');
                }
            }}>SignOut</button>
        </div>
    )
}