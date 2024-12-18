import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        firstName: "",
        email: "",
        password: "",
    });

    const [errMsg, setErrMsg] = useState({
        firstName: "",
        password: "",
        email: ""
    });

    useEffect(() => {
        const isLogin = localStorage.getItem("isLoggedIn")
        if (isLogin) {
            navigate("/")
        }
    }, [])


    const handleOnChnage = (e) => {
        const value = e.target.value
        const name = e.target.name
        setData({ ...data, [name]: value })
    }

    const submitHandler = async (e) => {
        errMsg["firstName"] = false
        errMsg["email"] = false
        errMsg["password"] = false
        e.preventDefault();
        if (data.firstName == "") {
            setErrMsg({ ...errMsg, firstName: true })
            return;
        }
        if (data.email == "") {
            setErrMsg({ ...errMsg, firstName: true })
            return;
        }
        if (data.password == "") {
            setErrMsg({ ...errMsg, password: true })
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8000/login`, {
                firstName: data.firstName,
                password: data.password,
                email: data.email
            });
            if (response.status == 200) {
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userId", response.data.user._id);
                setData({
                    firstName: "",
                    email: "",
                    password: "",
                });
                navigate("/")
                alert("loggedIn successfully")
            }
        } catch (error) {
            alert(error.response?.data?.message || error.message || "something went wrong")
            console.error("Error:", error.response?.data?.message || error.message);
        }
    };
    return (
        <div>
            <Header />
            <div className="container pt-28  justify-content-center d-flex">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="login-cnt">
                            <p className="login-heading">Login to your page</p>
                            <div className="mb-10">
                                <div className="d-flex">
                                    <label>FirstName:</label>
                                    <input type="text" value={data.firstName} onChange={handleOnChnage} name="firstName" className="usernameinput" />
                                </div>
                                {errMsg.firstName && <span className="err-msg">FirstName is required</span>}
                            </div>

                            <div className="mb-10">
                                <div className="d-flex">
                                    <label>email:</label>
                                    <input type="text" value={data.email} onChange={handleOnChnage} name="email" className="usernameinput" />
                                </div>
                                {errMsg.email && <span className="err-msg">Email is required</span>}
                            </div>

                            <div className="mb-10">
                                <div className="d-flex">
                                    <label>Passowrd:</label>
                                    <input type="text" value={data.password} onChange={handleOnChnage} name="password" className="passwordinput" />
                                </div>
                                {errMsg.password && <span className="err-msg">Passowrd is required</span>}
                            </div>
                            <button className="loginBtn" onClick={submitHandler}>Login</button>
                            <span className="if-you">If you don't have account yet:<Link className="signupbtn" to={"/signup"} >SignUp</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
