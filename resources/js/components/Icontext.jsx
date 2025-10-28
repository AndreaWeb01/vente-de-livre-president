export default function Icontext({icon: Icon, text, iconClass, textClass}){
    return(
        <div className="flex gap-2 items-center">
            <Icon className={` ${iconClass}`}/>
            <span className={` ${textClass} text-[16px]`}>{text}</span>
        </div>
      
    )
}