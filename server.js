const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'hbs');


app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    const logs = `logs: ${req.path}, ${req.route}, at: ${new Date().getTime().toString()}`
    fs.appendFile('server-log.txt', logs, (err) => {
        if (err) {
            console.log(err, 'err')
        }
    })
    next();
})
// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

app.get('/projects', (req,res) => {
    res.render('projects.hbs', {pageTitle: 'PROJECTS:'})
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
    })
})

app.get('/home', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeUser: 'Hello User, please sign in!'
    })
})


app.get('/', (req, res) => {
    res.render('./aboutme.hbs', {
        pageTitle: 'about Me'
    })
})


app.listen(port, () => { console.log(`server is up at ${port}`) })
