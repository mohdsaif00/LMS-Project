import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils/handleMessage';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [forgotData, setForgotData] = useState({ email: "" });
    const [showOtpField, setShowOtpField] = useState(false);
    const [otp, setOtp] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForgotData({ ...forgotData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email } = forgotData;

        if (!email) {
            return handleError("Email is required");
        }

        try {
            if (!showOtpField) {
                // Step 1: Send email to generate OTP
                const response = await fetch("http://localhost:5000/api/forgot-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (data.success) {
                    handleSuccess(data.message);
                    setShowOtpField(true); // Show OTP field after successful email submission
                } else {
                    handleError(data.message);
                }
            } else {
                // Step 2: Verify OTP
                if (!otp) return handleError("OTP is required");

                const response = await fetch("http://localhost:5000/api/verify-otp", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, otp }),
                });

                const data = await response.json();

                if (data.success) {
                    handleSuccess(data.message);
                    // Navigate to reset password with email in state
                    navigate("/resetpassword", { state: { email } });
                } else {
                    handleError(data.message);
                }
            }
        } catch (error) {
            handleError(error.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                {/* Close button */}
                <div className='flex justify-end'>
                    <img
                        src="https://uploads.onecompiler.io/42zhuec4k/43n7479rc/close.png"
                        alt="Close"
                        className='w-[14px] cursor-pointer'
                        onClick={() => navigate(-1)}
                    />
                </div>

                {/* Form */}
                <form className="space-y-4 p-4" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-center">
                        {showOtpField ? "Verify OTP" : "Forgot Password"}
                    </h2>

                    {/* Email field (disabled after OTP generation) */}
                    <div>
                        <label className="block font-semibold mb-1" htmlFor="email">Email</label>
                        <input 
                            id="email" 
                            type="email" 
                            name="email" 
                            placeholder="Enter your email" 
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
                            onChange={handleChange} 
                            value={forgotData.email} 
                            required 
                            disabled={showOtpField} 
                        />
                    </div>

                    {/* OTP field (shown only after email submission) */}
                    {showOtpField && (
                        <div>
                            <label className="block font-semibold mb-1" htmlFor="otp">OTP</label>
                            <input 
                                id="otp" 
                                type="text" 
                                name="otp" 
                                maxLength="6" 
                                placeholder="Enter 6-digit OTP" 
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
                                value={otp} 
                                onChange={(e) => setOtp(e.target.value)} 
                                required 
                            />
                        </div>
                    )}

                    {/* Submit button */}
                    <button
                        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition hover:scale-105"
                        type="submit"
                    >
                        {showOtpField ? "Verify OTP" : "Send OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
}