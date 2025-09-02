import { useState } from "react"
import { auth } from "../firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useDispatch } from "react-redux"
import { login } from "../app/features/userSlice"
import { getFirebaseErrorMessage } from "../components/ErrorId"
export const useRegister=()=>{
    const dispatch=useDispatch()
    const [isPeding, setisPeding]=useState(false)
    const [error,setError]=useState(null)
    const register= async(name,email,password)=>{
       try {
        setisPeding(true)
        const req = await createUserWithEmailAndPassword(auth,email,password)
        if(!req.user){
            throw new Error("Registreshin filed")
        }
        await updateProfile(req.user,{
            displayName:name,
        })
        dispatch(login(req.user))
        console.log(req.user)
       }
      catch (err) {
      const msg = getFirebaseErrorMessage(err)
      setError(msg)
      console.error(msg)
}

       finally{ setisPeding(false)}
    }
    return{register, isPeding,error}
}