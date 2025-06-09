import { Request, Response, NextFunction } from "express";


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiKey = req.headers['x-api-key'];
        console.log("Aaaaaaaaaaa", apiKey)
        if (apiKey === process.env.API_KEY) {
            next();
        } else {
            res.status(403).send({ success: false, message: 'Forbidden: Invalid API key' })
        }
    } catch (error) {
        console.error("middleware auth error", error)
        res.status(500).send({ success: false, message: 'Internal server error' })
    }
}