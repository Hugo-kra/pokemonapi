/*coponentes */
import {Button} from "./components/Button"
import { Card } from "./components/card";
/*estilos */
import "./sass/App.scss"
/*iconos */
import { TiArrowLeftOutline } from "react-icons/ti";
import { TiArrowRightOutline } from "react-icons/ti";
/*hooks */
import { useState, useEffect } from "react";


const App = ()=>{

    const [pokemonId, setPokemonId] = useState(1);
   
    const [pokemonEvolutions, setPokemonEvolutions] = useState([])

    useEffect(()=>{
        getEvolutions(pokemonId);
    }, [pokemonId])

    async function getEvolutions (id) {
    const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
    const data = await response.json()
      //console.log para imprimir
        let pokemonEvoArray = []


        let pokemonlvl1 = data.chain.species.name
        let pokemonlvl1Img = await getPokemonImgs(pokemonlvl1)

        pokemonEvoArray.push([pokemonlvl1, pokemonlvl1Img])

        if(data.chain.evolves_to.length !== 0){

            let pokemonlvl2 = data.chain.evolves_to[0].species.name;

            let pokemonlvl2Img = await getPokemonImgs(pokemonlvl2)

            pokemonEvoArray.push([pokemonlvl2, pokemonlvl2Img])

            if(data.chain.evolves_to[0].evolves_to.length !==0){

            let pokemonlvl3 = data.chain.evolves_to[0].evolves_to[0].species.name;

            let pokemonlvl3Img = await getPokemonImgs(pokemonlvl3)

            pokemonEvoArray.push([pokemonlvl3, pokemonlvl3Img]) 

            
            }

        }
        //fetch me hace una busqueda de la http que yo le he puesto para lo que esta unido a async de arriba,para usar todo esto se usa el useEffect,el const response es xq se espera una respuesta que es lo que hay detras
        setPokemonEvolutions(pokemonEvoArray)

    }

    async function getPokemonImgs(name) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        const data = await response.json()
        return data.sprites.other[`official-artwork`].front_default
    }

    function prevClick(){
        (pokemonId === 1)?
        setPokemonId(1):
        setPokemonId(pokemonId -1)
        }

    function nextClick(){
        setPokemonId(pokemonId + 1)
    }


    return(
    <div className="app">
    <div className={`card-container card${pokemonEvolutions.length}`}>
    {pokemonEvolutions.map(pokemon =>
        <Card
             key={pokemon[0]} //para uso interno de react
            name={pokemon[0]}
            img={pokemon[1]} />
            )}
            
        </div>
        <div className="buttons-container">
                <Button
                    icon={<TiArrowLeftOutline />} handleClick={prevClick} />

                <Button
                    icon={<TiArrowRightOutline />} handleClick={nextClick} />
      </div>
      </div>

    )
}

export {App}