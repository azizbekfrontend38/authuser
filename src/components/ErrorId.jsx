export const FormError = (data) => {
  if (!data?.name) return "Name is required";
  if (!data?.email) return "Email is required";
  if (!data?.password) return "Password is required";
  return null;
};
// utils/firebaseError.js

// firebaseError.ts

export function getFirebaseErrorMessage(error){
  if (!error) return "An unknown error occurred.";

  // 1) Agar error.code mavjud bo‘lsa, to‘g‘ridan-to‘g‘ri undan foydalanamiz
  if (error.code) {
    return mapFirebaseErrorCode(error.code);
  }

  // 2) Agar error.message ichidan "auth/..." kodni regex bilan ajratib olsa bo‘lsa
  if (error.message) {
    const match = error.message.match(/(auth\/[^\)]+)/);
    if (match) {
      const code = match[0]; // masalan: "auth/email-already-in-use"
      return mapFirebaseErrorCode(code);
    }
  }

  return "Something went wrong. Please try again.";
}

// Firebase xatolik kodlarini mapping qilish
function mapFirebaseErrorCode(code){
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Try logging in instead.";

    case "auth/invalid-email":
      return "The email address is not valid.";

    case "auth/weak-password":
      return "Password should be at least 6 characters.";

    case "auth/user-not-found":
      return "No account found with this email.";

    case "auth/wrong-password":
      return "Incorrect password. Please try again.";

    case "auth/network-request-failed":
      return "Network error. Please check your connection.";

    case "auth/too-many-requests":
      return "Too many login attempts. Please wait and try again.";

    default:
      return "Something went wrong. Please try again.";
  }
}

