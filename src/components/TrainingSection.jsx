import TrainingCard from "./TrainingCard";
import formationCover from "../assets/formationCover.jpg";
import formationCover2 from "../assets/formationCover2.jpg";
import formationCover3 from "../assets/formationCover3.jpg";
import Button from "./Button";

export default function TrainingSection() {
  const trainings = [
    {
      id:1,
      image: formationCover,
      title: "Coaching personnel",
      description: "Découvrez les règles essentielles pour acheter un terrain sans risque.",
      date: "2025-09-20"
    },
    {
     
      id:2,
      image: formationCover2,
      title: "Coaching personnel",
      description: "Comprenez les pièges du foncier ivoirien et comment les éviter.",
      date: "2025-09-25"
    },
    {
      id:3,
      image: formationCover3,
      title: "Séminaire foncier",
      description: "Approfondissez vos connaissances juridiques.",
      date: "2025-09-28"
    },
     {
      id:4,
      image: formationCover3,
      title: "Séminaire foncier",
      description: "Approfondissez vos connaissances juridiques.",
      date: "2025-10-08"
    }
  ];

  // Trier par date décroissante (plus récente en premier)
  const recentTrainings = trainings
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2); // garder seulement 2

  return (
    <section className="py-24 px-4">
        <h2 className=" text-2xl md:text-4xl font-bold text-primary mb-16 md:mb-12 text-center md:w-[60%] w-[80%] mx-auto ">
            Des formations qui vous aideront à atteindre vos objectifs
        </h2>

        <div className="lg:flex  md:gap-4 gap-5 md:items-center md:py-4 md:px-6">
            <div className="w-[100%] lg:w-[40%]">
                <p className="mb-6">Ces formations, interactives et adaptées à chaque public (particuliers, entreprises, professionnels du secteur), offrent une vision claire et opérationnelle du foncier ivoirien. Notre objectif : faire de vous des acteurs avertis, 
                    capables de prendre des décisions sûres et éclairées.</p>
                <Button label="Decouvrez toute nos formations" color="green" href="#" ButtonClassName="text-white"/>
            </div>
            
            <div className="flex flex-wrap lg:justify-center gap-4 lg:gap-7 mt-20 lg:w-[60%] w-[100%]">
                {recentTrainings.map((item) => (
                    <TrainingCard 
                    key={item.id}
                    id={item.id}
                    image={item.image} 
                    title={item.title} 
                    description={item.description} 
                    />
                ))}
            </div>
        </div>
    </section>
  )
}
