import { countAtom } from "../store/atoms/count"
import { useAtomValue } from "jotai";

export default function CountRender(){
    const count = useAtomValue(countAtom);
    return(
        <div>
            {count}
        </div>
    )
}