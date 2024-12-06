import PropTypes from "prop-types";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const Input = ({ value, name, type, placeholder = "", onChange }) => {
  const { theme, triggerTheme } = useContext(ThemeContext);

  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {name}
      </label>
      <input
        type={type}
        id={name}
        className={` border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${
          theme === "light"
            ? "bg-gray-50 border-gray-300 text-gray-900"
            : "bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Input;
