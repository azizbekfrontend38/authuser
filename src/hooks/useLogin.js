import { useState } from "react"
import { auth } from "../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useDispatch } from "react-redux"
import { login } from "../app/features/userSlice"
import { getFirebaseErrorMessage } from "../components/ErrorId"
export const useLgin=()=>{
    const dispatch=useDispatch()
    const [isPeding, setisPeding]=useState(false)
    const [error,setError]=useState(null)
    const _login= async(email,password)=>{
       try {
        setisPeding(true)
        const req = await signInWithEmailAndPassword(auth,email,password)
        if(!req.user){
            throw new Error("Registreshin filed")
        }
       
        dispatch(login(req.user))
      
       }
      catch (err) {
      const msg = getFirebaseErrorMessage(err)
      setError(msg)
      console.error(msg)
}

       finally{ setisPeding(false)}
    }
    return{_login, isPeding,error}
}