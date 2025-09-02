import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"
import { useState } from "react"
import { getFirebaseErrorMessage } from "../components/ErrorId"

export default function useLogaut() {
    const [isPeding,setisPeding]=useState()
    const[error,setError]=useState(null)
    const logout =async()=>{
        try{
            const req=await signOut(auth)
        }
        catch (err) {
      const msg = getFirebaseErrorMessage(err)
      setError(msg)
      console.error(msg)
    }

       finally{ setisPeding(false)}{
        }
    }
  return {logout}
}
