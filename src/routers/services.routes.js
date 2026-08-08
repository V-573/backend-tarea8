import { Router } from "express";
import {
  createService,
  deleteService,
  getServices,
  getServiceById,
  updateService,
} from "../controllers/services.controller.js";

const router = Router();

// El prefijo "/services" se manejará desde el enrutador principal (index.js)
router.get("/", getServices);
router.get("/:id", getServiceById);
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
