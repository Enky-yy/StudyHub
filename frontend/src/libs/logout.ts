import { removeToken } from "./auth";
import { useRouter } from "next/navigation";


export default function logout(){

    const router = useRouter();

    removeToken();
    router.push('/');    
}