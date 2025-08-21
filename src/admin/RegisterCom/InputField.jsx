export const InputField = ({ id, name, type, placeholder, value, onChange, error }) => (
  <div className="relative">
    <input
      id={id}
      name={name}
      type={type}
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
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);