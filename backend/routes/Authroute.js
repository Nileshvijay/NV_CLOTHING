const express = require("express")
const {createUser, loginUser,getAllvisitors,deleteUserById,updateUserRole} = require('../controller/UserCtrl')
const route = express.Router()

route.post('/register',createUser)
route.post('/login',loginUser)
route.get('/visitor',getAllvisitors)
route.delete('/delete/:id',deleteUserById)
route.put('/updateRole/:id', updateUserRole);

module.exports = route;