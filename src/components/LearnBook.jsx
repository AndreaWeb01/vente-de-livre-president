import SocialIcons from "./SocialIcons";

export default function LearnBook({ Icon, title, description }) {
  return (
    <div className="px-5 py-4 flex flex-col justify-center items-center group  text-textColor transition duration-300 ease-in-out
        hover:bg-secondary hover:text-white hover:rounded-[5px]">
      {Icon && <SocialIcons icon={Icon} color="bg-secondary text-white" />}

      <h2 className="text-[18px] text-center font-semibold mb-2 mt-2">{title}</h2>
      <p className="text-[16px] text-center">{description}</p>
    </div>
  );
}
