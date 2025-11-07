// import { useEffect, useRef } from "react";
// import React from "react-";
// import Video  from '/Video.mp4'; // import direct

// export default function Video() {
//   const Ref = useRef(null);

//   useEffect(() => {
//     const handleContextMenu = (e) => e.preventDefault();

//     const timeout = setTimeout(() => {
//       const videoElement = document.querySelector(
//         ".react--container video"
//       );
//       if (videoElement) {
//         videoElement.addEventListener("contextmenu", handleContextMenu);
//       }
//     }, 500);

//     return () => {
//       clearTimeout(timeout);
//       const videoElement = document.querySelector(
//         ".react--container video"
//       );
//       if (videoElement) {
//         videoElement.removeEventListener("contextmenu", handleContextMenu);
//       }
//     };
//   }, []);

//   return (
//     <div
//       className="relative react--container"
//       style={{
//         paddingTop: "56.25%",
//         width: "100%",
//         borderRadius: "12px",
//         overflow: "hidden",
//         backgroundColor: "#000",
//       }}
//     >
//       <React
//         ref={Ref}
//         className="absolute top-0 left-0"
//         url={ Video } // ici on utilise l'import
//         width="100%"
//         height="100%"
//         controls
//         playing={false}
//         config={{
//           file: {
//             forceVideo: true,
//             attributes: {
//               controlsList: "nodownload noremoteplayback",
//               disablePictureInPicture: true,
//               onContextMenu: (e) => e.preventDefault(),
//             },
//           },
//         }}
//       />
//     </div>
//   );
// }
