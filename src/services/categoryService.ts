import {AppDataSource} from "../data-source";
import {Category} from "../entity/category";
import transactionService from "./transactionService";
class CategoryService {
  private categoryRepository;

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category);
  }

  getAll = async () => {
    return await this.categoryRepository.find();
  };

  getOne = async (id) => {
    return await this.categoryRepository.findOneBy({id});
  };

  create = async (newCategory) => {
    await this.categoryRepository.save(newCategory);
  };

  update = async (id, newCategory) => {
    await this.categoryRepository.update({ id: id }, newCategory);
  };

}

export default new CategoryService();