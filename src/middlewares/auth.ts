import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { ApiError } from "../utils/ApiError";


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    })
    if (!session) {
        next(new ApiError(401, "Unauthorized"))
    } else {
        req.user = session.user
        next()
    }
}