const express = require("express")
const {createUser, loginUser,getAllvisitors,deleteUserById,updateUserRole, logoutUser} = require('../controller/UserCtrl')
const router = require("./Productsroute")
const route = express.Router()

route.post('/register',createUser)
route.post('/login',loginUser)
router.post('/logout',logoutUser)
route.get('/visitor',getAllvisitors)
route.delete('/delete/:id',deleteUserById)
route.put('/updateRole/:id', updateUserRole);

module.exports = route;