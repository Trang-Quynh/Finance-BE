import {User} from "../entity/user";
import {AppDataSource} from "../data-source";



class UserService {
    private userRepository;


    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }


    createNewUser = async (user) => {
        let newUser = await this.userRepository.save(user)
        return newUser
    }
    checkUser = async (user) => {
        let userFind = await this.userRepository.findOne({
            where: {
                username: user.username,
            }
        });
        return userFind;
    }
    getUser = async (id) => {
        return await this.userRepository.findOne(id)
    }


}

export default new UserService();