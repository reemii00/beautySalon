import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
    window.location.reload()
  }
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    setLoginStatus(isLoggedIn)
    const menuBtn = document.getElementById("menuBtn");
    const closeMenu = document.getElementById("closeMenu");
    const mobileMenu = document.getElementById("mobileMenu");

    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("open");
    });

    closeMenu.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  }, [])

  const navigateToHome = () => {
    navigate(`/`)
  }

  return (

    <header class=" from-pink-500 to-purple-500 shadow-md fixed top-0 w-full z-20">
      <nav class="flex justify-between items-center px-4 py-3 md:px-8">
        <div
          onClick={navigateToHome}
          class="text-black text-lg md:text-2xl font-bold">
          Beauty Salon
        </div>
        <button
          id="menuBtn"
          class="md:hidden text-black text-2xl focus:outline-none"
        >
          &#9776;
        </button>
        <ul
          class="hidden md:flex gap-6 text-white text-sm md:text-base font-semibold"
        >
          <li><a href="/" class="text-[black]">Home</a></li>
          <li><a href="/services" class="text-[black]">Services</a></li>
          {loginStatus &&
            <li><a href="/appointment" class="text-[black]">Appointment</a></li>
          }
          {loginStatus ?
            <li><button onClick={handleLogout} class="text-[black] underline">Logout</button></li>
            :
            <li><a href="/login" class="text-[black]">User</a></li>
          }
          <li><a href="/admin" class="text-[black]">Admin</a></li>
          {loginStatus &&
            <li><a href="/profile" class="text-[black]">Profile</a></li>
          }
        </ul>
      </nav>
      <div
        id="mobileMenu"
        class="mobile-menu absolute top-0 right-0 h-screen w-3/4 bg-white shadow-lg md:hidden"
      >
        <button
          id="closeMenu"
          class="text-3xl text-red-500 absolute top-4 right-6"
        >
          &times;
        </button>
        <ul class="flex flex-col gap-6 mt-16 ml-8 text-gray-700 text-lg">
          <li><a href="/" class="text-[black]">Home</a></li>
          <li><a href="/services" class="text-[black]">Services</a></li>
          {loginStatus &&
            <li><a href="/appointment" class="text-[black]">Appointment</a></li>
          }
          {loginStatus ?
            <li><button onClick={handleLogout} class="text-[black] underline">Logout</button></li>
            :
            <li><a href="/login" class="text-[black]">User</a></li>
          }
          <li><a href="/admin" class="text-[black]">Admin</a></li>
          {loginStatus &&
            <li><a href="/profile" class="text-[black]">Profile</a></li>
          }
        </ul>
      </div>
    </header>

  );
};

export default Header;
