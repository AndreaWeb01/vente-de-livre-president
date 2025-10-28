
import Button from "./Button";
export default function WebinaireSection({image, title, showButton= true, buttonLabel="J'y participe", children}){
    return(<>
        <div className="mx-auto px-6 py-12  max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
                <h2 className=" text-2xl md:text-3xl font-bold text-primary">
                    {title}        
                </h2>
                {children}
                   {showButton && (
                    <Button
                    label={buttonLabel}
                    color="orange"
                    ButtonClassName="text-white"
                    />
                )}
            </div>
            <div className="w-full mx-auto">
                <img src={image} alt={title} className="w-full object-cover rounded-2xl" />
            </div>
        </div>
    </>)
}