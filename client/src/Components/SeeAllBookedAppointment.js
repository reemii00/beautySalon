import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookedAppointmentList = () => {
    const [services, setServices] = useState([]);

    // Fetch data from the API
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8000/all-appointments'); // Update with your API endpoint
                setServices(response.data.appointments);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="services-table-container">
            <h2>Appointments List</h2>
            <table className="services-table">
                <thead>
                    <tr>
                        <th>ServiceName</th>
                        <th>dateTime</th>
                        <th>User</th>
                      
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service._id}>
                            <td>{service.serviceName}</td>
                            <td>{service.dateTime}</td>
                            <td>{service.user.firstName} {service.user.lastName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookedAppointmentList;
