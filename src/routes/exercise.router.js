import express from "express";
import {
  createExercise,
  deleteExercise,
  getAllExercises,
  getExercise,
  getExercisesBySet,
  updateExercise,
} from "../controllers/exercise.controller.js";
import { getByToken } from "../middlewares/user.validator.js";

const router = express.Router(); 

router
  .post("/exercises", getByToken, createExercise) 
  .get("/exercises", getByToken, getAllExercises) 
  .get("/exercises/:exerciseId", getByToken, getExercise) 
  .put("/exercises/:exerciseId", getByToken, updateExercise) 
  .delete("/exercises/:exerciseId", getByToken, deleteExercise); 

// Rutas para ejercicios dentro de un conjunto (setId específico)
router
  .get("/set/:setId/exercises", getByToken, getExercisesBySet) // Obtener todos los ejercicios para un set
  .get("/set/:setId/exercises/:exerciseId", getByToken, getExercise); // Obtener un ejercicio específico dentro de un set

export default router;
