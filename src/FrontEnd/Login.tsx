import React, { useState } from 'react';
import "../App.css";

function Login() {

    const [values, setValues] = useState({
        email: "",
        passwordOTP: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    //! sent mail
    const handleSentMail = async (event: any) => {
        event.preventDefault();
        console.log("value", values)
        try {
            // ส่ง POST request ไปยัง {{HOST}}/mail/SentMail
            const response = await fetch("http://localhost:8080/mail/SentMail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });

            // ตรวจสอบสถานะของการส่งข้อมูล
            if (response.ok) {
                // การส่ง POST request สำเร็จ
                console.log("Email ถูกส่งไปยัง {{HOST}}/mail/SentMail");
            } else {
                // การส่ง POST request ไม่สำเร็จ
                console.error("มีข้อผิดพลาดเกิดขึ้นในการส่ง Email");
            }
        } catch (error) {
            console.error("มีข้อผิดพลาดในการส่งข้อมูล", error);
        }
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    return (
        <div className="login flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">เข้าสู่ระบบ</h2>
                </div>
                <form className="mt-8 space-y-6">
                    <form className="mt-8 space-y-6">
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                อีเมล
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={values.email}
                                onChange={handleChange}
                                className="inputLogin mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <button type="button" onClick={handleSentMail} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            ส่งเมล
                        </button>
                    </form>

                    <div>
                        <label htmlFor="passwordOTP" className="text-sm font-medium text-gray-700">
                            รหัสผ่าน
                        </label>
                        <div className="relative">
                            <input
                                id="passwordOTP"
                                name="passwordOTP"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="inputLogin mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pr-10"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 py-2 text-sm font-medium text-gray-500 focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? "ซ่อน" : "แสดง"}
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            เข้าสู่ระบบ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
