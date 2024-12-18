import React, { useState } from "react";
import Axios from "axios";

const ServiceForm = () => {
  const [services, setServices] = useState({ title: "", description: "", price: "", });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageToDisplay, setImagetoDisplay] = useState(null);

  const [errMsg, setErrMsg] = useState({
    title: "",
    description: "",
    price: "",
    image: ""
  });

  const onChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setServices({ ...services, [name]: value })
  }


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagetoDisplay(imageUrl)
      setSelectedImage(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagetoDisplay(null)
  };

  const SubmitHandler = async (e) => {
    errMsg["title"] = false
    errMsg["description"] = false
    errMsg["price"] = false
    errMsg["image"] = false

    e.preventDefault();

    if (services.title == "") {
      setErrMsg({ ...errMsg, title: true })
      return;
    }
    if (services.description == "") {
      setErrMsg({ ...errMsg, description: true })
      return;
    }
    if (services.price == "") {
      setErrMsg({ ...errMsg, price: true })
      return;
    }
    if (services.image == "") {
      setErrMsg({ ...errMsg, image: true })
      return;
    }


    let formData = new FormData();

    formData.append('title', services.title);
    formData.append('image', selectedImage);
    formData.append('description', services.description);
    formData.append('price', Number(services.price));
    try {
      const response = await Axios.post(`http://localhost:8000/add-service`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status == 200) {
        window.location.reload()
        alert("Service created successfully")
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message || "something went wrong")
      console.error("Error:", error.response?.data?.message || error.message);
    }
  }


  return (
    <div className="h-screen mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add Service</h2>

      {/* Service Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Service Title</label>
        <input
          type="text"
          value={services.title}
          onChange={onChange}
          name="title"
          placeholder="Enter service title"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errMsg.title && <span className="err-msg">Title  is required</span>}

      </div>

      {/* Service Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Service Description</label>
        <textarea
          value={services.description}
          onChange={onChange}
          rows="4"
          name="description"
          placeholder="Enter service description"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        {errMsg.description && <span className="err-msg">Description  is required</span>}

      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Service Price</label>
        <input
          type="text"
          value={services.price}
          onChange={onChange}
          name="price"
          placeholder="Enter service title"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errMsg.price && <span className="err-msg">Price  is required</span>}

      </div>

      {/* Service Image */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Service Image</label>
        <div className="image-picker-container">
          {imageToDisplay ? (
            <div className="image-preview">
              <img src={imageToDisplay} alt="Selected" />
              <button className="remove-button" onClick={removeImage}>Remove</button>
            </div>
          ) : (
            <label className="image-input-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="image-input"
              />
              Choose an Image
            </label>
          )}
          {errMsg.image && <span className="err-msg">Image  is required</span>}
        </div>
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        onClick={SubmitHandler}
        className="w-full py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Submit Service
      </button>
    </div>
  );
};

export default ServiceForm;
