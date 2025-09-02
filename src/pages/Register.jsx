import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useRegister } from "../hooks/useRegister";
import { useEffect, useState } from "react";
import { FormError } from "../components/ErrorId";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

export default function Register() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { register,isPeding,error:_error} = useRegister();

  useEffect(() => {
    if (user) {
      if (user.name && user.email && user.password) {
      register( user.name, user.email , user.password);
        setError(null);
      } else {
        setError(FormError(user));
      }
    }
  }, [user]);

  return (
    <div>
      <h1>Register</h1>
      <Form method="post">
        <FormInput type="text" label="Name" name="name" />
        <hr />
        <FormInput type="email" label="Email" name="email" />
        <hr />
        <FormInput type="password" label="Password" name="password" />
        <hr />
        <br />
       { !isPeding&& <button>Register</button>}
       { isPeding&& <button disabled>Loading...</button>}

      </Form>

      <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
      <div>{_error && <p style={{ color: "red" }}>{_error}</p>}</div>

      <p>
        if you don’t have <Link to="/login">login</Link>
      </p>
    </div>
  );
}
