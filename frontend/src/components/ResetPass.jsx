import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils/handleMessage';

export default function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Initialize state with email from location
    const [resetPassData, setResetPassData] = useState({
        email: '',
        password: "",
        confirmPass: ""
    });

    // Set email from location state when component mounts
    useEffect(() => {
        if (location.state?.email) {
            setResetPassData(prev => ({
                ...prev,
                email: location.state.email
            }));
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResetPassData({ ...resetPassData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, confirmPass } = resetPassData;

        // Validation
        if (!email || !password || !confirmPass) {
            return handleError("All fields are required");
        }

        if (password !== confirmPass) {
            return handleError("Passwords do not match");
        }

        if (password.length < 6) {
            return handleError("Password must be at least 6 characters");
        }

        try {
            const response = await fetch("http://localhost:5000/api/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                handleSuccess(data.message);
                setTimeout(() => navigate("/login"), 300);
            } else {
                handleError(data.message);
            }
        } catch (error) {
            handleError(error.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <div className='flex justify-end'>
                    <img
                        src="https://uploads.onecompiler.io/42zhuec4k/43n7479rc/close.png"
                        alt="Close"
                        className='w-[14px] cursor-pointer'
                        onClick={() => navigate(-1)}
                    />
                </div>

                <form className="space-y-4 p-4" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-center">Reset Password</h2>
                    
                    {/* Hidden email field that WILL work */}
                    <input 
                        type="hidden" 
                        name="email" 
                        value={resetPassData.email} 
                        onChange={handleChange}  // Add this line
                    />

                    <div>
                        <label className="block font-semibold mb-1">New Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            minLength="6" 
                            placeholder="Enter new password" 
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
                            onChange={handleChange} 
                            value={resetPassData.password} 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Confirm Password</label>
                        <input 
                            type="password" 
                            name="confirmPass" 
                            minLength="6" 
                            placeholder="Confirm new password" 
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
                            onChange={handleChange} 
                            value={resetPassData.confirmPass} 
                            required 
                        />
                    </div>

                    <button 
                        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition hover:scale-105" 
                        type="submit"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}