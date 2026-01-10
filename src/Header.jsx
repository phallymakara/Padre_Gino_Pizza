import { useContext } from "react";
import { CartContext } from "./contexts.jsx";

// ❌ WRONG: Hooks cannot be called out here.
// const [cart] = useContext(CartContext); 

export default function Header () {
    // ✅ CORRECT: Hooks must be called inside the component function.
    const [cart] = useContext(CartContext); 

    return (
        <nav>
           <h1 className="logo">Padre Gino's Pizza</h1>
           <div className="nav-cart">
            🛒<span className="nav-cart-number">{cart.length}</span>
           </div>
        </nav>
    );
}