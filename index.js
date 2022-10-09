const express = require('express');
const mongo = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

const url = "mongodb+srv://admin:admin123@cluster0.1ogm7jk.mongodb.net/?retryWrites=true&w=majority";

let db;
let posts;

mongo.connect(url, {useNewUrlParser: true, useUnifiedTopology: true},(err,client)=> {
    if(err) {
        console.error(err);
        return;
    }
    db = client.db('MyBlogPost');
    posts = db.collection('posts');
});


app.get('/posts',(req,res)=> {
    posts.find().toArray((err, items)=>{
        if(err) {
            console.error(err);
            res.status(500).json({error: err});
        } else {
            res.status(200).json({posts: items});
        }
    });
});


app.post('/posts',(req,res)=> {
    const post = req.body;
    posts.insertOne(post,(err,result)=> {
        if(err) {
            console.error(err);
            res.status(500).json({error: err})
        } else {
            res.status(200).json({ok: true});
        }
    });
});


app.listen(process.env.PORT, ()=> {
    console.log('listening on port '+process.env.PORT);
});