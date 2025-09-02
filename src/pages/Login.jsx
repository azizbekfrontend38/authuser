import { useState, useEffect } from "react";
import { Link, Form, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useLogin } from "../hooks/useLogin";
import { FormError } from "../components/ErrorId";  

function Login() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { login } = useLogin();

  useEffect(() => {
    if (user) {
      if (user.email && user.password) {
        login(user.email, user.password);
        setError(null);
      } else {
        setError(FormError(user));
      }
    }
  }, [user, login]);

  return (
    <div>
      <h1>Login</h1>
      <Form method="post">
        <FormInput type="email" label="Email:" name="email" />
        <FormInput type="password" label="Password:" name="password" />
        <button type="submit">Login</button>
      </Form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        If you don’t have an account <Link to="/register">register</Link>
      </p>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  return Object.fromEntries(formData);
}

export default Login;
