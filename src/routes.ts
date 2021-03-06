import { Router } from 'express'
import PlantController from './controller/PlantsController'

const routes = Router();

routes.get('/', PlantController.listPlants)
routes.get('/plants_environments', PlantController.listPlantsEnvironment)
routes.get('/plants_water_frequencies', PlantController.PlantsWaterFrequencies)

export default routes;