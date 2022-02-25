var express = require('express');
var app = express();
var flash = require("express-flash");
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser("fsljflsjflsjfl"));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(flash());

function verifyUndefined(value) {
    if (value != undefined) {
        if (value.length == 0) {
            return undefined;
        }
    }

    return value;
}

app.get('/', (request, response) => {
    var emailError = verifyUndefined(request.flash("emailError"));
    var nameError = verifyUndefined(request.flash("nameError"));
    var dotsError = verifyUndefined(request.flash("dotsError"));
    var email =  verifyUndefined(request.flash("email"));
    response.render('index', { emailError, nameError, dotsError, email: email});
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
    console.log(nameError, emailError, dotsError);
    if (nameError != undefined || emailError != undefined || dotsError != undefined) {
        console.log(nameError, emailError, dotsError);
        request.flash("emailError", emailError);
        request.flash("nameError", nameError);
        request.flash("dotsError", dotsError);
        request.flash("email", email);
        response.redirect('/');
    }
    else {
        response.send('Tudo certo');
    }
})

app.listen(3838, (require, response) => {
    console.log('Aplicação rodando!')
});