import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const ServiceCategory = () => {
    const [services, setServices] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const fetchServices = async () => {
            try {

                const response = await axios.get(`http://localhost:8000/sub-services/${id}`); // Update with your API endpoint
           
                setServices(response.data.subServices);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    const navigateToAppointment = (id) => {
        navigate(`/appointment`)
    }

    return (
        <div>
            <Header />
            <section class="pt-24 pb-6 text-center">
                <h1 class="text-3xl md:text-4xl font-bold text-gray-800">Category Name Services Page</h1>
                <p class="text-gray-600 mt-2">Explore the best services tailored for you.</p>
            </section>

            <section class="py-6">
                <h2 class="text-xl md:text-2xl font-semibold text-center mb-6 text-gray-700">
                    Available Services
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8">
                    {services.map((item) =>
                        <div class="bg-white shadow-md rounded-md overflow-hidden p-4">
                            <img src={item.image} alt="Service" class="w-full h-32 object-cover rounded-md mb-4" />
                            <h3 class="text-lg font-semibold text-gray-800 mb-2 text-center">{item.title}</h3>
                            <p class="text-gray-600 text-sm text-center mb-4">
                                {item.description}
                            </p>
                            <button
                                onClick={() => navigateToAppointment(item._id)}
                                class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                                Book Now
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};
export default ServiceCategory;
