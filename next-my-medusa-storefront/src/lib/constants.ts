import Image from "next/image"
import Rectangle from "../../public/imgs/Cut-to-Rectangle.jpg"
import Shape from "../../public/imgs/Cut-to-Shape.jpg"
import Letter from "../../public/imgs/Cut-to-Letter.jpg"

export const IS_BROWSER = typeof window !== "undefined"

export const PLUGS = [
  "USA / CANADA 120V",
  "UK / IRELAND 230V",
  "EUROPE 230V",
  "AUSTRALIA / NZ 230V",
  "JAPAN 100V",
]

export const BACKBOARD_COLORS = [
  "Clear/ Transparent (Most Popular)",
  "Green",
  "Lemon Yellow",
  "Red",
  "Blue",
  "Purple",
  "Orange",
  "Gray",
  "Dark Brown",
  "Black",
]

export type FontType = typeof FONTS[0]

export const FONTS = [
  { font: "Alexa", size: "80px", lineHeight: "94%" },
  { font: "Amanda", size: "80px", lineHeight: "130%" },
  { font: "Amsterdam", size: "88px", lineHeight: "110%" },
  { font: "Barcelona", size: "77px", lineHeight: "158%" },
  { font: "Bayview", size: "105px", lineHeight: "94%" },
  { font: "BrittanySignature", size: "65px", lineHeight: "160%" },
  { font: "Chelsea", size: "110px", lineHeight: "110%" },
  { font: "Freehand", size: "90px", lineHeight: "120%" },
  { font: "Freespirit", size: "47px", lineHeight: "200%" },
  { font: "Greenworld", size: "100px", lineHeight: "88%" },
  { font: "Hamillton", size: "95px", lineHeight: "140%" },
  { font: "JennaSue", size: "110px", lineHeight: "85%" },
  { font: "Neonscript", size: "95px", lineHeight: "145%" },
  { font: "NewCursive", size: "100px", lineHeight: "88%" },
  { font: "Northshore", size: "93px", lineHeight: "142%" },
  { font: "Rocket", size: "50px", lineHeight: "165%" },
  { font: "Royalty", size: "68px", lineHeight: "160%" },
  { font: "PhotographSignature", size: "115px", lineHeight: "115%" },
  { font: "Signature", size: "100px", lineHeight: "98%" },
  { font: "Austin", size: "115px", lineHeight: "80%" },
  { font: "Vintage", size: "75px", lineHeight: "108%" },
  { font: "WildScript", size: "105px", lineHeight: "100%" },
  { font: "Monaco", size: "70px", lineHeight: "89%" },
  { font: "Avante", size: "75px", lineHeight: "98%" },
  { font: "Beachfront", size: "73px", lineHeight: "130%" },
  { font: "Buttercup", size: "120px", lineHeight: "95%" },
  { font: "ClassicType", size: "65px", lineHeight: "103%" },
  { font: "Melbourne", size: "70px", lineHeight: "105%" },
  { font: "NeoTokyo", size: "73px", lineHeight: "110%" },
  { font: "NeonLite", size: "62px", lineHeight: "96%" },
  { font: "Typewriter", size: "70px", lineHeight: "95%" },
  { font: "Waikiki", size: "70px", lineHeight: "88%" },
  { font: "Batman", size: "60px", lineHeight: "85%" },
  { font: "LoveNeon", size: "60px", lineHeight: "95%" },
  { font: "Marquee", size: "85px", lineHeight: "100%" },
  { font: "Mayfair", size: "76px", lineHeight: "97%" },
  { font: "NeonGlow", size: "75px", lineHeight: "102%" },
  { font: "Neontrace", size: "62px", lineHeight: "103%" },
  { font: "Nevada", size: "100px", lineHeight: "95%" },
  { font: "SciFi", size: "50px", lineHeight: "111%" },
]

export const SIZES = [
  {
    size: "20 inch / 50cm",
    price: 72,
    step: 9,
  },
  {
    size: "24 inch / 60cm",
    price: 124.2,
    step: 9,
  },
  {
    size: "27 inch / 70cm",
    price: 169.29,
    step: 8.1,
  },
  {
    size: "31 inch / 80 cm",
    price: 213.03,
    step: 8.1,
  },
  {
    size: "35 inch / 90 cm",
    price: 252.72,
    step: 8.1,
  },
  {
    size: "40 inch / 100 cm",
    price: 344.25,
    step: 8.1,
  },
  {
    size: "47 inch / 120 cm",
    price: 394.47,
    step: 9.72,
  },
  {
    size: "59 inch / 150 cm",
    price: 452.79,
    step: 12.15,
  },
  {
    size: "79 inch / 200 cm",
    price: 517.59,
    step: 16.2,
  },
]

