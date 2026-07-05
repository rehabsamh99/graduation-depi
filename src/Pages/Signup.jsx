import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginSide from "../Components/LoginSide.jsx";
import "../Css/Signup.css";
import axios from "axios";
import { ShopContext } from "../Components/ShopContext.jsx";

export default function Signup() {
    const { setUser } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        return newErrors;
    };

    const localFallbackSignup = () => {
        if (formData.email) {
            sessionStorage.setItem("authToken", "local-dev-token");
            setUser({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
            });
            return true;
        }
        return false;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setApiError("");

        // 1️⃣ تحقق من الفاليديشن
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // لو في أخطاء، اوقف التنفيذ
        }

        // 2️⃣ تسجيل المستخدم (fallback محلي أو API call)
        setLoading(true);
        try {
            // لو عندك API call استخدميه هنا
            // const res = await axios.post("/api/signup", formData);
            
            // استخدام fallback محلي
            localFallbackSignup();

            // عرض رسالة نجاح
            setSubmitted(true);

            // تحويل للصفحة Login بعد ثانيتين
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setApiError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex gap-6 container-signup align-items-center">
            <div className="side-Photo pt-5">
                <LoginSide />
            </div>

            <div className="container-main p-5 d-flex flex-column gap-4">
                <div className="text d-flex flex-column gap-4">
                    <h2>Create Account</h2>
                    <p>Enter your details below</p>
                </div>

                {submitted && (
                    <div className="alert alert-success" role="alert">
                        ✓ Account created successfully! Redirecting to login...
                    </div>
                )}

                {apiError && <p className="text-danger">{apiError}</p>}

                <form className="container-form d-flex flex-column gap-3" onSubmit={handleSubmit} noValidate>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    name="firstName"
                                    className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                    id="firstName"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <label htmlFor="firstName">First Name</label>
                                {errors.firstName && <p className="text-danger small mt-1">{errors.firstName}</p>}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    name="lastName"
                                    className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                    id="lastName"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <label htmlFor="lastName">Last Name</label>
                                {errors.lastName && <p className="text-danger small mt-1">{errors.lastName}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            name="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            id="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <label htmlFor="email">Email Address</label>
                        {errors.email && <p className="text-danger small mt-1">{errors.email}</p>}
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            name="password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <label htmlFor="password">Password</label>
                        {errors.password && <p className="text-danger small mt-1">{errors.password}</p>}
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            name="confirmPassword"
                            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        {errors.confirmPassword && <p className="text-danger small mt-1">{errors.confirmPassword}</p>}
                    </div>

                    <div className="submit-section d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4">
                        <button type="submit" className="btn btn-danger" disabled={loading}>
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                        <Link to="/login" className="text-danger text-decoration-none">
                            Already have an account? Log in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
