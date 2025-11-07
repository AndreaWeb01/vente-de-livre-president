import Button from "./Button"
export default function FormationDashCadre({ id, image, titre, divClass, buttonText }){
    return(
        <div className={`flex gap-3 px-6 py-4 items-center ${divClass}`}>
            <div className="w-[100px]">
                <img src={image} alt={titre} className="w-full object-cover " />
            </div>
            <div>
                <h2 className="text-textColor text-2x1 mb-4">{titre}</h2>
                {id ? (
                  <Button label={buttonText} color="orange" ButtonClassName="text-white" to={`/video-formation/${id}`}></Button>
                ) : (
                  <Button label={buttonText} color="orange" ButtonClassName="text-white"></Button>
                )}
            </div>
        </div>
    )
}