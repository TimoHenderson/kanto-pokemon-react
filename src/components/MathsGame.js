import Modal from "./Modal";
import { getRandomInt } from "../helpers/getRandomNumber";
import { useState, useRef } from "react";


function MathsGame({ spawnPokeball, pokeballIds, setShowMathsGame }) {
    const input = useRef();
    const [num1, setNum1] = useState(getRandomInt(1, 11));
    const [num2, setNum2] = useState(getRandomInt(1, 11));
    const [answer, setAnswer] = useState("");
    const [message, setMessage] = useState("Earn 5 Pokeballs to get back to catching!");

    const messages = ["That's right, 4 more to go!", "Superb, you are a true Pokemon Master", "Correct, Professor Oak would be proud. 2 more...", "Yes!, Team Rocket will be blasting off again!",]

    function handleForm(event) {
        event.preventDefault();
        if (parseInt(answer) === num1 * num2) {
            setNum1(getRandomInt(1, 11));
            setNum2(getRandomInt(1, 11));
            setAnswer("");
            spawnPokeball();
            setMessage(messages[pokeballIds.length]);
            input.current.focus()
        } else {
            setAnswer("");
            setMessage("Oops, Try again. You can do it!\n");
            input.current.focus()
        }
    }

    return (<>
        <Modal>
            <div style={{ backgroundColor: "bisque", padding: "1rem 2rem 2rem 2rem", width: "15rem", borderRadius: "1rem", height: "16rem" }}>
                <img style={{ width: "40%" }} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/765.png" alt="Oranguru" />
                <p>{message}</p>

                <form onSubmit={(event) => handleForm(event)}>
                    <p style={{ display: "inline" }}> {num1} x {num2} = </p>
                    <input ref={input} style={{ width: "3rem" }} onChange={e => setAnswer(e.target.value)} type="number" placeholder="answer" value={answer} autoFocus />
                    <br />
                    <br />
                    <input type="submit" value="submit" />
                </form>
                <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><img style={{ width: "30px", height: "30px" }} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="Pokeball" /><p style={{ display: "inline" }}>x{pokeballIds.length}</p></span>

            </div>
        </Modal></>);
}

export default MathsGame;