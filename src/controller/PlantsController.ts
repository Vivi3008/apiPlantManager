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

function orderedPlants(array: any) {
    array.sort((a: any, b: any) => {
        return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
    })

    return array;
}

export default {
    async listPlants(req: Request, res: Response) {
        try {
            const doc = await readPlants();

            const pageNumber: any = req.query.page;
            const limitNumber: any = req.query.limit;
            const sort: any = req.query.sort;

            const page = parseInt(pageNumber) || 1;
            const limit = parseInt(limitNumber) || 5;

            const num = (page * 5);

            const start = (num - 5)

            let newLimit = start + limit;

            const items = [];

            for (let i = start; i < newLimit; i++) {
                items.push(doc.plants[i]);
            }

            const pages = (doc.plants.length / 5);

            const docs = doc.plants.length;

            const plantsItems = []

            const info = {
                docs,
                pages
            }

            for (let i = 0; i < 5; i++) {
                plantsItems.push(doc.plants[i]);
            }

            const plants = {
                data: plantsItems,
                info
            }

            if (sort === 'asc') {
                page !== 1 || limitNumber ?
                    res.json(orderedPlants(items)) :
                    res.json(orderedPlants(plants.data));
            } else {
                page !== 1 || limitNumber ? res.json(items) : res.json(plants);
            }

        } catch (error) {
            console.log('Request error:', error)
        }
    },

    async listPlantsEnvironment(req: Request, res: Response) {
        try {
            const doc = await readPlants();
            res.json(doc.plants_environments)
        } catch (error) {
            console.log('Request error:', error)
        }
    },

    async PlantsWaterFrequencies(req: Request, res: Response) {
        try {
            const doc = await readPlants()
            res.json(doc.plants_water_frequencies)
        } catch (error) {
            console.log('Request error:', error)
        }
    }
}

