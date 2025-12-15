// src/data/movies.js
import { AvengersImg, SpidermanImg, JawanImg, LeoImg } from "../assets/images";

export const movies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    image: AvengersImg,
    theatres: ["PVR", "INOX", "IMAX"],
  },
  {
    id: 2,
    title: "Spider-Man",
    image: SpidermanImg,
    theatres: ["PVR", "AGS"],
  },
  {
    id: 3,
    title: "Jawan",
    image: JawanImg,
    theatres: ["INOX", "SPI"],
  },
  {
    id: 4,
    title: "Leo",
    image: LeoImg,
    theatres: ["PVR", "IMAX"],
  },
];
