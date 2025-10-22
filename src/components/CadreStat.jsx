import Icontext from "./Icontext"

export default function CadreStat({nombre, Icon, Text}){
   return(
    <div className="flex flex-col gap-2 h-auto py-6 px-15 text-center items-center rounded-[5px] text-secondary bg-bodyColor shadow-sm shadow-blue-100">
        <h2 className="font-bold">{nombre}</h2>
        <Icontext icon={Icon} text={Text} iconClass="text-secondary text-center"/>
    </div>
   )
}