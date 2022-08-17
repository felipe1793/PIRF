module.exports = (sequelize, DataType) => {
    const Produto = sequelize.define('Produto', {
        id:{
            type:DataType.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull:false
        },
        imagem:{
            type:DataType.STRING,
            allowNull: false
        },
        nome: DataType.STRING,
        preco: {
            type:DataType.FLOAT,
            allowNull:false
            },
        ativo: {
            type: DataType.STRING,
            allowNull: false
        },
        descricao: DataType.STRING
    }, {
        tableName:"Produto",
        timestamps:false
    })

    return Produto
}