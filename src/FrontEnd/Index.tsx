import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";
import ShowProduct from './Product/ShowProduct';
import ShowOrder from './Order/ShowOrder';
import OrderDetail from './Order/OrderDetail';
import MenuNav from "./MenuNav/NavIndex";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import EditPeople from './Modal/EditPeople';
import { useLocation } from 'react-router-dom';

interface UserData {
    FirstName: string;
    LastName: string;
}

function index() {

    const location = useLocation();
    const [userData, setUserData] = useState<UserData[]>([]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const userID = searchParams.get('UserID');
        if (userID) {
            // Assuming you have an API endpoint to fetch user data by UserID
            axios.get(`http://localhost:8080/user/getUserByID/${userID}`)
                .then((res) => {
                    setUserData(res.data); // Set user data to state
                })
                .catch((err) => {
                    console.log(err);
                    // Handle error
                });
        }
    }, [location.search]);
    console.log("userData", userData);

    const [data, setData] = useState({ Peoples: [] });
    const MySwal = withReactContent(Swal);

    //!Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setValues({
            PeopleID: "",
            Username: "",
            Email: "",
            FirstName: "",
            LastName: "",
            Tel: "",
        });
        setIsModalOpen(false);
    };

    //!update

    const handleEditClick = async (People: any) => {
        console.log("PeopleID:", People.PeopleID);
        try {
            const response = await axios.get(`http://localhost:8080/test/getPeopleID/${People.PeopleID}`);
            const personData = response.data;

            if (personData) {
                setValues({
                    PeopleID: personData.PeopleID,
                    Username: personData.Username,
                    Email: personData.Email,
                    FirstName: personData.FirstName,
                    LastName: personData.LastName,
                    Tel: personData.Tel,
                });
                handleOpenModal();
            }
        } catch (error) {
            console.error("Error fetching person data:", error);
        }
    };
    const handleUpdate = (event: any) => {
        event.preventDefault();
        MySwal.fire({
            title: 'คุณแน่ใจหรือไม่ที่ต้องการแก้ไขข้อมูล?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgb(127, 255, 127)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .patch("http://localhost:8080/test/updatePeople", values)
                    .then((res) => {
                        console.log(res);
                        MySwal.fire({
                            title: <strong>แก้ไขข้อมูลเสร็จสิ้น</strong>,
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        setIsModalOpen(false);
                        setValues({
                            PeopleID: "",
                            Username: "",
                            Email: "",
                            FirstName: "",
                            LastName: "",
                            Tel: "",
                        });
                        fetchData();  // ดึงข้อมูลใหม่หลังจากแก้ไข
                    })
                    .catch((err) => console.log(err));
            }
        });
    };


    //!
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios('http://localhost:8080/test/getPeople');
                setData({
                    Peoples: result.data
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    //add
    const [values, setValues] = useState({
        PeopleID: "",
        Username: "",
        Email: "",
        FirstName: "",
        LastName: "",
        Tel: "",
    });
    console.log("values", values)

    //!ADD people
    const handleSubmit = (event: any) => {
        event.preventDefault();
        MySwal.fire({
            title: 'คุณแน่ใจหรือไม่ที่ต้องการเพิ่มข้อมูล?',
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
                    .post("http://localhost:8080/test/addPeople", {
                        ...values,
                    })
                    .then((res) => {
                        console.log(res);
                        window.location.reload();
                    })
                    .catch((err) => console.log(err));
            }
        });
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const fetchData = async () => {
        const result = await axios('http://localhost:8080/test/getPeople');
        setData({ Peoples: result.data });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (People: any) => {
        console.log("delete", People);
        const idpeople = People.Username;

        MySwal.fire({
            title: 'คุณแน่ใจหรือไม่ที่ต้องการลบข้อมูล?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/test/deletePeople?PeopleID=${People.PeopleID}`)
                    .then((res) => {
                        console.log(res);
                        fetchData();  // ดึงข้อมูลใหม่หลังจากลบ
                        MySwal.fire({
                            title: <strong>ลบข้อมูล People เสร็จสิ้น</strong>,
                            html: <i>ลบข้อมูลของคนที่มี User:{idpeople} เรียบร้อยแล้ว</i>,
                            icon: "success",
                        })
                    })
                    .catch((err) => console.log(err));
            }
        });
    };

    return (
        <>

            <header>
                <MenuNav />
            </header>
            <div className='bodycontainer'>
                <div className='box'>
                    <div>
                    <h1>{userData.length > 0 ? `${userData[0].FirstName} ${userData[0].LastName}` : 'Loading...'}</h1>
                    {/* <h1>PeoPle</h1> */}
                    </div>
                    <div className='boxName'>
                        {data.Peoples.map((People: any) => (
                            <div className="people">
                                <div>
                                    Username : {People.Username}
                                </div>
                                <div>
                                    Email : {People.Email}
                                </div>
                                <div>
                                    FirstName : {People.FirstName}
                                </div>
                                <div>
                                    LastName : {People.LastName}
                                </div>
                                <div>
                                    Tel : {People.Tel}
                                </div>
                                <div className='buttonsum'>
                                    <button className="DeleteButton" onClick={() => handleDelete(People)}>Delete</button>
                                    <button className="EditButton" onClick={() => handleEditClick(People)}>
                                        Edit
                                    </button>
                                    <form action="" onSubmit={handleUpdate}>
                                        <EditPeople isOpen={isModalOpen} onClose={handleCloseModal} onEdit={handleUpdate}>
                                            <div className="modal-content">
                                                <div className='EditSum' >
                                                    <h1>Edit People</h1>
                                                </div>
                                                <div className='EditSum' >
                                                    <input value={values.Username} onChange={handleInput} name='Username' className='EditPeople' placeholder='Username' type="text" />
                                                    <input value={values.FirstName} onChange={handleInput} name='FirstName' className='EditPeople' placeholder='FirstName' type="text" />
                                                    <input value={values.LastName} onChange={handleInput} name='LastName' className='EditPeople' placeholder='LastName' type="text" />
                                                    <input value={values.Email} onChange={handleInput} name='Email' className='EditPeople' placeholder='Email' type="email" />
                                                    <input value={values.Tel} onChange={handleInput} name='Tel' className='EditPeople' placeholder='Tel' type="text" />
                                                </div>
                                                <div className='buttonModal'>
                                                    <button className="EditButton" >Save</button>
                                                    <button className="close-button" onClick={handleCloseModal} >Cancel</button>
                                                </div>
                                            </div>
                                        </EditPeople>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <form action="" onSubmit={handleSubmit} >
                    <div className='linebutton' >
                        <input value={values.Username} onChange={handleInput} name='Username' className='AddPeople' placeholder='Username' type="text" />
                        <input value={values.Email} onChange={handleInput} name='Email' className='AddPeople' placeholder='Email' type="email" />
                        <input value={values.FirstName} onChange={handleInput} name='FirstName' className='AddPeople' placeholder='FirstName' type="text" />
                        <input value={values.LastName} onChange={handleInput} name='LastName' className='AddPeople' placeholder='LastName' type="text" />
                        <input value={values.Tel} onChange={handleInput} name='Tel' className='AddPeople' placeholder='Tel' type="text" />
                        <button className="ADDSub" >ADD</button>
                    </div>
                </form>
                <button name='' className="Refresh btn btn-primary" onClick={() => window.location.reload()}>Refresh</button>
            </div>
        </>
    )
}

export default index