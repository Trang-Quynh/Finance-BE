import {Request, Response} from "express";
import userService from "../services/userService";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {SECRET} from '../middlewares/auth'

class UserController {

    private userService;

    constructor() {
        this.userService = userService;
    }

    getUser = async (req:Request, res:Response) => {
        let id = "token . id "
        let user = await this.userService.getUser(id)
        res.status(200).json(user)
    }
    signup = async (req: Request, res: Response) => {
        let user = req.body
        console.log(user)
        let userCheck = await this.userService.checkUser(req.body)
        console.log(userCheck);
        
        if (userCheck) {
            res.status(200).json('Username already exits')
        } else {
            user.password = await bcrypt.hash(user.password, 10)
            let newUser = await this.userService.createNewUser(user)
            res.status(201).json(newUser)
        }
    }

    login = async (req: Request, res: Response) => {
        let user = req.body
        let userFind = await this.userService.checkUser(user);
        if (!userFind) {
            res.status(201).json('Username is not exits')
        } else {
            let comparePassword = await bcrypt.compare(req.body.password, userFind.password);
            if (!comparePassword) {
                res.status(201).json('Password is wrong')
            } else {
                let payload = {
                    username: userFind.username,
                    userId: userFind.id
                }
                let token = jwt.sign(payload, SECRET, {
                    expiresIn: 36000
                });

                res.status(200).json({
                    token: token,
                    username: userFind.username
                })
            }
        }
    }



    





}
export default new UserController()







