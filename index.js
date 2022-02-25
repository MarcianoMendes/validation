var express = require('express');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var cookieParser = require("cookie-parser");

app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser("jsaddsh"));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(flash());

app.get('/', (request, response) => {
    response.render('index');
});

app.post('/form', (request, response) => {
    var { email, name, dots } = request.body;
    var emailError;
    var nameError;
    var dotsError;

    if (email == undefined || email == '') {
        emailError = 'O E-mail deve ser informado!'
    }

    if (name == undefined || name == '') {
        nameError = 'O nome deve ser informado!';
    }

    if (name.length < 4) {
        nameError = 'O nome deve ter no mímimo 4 caracteres';
    }

    if (dots == undefined || dots < 20) {
        dotsError = 'Dots deve ser maior que 20!'
    }

    if(nameError != undefined || emailError != undefined || dotsError != undefined) {
        response.redirect('/');}
    else{
        response.send('Tudo certo');
    }
})

app.listen(3838, (require, response) => {
    console.log('Aplicação rodando!')
});