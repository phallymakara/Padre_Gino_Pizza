import { useEffect, useState } from "react";
import Pizza from "./Pizza";

// Currency formatter
const intl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

export default function Order() {
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect (() => {
    fetchPizzaTypes();
  }, []); 

  async function fetchPizzaTypes() {
    const pizzaRes = await fetch("/api/pizzas");
    const pizzaJson = await pizzaRes.json();
    // Changed setPizzaType to setPizzaTypes 
    setPizzaTypes(pizzaJson); 
    setLoading (false);
  }

  let price, selectedPizza; // Spelling (was selectdPizza)
  if (!loading) {
    //  Using the corrected variable name from above
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = intl.format(
        selectedPizza.sizes ? selectedPizza.sizes[pizzaSize] : 0
    );
  }

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select 
                name="pizza-type" 
                value={pizzaType} 
                onChange={(e) => setPizzaType(e.target.value)}
            >
              {/* Map through real data instead of hardcoded options */}
              {pizzaTypes.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>

          <div onChange={(e) => setPizzaSize(e.target.value)}>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              <span>
                <input checked={pizzaSize === "S"} type="radio" name="pizza-size" value="S" id="pizza-s" />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input checked={pizzaSize === "M"} type="radio" name="pizza-size" value="M" id="pizza-m" />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input checked={pizzaSize === "L"} type="radio" name="pizza-size" value="L" id="pizza-l" />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        
        {/*  Only show Pizza info if NOT loading */}
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <div className="order-pizza">
            <Pizza
              name={selectedPizza.name} 
              description={selectedPizza.description}
              image={selectedPizza.image} 
            />
            <p>{price}</p>
          </div>
        )}
      </form>
    </div>
  );
}