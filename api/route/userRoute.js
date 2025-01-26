import express from "express";
import { myTemplate } from "../controller/userController.js";
import { deleteTemplate } from "../controller/userController.js";
import { requireAuth } from '@clerk/express'
const router = express.Router();
router.get("/userTemplates/myTemplate/:id",requireAuth({ signInUrl: '/sign-in' }), myTemplate);
router.delete("/userTemplates/deleteTemplate/:id",requireAuth({ signInUrl: '/sign-in' }), deleteTemplate);
 export default router;