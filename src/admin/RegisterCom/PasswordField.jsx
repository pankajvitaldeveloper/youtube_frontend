import { FaEye, FaEyeSlash } from "react-icons/fa";

export const PasswordField = ({ id, name, placeholder, value, onChange, showPassword, toggleShowPassword, error }) => (
  <div className="relative">
    <input
      id={id}
      name={name}
      type={showPassword ? "text" : "password"}
      required
      className={`appearance-none relative block w-full px-4 py-3 border 
        ${error ? 'border-red-500' : 'border-gray-300'} 
        bg-white rounded-lg text-gray-900 placeholder-gray-500 
        focus:outline-none focus:ring-2 focus:ring-red-500 
        focus:border-transparent transition-all duration-200`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    <button
      type="button"
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
      onClick={toggleShowPassword}
    >
      {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
    </button>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);
