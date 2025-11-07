import Galerie from "./Galerie";

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=1200&q=80",
    title: "Plage au coucher",
    date: "2023-07-12",
    alt: "Coucher de soleil sur la plage",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
    title: "Forêt brumeuse",
    date: "2024-02-01",
    alt: "Arbres dans la brume",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
    title: "Montagnes",
    date: "2022-10-05",
    alt: "Chaîne de montagnes",
  },

   {
    id: 4,
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
    title: "Montagnes",
    date: "2022-10-05",
    alt: "Chaîne de montagnes",
  },

  {
    id: 5,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
    title: "Forêt brumeuse",
    date: "2024-02-01",
    alt: "Arbres dans la brume",
  },

  {id: 6,
    src: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=1200&q=80",
    title: "Plage au coucher",
    date: "2023-07-12",
    alt: "Coucher de soleil sur la plage",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
    title: "Forêt brumeuse",
    date: "2024-02-01",
    alt: "Arbres dans la brume",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
    title: "Montagnes",
    date: "2022-10-05",
    alt: "Chaîne de montagnes",
  },

   {
    id: 9,
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
    title: "Montagnes",
    date: "2022-10-05",
    alt: "Chaîne de montagnes",
  },

  {
    id: 10,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
    title: "Forêt brumeuse",
    date: "2024-02-01",
    alt: "Arbres dans la brume",
  }
];

export default function PhotoSection() {
  return (
    <div className="min-h-screen p-4">
      {/* <h1 className="text-3xl font-bold mb-6 text-center">Ma galerie</h1> */}
      <Galerie photos={photo} />
    </div>
  );
}