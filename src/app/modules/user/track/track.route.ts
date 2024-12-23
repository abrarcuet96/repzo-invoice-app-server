import express from 'express';
import { fetchTracks } from './track.controller';
const trackRouter = express.Router();

trackRouter.get('/:userId', fetchTracks);

export const TrackRoutes = trackRouter;
