import {Router} from 'express'
import userController from "../controllers/userController";
import {passportGoogle} from '../middlewares/passport'
// import {passportFaceBook} from "../middlewares/passport";
const userRouter = Router()
// import {isUserAuthenticated } from '../middlewares/authGoogle';

const successLoginUrl = 'http://localhost:3000/auth/login/success';
const errorLoginUrl = 'http://localhost:3000/auth/login/error'
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.get('/google', passportGoogle.authenticate('google', {
    scope: ['profile', 'email']
    // scope: ["https://www.googleapis.com/oauth2/v3/userinfo"]
}))
userRouter.get(
    "/google/callback",
    passportGoogle.authenticate("google", {
        failureMessage: "Cannot login to Google, please try again later",
        failureRedirect: errorLoginUrl,
        successRedirect: successLoginUrl
    }),
    (req, res) => {
        try {
            console.log(req.user);
            res.send("Thank you for logging in!");
            // const user = req.user
            // res.status(200).json(user)
        } catch (error) {
            console.log('loi callback')
            console.log(error);

            res.status(500).json({ err: true, message: "Internal server error" });
        }
    }
);
userRouter.get("/login/success", (req, res) => {
    try {
        if (req.user) {
            console.log(req.user, 111);
            res.status(200).json(req.user);
        } else {
            res.status(403).json({ err: true, message: "Not authorized!" });
        }
    } catch (error) {
        console.log('lỗi login success');
        console.log(error);
        res.status(500).json({ err: true, message: "Internal server error" });
    }
});
export default userRouter


