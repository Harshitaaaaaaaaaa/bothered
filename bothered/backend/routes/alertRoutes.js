import express from "express";
import { sendAlertEmail } from "../controllers/alertController.js";

const router = express.Router();

router.post("/email", sendAlertEmail);

export default router;
