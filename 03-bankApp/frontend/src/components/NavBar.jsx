import { useNavigate } from "react-router"

export default function NavBar(){
    const navigate = useNavigate();
    const signOut = async ()=>{
        const response = await fetch(`${import.meta.env.VITE_API_URI}/auth/signout`,{
            method:"GET",
            credentials:"include"
        })
        if(response.ok){
            navigate('/signin');
        }
    }
    return(
        <nav className="flex justify-between mx-8 mt-4">
            <h1>
                <strong className="text-xl">Bank</strong>
            </h1>

            <button className="border-2 border-gray-400 px-4 py-2 bg-gray-200 rounded-lg"
             onClick={signOut} >Logout</button>
        </nav>
    )
}