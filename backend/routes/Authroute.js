const express = require("express")
const {createUser, loginUser,getAllvisitors,deleteUserById,updateUserRole, logoutUser, forgotPassword,resetPassword} = require('../controller/UserCtrl')
const router = require("./Productsroute")
const route = express.Router()

route.post('/register',createUser)
route.post('/login',loginUser)
route.post('/logout',logoutUser)
route.post('/forgotPassword',forgotPassword)
route.get('/visitor',getAllvisitors)
route.delete('/delete/:id',deleteUserById)
route.put('/updateRole/:id', updateUserRole);
route.post('/reset-password/:userId/:token', resetPassword);

module.exports = route;