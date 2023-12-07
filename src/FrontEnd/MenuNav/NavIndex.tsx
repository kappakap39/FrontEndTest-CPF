import React from "react";
import { Link } from "react-router-dom";

function NavIndex() {
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
        </div>

      </div>
    </nav>
  );
}

export default NavIndex;
