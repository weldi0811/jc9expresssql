const router = require('express').Router()
const conn = require('../connection/index')

//create task

router.post('/tasks', (req,res) => {
    const sql =`insert into tasks set ?`
    const sql2 = `select * from tasks where id = ?`
    const data = req.body

    conn.query(sql,data, (err,result) => {
        if(err) return res.send(err)

        conn.query(sql2,result.insertId, (err,result2) => {
            if(err) return res.send(err)

            res.send(result2[0])

        })
    })
})

//read task by userid

router.get('/tasks/:userid', (req,res)=> {
    const sql = `select description, completed from tasks where user_id = ?`
    const data = req.params.userid

    conn.query(sql,data,(err,result) => {
        if(err) return res.send(err)

        res.send(result)
    })
})


//update task BY TASK ID

router.patch('/tasks/:taskid', (req,res) => {
    const sql = `update tasks set completed = true where id = ?`
    const sql2 = `select * from tasks where id = ?`
    const data = req.params.taskid

    conn.query(sql,data,(err,result) => {
        if(err) return res.send(err)

        conn.query(sql2,data,(err,result2) => {
            if(err) return res.send(err)

            res.send(result2)
        })
    })
})

//delete task by taskid

router.delete('/tasks/:taskid', (req,res) => {
    const sql = `delete from tasks where id = ?`
    const data = req.params.taskid

    conn.query(sql,data,(err,result) => {
        if(err) return res.send(err)

        res.send(result)
    })
})



module.exports = router