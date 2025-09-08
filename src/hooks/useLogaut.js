import { signOut } from "firebase/auth"
import { auth, db } from "../firebase/config"
import { useState } from "react"
import { getFirebaseErrorMessage } from "../components/ErrorId"
import { logout } from "../app/features/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { doc, updateDoc } from "firebase/firestore";

export default function useLogout() {   // ismi ham "useLogout" bo‘lishi kerak
  const dispatch = useDispatch()
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useSelector((store) => store.user)  // ✅ yuqorida chaqiriladi

  const _logout = async () => {
    setIsPending(true)
    setError(null)

    try {
      const userRef = doc(db, "users", user.uid)

      await updateDoc(userRef, { online: false })
      await signOut(auth)
      dispatch(logout())
    } catch (err) {
      const msg = getFirebaseErrorMessage(err)
      setError(msg)
      console.error(msg)
    } finally {
      setIsPending(false)
    }
  }

  return { _logout, isPending, error }
}
