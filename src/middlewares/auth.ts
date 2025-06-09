import { Request, Response, NextFunction } from "express";


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiKey = req.headers['x-api-key'];
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

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error("", err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message,
        error: process.env.NODE_ENV === "production" ? undefined :
            err.message
    });
}
