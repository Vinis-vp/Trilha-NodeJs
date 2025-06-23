import axios, { HttpStatusCode } from "axios";

async function pokeFinder(pokemonName) {

    try{
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        const pokemon = response.data;

        console.log(`Name: ${pokemon.name}`);
        console.log(`ID: ${pokemon.id}`);
        console.log(`Height: ${pokemon.height}`);
        console.log(`Weight: ${pokemon.weight}`);
    }
    catch(err){
       console.log('Error to find pokemon: ', err.response)
    }
}
//Enter the name of the pokemon you want to search for in the pokedex!
pokeFinder('charizard')