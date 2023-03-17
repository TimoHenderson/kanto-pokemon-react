import React from "react";
import PokemonCard from "./PokemonCard"
import Modal from "./Modal";
function CardModal({ pokemon, hideCaughtCard }) {

    return (
        <Modal clickHandler={hideCaughtCard} >
            <PokemonCard pokemon={pokemon} caught={true} />
        </Modal>
    )
}
export default CardModal;