import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function NavIndex() {

  const location = useLocation();
    const [userData, setUserData] = useState(null);

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

  return (
    <nav className="">
      <div className="headernav mx-auto flex justify-between items-center">
        <Link
          className="collumnavHome"
          to="/"
        >
          HOME
        </Link>
        <div>
          <h2>
          {/* Email: {userData.Email} */}
          </h2>
        </div>
        {/* <div>
          <Link
            className="collumnav"
            to="/showUser"
          >
            ShowUser
          </Link>
          <Link
            className="collumnav"
            to="/showProduct"
          >
            ShowProduct
          </Link>
          <Link
            className="collumnav"
            to="/showOrder"
          >
            ShowOrder
          </Link>
          <Link
            className="collumnav"
            to="/showCategory"
          >
            ShowCategory
          </Link>
          <Link
            className="collumnav"
            to="/orderDetail"
          >
            OrderDetail
          </Link>
        </div> */}

      </div>
    </nav>
  );
}

export default NavIndex;
