import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Accueil from "./pages/Accueil";
import Livres from "./pages/Livres"
import Auteur from "./pages/Auteur";
import Formations from "./pages/Formations";
import FormationDetail from "./pages/FormationDetail";
import Webinaire from "./pages/Webinaire";
import Phototheque from "./pages/Phototheque";
import Login from "./pages/Login"
import PaieProduitPhysique from "./pages/PaieProduitPhysique";
import PaieProduitNumerique from "./pages/PaieProduitNumerique";
import Inscription from "./pages/Inscription";
import ForgetPassword from "./pages/ForgetPassword";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/dashboard/Dashboard";
import Livre from "./pages/dashboard/Livre";
import Formation from "./pages/dashboard/Formations"
import Webinaires from "./pages/dashboard/Webinaires";
import ProfilDash from "./pages/dashboard/ProfilDash";
import Commande from "./pages/dashboard/Commande";
import DetailCommandes from "./pages/dashboard/DetailCommandes";
import ReadBook from "./pages/dashboard/ReadBook";
import FormPlayerVideo from "./pages/dashboard/FormPlayerVideo";

export default function App() {
  return (
    <>
    
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Accueil />} />
          <Route path="/livres" element={<Livres />} />
          <Route path="/auteur" element={<Auteur />} />
          <Route path="/formations" element={<Formations/>}/>
          <Route path="/formations/:id" element={<FormationDetail />} />
          <Route path="/webinaire" element={<Webinaire/>}/>
          <Route path="/phototheque" element={<Phototheque/>}></Route>
          <Route path="/Paiement-Physique" element={<PaieProduitPhysique />}/>
          <Route path="/Paiement-ligne" element={<PaieProduitNumerique />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/livreDash" element={<Livre />}></Route>
          <Route path="/formationDash" element={<Formation />}></Route>
          <Route path="/webinaireDash" element={<Webinaires />}></Route>
          <Route path="/profil" element={<ProfilDash />}></Route>
          <Route path="/commandes" element={<Commande />}></Route>
          <Route path="/detail-commande/:commandeId" element={<DetailCommandes />} />
          <Route path="/read-book" element={<ReadBook/>}></Route>
          <Route path="/video-formation" element={<FormPlayerVideo/>}></Route>
        </Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/inscription" element={<Inscription />} ></Route>
        <Route path="/password" element={<ForgetPassword/>} ></Route>
        <Route path="/change-password" element={<ChangePassword/>} ></Route>
       
      </Routes>
     
      
    </>
      
   
  );
}

