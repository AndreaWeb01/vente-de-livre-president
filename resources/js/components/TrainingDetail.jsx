import { trainings } from "../data/Trainings";
import TrainingCard from "../components/TrainingCard";
import Button from "./Button";
import { router } from "@inertiajs/react";

export default function TrainingDetail({ formation, id }) {
    // Si formation n'est pas passée en props, chercher dans les données locales
    const trainingData = formation || trainings.find(item => item.id === parseInt(id));

    const handleParticiper = () => {
        if (!trainingData || !trainingData.id) return;
        router.post(`/public/panier/formations/${trainingData.id}`, {
            quantite: 1,
        });
    };

    if (!trainingData) {
        return <p>Formation introuvable</p>;
    }

    return (
        <>
            <div className="flex lg:justify-between gap-4 lg:gap-3 items-center">
                <div className="w-full lg:w-[30%]">
                    <TrainingCard
                        image={trainingData.image}
                        title={trainingData.title}
                        description={trainingData.description}
                        showButton={false}
                    />
                </div>
                <div className="w-full lg:w-[70%]">
                    <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6 md:mb-8">
                        Description de la formation
                    </h2>
                    <p className="text-textColor font-medium text-[16px] md:text-[18px] whitespace-pre-line">
                        {trainingData.description}
                    </p>
                    <div className="flex flex-wrap gap-6 mt-10">
                        <div>
                            <Button label="J'y participe" color="orange" onClick={handleParticiper} ButtonClassName="text-white" />
                        </div>
                        <div>
                            <Button label="Je veux un livre" color="green" to="/livres" ButtonClassName="text-white"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}