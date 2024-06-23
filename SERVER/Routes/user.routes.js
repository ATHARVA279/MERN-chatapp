import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getUserforSideBar } from '../Controllers/user.controller.js';
const router = express.Router();

router.get("/", protectRoute, getUserforSideBar );



export default router;