const express = require('express');

const app = express();
console.log(app.get('env'));

app.use((request, response, next) => {
    response.setHeader('x-server-date', new Date().toString());
    return next();
});

app.get('/', (request, response, next) => {
    return response.send('Hello from Express');
});

app.get('/time', (request, response, next) => {
    return response.send(new Date().toString());
});

app.get('/hello', (request, response, next) => {
    if(!request.query.fname) {
        return response.status(400).end();
    }

    return response.send(`Hello ${request.query.fname}`);
});

app.get('/user/:name', (request, response, next) => {   
    return response.send(`User Profile of ${request.params.name}`);
});

app.get('/throw' , (request, response, next) => { 
    throw new Error('Something is wrong');
});

app.get('/next' , (request, response, next) => {
    //setTimeout(() => {
        //next(new Error('Something is wrong'));
    //}, 1000);

    next(new Error('Something is wrong'));
});


app.listen(3000);