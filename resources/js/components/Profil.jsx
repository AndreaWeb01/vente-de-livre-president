export default function Profil({image, name}){
    return(
        <>
            <div className="flex gap-1 items-center mb-5 justify-start">
                <div className="w-[50px]">
                    <img src={image} alt={name} className="w-full object-cover rounded-full" />
                </div>
                <div>
                    <p>{name}</p>
                </div>
            </div>
        </>
    )
}