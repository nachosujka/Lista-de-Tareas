import mongoose from "mongoose";

const { Schema } = mongoose;

const tareaCollection = "Tarea";

const tareaSchema = new Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
  },
  { timestamps: true }
);

const tareaModel = mongoose.model(tareaCollection, tareaSchema);

export default tareaModel;
