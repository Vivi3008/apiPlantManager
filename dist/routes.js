"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PlantsController_1 = __importDefault(require("./controller/PlantsController"));
const routes = express_1.Router();
routes.get('/plants', PlantsController_1.default.listPlants);
routes.get('/plants_environments', PlantsController_1.default.listPlantsEnvironment);
routes.get('/plants_water_frequencies', PlantsController_1.default.PlantsWaterFrequencies);
exports.default = routes;
