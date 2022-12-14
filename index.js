const express = require('express');
const app = express();
const methodOverride = require('method-override');
var cookieParser = require('cookie-parser')

const homeRouter = require("./routes/home");
const servicosRouter = require('./routes/servicos');
const cookie = require('./Middleware/cookie')



app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs'); 
app.set('views', './views'); // padrão o express já configura a pasta views
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookie.showCookie)
app.use(homeRouter);
app.use(servicosRouter);


app.use((req, res, next) => {
    return res.status(404).render("errors", {opcao: "Página não encotrada"});
})

app.listen(3000, () => console.log("loading..."));