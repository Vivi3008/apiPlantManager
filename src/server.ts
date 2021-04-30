import express from 'express'
import { readFileSync } from 'fs'

const app = express()

const plantsData = './database/server.json'

app.get('/plants', async (req, res) => {
    const doc = await readPlants();

    const pages = (doc.plants.length / 10);

    const docs = doc.plants.length;

    const obj = {
        docs,
        pages
    }

    const plants = [
        doc.plants,
        obj
    ]

    res.json(plants)
})

app.get('/plants/5', async (req, res) => {
    const doc = await readPlants();

    const page = 1;
    const num = (page * 10);
    const start = (num - 10)

    const limit = 5;

    const items = [];

    for (let i = start; i <= limit; i++) {
        items.push(doc.plants[i]);
    }

    res.send(items)
})


app.get('/plants_environments', async (req, res) => {
    const doc = await readPlants();
    res.send(doc.plants_environments)
})

app.get('/plants_water_frequencies', async (req, res) => {
    const doc = await readPlants()
    res.send(doc.plants_water_frequencies)
})

function readPlants() {
    try {
        const data = readFileSync(plantsData);
        return JSON.parse(data.toString())
    } catch (error) {
        console.log('Request Error: ', error)
    }
}


app.listen(3333)