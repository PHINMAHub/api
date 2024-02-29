import express, { Express, Request, Response } from 'express';
import { User } from '../middleware/authentication';
import { getUserProfile, getUserSubject } from '../services/user';
import { getUserNotification } from '../services/notification';

export const getUserProfileController = async (req: Request & { user?: User }, res: Response) => {
    try {
        const { userID, userType } = req.user || {};
        if (!userID) {
            return res.status(400).json({ message: 'User ID not provided' });
        }
        if (userID && userType) {
            const result = await getUserProfile(userID, userType);
            return res.status(result.httpCode).json(result.message);
        }
        return res.status(401).json({ 'message': 'Unauthorize' });
    } catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
};
export const getUserSubjectsController = async (req: Request & { user?: User }, res: Response) => {
    try {
        const { userID, userType } = req.user || {};
        if (!userID) {
            return res.status(400).json({ message: 'User ID not provided' });
        }
        if (userID && userType) {
            const result = await getUserSubject(userID, userType);
            return res.status(result.httpCode).json(result.message);
        }
        return res.status(401).json({ 'message': 'Unauthorize' });
    } catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
};
export const getUserNotificationController = async (req: Request & { user?: User }, res: Response) => {
    try {
        const { userID, userType } = req.user || {};
        if (!userID) {
            return res.status(400).json({ message: 'User ID not provided' });
        }
        if (userID && userType) {
            const result = await getUserNotification(userID);
            return res.status(result.httpCode).json(result.message);
        }
        return res.status(401).json({ 'message': 'Unauthorize' });
    } catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
};
