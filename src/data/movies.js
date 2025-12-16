import SpidermanImg from "../assets/images/Spiderman.jpg";
import JawanImg from "../assets/images/Jawan.jpg";
import LeoImg from "../assets/images/Leo.jpg";
import VijayImg from "../assets/images/Vijay.jpg";

const Movies = [
  {
    id: 1,
    title: "Leo",
    image: "/images/Leo.jpg",
    artistImage: VijayImg,
    description: "Action thriller",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
  },
  {
    id: 2,
    title: "Spider-Man",
    image: SpidermanImg,
    artistImage: "/images/tom-holland.jpg", // optional
    description: "Superhero action adventure",
    theatres: ["PVR", "AGS"],
  },
  {
    id: 3,
    title: "Jawan",
    image: JawanImg,
    artistImage: "/images/shah-rukh.jpg", // optional
    description: "Mass action entertainer",
    theatres: ["INOX", "SPI"],
  },
  {
    id: 4,
    title: "Leo (IMAX)",
    image: LeoImg,
    artistImage: VijayImg,
    description: "IMAX experience of Leo",
    theatres: ["PVR", "IMAX"],
  },
];

export default Movies;
