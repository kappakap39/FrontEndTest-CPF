import React, { useState } from 'react';
import "../App.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from 'axios';
import Joi from 'joi';

function Login() {
    const [values, setValues] = useState({
        Email: "",
        Password: "",
    });

    const MySwal = withReactContent(Swal);

    const [isValidEmail, setIsValidEmail] = useState(true);
    const [IsUser, setIsUser] = useState(true);
    const [IsPassword, setIsPassword] = useState(true);
    
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        const passwordInput = document.getElementById("Password");
        if (passwordInput) {
            if (passwordInput.getAttribute("type") === "password") {
                passwordInput.setAttribute("type", "text");
            } else {
                passwordInput.setAttribute("type", "password");
            }
        }
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log("value", values);

        if (!/^\S+@\S+\.\S+$/.test(values.Email)) {
            setIsValidEmail(false);
            return;
        }
        if (values.Password === "") {
            setIsPassword(false);
            return;
        }
        // const schema = Joi.object({
        //     Email: Joi.string().email().required(),
        // });
        // const validationResult = schema.validate(values);
        // if (validationResult.error) {
        //     setIsValidEmail(false);
        //     return;
        // }

        MySwal.fire({
            title: 'คุณแน่ใจหรือไม่ที่ต้องการส่งเมลขอรหัส OTP',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgb(127, 255, 127)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post("http://localhost:8080/Token/LoginUser", {
                        Email: values.Email,
                        Password: values.Password,
                    })
                    .then((res) => {
                        console.log(res.data);
                        const { UserID } = res.data.Decoded;
                        MySwal.fire({
                            title: 'เข้าสู่ระบบสำเร็จ',
                            icon: 'success',
                        }).then(() => {
                            // window.location.href = '/Index';
                            window.location.href = `/Index?UserID=${UserID}`;
                            console.log("UserID", UserID)
                            
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        setIsUser(false); // ตั้งค่าให้อีเมลไม่ถูกต้องเมื่อเกิด error
                    });
            }
        });
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setValues((prev) => ({
            ...prev,
            [event.target.name]: [event.target.value],
            [name]: value,
        }));
        setIsValidEmail(true); // ตั้งค่า isValidEmail เป็น true เพื่อไม่แสดงข้อความอีเมลไม่ถูกต้อง
        setIsUser(true); // ตั้งค่า IsUser เป็น true เพื่อไม่แสดงข้อความไม่พบข้อมูลในฐานข้อมูล
        setIsPassword(true); // ตั้งค่า IsPassword เป็น true เพื่อไม่แสดงข้อความรหัสผ่านไม่ถูกต้อง
    };

    // const isValidEmail = (Email: any) => {
    //     // ตรวจสอบความถูกต้องของอีเมล โดยใช้เงื่อนไขตามที่คุณต้องการ
    //     return /\S+@\S+\.\S+/.test(Email);
    // };

    return (
        <div className="login flex items-center justify-center">
            <div className="max-w-md w-full space-y-8">
                <form action="">
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-10">เข้าสู่ระบบ</h2>
                    </div>
                    <div style={{ marginBottom: "5%" }} >
                        <label htmlFor="Email" className="text-sm font-medium text-gray-700 ">
                            อีเมล
                        </label>
                        <div className='sent'>
                            <input
                                id="Email"
                                name="Email"
                                type="email"
                                autoComplete="Email"
                                required
                                onChange={handleChange}
                                className="inputLogin w-full mt-1 blocks border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />

                        </div>
                        {!isValidEmail && ( // แสดงข้อความเมื่อ isValidEmail เป็น false
                            <p style={{ color: 'red', marginLeft: "10px" }}>กรุณากรอกอีเมลให้ถูกต้องตามรูปแบบ</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="OTP" className=" text-sm font-medium text-gray-700">
                            รหัสผ่าน
                        </label>
                        <div className="relative">
                            <input
                                id="Password"
                                name="Password"
                                onChange={handleChange}
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
                        {!IsPassword && ( // แสดงข้อความเมื่อ isValidEmail เป็น false
                            <p style={{ color: 'red', marginLeft: "10px" }}>กรุณากรอกรหัสผ่านให้ถูกต้อง</p>
                        )}
                    </div>

                    <div>
                        <button
                            onClick={(event) => handleSubmit(event)}
                            type="submit"
                            className="submit group relative w-full flex justify-center border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            เข้าสู่ระบบ
                        </button>
                    </div>
                    {!IsUser && ( // แสดงข้อความเมื่อ IsUser เป็น false
                        <p style={{ color: 'red', marginLeft: "10px" }}>ไม่พบข้อมูลในฐานข้อมูล</p>
                    )}

                </form>
            </div>
        </div>
    );
}

export default Login;
