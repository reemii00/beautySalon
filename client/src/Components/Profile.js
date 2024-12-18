import React, { useEffect, useState, } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
const Profile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const [errMsg, setErrMsg] = useState({
    firstName: "",
    email: "",
    password: "",
    lastName: "",
    phone: ""
  });

  useEffect(() => {
    const isLogin = localStorage.getItem("isLoggedIn")
    if (!isLogin) {
      navigate("/")
    }
  }, [])


  useEffect(() => {

    const fetchServices = async () => {
      const userId = localStorage.getItem("userId")
      try {

        const response = await axios.get(`http://localhost:8000/user/${userId}`); // Update with your API endpoint

        setData(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const submitHandler = async (e) => {
    errMsg["firstName"] = false
    errMsg["lastName"] = false
    errMsg["email"] = false
    errMsg["password"] = false
    errMsg["phone"] = false

    e.preventDefault();

    if (data.firstName == "") {
      setErrMsg({ ...errMsg, firstName: true })
      return;
    }
    if (data.lastName == "") {
      setErrMsg({ ...errMsg, firstName: true })
      return;
    }
    if (data.email == "") {
      setErrMsg({ ...errMsg, email: true })
      return;
    }
    if (data.password == "") {
      setErrMsg({ ...errMsg, password: true })
      return;
    }

    if (data.phone == "") {
      setErrMsg({ ...errMsg, phone: true })
      return;
    }
    const userId = localStorage.getItem("userId")


    try {
      const response = await Axios.put(`http://localhost:8000/user/${userId}`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone
      });
      if (response.status == 200) {
        alert("Acount updated successfully")

        navigate("/")
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message || "something went wrong")
      console.error("Error:", error.response?.data?.message || error.message);
    }
  };

  const handleOnChnage = (e) => {
    const value = e.target.value
    const name = e.target.name
    setData({ ...data, [name]: value })
  }

  return (
    <div className="">
      <Header />
      <div>
        <div className="container pt-28  justify-content-center d-flex">
          <div className="row">
            <div className="col-sm-12">
              <div className="login-cnt">
                <p className="login-heading">Update your account</p>
                <div className="mb-10">
                  <div className="d-flex">
                    <label>FirstName:</label>
                    <input type="text" value={data.firstName} onChange={handleOnChnage} name="firstName" className="usernameinput" />
                  </div>
                  {errMsg.firstName && <span className="err-msg">FirstName is required</span>}
                </div>
                <div className="mb-10">
                  <div className="d-flex">
                    <label>LastName:</label>
                    <input type="text" value={data.lastName} onChange={handleOnChnage} name="lastName" className="usernameinput" />
                  </div>
                  {errMsg.lastName && <span className="err-msg">LastName is required</span>}
                </div>
                <div className="mb-10">
                  <div className="d-flex">
                    <label>Email:</label>
                    <input type="text" value={data.email} onChange={handleOnChnage} name="email" className="passwordinput" />
                  </div>
                  {errMsg.email && <span className="err-msg">Email is required</span>}
                </div>

                <div className="mb-10">
                  <div className="d-flex">
                    <label>Phone Number:</label>
                    <input type="text" value={data.phone} onChange={handleOnChnage} name="phone" className="passwordinput" />
                  </div>
                  {errMsg.phone && <span className="err-msg">Phone Number is required</span>}
                </div>

                <button onClick={submitHandler} className="loginBtn">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
export default Profile;