export const BACKBOARD_STYLES = [
  {
    name: "Cut to Rectangle",
    content: "The backboard will be cut rectangularly like a frame.",
    staticImage: Rectangle,
  },
  {
    name: "Cut to Shape",
    content:
      "The backboard will be shaped in line with the letters; can be circle, oval, octagon, and such.",
    staticImage: Shape,
  },
  {
    name: "Cut to Letter",
    content:
      "The backboard will closely follow the pattern of the preferred font size and style.",
    staticImage: Letter,
  },
]

export const USEAGE = ["Indoor Usage", "Outdoor Usage"]

export type ColourType = typeof COLOURS[0]

export const COLOURS = [
  {
    color: "Warm White",
    bulbColor: "rgb(248, 224, 142)",
    bulbTextShadow:
      "rgb(255 255 255) 0px 0px 1px, rgb(255 255 255) 0px 0px 2px, rgb(248 224 142) 0px 0px 4px, rgb(248 224 142) 0px 0px 6px, rgb(248 224 142) 0px 0px 8px, rgb(248 224 142) 0px 0px 11px, rgb(248 224 142) 0px 0px 15px",
    textShadow:
      "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(248 224 142) 0px 0px 20px, rgb(248 224 142) 0px 0px 30px, rgb(248 224 142) 0px 0px 40px, rgb(248 224 142) 0px 0px 55px, rgb(248 224 142) 0px 0px 75px",
  },
  {
    color: "White",
    bulbColor: "rgb(229, 229, 229)",
    bulbTextShadow:
      "rgb(255 255 255) 0px 0px 1px, rgb(255 255 255) 0px 0px 2px, rgb(229 229 229) 0px 0px 4px, rgb(229 229 229) 0px 0px 6px, rgb(229 229 229) 0px 0px 8px, rgb(229 229 229) 0px 0px 11px, rgb(229 229 229) 0px 0px 15px",
    textShadow:
      "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(229 229 229) 0px 0px 20px, rgb(229 229 229) 0px 0px 30px, rgb(229 229 229) 0px 0px 40px, rgb(229 229 229) 0px 0px 55px, rgb(229 229 229) 0px 0px 75px",
  },
  {
    color: "Lemon Yellow",
    bulbColor: "rgb(236, 232, 26)",
    bulbTextShadow:
      "rgb(255 255 255) 0px 0px 1px, rgb(255 255 255) 0px 0px 2px, rgb(236 232 26) 0px 0px 4px, rgb(236 232 26) 0px 0px 6px, rgb(236 232 26) 0px 0px 8px, rgb(236 232 26) 0px 0px 11px, rgb(236 232 26) 0px 0px 15px",
    textShadow:
      "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(236 232 26) 0px 0px 20px, rgb(236 232 26) 0px 0px 30px, rgb(236 232 26) 0px 0px 40px, rgb(236 232 26) 0px 0px 55px, rgb(236 232 26) 0px 0px 75px",
  },
  {
    color: "Light Yellow",
    bulbColor: "rgb(251, 225, 34)",
    bulbTextShadow:
      "rgb(255 255 255) 0px 0px 1px, rgb(255 255 255) 0px 0px 2px, rgb(251 225 34) 0px 0px 4px, rgb(251 225 34) 0px 0px 6px, rgb(251 225 34) 0px 0px 8px, rgb(251 225 34) 0px 0px 11px, rgb(251 225 34) 0px 0px 15px",
    textShadow:
      "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(251 225 34) 0px 0px 20px, rgb(251 225 34) 0px 0px 30px, rgb(251 225 34) 0px 0px 40px, rgb(251 225 34) 0px 0px 55px, rgb(251 225 34) 0px 0px 75px",
  },
  {
    color: "Orange",
    bulbColor: "rgb(255, 163, 0)",
    bulbTextShadow:
      "rgb(255 255 255) 0px 0px 1px, rgb(255 255 255) 0px 0px 2px, rgb(255 163 0) 0px 0px 4px, rgb(255 163 0) 0px 0px 6px, rgb(255 163 0) 0px 0px 8px, rgb(255 163 0) 0px 0px 11px, rgb(255 163 0) 0px 0px 15px",
    textShadow:
      "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(255 163 0) 0px 0px 20px, rgb(255 163 0) 0px 0px 30px, rgb(255 163 0) 0px 0px 40px, rgb(255 163 0) 0px 0px 55px, rgb(255 163 0) 0px 0px 75px",
  },
  {
    color: "Light Red",
    bulbColor: "rgb(248, 72, 94)",
    bulbTextShadow:
      "rgb(255 255 255) 0px 0px 1px, rgb(255 255 255) 0px 0px 2px, rgb(248 72 94) 0px 0px 4px, rgb(248 72 94) 0px 0px 6px, rgb(248 72 94) 0px 0px 8px, rgb(248 72 94) 0px 0px 11px, rgb(248 72 94) 0px 0px 15px",
    textShadow:
      "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(248 72 94) 0px 0px 20px, rgb(248 72 94) 0px 0px 30px, rgb(248 72 94) 0px 0px 40px, rgb(248 72 94) 0px 0px 55px, rgb(248 72 94) 0px 0px 75px",
  },
  {
    color: "Red",
    bulbColor: "rgb(249, 66, 58)",
    bulbTextShadow:
      "rgb(255 255 255) 0px 0px 1px, rgb(255 255 255) 0px 0px 2px, rgb(249 66 58) 0px 0px 4px, rgb(249 66 58) 0px 0px 6px, rgb(249 66 58) 0px 0px 8px, rgb(249 66 58) 0px 0px 11px, rgb(249 66 58) 0px 0px 15px",
    textShadow:
      "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(249 66 58) 0px 0px 20px, rgb(249 66 58) 0px 0px 30px, rgb(249 66 58) 0px 0px 40px, rgb(249 66 58) 0px 0px 55px, rgb(249 66 58) 0px 0px 75px",
  },
  {
    color: "Pink",
    bulbColor: "rgb(220, 134, 153)",
    bulbTextShadow:
      "rgb(255 255 255) 0px 0px 1px, rgb(255 255 255) 0px 0px 2px, rgb(220 134 153) 0px 0px 4px, rgb(220 134 153) 0px 0px 6px, rgb(220 134 153) 0px 0px 8px, rgb(220 134 153) 0px 0px 11px, rgb(220 134 153) 0px 0px 15px",
    textShadow:
      "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(220 134 153) 0px 0px 20px, rgb(220 134 153) 0px 0px 30px, rgb(220 134 153) 0px 0px 40px, rgb(220 134 153) 0px 0px 55px, rgb(220 134 153) 0px 0px 75px",
  },
  {
    color: "Hot Pink",
    bulbColor: "rgb(255, 62, 181)",
    bulbTextShadow:
      "rgb(255 255 255) 0px 0px 1px, rgb(255 255 255) 0px 0px 2px, rgb(255 62 181) 0px 0px 4px, rgb(255 62 181) 0px 0px 6px, rgb(255 62 181) 0px 0px 8px, rgb(255 62 181) 0px 0px 11px, rgb(255 62 181) 0px 0px 15px",
    textShadow:
      "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(255 62 181) 0px 0px 20px, rgb(255 62 181) 0px 0px 30px, rgb(255 62 181) 0px 0px 40px, rgb(255 62 181) 0px 0px 55px, rgb(255 62 181) 0px 0px 75px",
  },
  {
    color: "Light Pink",
    bulbColor: "rgb(232, 156, 174)",
    bulbTextShadow:
      "rgb(255 255 255) 0px 0px 1px, rgb(255 255 255) 0px 0px 2px, rgb(232 156 174) 0px 0px 4px, rgb(232 156 174) 0px 0px 6px, rgb(232 156 174) 0px 0px 8px, rgb(232 156 174) 0px 0px 11px, rgb(232 156 174) 0px 0px 15px",
    textShadow:
      "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(232 156 174) 0px 0px 20px, rgb(232 156 174) 0px 0px 30px, rgb(232 156 174) 0px 0px 40px, rgb(232 156 174) 0px 0px 55px, rgb(232 156 174) 0px 0px 75px",
  },
  {
    color: "Purple",
    bulbColor: "rgb(155, 38, 182)",
    bulbTextShadow:
      "rgb(255 255 255) 0px 0px 1px, rgb(255 255 255) 0px 0px 2px, rgb(155 38 182) 0px 0px 4px, rgb(155 38 182) 0px 0px 6px, rgb(155 38 182) 0px 0px 8px, rgb(155 38 182) 0px 0px 11px, rgb(155 38 182) 0px 0px 15px",
    textShadow:
      "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(155 38 182) 0px 0px 20px, rgb(155 38 182) 0px 0px 30px, rgb(155 38 182) 0px 0px 40px, rgb(155 38 182) 0px 0px 55px, rgb(155 38 182) 0px 0px 75px",
  },
  {
    color: "Light Purple",
    bulbColor: "rgb(150, 60, 189)",
    bulbTextShadow:
      "rgb(255 255 255) 0px 0px 1px, rgb(255 255 255) 0px 0px 2px, rgb(150 60 189) 0px 0px 4px, rgb(150 60 189) 0px 0px 6px, rgb(150 60 189) 0px 0px 8px, rgb(150 60 189) 0px 0px 11px, rgb(150 60 189) 0px 0px 15px",
    textShadow:
      "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(150 60 189) 0px 0px 20px, rgb(150 60 189) 0px 0px 30px, rgb(150 60 189) 0px 0px 40px, rgb(150 60 189) 0px 0px 55px, rgb(150 60 189) 0px 0px 75px",
  },
  {
    color: "Deep Blue",
    bulbColor: "rgb(16, 6, 159)",
    bulbTextShadow:
      "rgb(255 255 255) 0px 0px 1px, rgb(255 255 255) 0px 0px 2px, rgb(16 6 159) 0px 0px 4px, rgb(16 6 159) 0px 0px 6px, rgb(16 6 159) 0px 0px 8px, rgb(16 6 159) 0px 0px 11px, rgb(16 6 159) 0px 0px 15px",
    textShadow:
      "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(16 6 159) 0px 0px 20px, rgb(16 6 159) 0px 0px 30px, rgb(16 6 159) 0px 0px 40px, rgb(16 6 159) 0px 0px 55px, rgb(16 6 159) 0px 0px 75px",
  },
  {
    color: "Light Blue",
    bulbColor: "rgb(48, 127, 226)",
    bulbTextShadow:
      "rgb(255 255 255) 0px 0px 1px, rgb(255 255 255) 0px 0px 2px, rgb(48 127 226) 0px 0px 4px, rgb(48 127 226) 0px 0px 6px, rgb(48 127 226) 0px 0px 8px, rgb(48 127 226) 0px 0px 11px, rgb(48 127 226) 0px 0px 15px",
    textShadow:
      "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(48 127 226) 0px 0px 20px, rgb(48 127 226) 0px 0px 30px, rgb(48 127 226) 0px 0px 40px, rgb(48 127 226) 0px 0px 55px, rgb(48 127 226) 0px 0px 75px",
  },
  {
    color: "Ice Blue",
    bulbColor: "rgb(45, 204, 211)",
    bulbTextShadow:
      "rgb(255 255 255) 0px 0px 1px, rgb(255 255 255) 0px 0px 2px, rgb(45 204 211) 0px 0px 4px, rgb(45 204 211) 0px 0px 6px, rgb(45 204 211) 0px 0px 8px, rgb(45 204 211) 0px 0px 11px, rgb(45 204 211) 0px 0px 15px",
    textShadow:
      "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(45 204 211) 0px 0px 20px, rgb(45 204 211) 0px 0px 30px, rgb(45 204 211) 0px 0px 40px, rgb(45 204 211) 0px 0px 55px, rgb(45 204 211) 0px 0px 75px",
  },
  {
    color: "Green",
    bulbColor: "rgb(96, 221, 73)",
    bulbTextShadow:
      "rgb(255 255 255) 0px 0px 1px, rgb(255 255 255) 0px 0px 2px, rgb(96 221 73) 0px 0px 4px, rgb(96 221 73) 0px 0px 6px, rgb(96 221 73) 0px 0px 8px, rgb(96 221 73) 0px 0px 11px, rgb(96 221 73) 0px 0px 15px",
    textShadow:
      "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(96 221 73) 0px 0px 20px, rgb(96 221 73) 0px 0px 30px, rgb(96 221 73) 0px 0px 40px, rgb(96 221 73) 0px 0px 55px, rgb(96 221 73) 0px 0px 75px",
  },
  {
    color: "Light Green",
    bulbColor: "rgb(38, 208, 124)",
    bulbTextShadow:
      "rgb(255 255 255) 0px 0px 1px, rgb(255 255 255) 0px 0px 2px, rgb(38 208 124) 0px 0px 4px, rgb(38 208 124) 0px 0px 6px, rgb(38 208 124) 0px 0px 8px, rgb(38 208 124) 0px 0px 11px, rgb(38 208 124) 0px 0px 15px",
    textShadow:
      "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(38 208 124) 0px 0px 20px, rgb(38 208 124) 0px 0px 30px, rgb(38 208 124) 0px 0px 40px, rgb(38 208 124) 0px 0px 55px, rgb(38 208 124) 0px 0px 75px",
  },
  // {
  //   color: 'Multi Color',
  //   bulbColor: '',
  //   bulbTextShadow: '',
  //   textShadow: ''
  // },
]
