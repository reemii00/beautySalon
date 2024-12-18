import React, { useEffect, useState, } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import axios from "axios";
const ServicesListing = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

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

  const navigateToSubService = (id) => {
    navigate(`/service-category/${id}`)
  }

  return (
    <div className="">
      <Header />

      <section class="pt-24 pb-12 px-4 md:px-8">
        <h1 class="text-3xl md:text-5xl font-bold text-center mb-8 text-gray-800">
          Our Services
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item) =>
            <div class="border rounded-md shadow-md bg-white p-4 flex flex-col items-center">
              <img
                src={item.image}
                class="w-full h-48 object-cover rounded-md mb-4"
                alt="Hair Service"
              />
              <h3 class="text-lg font-semibold mb-2 text-gray-700">{item.title}</h3>
              <p class="text-sm text-gray-600 text-center mb-4">
                {item.description}
              </p>
              <button onClick={() => navigateToSubService(item._id)} class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                View Services
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default ServicesListing;
