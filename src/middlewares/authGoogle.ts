// export const isUserAuthenticated = (req, res, next) => {
//     if (req.user) {
//         next();
//     } else {
//         res.status(401).send("You must login first!");
//     }
// };


// Sử dụng middleware trung gian

// const authSelector = (req, res, next) => {
//     if (req.user && req.user.provider === 'google') {
//         return passportAuth(req, res, next);
//     }
//     return jwtAuth(req, res, next);
// };