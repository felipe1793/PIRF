module.exports = (sequelize, DataType) => {
    const Carrinho = sequelize.define('Carrinho', {
        id:{
            type: DataType.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull:false
        },
        nome_produto: {
            type: DataType.STRING,
            allowNull: false
        },
        preco: {
            type: DataType.FLOAT,
            allowNull:false
        },
        descricao: {
            type: DataType.STRING,
            allowNull: false
        },
        imagem:{
            type: DataType.STRING,
            allowNull: false
        },
        qtd: DataType.INTEGER,
        hora: DataType.STRING
    }, {
        tableName:"carrinho",
        timestamps:false
    })

    return Carrinho
}