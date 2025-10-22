import { useState } from "react";
import AccordionItem from "./AccordionItem";
export default function AccordionList({title}) {
  const [openIndex, setOpenIndex] = useState(null);

  const items = [
    {
      title: "Une expertise crédible et reconnue",
      content:
        "Nos formations sont conçues par des spécialistes du droit foncier et immobilier, avec l’expérience pratique des tribunaux, des notaires et du ministère de la Construction. Vous recevez un savoir fiable, à jour et validé.",
    },
    {
      title: "Des connaissances immédiatement applicables",
      content:
        "Chaque module est pensé pour répondre à vos besoins concrets : quels documents exiger, quelles démarches entreprendre, comment éviter les pièges… Vous repartez avec des outils pratiques pour sécuriser vos projets.",
    },
    {
      title: "Un investissement qui vous protège durablement",
      content:
        "Acquérir un terrain ou un bien immobilier représente une étape majeure. Nos formations vous évitent les erreurs coûteuses et vous assurent une tranquillité d’esprit pour bâtir sereinement votre avenir.",
    },
  ];

  return (
    <div className=" ">
        <h2 className=" text-2xl md:text-3xl font-bold text-primary mb-10 md:mb-20 text-center md:w-[60%] w-[80%] mx-auto ">
            {title}        
        </h2>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() =>
            setOpenIndex(openIndex === index ? null : index)
          }
        />
      ))}
    </div>
  );
}
