const conn = require('../connection/index')
const router = require('express').Router() //express itu buat ngegenerate link buat koneksi ke database
const isEmail = require('validator/lib/isEmail')
const bcrypt = require('bcrypt')
const path = require('path')
const multer = require('multer')

const rootdir = path.join(__dirname + '/../..' )
const photosdir = path.join(rootdir + '/upload/photos')

const folder = multer.diskStorage(
    {
        destination: function(req,file,cb){
            cb(null, photosdir)
        },
        filename : function(req,file,cb){
            console.log(req.body)
            cb(null, Date.now() + '-' + req.body.username + path.extname(file.originalname))
        }
    }
)

const upstore = multer(
    {
        storage : folder,
        limits : {
            fileSize : 2000000 //byte
        },
        fileFilter(req,file,cb){ //request, file, callback
            var boleh = file.originalname.match(/\.(jpg|jpeg|png|gif)$/)
    
            if(!boleh){
                cb(new Error('MASUKIN YANG BENER'))
            }
    
            cb(undefined, true)
        }
    }
)


//create one user
router.post('/users', (req,res) => {
    // var{username,name,email,password} = req.body
    const sql = `INSERT INTO users SET ?` // si '?' bakal diisi sama si const data. di define di dalem function mesti disamping si sql
    const sql2 = `select id,username,name,email,verified from users where id = ?`
    const data = req.body
    
    //ngevalidate email
    if(!isEmail(data.email)){
        return res.send('email is not valid')
    }
    //nge hash password
    data.password = bcrypt.hashSync(data.password, 8)

    // const sql = `INSERT INTO users (username, name, email, password) VALUES ('${username}', '${name}', '${email}', '${password}')`
    
    //insert data
    conn.query(sql,data, (err, result1) => {
        if(err){
            return res.send(err)
        }
        //ngasih feedback apa aja yang ditampilin
        conn.query(sql2, result1.insertId, (err,result2) => {
            if(err){
                return res.send(err)
            }
            res.send(result2)
        })
    })
})

//create avatar
router.post('/users/avatar', upstore.single('avatar'), (req,res) => {
    const sql = `select id,name,username,email from users where username = ?`
    const sql2 = `update users set avatar = '${req.file.filename}' where username = '${req.body.username}'`
    const data = req.body.username

    conn.query(sql,data, (err,result) => {
        if(err){
            return res.send(err)
        }
        const user = result[0]
        if(!user){
            return res.send('user not found')
        }
        conn.query(sql2,(err,result2) => {
            if(err) return res.send(err)
            res.send({
                message : 'upload sukses',
                filename : req.file.filename
            })
        })
    })

})

//access image
router.get('/users/avatar/:image', (req,res) => {
    const options = {
        root : photosdir
    }

    const filename = req.params.image

    res.sendFile(filename ,options, function(err){
        if(err) return res.send(err)
        console.log('berhasil kirim gambar')
    })
})


module.exports = router

// console.log(__dirname) ngasih tau kita lagi ada di directory mana
console.log(__dirname)
console.log(photosdir)