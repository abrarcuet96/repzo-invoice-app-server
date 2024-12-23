/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { getTracks } from './track.service';

export const fetchTracks = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.params.userId;
    const metrics = await getTracks(userId);
    res.status(200).json(metrics);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
