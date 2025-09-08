import { FormError } from "../components/ErrorId";
import { auth } from "../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";

export default function useResetpassword() {
  const resetpassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email,{
        url:"http://localhost:5173/login"
      });
      alert("Check your email");
    } catch (error) {
      const errorMessage = error.message;
      FormError(errorMessage);
    }
  };

  return { resetpassword };
}
