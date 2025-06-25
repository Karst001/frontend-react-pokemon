import './App.css'
import {useEffect, useState} from "react";
import axios from 'axios';

function App() {
    const [PokemonData, setPokemonData] = useState([]);
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

    useEffect(() => {
        async function getPokemon() {
            try {
                const response = await axios.get(baseUrl);
                console.log(response.data);
                setPokemonData(response.data);

            } catch (e) {
                console.error(e);

            }
        }

        getPokemon();
    }, []);


    return (
        <>
            <h1>Gotta catch em all!</h1>
        </>
    )
}

export default App
