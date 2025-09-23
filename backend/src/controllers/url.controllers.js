import { nanoid } from "nanoid";
import URL from "../models/url.models.js";

export const generateUrl = async (req, res) => {
    try {
        const { redirectURL } = req.body;


        if (!redirectURL) {
            return res.status(400).json({ error: "URL is required" });
        }

        const shortId = nanoid(8);

        const url = await URL.create({
            shortId,
            redirectURL,
        });

        if (!url) { return res.status(400).json({ error: "Error while saving in DB" }) }

        return res.status(201).json({
            message: "Short URL created successfully",
            shortId: shortId,
            //   shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`,
        });
    } catch (error) {
        console.error("Error while creating short URL:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

export const getRedirectedUrl = async (req, res) => {

    try {
        const nanoID = req.params.nanoID?.trim()

        if (!nanoID) {
            return res.status(200).json({ message: "ShortId is required" })
        }

        const UrlObj = await URL.findOne({ shortId: nanoID })

        if (!UrlObj) {
            return res.status(200).json({ message: "Wrong shortId" })
        }

        await URL.findByIdAndUpdate(
            UrlObj._id,
            { $push: { visitHistory: Date.now() } },
            { new: true }
        );

        res.redirect(UrlObj.redirectURL);

    } catch (error) {
        console.log("error", error)
    }

}

export const getAnalytics = async (req, res) => {
    
    const nanoID = req.params.nanoID?.trim()
    console.log(nanoID)

    const urlObj = await URL.findOne({ shortId: nanoID })

    if (!urlObj) {
        return res.status(400).json({ Error: "Nano id is wrong" })
    }

    return res.status(200).json(
        {
            totalClicks: urlObj.visitHistory.length,
            analytics: urlObj.visitHistory
        }
    )
}
