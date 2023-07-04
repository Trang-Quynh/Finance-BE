import {Router} from "express";

import CategoryController from "../controllers/categoryController";



const categoryRouter = Router();
categoryRouter.get('/',CategoryController.getAll)
categoryRouter.get('/one/',CategoryController.getOne)
categoryRouter.post('/',CategoryController.create)
categoryRouter.put('/',CategoryController.update)
categoryRouter.delete('/',CategoryController.remove)

export default categoryRouter;