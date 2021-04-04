module.exports = (sequelize, DataTypes) => {
    const Pokemon = sequelize.define("Pokemon", {
        pokemonId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        imageUrl: DataTypes.STRING
      });
    
      Pokemon.associate = function(models) {
        Pokemon.belongsTo(models.User);
      };
    

  return Pokemon;
};