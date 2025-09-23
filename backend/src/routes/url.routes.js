import express from "express"
import {
    generateUrl,
    getRedirectedUrl,
    getAnalytics
} from "../controllers/url.controllers.js"

const router = express.Router()

router.post("/",generateUrl)
router.get("/:nanoID",getRedirectedUrl)
router.get("/analytics/:nanoID",getAnalytics)

export default router;