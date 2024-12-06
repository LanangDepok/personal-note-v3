import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import { getUserLoggedIn, login } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthenticationContext from "../context/AuthenticationContext";
import ThemeContext from "../context/ThemeContext";
import LocaleContext from "../context/LocaleContext";

const Login = () => {
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const [showPassword, setShowPassword] = useState(false);
  const [authentication, setAuthentication] = useContext(AuthenticationContext);
  const [theme, triggerTheme] = useContext(ThemeContext);
  const [locale, triggerLocale] = useContext(LocaleContext);
  const navigate = useNavigate();

  const authenticate = async (email, password) => {
    const response = await login(email, password);

    if (response.status === "fail") {
      alert(response.message);
      return;
    }
    localStorage.setItem("accessToken", response.data.accessToken);

    const userResponse = await getUserLoggedIn();
    setAuthentication(userResponse.data);

    navigate("/");
  };

  return (
    <>
      <form className="max-w-sm mx-auto mt-16">
        <Input
          name="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          name="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
        />
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              className={`w-4 h-4 border  rounded  focus:ring-3   ${
                theme === "light"
                  ? "border-gray-300 bg-gray-50 focus:ring-blue-300"
                  : "bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800"
              }`}
              onClick={() => {
                setShowPassword((value) => !value);
              }}
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900"
          >
            Show
          </label>
        </div>
        <Button
          className="from-blue-500 via-blue-600 to-blue-700 focus:ring-blue-300 w-full"
          value={locale === "en" ? " Login" : "Masuk"}
          trigerButton={() => {
            authenticate(email, password);
          }}
        />
        <p className="mt-5">
          {locale === "en" ? "Don't have an account?" : "Belum punya akun?"}
          <Link to={"/register"} className="text-blue-600">
            {locale === "en" ? " Register here" : " Daftar di sini"}
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;
