const express = require('express');

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

//routing
app.get('/', (req, res) => {
    //res.send('<p>home page</p>');
    //res.sendFile('./views/index.html', { root: __dirname });
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'filler text lorem ipsum generator filler text'},
        {title: 'Mario finds stars', snippet: 'filler text lorem ipsum generator filler text'},
        {title: 'How to defeat Bowser', snippet: 'filler text lorem ipsum generator filler text'}
    ]
    res.render('index', { title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>');
    //res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create A New Blog' });
})

//404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})