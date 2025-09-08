import { useState, useEffect } from "react";
import { Link, Form, useActionData, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useLogin } from "../hooks/useLogin";
import { FormError } from "../components/ErrorId";
import useResetpassword from "../hooks/useResetpassword";

function Login() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { login, isPending, error: _error } = useLogin();
  const { resetpassword } = useResetpassword();
  const navigate = useNavigate();
  const [forgetpassword, setforgetpassword] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.email && user.password) {
        login(user.email, user.password).then((res) => {
          if (res?.success) {
            navigate("/");
          }
        });
        setError(null);
      } else {
        setError(FormError(user));
      }
    }

    if (user?.emailRecovery) {
      resetpassword(user.emailRecovery);
      setError(false);
    }
  }, [user, login, navigate, resetpassword]);

  // helper: string yoki object bo'lishini tekshirish
  const hasError = (field) => {
    if (typeof error === "string") {
      return error.toLowerCase().includes(field);
    }
    if (typeof error === "object") {
      return Boolean(error?.[field]);
    }
    return false;
  };

  const getError = (field) => {
    if (typeof error === "string") {
      return hasError(field) ? `${field} is required` : null;
    }
    if (typeof error === "object") {
      return error?.[field] || null;
    }
    return null;
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-header">
          <h1>Welcome Back</h1>
        </div>
        <div className="auth-description">
          <p>Login to continue to your account.</p>
        </div>

        {/* ==== LOGIN FORM ==== */}
        {!forgetpassword && (
          <Form method="post" className="auth-form">
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className={hasError("email") ? "error-input" : ""}
                />
              </div>
              {getError("email") && <p className="error">{getError("email")}</p>}
            </div>

            {/* Password */}
            <div className="form-group label-with-link">
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className={hasError("password") ? "error-input" : ""}
                />
              </div>
              {getError("password") && (
                <p className="error">{getError("password")}</p>
              )}
            </div>

            {/* Login Button */}
            {!isPending && <button className="login-btn">Login</button>}
            {isPending && (
              <button className="login-btn" disabled>
                Loading...
              </button>
            )}
          </Form>
        )}

        {/* ==== FORGOT PASSWORD FORM ==== */}
        {forgetpassword && (
          <Form method="post" className="auth-form">
            <div className="form-group">
              <label htmlFor="emailRecovery">Email</label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  id="emailRecovery"
                  name="emailRecovery"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <button className="login-btn">Send</button>
            <button
              type="button"
              className="back-to-login"
              onClick={() => setforgetpassword(false)}
            >
              Back to Login
            </button>
          </Form>
        )}

        {!forgetpassword && (
          <button
            type="button"
            className="forgot-password-link"
            onClick={() => setforgetpassword(true)}
          >
            Forgot password?
          </button>
        )}

        {/* Global errors */}
        <div className="error-message">
          {error && typeof error === "string" && <p className="error">{error}</p>}
          {_error && <p className="error">{_error}</p>}
        </div>

        {/* Footer */}
        <div className="auth-footer">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="register-link">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  return Object.fromEntries(formData);
}

export default Login;
