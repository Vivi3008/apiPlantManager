import { Request, Response } from 'express'
import { readFileSync } from 'fs'

const plantsData = './database/server.json'


function readPlants() {
    try {
        const data = readFileSync(plantsData);
        return JSON.parse(data.toString())
    } catch (error) {
        console.log('Request Error: ', error)
    }
}


export default {
    async listPlants(req: Request, res: Response) {
        try {
            const doc = await readPlants();

            const pageNumber: any = req.query.page;
            const limitNumber: any = req.query.limit;

            const page = pageNumber || 1;

            const num = (page * 5);
            const start = (num - 5)

            const limit = limitNumber || 5;

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
            }

            const plants = [
                items,
                obj
            ]

            res.json(plants)
        } catch (error) {
            console.log('Request error:', error)
        }
    },

    async listPlantsPaginate(req: Request, res: Response) {
        try {
            const doc = await readPlants();

            const page = 2;
            const num = (page * 5);
            const start = (num - 5)

            const limit = start + 5;

            const items = [];

            for (let i = start; i < limit; i++) {
                items.push(doc.plants[i]);
            }

            res.send(items)
        } catch (error) {

        }
    },
    async listPlantsEnvironment(req: Request, res: Response) {
        try {
            const doc = await readPlants();
            res.send(doc.plants_environments)
        } catch (error) {
            console.log('Request error:', error)
        }
    },

    async PlantsWaterFrequencies(req: Request, res: Response) {
        try {
            const doc = await readPlants()
            res.send(doc.plants_water_frequencies)
        } catch (error) {
            console.log('Request error:', error)
        }
    }
}

