import { useState } from "react";
import { Link } from "react-router-dom";
import { MdGTranslate } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { IoLogOutSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthenticationContext from "../context/AuthenticationContext";
import LocaleContext from "../context/LocaleContext";
import ThemeContext from "../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [authentication, setAuthentication] = useContext(AuthenticationContext);
  const [locale, toggleLocale] = useContext(LocaleContext);
  const [theme, toggleTheme] = useContext(ThemeContext);

  const triggerNavbar = () => {
    setActive((value) => !value);
  };

  const logout = () => {
    localStorage.clear();
    setAuthentication(null);
    navigate("/login");
  };

  return (
    <nav
      className={` border-gray-200 ${
        theme === "light" ? "bg-white" : "bg-gray-900"
      }`}
    >
      <div className="max-w-screen flex flex-wrap items-center justify-between p-4">
        <Link
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span
            className={`self-center text-2xl font-semibold whitespace-nowrap ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            {locale === "en" ? "My Notes" : "Catatan Ku"}
          </span>
        </Link>
        <div className="flex justify-between gap-5">
          <MdGTranslate
            className={`text-2xl hover:cursor-pointer hover:text-blue-700 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
            onClick={toggleLocale}
          />
          <MdDarkMode
            className={`text-2xl hover:cursor-pointer hover:text-blue-700 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
            onClick={toggleTheme}
          />
        </div>
        {authentication && (
          <>
            <button
              type="button"
              className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden  focus:outline-none focus:ring-2   ${
                theme === "light"
                  ? "text-gray-500 hover:bg-gray-100 focus:ring-gray-200"
                  : "text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
              }`}
              onClick={triggerNavbar}
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className={`${!active && "hidden"} w-full md:block md:w-auto`}
              id="navbar-default"
              onClick={logout}
            >
              <button
                className={`flex ml-auto p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  hover:bg-red-700 ${
                  theme === "light"
                    ? "bg-gray-50 md:bg-white border-gray-100"
                    : "bg-gray-800 md:bg-gray-900 border-gray-700"
                }`}
              >
                <IoLogOutSharp
                  className={` text-3xl ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                />
                <p
                  className={` truncate max-w-40 ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                >
                  {authentication.name}
                </p>
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
