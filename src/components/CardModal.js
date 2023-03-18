import React from "react";
import PokemonCard from "./PokemonCard"
import Modal from "./Modal";
function CardModal({ pokemon, hideCaughtCard, quick }) {

    return (
        <Modal clickHandler={hideCaughtCard} quick={quick} >
            <PokemonCard pokemon={pokemon} caught={true} />
        </Modal>
    )
}
export default CardModal;