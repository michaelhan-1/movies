module.exports=(sequelize,DataTypes)=>{
    const Movie=sequelize.define("Movie",{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        year_of_release:{
            type:DataTypes.INTEGER,
        },
        plot:{
            type:DataTypes.STRING,
        },
        poster:{
            type:DataTypes.STRING,
        },
        
    },{ timestamps: false });

    return Movie;
}