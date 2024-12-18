
import pic2 from "../Images/s1.jpg";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [services, setServices] = useState([]);
    const [subServices, setSubServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8000/all-services'); // Update with your API endpoint
                setServices(response.data.services);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    useEffect(() => {
        const fetchSubServices = async () => {
            try {
                const response = await axios.get('http://localhost:8000/dropdown/sub-services'); // Update with your API endpoint
                setSubServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchSubServices();
    }, []);

    const navigateToAppointment = (id) => {
        navigate(`/appointment`)
    }

    const navigateToSubService = (id) => {
        navigate(`/service-category/${id}`)
    }

    return (
        <div className="home">
            <Header />

            <section
                class="pt-24 pb-10 text-center "
            >
                <h1 class="text-3xl md:text-5xl font-bold mb-2 text-black-800">
                    Welcome to Beauty Salon
                </h1>
                <p class="text-lg text-gray-700 mb-4">
                    Discover luxury services to pamper yourself
                </p>
                <button
                    onClick={navigateToAppointment}
                    class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold mb-4"
                >
                    Get Started
                </button>
                <div
                    class="w-11/12 md:w-3/4 mx-auto h-48 md:h-80 bg-gray-300 flex items-center justify-center rounded-md"
                >
                    <img
                        class="w-full md:h-80 h-48 object-cover rounded-md"
                        src={pic2}
                        alt="Beauty Salon"
                    />
                </div>
            </section>

            <section class="py-10 text-center">
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                    Our Featured Services
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8">
                    {services.length > 0 ?
                        <>
                            {services.slice(0, 3).map((item) =>
                                <div
                                    onClick={() => navigateToSubService(item._id)}

                                    class="border rounded-md shadow-md bg-white p-4 flex flex-col items-center"
                                >
                                    <h3 class="text-lg font-semibold mb-2 text-gray-700 underline">
                                        {item.title}
                                    </h3>
                                    <img
                                        src={item.image}
                                        class="object-cover w-full h-32 rounded-md mb-4"
                                        alt="Service 1"
                                    />
                                    <p class="text-gray-600 text-sm mb-4">
                                        {item.description}
                                    </p>

                                </div>
                            )}
                        </>

                        :
                        <div>Please enter service from admin</div>
                    }
                </div>

                <h2 class="text-2xl mt-12 md:text-3xl font-bold mb-6 text-gray-800">
                    Our Featured Sub Services
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8">
                    {subServices.length > 0 ?
                        <>
                            {subServices.slice(0, 3).map((item) =>
                                <div
                                    class="border rounded-md shadow-md bg-white p-4 flex flex-col items-center"
                                >
                                    <h3 class="text-lg font-semibold mb-2 text-gray-700 underline">
                                        {item.title}
                                    </h3>
                                    <img
                                        src={item.image}
                                        class="object-cover w-full h-32 rounded-md mb-4"
                                        alt="Service 1"
                                    />
                                    <p class="text-gray-600 text-sm mb-4">
                                        {item.description}
                                    </p>
                                    <button
                                        onClick={() => navigateToAppointment(item._id)}
                                        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            )}
                        </>
                        :
                        <div>Please enter sub service from admin</div>

                    }
                </div>
            </section>
        </div>
    );
};

export default Home;

