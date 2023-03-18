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
            setMessage("Oops, Try again. You can do it!");
            input.current.focus()
        }
    }

    return (
        <Modal>
            <div style={{ backgroundColor: "bisque", padding: "2rem", width: "15rem", borderRadius: "1rem", height: "12rem" }}>
                <p>{message}</p>
                <p> {num1} x {num2} =</p>
                <form onSubmit={(event) => handleForm(event)}>
                    <input ref={input} onChange={e => setAnswer(e.target.value)} type="number" placeholder="answer" value={answer} autoFocus />
                    <input type="submit" value="submit" />
                </form>
                <span><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="Pokeball" />x{pokeballIds.length}</span>
            </div>
        </Modal>);
}

export default MathsGame;