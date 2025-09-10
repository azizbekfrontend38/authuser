import { useState } from "react"
import { auth } from "../firebase/config"
import { GoogleAuthProvider,signInWithPopup} from "firebase/auth"

import { useDispatch } from "react-redux"
import { login } from "../app/features/userSlice"
import { getFirebaseErrorMessage } from "../components/ErrorId"
import { db } from "../firebase/config"
import { doc, setDoc } from "firebase/firestore"
export const useGoogle = () => {
    const dispatch = useDispatch()
    const [isPeding, setisPeding] = useState(false)
    const [error, setError] = useState(null)
    const googleProvider = async () => {
        const provider=new GoogleAuthProvider()
        try {
            setisPeding(true)
          const req= await signInWithPopup(auth,provider)
              if (!req.user) {
                throw new Error("Registreshin filed")
            }
            // Add a new document in collection "cities"
            await setDoc(doc(db, "users", req.user.uid), {
                displayName:req.user.displayName,
             photoURL:req.user.photoURL,
                online:true,
                uid:req.user.uid
            });
            dispatch(login(req.user))
            console.log(req.user)
        }
        catch (err) {
            const msg = getFirebaseErrorMessage(err)
            setError(msg)
            console.error(msg)
        }

        finally { setisPeding(false) }
    }
    return { googleProvider, isPeding, error }
}