var getPokemonData = require('../api/pokemonData');
var getPokemonTypes = require('../api/pokemonTypes')
var Pokemon = require('../models/pokemon');
var Type = require('../models/type');
var PokeType = require('../models/poketype');

var checkData = async () => {
    let pokemonCount = await Pokemon.count();
    let typeCount = await Type.count();

    if (typeCount === 0) {
        let data = await getPokemonTypes();
        data.map(type => {
            Type.create({
                type_name: type.name,
            })
        })
    }

    if (pokemonCount === 0) {
        let pokemonData = await getPokemonData();
        pokemonData.map(pokemon => {
            Pokemon.create({
                poke_name: pokemon.name,
                poke_description: 'asd',
                poke_captured: false,
                //TODO: More pokemon data
            }),
            PokeType.create({
                //TODO: Poketype creation
            })
        })
        
    }
}

module.exports = checkData;

