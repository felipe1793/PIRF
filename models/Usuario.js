module.exports = (sequelize, DataType) => {
    const Usuario = sequelize.define('Usuario', {
        id:{
            type:DataType.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull:false
        },
        nome: DataType.STRING,
        senha: DataType.STRING
    }, {
        tableName:"usuario",
        timestamps:false
    })

    return Usuario
}