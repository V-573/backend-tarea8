import { Router } from "express";
import {
  createBooking,
  getBookingById,
  addServiceToBooking,
  getBooking,
} from "../controllers/booking.controller.js";

const router = Router();

router.post("/", createBooking);

router.get("/:bid", getBookingById);
router.get("/", getBooking);

router.post("/:bid/services/:sid", addServiceToBooking);

export default router;
