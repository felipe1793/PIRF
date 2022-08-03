module.exports = (sequelize, DataType) => {
    const Produto = sequelize.define('Produto01', {
        id:{
            type:DataType.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        nome: DataType.STRING,
        preco: {
            type:DataType.FLOAT,
            allowNull:false
            },
        descricao: DataType.STRING
    }, {
        tableName:"Produto01",
        timestamps:false
    })

    return Produto
}