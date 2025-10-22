import webinar from "../assets/webinar.jpg"
import WebinarCard from "./WebinarCard";
// import Button from "./Button";

export default function WebinarFullSection() {
     const webinars = [
       {
         id:1,
         image: webinar,
         title: "Coaching personnel",
         date: "Jeudi 2025-09-20"
       },
       {
        
         id:2,
         image: webinar,
         title: "Coaching personnel",
         date: "Jeudi 2025-09-25"
       },
       {
         id:3,
         image: webinar,
         title: "Séminaire foncier",
         date: "Jeudi 2025-09-28"
       },
        {
         id:4,
         image: webinar,
         title: "Séminaire foncier",
         date: "Lundi 2025-10-08"
       }
     ];

  // Trier par date décroissante (plus récente en premier)
//   const recentTrainings = trainings
//     .sort((a, b) => new Date(b.date) - new Date(a.date))
//     .slice(0, 2); // garder seulement 2

  return (
    <section className="py-24 px-4">
        <h2 className=" text-2xl md:text-4xl font-bold text-primary mb-16 md:mb-24 text-center md:w-[60%] w-[80%] mx-auto ">
            Prochain webinaire
        </h2>

        <div className="lg:flex  md:gap-4 gap-4 md:items-center ">
            <div className="flex flex-wrap lg:justify-between gap-4 lg:gap-3 w-[100%]">
                {webinars.map((item) => (
                    <WebinarCard
                    key={item.id}
                    id={item.id}
                    image={item.image} 
                    title={item.title} 
                    date={item.date} 
                    />
                ))}
            </div>
        </div>
    </section>
  )
}