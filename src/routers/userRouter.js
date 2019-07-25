const conn = require('../connection/index')
const router = require('express').Router()
const isEmail = require('validator/lib/isEmail')
const bcrypt = require('bcrypt')

//create one user
router.post('/users', (req,res) => {
    var{username,name,email,password} = req.body

    if(!isEmail(email)){
        return res.send('email is not valid')
    }
    
    password = bcrypt.hashSync(password, 8)

    const sql = `INSERT INTO users (username, name, email, password) VALUES ('${username}', '${name}', '${email}', '${password}')`

    conn.query(sql,(err, result) => {
        if(err){
            return res.send(err)
        }
        res.send(result)
    })
})

module.exports = router