import SpidermanImg from "../assets/images/Spiderman.jpg";
import JawanImg from "../assets/images/Jawan.jpg";
import LeoImg from "../assets/images/Leo.jpg";
import VijayImg from "../assets/images/Vijay.jpg";
import  AvengersImg from "../assets/images/Avengers.jpg";

const moviesData = [
  {
    id: 1,
    title: "Avengers",
    image: AvengersImg,
    artistImage: VijayImg,
    description: "Action thriller starring Vijay",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
  },
  {
    id: 2,
    title: "Spider-Man",
    image: SpidermanImg,
    artistImage: "/images/tom-holland.jpg",
    description: "Superhero action adventure",
    theatres: ["PVR", "AGS"],
  },
  {
    id: 3,
    title: "Jawan",
    image: JawanImg,
    artistImage: "/images/shah-rukh.jpg",
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
  
  {
    id: 5,
    title: "Devara",
    image: "/images/devara.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Mass action drama",
    isLatest: true
  },
  {
    id: 6,
    title: "Pushpa 2",
    image: "/images/pushpa2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Sequel of Pushpa"
  },
  {
    id: 7,
    title: "Game Changer",
    image: "/images/gamechanger.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Political action drama",
    isLatest: true
  },
  {
    id: 8,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama"
  },
   {
    id: 9,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama"
  }, {
    id: 10,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama",
    isLatest: true
  }, {
    id: 11,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama",
    isLatest: true
  }, {
    id: 12,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama"
  }, {
    id: 13,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama",
    isLatest: true
  }, {
    id: 14,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama"
  }, {
    id: 15,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama",
    isLatest: true
  }, {
    id: 16,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama",
    isLatest: true,
  }, {
    id: 17,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama",
    isLatest: true
  }, {
    id: 18,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX",  "CINEPOLIS", ],
    description: "Vigilante drama"
  }, {
    id: 19,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR",  "LUXE"],
    description: "Vigilante drama",
    isLatest: true
  }, {
    id: 20,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama",
    isLatest: true
  }, {
    id: 21,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: [ "INOX", "IMAX", "CINEPOLIS", ],
    description: "Vigilante drama",
    isLatest: true
  }, {
    id: 22,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama"
  }, {
    id: 23,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX",  "LUXE"],
    description: "Vigilante drama",
    isLatest: true
  }, {
    id: 24,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama"
  }, {
    id: 25,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama"
  }, {
    id: 26,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama"
  }, {
    id: 27,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama"
  }, {
    id: 28,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama"
  }, {
    id: 29,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama"
  }, {
    id: 30,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama"
  }, {
    id: 31,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "INOX", "IMAX", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama"
  }, {
    id: 32,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: [ "INOX", "IMAX", "CINEPOLIS"],
    description: "Vigilante drama"
  },{
    id: 33,
    title: "Indian 2",
    image: "/images/indian2.jpg",
    theatres: ["PVR", "CINEPOLIS", "LUXE"],
    description: "Vigilante drama"
  },
];

export default moviesData;
