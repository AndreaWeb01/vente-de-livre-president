// TrainingStatSection.jsx
import TrainingStat from "./TrainingStat";

export default function TrainingStatSection({ title, description }) {
  return (
    <section className="flex flex-wrap items-center justify-between">
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold text-primary mb-4">{title}</h2>
        <p className="text-textColor leading-relaxed text-justify">{description}</p>
      </div>

      <div className="w-full md:w-1/2 flex justify-start md:justify-end mt-12 md:mt-0">
        <TrainingStat />
      </div>
    </section>
  );
}
