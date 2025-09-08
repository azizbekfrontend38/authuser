import { useState } from "react"
import { auth, db } from "../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useDispatch } from "react-redux"
import { login as loginUser } from "../app/features/userSlice"
import { getFirebaseErrorMessage } from "../components/ErrorId"
import { doc, updateDoc } from "firebase/firestore"

export const useLogin = () => {   
  const dispatch = useDispatch()
  const [isPending, setIsPending] = useState(false) 
  const [error, setError] = useState(null)

  const login = async (email, password) => {
    try {
      setIsPending(true)
      const req = await signInWithEmailAndPassword(auth, email, password)
      if (!req.user) {
        throw new Error("Login failed")
      }
      const userRef = doc(db, "users", req.user.uid)
      
      await updateDoc(userRef, {
        online: true
      });
      dispatch(loginUser(req.user))  // redux 
      return { success: true, user: req.user }
    } catch (err) {
      const msg = getFirebaseErrorMessage(err)
      setError(msg)
      console.error(msg)
      return { success: false }
    } finally {
      setIsPending(false)
    }
  }

  return { login, isPending, error }
}
