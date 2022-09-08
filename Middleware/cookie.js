const middleware = {
showCookie: (req, res, next) => {
    const { cookies } = req;
    if ('usuario' in cookies){
        console.log('Usuario: ' + cookies.usuario)
    }else {
        console.log("Faltou Biscoito")
    }
    next();
}
}

module.exports = middleware