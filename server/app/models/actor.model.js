module.exports=(sequelize,DataTypes)=>{
    const Actor=sequelize.define("Actor",{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        sex:{
            type:DataTypes.INTEGER,
        },
        dob:{
            type:DataTypes.DATE,
        },
        bio:{
            type:DataTypes.STRING,
        },
    },{ timestamps: false })

    return Actor;
}