import {Request, Response} from "express";
import CategoryService from "../services/categoryService";

class CategoryController {
    private CategoryService;

    constructor() {
        this.CategoryService = CategoryService;
    }

    getAll = async (req: Request, res: Response) => {
        let categoryList = await this.CategoryService.getAll();
        res.status(200).json(categoryList);
    }

    getOne = async (req: Request, res: Response) => {
        let id = req.query.id;
        let category = await this.CategoryService.getOne(id);
        res.status(200).json(category);
    }
    create = async (req: Request, res: Response) => {
        await this.CategoryService.create(req.body);
        res.status(200).json({message: "create category success !!"});
    }

    update = async (req: Request, res: Response) => {
        let id = req.query.id;
        await this.CategoryService.update(id, req.body);
        res.status(200).json({message: "update category success !!"});
    }

    remove = async (req: Request, res: Response) => {
        let id = req.query.id;
        await this.CategoryService.remove(+id);
        res.status(200).json({message: "delete category success !!"});
    }
}

export default new CategoryController()