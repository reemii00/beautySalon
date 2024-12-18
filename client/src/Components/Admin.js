import React, { useState } from 'react';
import ServiceForm from './AddService';
import ServicesTable from './SeeAllAddedServices';
import BookedAppointmentList from './SeeAllBookedAppointment';
import SubServiceForm from './AddSubService';
import { useNavigate } from 'react-router-dom';
import UpdateUser from './UpdateUser';

const Admin = () => {
    // State to manage selected component
    const [selectedComponent, setSelectedComponent] = useState('Insert Service');
    const navigate = useNavigate();

    // Menu options and corresponding components
    const menuOptions = [
        { name: 'Insert Service', component: <ServiceForm /> },
        { name: 'Insert Sub Service', component: <SubServiceForm /> },
        { name: 'Admin', component: <ServicesTable /> },
        { name: 'Appointment Booking', component: <BookedAppointmentList /> },
        // { name: 'History', component: <BookedAppointmentList /> },
        { name: 'Profile', component: <UpdateUser /> },
    ];
    const navigateToHome = (id) => {
        navigate(`/`)
    }
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white flex flex-col">
                <div onClick={navigateToHome} className="text-2xl font-bold p-4 border-b border-gray-700">Beauty Saloon</div>
                <ul className="flex-grow">
                    {menuOptions.map((option, index) => (
                        <li
                            key={index}
                            className={`p-4 cursor-pointer hover:bg-gray-700 ${selectedComponent === option.name ? 'bg-gray-700' : ''
                                }`}
                            onClick={() => setSelectedComponent(option.name)}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
                <div className="p-4 border-t border-gray-700 text-center text-sm">© 2024 Saloon App</div>
            </div>

            {/* Right Content Area */}
            <div className="flex-grow bg-gray-100 overflow-y-auto">
                {menuOptions.find((option) => option.name === selectedComponent)?.component}
            </div>
        </div>
    );
};

export default Admin;
