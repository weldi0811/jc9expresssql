const express = require ('express')
const mysql = require('mysql')
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')
const powrt = require('./config/port')

const server = express()
const port = powrt

server.use(express.json())
server.use(userRouter)
server.use(taskRouter)


server.get('/', (req,res) => {
    res.send('halo')
})

server.listen(port, () => {
    console.log('sukses di' + port)
})