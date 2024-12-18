import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServicesTable = () => {
    const [services, setServices] = useState([]);

    // Fetch data from the API
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

    return (
        <div className="services-table-container">
            <h2>Services List</h2>
            <table className="services-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service._id}>
                            <td>{service.title}</td>
                            <td>{service.description}</td>
                            <td>{service.price}</td>
                            <td>
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="service-image"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServicesTable;
