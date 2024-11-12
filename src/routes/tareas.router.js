import { Router } from "express";
import tareaModel from "../models/tareas.model.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const tareaNuevaAgregar = req.body;
    if (!tareaNuevaAgregar) {
      return res
        .status(400)
        .json({ status: "Error", msg: "No se proporcionaron datos" });
    }
    const tareaNueva = new tareaModel(tareaNuevaAgregar);
    await tareaNueva.save();
    return res
      .status(201)
      .json({ status: "Success", msg: "Tarea agregada exitosamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
});

router.get("/", async (req, res) => {
  try {
    const tareas = await tareaModel.find().select("nombre descripcion");
    res.status(201).json({
      status: "Success",
      msg: "Estas son todas las tareas",
      tareas: tareas,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tareaEliminar = await tareaModel.findByIdAndDelete(req.params.id);
    if (!tareaEliminar) {
      return res
        .status(404)
        .render("error", { error: "Error al eliminar la tarea" });
    }
    res.status(201).json({ status: "Succes", msg: "Tarea eliminada" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const tareaEditada = req.body;
    const tareaEditar = await tareaModel.findById(req.params.id);

    tareaEditar.nombre = tareaEditada.nombre;
    tareaEditar.descripcion = tareaEditada.descripcion;
    await tareaEditar.save();
    return res
      .status(200)
      .json({ status: "Success", msg: "Tarea cambiada exitosamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
});

export default router;
