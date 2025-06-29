import './App.css';
import { useEffect, useState } from "react";
import axios from 'axios';

//reusable components
import CardItem from "./components/cardItem/CardItem.jsx";
import PaginationButtons from "./components/paginationbuttons/PaginationButtons.jsx";


function App() {
    //define various states to track data changes or activities
    const [pokemonList, setPokemonList] = useState([]);
    const [apiUrl, setApiUrl] = useState();
    const [nextUrl, setNextUrl] = useState(null);
    const [prevUrl, setPrevUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    //get initial set of data with default setApiUrl, this only runs on mounting of the page
    useEffect(() => {
        console.log('trigger on mount');
        setApiUrl('https://pokeapi.co/api/v2/pokemon?limit=20');
    }, []);


    //reload pokemon data when apiUrl changes; note: this runs on any apiUrl change (initial load or page change)
    useEffect(() => {
        //check point to see if apiUrl has a value, if not, bail out
        if (!apiUrl) return;

        //initiate controller to manage abort request by the user like leaving the page
        const controller = new AbortController();

        console.log('trigger on apiUrl change');
        const fetchData = async () => {
            setLoading(true);

            try {
                //get the base url data
                const listResponse = await axios.get(apiUrl);
                //get the data object
                const listData = listResponse.data;

                //get all de data for the 20 pokemons inside listData object and store in const detailResponses
                //do a Promise.all to await all 20 calls to the api; the extra 20 calls could have been avoided if the api returned more data on the initial api call the first time around
                const detailResponses = await Promise.all(
                    listData.results.map(item => axios.get(item.url))
                );

                //iterate through detailResponses and store the data object into const detailedPokemon, this dataset is then used in the HTML rendering
                const detailedPokemon = detailResponses.map(res => res.data);

                //update states
                setPokemonList(detailedPokemon);    //this state data is used in the rendering of the elements in the return() section
                setNextUrl(listData.next);          //track the next url when user clicks on button 'Volgende'
                setPrevUrl(listData.previous);      //track the next url when user clicks on button 'Vorige'
            } catch (error) {
                console.error("Something went wrong while loading Pokemon:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            //abort http request when user cancels
            controller.abort();
        };

    }, [apiUrl]);


    const goBack = () => {
        if (prevUrl) {
            console.log('user clicked previous');
            // Triggers a reload via apiUrl useEffect
            setApiUrl(prevUrl);
        }
    };


    const goForward = () => {
        if (nextUrl) {
            console.log('user clicked next');
            // Triggers a reload via apiUrl useEffect
            setApiUrl(nextUrl);
        }
    };

    //the HTML rendering
    return (
        <section>
            {/*show a 'Loading...' message*/}
            {loading && <div className="spinner">Loading...</div>}
            <div>
                {/* navigation buttons using a component*/}
                <div className="nav-buttons">
                    <PaginationButtons onPrev={goBack} onNext={goForward} disablePrev={!prevUrl} disableNext={!nextUrl} />
                </div>

                <div className="card-grid">
                    {/*I used index for the key as I could not find a better alternative in the data*/}
                    {pokemonList.map((pokemon, index) => (
                        <CardItem key={pokemon.id || index} pokemon={pokemon} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default App;