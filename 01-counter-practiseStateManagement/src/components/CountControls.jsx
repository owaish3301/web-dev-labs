import { countAtom } from "../store/atoms/count";
import { useAtom } from "jotai";

export default function CountControls(){
    const [count,setCount] = useAtom(countAtom);
    return(
        <div>
            <button onClick={()=>{setCount(count+1)}}>increase</button>
            <button onClick={()=>{setCount(count-1)}}>decrease</button>
        </div>
    )
}