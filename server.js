const mysql=require("mysql");
const express=require("express");
const uuid = require('uuid');
const cors=require("cors");


let app=express();
app.use(cors());
app.use(express.json());
let con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database:"to-do-list"
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


app.get('/',(req,res)=>{
    let sql='select * from `to-do-list-data`';
    con.query(sql,async (err, result)=>{
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching data");
        } else {
            res.json(result); 
        }
    })
})

app.post('/addTodo',(req,res)=>{
    let sql="insert into `to-do-list-data` (id,task) values(?,?)";
    let id=uuid.v4();
    con.query(sql,[id,req.body.task],(err,result)=>{
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching data");
        } else {
            res.json({ message: "Inserted successfully", id: id });  
        }
    })
})

app.put('/updateTodo/:id',(req,res)=>{
    let sql = 'UPDATE `to-do-list-data` SET task = ? WHERE id = ?';
    con.query(sql,[req.body.task,req.params.id],(err,result)=>{
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching data");
        } else {
            res.json({ message: "Updated successfully" }); 
        }
    })
})

app.delete('/deleteTodo/:id',(req,res)=>{
    let sql="delete from `to-do-list-data` where id=?";
    con.query(sql,[req.params.id],(err,result)=>{
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching data");
        } else {
            res.json({ message: "Deleted successfully" }); 
        }
    })
})

app.listen(3011);