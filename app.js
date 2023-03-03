const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//express app
const app = express();

//database
const dbURI = 'mongodb+srv://lcncraft:dQolPbLXbiJGERzg@nodejs-tutorial.z2zzrmp.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) =>{
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//         .then((result) => res.send(result))
//         .catch((err) => console.log(err));
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => res.send(result))
//         .catch((err) => console.log(err));
// });

// app.get('/single-blog', (req, res) => {
//     Blog.findById('64024e2b0f8f648599298b15')
//         .then((result) => res.send(result))
//         .catch((err) => console.log(err))
// });

// //middleware
// app.use((req, res, next) => {
//     console.log('new request made: ');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     //next to fire off new middleware
//     next();
// })

// app.use((req, res, next) => {
//     console.log('in the next middleware');
//     next();
// })

//routing
app.get('/', (req, res) => {
    //res.send('<p>home page</p>');
    //res.sendFile('./views/index.html', { root: __dirname });
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'filler text lorem ipsum generator filler text'},
    //     {title: 'Mario finds stars', snippet: 'filler text lorem ipsum generator filler text'},
    //     {title: 'How to defeat Bowser', snippet: 'filler text lorem ipsum generator filler text'}
    // ]
    // res.render('index', { title: 'Home', blogs});
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>');
    //res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});

//routes
app.get('/blogs', (req, res) =>{
    Blog.find().sort({createdAt: -1})
        .then((result)=>{
            res.render('index', { title: 'All Blogs', blogs: result});
        })
        .catch((err) =>{
            console.log(err);
        });
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => res.redirect('/blogs'))
        .catch((err) => console.log(err));
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create A New Blog' });
});

app.get('/blogs/:id', (req, res) =>{
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details' })
        })
        .catch((err) => console.log(err));
});

app.delete('/blogs/:id', (req, res) =>{
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) =>{
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => console.log(err));
});

//404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})