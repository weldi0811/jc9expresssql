const express = require ('express')
const mysql = require('mysql')
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')

const server = express()
const port = 2019

server.use(express.json())
server.use(userRouter)
server.use(taskRouter)


server.listen(port, () => {
    console.log('sukses di' + port)
})