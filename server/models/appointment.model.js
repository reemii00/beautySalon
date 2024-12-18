import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema(
  {
    dateTime: {
      type: String,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);


export const Appointments = mongoose.model("Appointment", appointmentSchema);
