import { useState } from "react";
import './drink.css';

const drinkArray = [
    { title: "Latte", img: "./Latte.svg" },
    { title: "Mocha", img: "./Mocha.svg" },
];

function Drink({ title, img }) {
    return (
        <div class="drinks">
            <h3>{title}</h3>
            <img src={img} alt={title} style={{ width: "100px" }} />
        </div>
    );
}

export default function DrinkList() {
    const [drinkList, setDrinkList] = useState(drinkArray);

    

    return (
        <section>
               <hr />
            <h2>My Coffee Drinks</h2>
         
            <div className="drink-container">
                {drinkList.map((d, index) => (
                    <Drink 
                        key={index} 
                        img={d.img}
                        title={d.title}
                    />
                ))}
            </div>
        </section>
    );
}