import { FaQuoteLeft } from "react-icons/fa";
export default function TestimonialCard({name, text, isActive}){
    return(
        <div className={`flex flex-col  rounded-2xl shadow-lg p-6 transition-all duration-500 md:w-[400px] md: min-h-[250px] ${
        isActive
          ? "bg-secondary md:scale-105 scale-95 text-white"
          : "bg-bodyColor scale-95 text-textColor"
      }`}>
            <FaQuoteLeft className={`text-4xl mb-4 text-left ${isActive ? "text-white" : "text-secondary"}`}/>
            <p className="text-sm md:text-base leading-relaxed mb-6 text-center">  {text} </p>
            <div className="">
                <p className={`flex-1 h-[2px] ${isActive ? "bg-white" : "bg-secondary"}`} />
                <p className={`ml-4 font-semibold text-right mt-2 ${isActive ? "text-white" : "text-secondary"}`}>
                {name}
                </p>
      </div>
        </div>
    )
}


// import { FaQuoteLeft } from "react-icons/fa";

// export default function TestimonialCard({ text, name, isCenter = true }) {
//   return (
//     <div
//       className={`
//         p-6 md:p-8 rounded-lg shadow-md transition-all duration-500 
//         ${isCenter ? "bg-secondary text-white scale-105" : "bg-bodyColor text-textColor scale-95"}
//       `}
//     >
//       <FaQuoteLeft
//         className={`text-4xl mb-4 ${isCenter ? "text-white" : "text-secondary"}`}
//       />

//       <p className="text-sm md:text-base leading-relaxed mb-6">
//         {text}
//       </p>

//       <div className="">
//         <p className={`flex-1 h-[2px] ${isCenter ? "bg-white" : "bg-secondary"}`} />
//         <p className={`ml-4 font-semibold text-right mt-2 ${isCenter ? "text-white" : "text-secondary"}`}>
//           {name}
//         </p>
//       </div>
//     </div>
//   );
// }