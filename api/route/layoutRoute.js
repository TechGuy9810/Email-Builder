import express from "express";
import { getEmailLayout, uploadEmailConfig, uploadImage, renderEmailLayout, downloadTemplate } from "../controller/layoutController.js";
import upload from "../utils/multerConfig.js";
import { requireAuth } from '@clerk/express'
import { createEmailLayout } from "../controller/layoutController.js";
const router = express.Router();
router.get("/emailTemplate/createEmailLayout",requireAuth({ signInUrl: '/sign-in' }), createEmailLayout);
router.get("/emailTemplate/getEmailLayout/:id",requireAuth({ signInUrl: '/sign-in' }), getEmailLayout);
router.post("/emailTemplate/uploadEmailConfig/:id",requireAuth({ signInUrl: '/sign-in' }), uploadEmailConfig);
router.post("/emailTemplate/uploadImage/:id", requireAuth({ signInUrl: '/sign-in' }), upload.single('file'),uploadImage);
router.get("/emailTemplate/downloadTemplate/:id", requireAuth({ signInUrl: '/sign-in' }), downloadTemplate);
 export default router;