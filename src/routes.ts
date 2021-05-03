import { Router } from 'express'
import PlantController from './controller/PlantsController'

const routes = Router();


routes.get('/plants', PlantController.listPlants)
routes.get('/plants_environments', PlantController.listPlantsEnvironment)
routes.get('/plants-paginate', PlantController.listPlantsPaginate)
routes.get('/plants_water_frequencies', PlantController.PlantsWaterFrequencies)




export default routes;