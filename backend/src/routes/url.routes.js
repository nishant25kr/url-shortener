import express from "express"
import {
    generateUrl,
    getRedirectedUrl
} from "../controllers/url.controllers.js"

const router = express.Router()

router.post("/",generateUrl)
router.get("/:nanoID",getRedirectedUrl)

export default router;