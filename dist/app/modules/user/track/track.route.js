"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackRoutes = void 0;
const express_1 = __importDefault(require("express"));
const track_controller_1 = require("./track.controller");
const trackRouter = express_1.default.Router();
trackRouter.get('/:userId', track_controller_1.fetchTracks);
exports.TrackRoutes = trackRouter;
