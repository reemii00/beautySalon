import React, { useEffect, useState, } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });

  const [errMsg, setErrMsg] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    matchPassowrd: "",
    lastName: "",
    phone: ""
  });

  useEffect(() => {
    // const isLogin = localStorage.getItem("isLoggedIn")
    // if (isLogin) {
    //   navigate("/")
    // }
  }, [])

  const submitHandler = async (e) => {
    errMsg["firstName"] = false
    errMsg["lastName"] = false
    errMsg["email"] = false
    errMsg["password"] = false
    errMsg["confirmPassword"] = false
    errMsg["matchPassowrd"] = false
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
    if (data.confirmPassword == "") {
      setErrMsg({ ...errMsg, confirmPassword: true })
      return;
    }

    if (data.confirmPassword != data.password) {
      setErrMsg({ ...errMsg, matchPassowrd: true })
      return;
    }

    if (data.phone == "") {
      setErrMsg({ ...errMsg, phone: true })
      return;
    }

    try {
      const response = await Axios.post(`http://localhost:8000/register`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone
      });
      if (response.status == 201) {
        //user created successfully
        navigate('/login');
        alert("user created successfully")
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
      <div>
        <Header />
        <div className="container pt-28  justify-content-center d-flex">
          <div className="row">
            <div className="col-sm-12">
              <div className="login-cnt">
                <p className="login-heading">Create your account</p>
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
                <div>
                  <div className="d-flex mb-10">
                    <label>Password:</label>
                    <input type="text" value={data.password} onChange={handleOnChnage} name="password" className="passwordinput" />
                  </div>
                  {errMsg.password && <span className="err-msg">Password is required</span>}
                </div>

                <div className="mb-10">
                  <div className="d-flex">
                    <label>Confirm Passowrd:</label>
                    <input type="text" value={data.confirmPassword} onChange={handleOnChnage} name="confirmPassword" className="passwordinput" />
                  </div>
                  {errMsg.confirmPassword && <span className="err-msg">Confirm Passowrd is required</span>}
                  {errMsg.matchPassowrd && <span className="err-msg">Confirm Passowrd should match with password</span>}
                </div>

                <div className="mb-10">
                  <div className="d-flex">
                    <label>Phone Number:</label>
                    <input type="text" value={data.phone} onChange={handleOnChnage} name="phone" className="passwordinput" />
                  </div>
                  {errMsg.phone && <span className="err-msg">Phone Number is required</span>}
                </div>

                <button onClick={submitHandler} className="loginBtn">Signup</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
export default SignUp;
