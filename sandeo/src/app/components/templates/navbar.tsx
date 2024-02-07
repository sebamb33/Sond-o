import React, { ReactNode, useEffect, useState } from "react";
import "@/app/globals.css";

type NavbarProps = {
    children: ReactNode;
};

const Navbar = ({ children }: NavbarProps) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userDataString = sessionStorage.getItem("userData");
        console.log(userDataString);
        if (userDataString) {
            setUserData(JSON.parse(userDataString));
        }
    }, []);

    return (
        <div className="flex h-full">
            <div className="navbar w-60 bg-red rounded-lg">
                <div className="menu"></div>
                <div className="userData">{userData && <p>Bienvenue, {userData.firstname} - {userData.lastname}!</p>}</div>
            </div>
            <main className="w-9/12">{children}</main>
        </div>
    );
};

export default Navbar;
