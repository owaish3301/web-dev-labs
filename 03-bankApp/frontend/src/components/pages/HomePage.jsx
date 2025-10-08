import NavBar from "../NavBar";
import TransactionHistory from "../TransactionHistory";
import HeroSection from "../HeroSection";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useState } from "react";

export default function HomePage(){
    const navigate = useNavigate();
    const [user,setUser] = useState("");
    const verifyToken = async ()=>{
        const response = await fetch(`${import.meta.env.VITE_API_URI}/auth/verify`,{
            method:"GET",
            credentials:"include",
        })
        if(!response.ok){
            navigate('/signin');
        }
        else{
            const jsonResponse = await response.json();
            setUser(jsonResponse.name);
        }
    }

    useEffect(()=>{
        verifyToken();
    },[])

    return(
        <div className="max-w-2xl mx-auto bg-gray-50 shadow">
            {/* nav */}
            <NavBar />

            {/* view balance */}
            {/* send money */}
            <HeroSection user={user} />

            {/* transaction history */}
            <TransactionHistory />
        </div>
    )
}