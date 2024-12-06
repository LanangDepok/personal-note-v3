import Button from "../components/Button";
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import { register } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import LocaleContext from "../context/LocaleContext";

const Register = () => {
  const [name, handleNameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const [confirmPassword, handleConfirmPasswordChange] = useInput("");
  const [locale, toggleLocale] = useContext(LocaleContext);
  const navigate = useNavigate();

  const authenticate = async (name, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      alert("Password and confirm password must be the same");
      return;
    }

    const response = await register(name, email, password);

    if (response.status === "fail") {
      alert(response.message);
      return;
    }

    navigate("/login");
  };

  return (
    <>
      <form className="max-w-sm mx-auto mt-16">
        <Input
          name="Name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <Input
          name="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          name="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Input
          name="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <Button
          className="from-blue-500 via-blue-600 to-blue-700 focus:ring-blue-300 w-full"
          value={locale === "en" ? "Register" : "Daftar"}
          trigerButton={() => {
            authenticate(name, email, password, confirmPassword);
          }}
        />
        <p className="mt-5">
          {locale === "en"
            ? "Already have an account?"
            : "Sudah mempunyai akun?"}
          <Link to={"/login"} className="text-blue-600">
            {locale === "en" ? " Register here" : " Daftar di sini"}
          </Link>
        </p>
      </form>
    </>
  );
};

export default Register;
