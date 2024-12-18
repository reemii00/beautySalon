import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ENV_VARS } from "./constant";
import { User } from "./models/user.model";
import { Appointments } from "./models/appointment.model";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { Services } from "./models/service.model";
import mongoose from "mongoose";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use('/temp', express.static(path.join(__dirname, 'temp')));
app.use(
  cors({
    origin: ENV_VARS.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

mongoose.connect(ENV_VARS.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));



// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'temp'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


//done
app.post("/login", async (req, res) => {
  // get data from req.body
  const { password, firstName, email } = req.body
  console.log(password, firstName)
  try {
    // firstName or email
    if (!firstName || !email) {
      return res
        .status(400)
        .json({ message: "firstName or email is required" });
    }

    // find the user
    const userDB = await User.findOne({
      $or: [{ firstName }]
    })
    if (!userDB) {
      return res
        .status(400)
        .json({ message: "user does not exist" });
    }

    if (password !== userDB.password) {
      return res.status(400).json({ message: 'Invalid firstName or password' });
    }

    const loggedInUser = await User.findById(userDB._id).select(
      "-password"
    );
    res.status(200).json({ user: loggedInUser, login: true, message: "User logged In Successfully" });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', login: false, error: err.message });
  }
})

//done
app.post("/register", async (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body;
  console.log(email, password, firstName, lastName, phone)
  try {
    if (!firstName) {
      return res.status(400).json({ message: "firstName is required" });
    }
    // validation - not empty
    if (
      [firstName, email, password].some((field) => field?.trim() === "")
    ) {
      return res
        .status(400)
        .json({ message: "All fields are Required" });
    }

    // check if user already exists
    const existedUser = await User.findOne({ $or: [{ firstName }, { email }] });
    if (existedUser) {
      return res
        .status(400)
        .json({ message: "User already exist" });
    }

    // create user object - create entry in db
    const user = await User.create({
      email,
      password,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    });

    // remove password  field from response
    const createdUser = await User.findById(user._id).select(
      "-password"
    );

    if (!createdUser) {
      return res
        .status(500)
        .json({ message: "Something went wrong while registering the user" });
    }

    return res
      .status(201)
      .json({ user: createdUser, register: true, message: "User registered successfully" });

  } catch (e) {
    return res
      .status(201)
      .json({ message: e.response });
  }
})

app.put('/user/:id', async (req, res) => {
  const { id } = req.params; // Extract user ID from URL parameters
  const updatedDetails = req.body; // Get updated details from request body

  try {
    // Find the user by ID and update their details
    const user = await User.findByIdAndUpdate(
      id,
      { $set: updatedDetails },
      { new: true, runValidators: true } // Return updated document and validate
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/user/:id', async (req, res) => {
  const { id } = req.params; // Extract user ID from the request parameters

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to book an appointment //done
app.post('/book-appointment', async (req, res) => {
  const { userID, serviceName, dateTime } = req.body;
  // Validate request body
  if (!userID || !serviceName || !dateTime) {
    return res.status(400).json({ message: 'All fields (serviceName, dateTime) are required.' });
  }

  try {
    // Check if user exists
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create and save a new appointment
    const appointment = new Appointments({ user: userID, serviceName, dateTime });
    await appointment.save();

    res.status(200).json({
      message: 'Appointment booked successfully!',
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error });
  }
});

// Endpoint to get all appointments  //done
app.get('/all-appointments', async (req, res) => {
  try {
    const appointments = await Appointments.find().populate('user', 'firstName lastName email phone');
    res.status(200).json({
      message: 'List of all appointments',
      appointments
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
});

// -----------------------------------------------------------
//done
app.post('/add-service', upload.single('image'), async (req, res) => {
  try {
    const { title, price, description } = req.body;


    if (!req.file) {
      return res.status(400).json({ message: 'Images file is required' });
    }

    const encodedFilename = encodeURIComponent(req.file.filename);
    const imageUrl = `http://localhost:8000/temp/${encodedFilename}`;

    // Create new Service
    const service = new Services({
      image: imageUrl,
      contentType: req.file.mimetype,
      title,
      price,
      description,
    });
    await service.save();

    res.status(200).json({ message: 'Service added successfully', service: service });
  } catch (err) {
    res.status(500).json({ message: 'Error adding Service', error: err.message });
  }
});

// Endpoint to get all services with sub-services
//done
app.get('/all-services', async (req, res) => {
  try {
    const services = await Services.find();
    res.status(200).json({
      message: 'List of all services',
      services
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error });
  }
});

//done
app.get('/dropdown/services', async (req, res) => {
  try {
    const services = await Services.find({}, 'title _id'); // Select only title and _id
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a sub-service to a parent service by ID
//done
app.post('/:id/sub-service', upload.single('image'), async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Images file is required' });
    }

    const encodedFilename = encodeURIComponent(req.file.filename);
    const imageUrl = `http://localhost:8000/temp/${encodedFilename}`;

    // Validate input
    if (!title || !price) {
      return res.status(400).json({ message: 'Title and price are required for sub-service' });
    }

    // Find the parent service by ID
    const service = await Services.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Parent service not found' });
    }

    // Create the new sub-service object
    const newSubService = {
      title, description, price,
      image: imageUrl,
      contentType: req.file.mimetype,
    };

    // Push the sub-service into the subServices array
    service.subServices.push(newSubService);

    // Save the updated service
    await service.save();

    res.status(201).json({ message: 'Sub-service added successfully', service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//done
app.get('/dropdown/sub-services', async (req, res) => {
  try {
    // Find all services
    const services = await Services.find();

    // Extract all subServices and flatten them into a single array
    const subServices = services
      .map(service => service.subServices) // Extract the subServices arrays
      .flat() // Flatten the arrays into a single array

    // Optional: Ensure each sub-service includes its parent service ID (if needed)
    // .map(subService => ({
    //   ...subService,
    //   parentServiceId: services.find(service => service.subServices.includes(subService))._id
    // }));

    res.status(200).json(subServices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET: Fetch all sub-services for a given service ID
app.get("/sub-services/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the service by ID and project only the subServices field
    const service = await Services.findById(id, "subServices");

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      success: true,
      subServices: service.subServices,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});


app.listen(ENV_VARS.PORT, () => {
  console.log(`Server is running on http://localhost:${ENV_VARS.PORT}`);
});