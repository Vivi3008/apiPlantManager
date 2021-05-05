"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const plantsData = './database/server.json';
function readPlants() {
    try {
        const data = fs_1.readFileSync(plantsData);
        return JSON.parse(data.toString());
    }
    catch (error) {
        console.log('Request Error: ', error);
    }
}
exports.default = {
    async listPlants(req, res) {
        try {
            const doc = await readPlants();
            const pageNumber = req.query.page;
            const limitNumber = req.query.limit;
            const page = parseInt(pageNumber) || 1;
            const limit = parseInt(limitNumber) || 5;
            const num = (page * 5);
            const start = (num - 5);
            let newLimit = start + limit;
            const items = [];
            for (let i = start; i < newLimit; i++) {
                items.push(doc.plants[i]);
            }
            const pages = (doc.plants.length / 5);
            const docs = doc.plants.length;
            const obj = {
                docs,
                pages
            };
            const plants = [
                doc.plants,
                obj
            ];
            page !== 1 || limitNumber ? res.json(items) : res.json(plants);
        }
        catch (error) {
            console.log('Request error:', error);
        }
    },
    async listPlantsEnvironment(req, res) {
        try {
            const doc = await readPlants();
            res.json(doc.plants_environments);
        }
        catch (error) {
            console.log('Request error:', error);
        }
    },
    async PlantsWaterFrequencies(req, res) {
        try {
            const doc = await readPlants();
            res.json(doc.plants_water_frequencies);
        }
        catch (error) {
            console.log('Request error:', error);
        }
    }
};
