const express = require('express');
const mongoose = require('mongoose')
const app = express();
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');

const mongoURI = 'mongodb://localhost:27017/sugang';

mongoose.connect(mongoURI)
.then(()=>console.log('MongoDB successfully connected'))
.catch(err => console.error('MongoDB connection error',err));

app.listen(8080, function(){
  console.log('listening on 8080')  ;
});
/*
app.get('/',function(req,res){
    res.send('main page');
});

app.get('/login',function(req, res){
    res.send('login page');
});
*/
app.use(express.json());
app.use(express.urlencoded( {extended : false } ));

app.use( '/', express.static( path.join(__dirname, './public') ));  
// 이 부분이 없으면 아래코드에서 index.html을 로드하지 못한다.

app.use('/api', apiRoutes);




app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'));  
})

