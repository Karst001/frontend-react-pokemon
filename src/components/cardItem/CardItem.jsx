
import React from 'react';
import './CardItem.css';

function CardItem({ pokemon }) {
    //create the component that is rendered for each card so it can be reused
    return (
        <div className="pokemon-card">
            <h2>{pokemon.name}</h2>

            {/* Pokémon image */}
            {pokemon.sprites?.front_default && (
                <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="pokemon-image"
                />
            )}

            <p><strong>Weight:</strong> {pokemon.weight}</p>

            <p><strong>Abilities:</strong></p>
            <ul>
                {/*iterate through the available abilities*/}
                {pokemon.abilities.map((a, i) => (
                    <li key={i}>{a.ability.name}</li>
                ))}
            </ul>

            <p><strong>Moves: </strong>{pokemon.moves.length}</p>
        </div>
    );
}

export default CardItem;