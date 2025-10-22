import { useState } from "react";
import physicBook from "../assets/physicBook.png"
import Cadre from "./Cadre"

export default function ProductCard({type, livraison="Coût de livraison", prix= 0}) {
  const basePrice = 15000; // Prix unitaire
  const [quantity, setQuantity] = useState(1);

  // Calcul automatique du total
  const totalPrice = basePrice * quantity;

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const total = totalPrice + prix

  return (
    <Cadre children = {
        <>
            <div className="mb-10">
                <h2 className="text-secondary text-[18px] font-semibold md:text-2xl p-4">Votre commande</h2>
            </div>
            <div className="grid grid-cols-1  md:grid-cols-[1fr_2fr_1fr] gap-4 items-center p-4 m-2 border-b border-b-gray-300">
                <div>
                    <img
                    src={physicBook}
                    alt="Livre"
                    className="w-[100px]"
                    />
                </div>
               

                <div className="flex flex-col">
                    <h3 className="font-semibold text-textColor">
                    Achetez un terrain en toute sécurité en Côte d’Ivoire
                    </h3>
                    <p className="text-primary font-medium">{type}</p>

                    {/* Contrôle quantité */}
                    <div className="flex items-center gap-2 mt-2">
                    <button
                        onClick={handleDecrease}
                        className="bg-secondary text-white px-3 py-1 rounded"
                    >
                        -
                    </button>
                    <span className="text-lg font-semibold">{quantity}</span>
                    <button
                        onClick={handleIncrease}
                        className="bg-secondary text-white px-3 py-1 rounded"
                    >
                        +
                    </button>
                    </div>
                </div>

                {/* Affichage du prix total */}
                <div className="ml-auto text-primary font-bold text-md">
                   <p> {totalPrice.toLocaleString()} FCFA</p>
                </div>
            </div>
            <div className="flex justify-between p-4 m-2 border-b border-b-gray-300">
                <p className="text-textColor text-[18px] font-semibold">{livraison}</p>   
                <p className="text-primary text-[18px] font-semibold">{prix} FCFA</p>
            </div>
            <div className="flex justify-between m-2 p-4 ">
                <p className="text-textColor text-[18px] font-semibold">Total: </p>   
                <p className="text-primary text-[18px] font-semibold">{total.toLocaleString()} FCFA</p>
            </div>

        </>
    }
    
    />
    
  );
}
