import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { InputField } from "./RegisterCom/InputField";
import { PasswordField } from "./RegisterCom/PasswordField";
import { SubmitButton } from "./RegisterCom/SubmitButton";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  // Redirect after successful registration
  useEffect(() => {
    if (token) {
      toast.success("Registration successful!");
      navigate("/login"); // or navigate("/dashboard")
    }
  }, [token, navigate]);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Custom form validation
  const validateForm = () => {
    const newErrors = {};
    // Username validation: min 3 characters
    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }
    // Email validation: basic email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    // Password validation: min 5 chars, 1 uppercase, 1 number
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{5,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 5 characters, with 1 uppercase letter and 1 number";
    }
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/");
      })
      .catch(() => {
        toast.error(error || "Registration failed");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black p-4">
  <Toaster position="top-center" reverseOrder={false} />
  <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
    <div>
      <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
        Create Account
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Join our community today
      </p>
    </div>

    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <InputField
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          className="dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-red-500"
        />
        <InputField
          id="email"
          name="email"
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          className="dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-red-500"
        />
        <PasswordField
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(!showPassword)}
          error={errors.password}
          className="dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-red-500"
        />
        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          showPassword={showConfirmPassword}
          toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
          error={errors.confirmPassword}
          className="dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-red-500"
        />
      </div>

      <SubmitButton loading={loading} className="dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-500" />

      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        >
          Sign in
        </Link>
      </p>
    </form>
  </div>
</div>
  );
};

export default Register;