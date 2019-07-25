const express = require ('express')
const mysql = require('mysql')
const userRouter = require('./routers/userRouter')

const server = express()
const port = 2019

server.use(express.json())
server.use(userRouter)
server.listen(port, () => {
    console.log('sukses di' + port)
})