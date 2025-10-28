export default function Cadre({children, cadreClass}){
    return(
        <>  
            <div className={`w-auto h-auto shadow-md rounded-[5px] ${cadreClass}`} style={{
    boxShadow:
      "0 -4px 6px rgba(0, 0, 0, 0.08), 0 2px 10px rgba(0, 0, 0, 0.12)",
  }}>
                {children}
            </div>

        </>
    )
}