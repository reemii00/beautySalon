import React, { useEffect, useState } from "react";
import Axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from "axios";

const Appointment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    service: "",
    date: "",

  });

  const [errMsg, setErrMsg] = useState({
    service: "",
    date: "",
  });

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/dropdown/sub-services`); // Update with your API endpoint
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const submitHandler = async () => {
    errMsg["service"] = false
    errMsg["date"] = false

    if (data.service == "") {
      setErrMsg({ ...errMsg, service: true })
      return;
    }
    if (data.date == "") {
      setErrMsg({ ...errMsg, date: true })
      return;
    }

    const userID = localStorage.getItem("userId")

    try {
      const response = await Axios.post('http://localhost:8000/book-appointment', {
        serviceName: data.service,
        dateTime: data.date,
        userID: userID
      });

      if (response.status == 200) {
        //success
        setData({
          service: "",
          date: "",
        });
        alert("Appointment Booked successfully");
        // navigate("/")
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message || "something went wrong")
      console.error("Error fetching data:", error);
    }
  }

  const handleDateTime = (e) => {
    const value = e.target.value
    const name = e.target.name
    setData({ ...data, [name]: value })
  };

  const handleService = (e) => {
    const value = e.target.value
    const name = e.target.name
    setData({ ...data, [name]: value })
  };

  return (
    <div className="">
      <div>
        <Header />
        <section
          class="pt-28 "
        >
          <div className="container justify-content-center d-flex">
            <div className="row">
              <div className="col-sm-12">
                <h1 className="mb-20">Book Your Salon Service</h1>

                <div className="mb-10">
                  <label for="salon-services" className="mr-20">Choose a service:</label>
                  <select id="salon-services" onChange={handleService} value={data.service} name="service">
                    <option value="" disabled>
                      -- Choose a Service --
                    </option>
                    {services.map((service) => (
                      <option key={service._id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>


                  {errMsg.service && <span className="err-msg">Service is required</span>}
                </div>

                <label for="appointment-datetime" className="mr-20">Choose date and time:</label>
                <input type="datetime-local" onChange={handleDateTime} value={data.date} id="appointment-datetime" name="date" />
                {errMsg.date && <span className="err-msg">Date is required</span>}
                <div className="mt-20">
                  <button className="bookappointment-btn" onClick={submitHandler}>Confirm Appointment</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div >
  );
};
export default Appointment;
