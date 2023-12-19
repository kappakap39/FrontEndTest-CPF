import React, { useState } from 'react';
import "../App.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        Email: "",
        OTP: "",
    });

    const MySwal = withReactContent(Swal);

    // const [showPassword, setShowPassword] = useState(false);
    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    const handleSentMail = async (event: any) => {
        event.preventDefault();

        // ตรวจสอบค่าที่ต้องการ
        if (!values.Email) {
            MySwal.fire({
                icon: 'error',
                title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                text: 'กรุณากรอกอีเมลให้ครบถ้วน',
            });
            return; // หยุดการทำงานต่อไปถ้าค่าไม่ครบ
        }

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
                // ส่งข้อมูลไปยังเซิร์ฟเวอร์หรือประมวลผลต่อไป
                axios
                    .post("http://localhost:8080/mail/SentMail", {
                        ...values,
                    })
                    .then((res) => {
                        console.log(res);
                        window.location.reload();
                    })
                    .catch((err) => console.log(err));
            }
        });
    };

    //! submit
    const handleSubmitOTP = async (event: any) => {
        event.preventDefault();

        // ตรวจสอบค่าที่ต้องการ
        if (!values.Email || !values.OTP) {
            MySwal.fire({
                icon: 'error',
                title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                text: 'กรุณากรอกอีเมลและรหัส OTP ให้ครบถ้วน',
            });
            return; // หยุดการทำงานต่อไปถ้าค่าไม่ครบ
        }

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
                // ส่งข้อมูลไปยังเซิร์ฟเวอร์หรือประมวลผลต่อไป
                axios
                    .post("http://localhost:8080/mail/VerifyAddToken", {
                        Email: values.Email,
                        OTP: values.OTP,
                    })
                    .then((res) => {
                        console.log(res.data);
                        MySwal.fire({
                            title: 'เข้าสู่ระบบสำเร็จ',
                            icon: 'success',
                        }).then(() => {
                            // เมื่อกด OK ให้ redirect ไปที่หน้า index
                            window.location.href = '/Index'; // หรือตามที่คุณต้องการ
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        MySwal.fire({
                            title: 'ไม่พบข้อมูลผู้ใช้',
                            icon: 'error',
                            text: 'กรุณาตรวจสอบอีเมลและรหัส OTP อีกครั้ง',
                        });
                    });
            }
        });
    };


    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };
    console.log("value", values);

    return (
        <div className="login flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8">
                <form action="">
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">เข้าสู่ระบบ</h2>
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
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
                                className="inputLogin mt-1 blocks border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            <button
                                type="button"
                                onClick={(event) => handleSentMail(event)}
                                className="buttonSent font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                ส่งเมล
                            </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="OTP" className=" text-sm font-medium text-gray-700">
                            รหัสผ่าน OTP
                        </label>
                        <div className="relative">
                            <input
                                id="OTP"
                                name="OTP"
                                type="number"
                                onChange={handleChange}
                                // type={showPassword ? "text" : "password"}
                                // autoComplete="current-password"
                                required
                                className="inputLogin mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pr-10"
                            />
                            {/* <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 py-2 text-sm font-medium text-gray-500 focus:outline-none"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "ซ่อน" : "แสดง"}
                        </button> */}
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={(event) => handleSubmitOTP(event)}
                            type="submit"
                            className="submit group relative w-full flex justify-center border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
