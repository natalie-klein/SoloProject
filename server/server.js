const express = require('express');
const app = express();
const db = require('./database.js')

const PORT = 3000;

const categoryRouter = express.Router();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

categoryRouter.get('/:catName', (request, response) => {
    // unpack params 
    // console.log(request.params.catName);
    db.query(`SELECT word, link FROM vocab where category = '${request.params.catName}'`, (err,result) => {
        if(err) response.send(err);
        response.send(result);
    })

});

app.get('/', (request, response) => {
    db.query('SELECT word, link FROM "public"."vocab" ', (err,result) => {
        response.send(result);
    })
})

app.use('/category', categoryRouter)

//global error handling 
// app.use((err, req, res, next) => {
//     res.status(400).json(`error: ${err}`)
// })

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
