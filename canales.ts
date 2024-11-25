import { ChannelCategory, SignalType } from "./src/components/Grilla"; // Assuming the types are exported from the main file

interface ChannelNumbers {
  sd?: number;
  isdbt?: string;
  hd?: number;
}

interface Channel {
  name: string;
  logo?: string;
  category: ChannelCategory;
  numbers: ChannelNumbers;
}

const channels: Channel[] = [
    // Canales Aire
    {
      "name": "TODO NOTICIAS",
      "logo": "/api/placeholder/80/40",
      "category": "noticias",
      "numbers": {
        "sd": 2,
        "isdbt": "58.1",
        "hd": 101,
      },
    },
    {
      "name": "CNN",
      "logo": "/api/placeholder/80/40",
      "category": "noticias",
      "numbers": {
        "sd": 3,
        "isdbt": "58.2",
        "hd": 102,
      },
    },
    {
      "name": "C5N",
      "logo": "/api/placeholder/80/40",
      "category": "noticias",
      "numbers": {
        "sd": 4,
        "isdbt": "58.3",
        "hd": 103,
      },
    },
    {
      "name": "CN 23",
      "logo": "/api/placeholder/80/40",
      "category": "noticias",
      "numbers": {
        "sd": 5,
        "isdbt": "58.4",
        "hd": 104,
      },
    },
    {
      "name": "CANAL 6 CRESPO",
      "logo": "/api/placeholder/80/40",
      "category": "local",
      "numbers": {
        "sd": 6,
        "isdbt": "58.5",
        "hd": 105,
      },
    },
    {
      "name": "TV PUBLICA",
      "logo": "/api/placeholder/80/40",
      "category": "noticias",
      "numbers": {
        "sd": 7,
        "isdbt": "58.6",
        "hd": 106,
      },
    },
    {
      "name": "CRONICA TV",
      "logo": "/api/placeholder/80/40",
      "category": "noticias",
      "numbers": {
        "sd": 8,
        "isdbt": "58.7",
        "hd": 107,
      },
    },
    {
      "name": "CANAL 9",
      "logo": "/api/placeholder/80/40",
      "category": "local",
      "numbers": {
        "sd": 9,
        "isdbt": "58.8",
        "hd": 108,
      },
    },
    {
      "name": "SAN JOSE",
      "logo": "/api/placeholder/80/40",
      "category": "regional",
      "numbers": {
        "sd": 10,
        "isdbt": "59.1",
        "hd": 109,
      },
    },
    {
      "name": "TELEFE",
      "logo": "/api/placeholder/80/40",
      "category": "general",
      "numbers": {
        "sd": 11,
        "isdbt": "59.2",
        "hd": 110,
      },
    },
    {
      "name": "AMERICA 2",
      "logo": "/api/placeholder/80/40",
      "category": "general",
      "numbers": {
        "sd": 12,
        "isdbt": "59.3",
        "hd": 111,
      },
    },
    {
      "name": "TRECE",
      "logo": "/api/placeholder/80/40",
      "category": "general",
      "numbers": {
        "sd": 13,
        "isdbt": "59.4",
        "hd": 112,
      },
    },
    {
      "name": "CANAL 26",
      "logo": "/api/placeholder/80/40",
      "category": "agropecuario",
      "numbers": {
        "sd": 14,
        "isdbt": "59.5",
        "hd": 113,
      },
    },
    {
      "name": "AMERICA 24",
      "logo": "/api/placeholder/80/40",
      "category": "noticias",
      "numbers": {
        "sd": 15,
        "isdbt": "59.6",
        "hd": 114,
      },
    },
    {
      "name": "CANAL 9 DE PARANA",
      "logo": "/api/placeholder/80/40",
      "category": "regional",
      "numbers": {
        "sd": 16,
        "isdbt": "59.7",
        "hd": 115,
      },
    },
    {
      "name": "CANAL 11 PARANA",
      "logo": "/api/placeholder/80/40",
      "category": "regional",
      "numbers": {
        "sd": 17,
        "isdbt": "60.1",
        "hd": 116,
      },
    },
    {
      "name": "CANAL RURAL",
      "logo": "/api/placeholder/80/40",
      "category": "deportes",
      "numbers": {
        "sd": 18,
        "isdbt": "60.2",
        "hd": 117,
      },
    },
    {
      "name": "ENCUENTRO",
      "logo": "/api/placeholder/80/40",
      "category": "educativo",
      "numbers": {
        "sd": 19,
        "isdbt": "60.3",
        "hd": 118,
      },
    },
    {
      "name": "CONSTRUIR",
      "logo": "/api/placeholder/80/40",
      "category": "educativo",
      "numbers": {
        "sd": 20,
        "isdbt": "60.4",
        "hd": 119,
      },
    },
    {
      "name": "AMERICA SPORT",
      "logo": "/api/placeholder/80/40",
      "category": "deportes",
      "numbers": {
        "sd": 21,
        "isdbt": "60.5",
        "hd": 120,
      },
    },
    {
      "name": "FOX SPORTS",
      "logo": "/api/placeholder/80/40",
      "category": "deportes",
      "numbers": {
        "sd": 22,
        "isdbt": "60.6",
        "hd": 121,
      },
    },
    {
      "name": "FOX SPORTS 2",
      "logo": "/api/placeholder/80/40",
      "category": "deportes",
      "numbers": {
        "sd": 23,
        "isdbt": "60.7",
        "hd": 122,
      },
    },
    {
      "name": "ESPN",
      "logo": "/api/placeholder/80/40",
      "category": "deportes",
      "numbers": {
        "sd": 24,
        "isdbt": "61.1",
        "hd": 123,
      },
    },
    {
      "name": "DEPORT TV",
      "logo": "/api/placeholder/80/40",
      "category": "deportes",
      "numbers": {
        "sd": 25,
        "isdbt": "61.2",
        "hd": 124,
      },
    },
    {
      "name": "ESPN 2",
      "logo": "/api/placeholder/80/40",
      "category": "deportes",
      "numbers": {
        "sd": 26,
        "isdbt": "61.3",
        "hd": 125,
      },
    },
    {
      "name": "TYC SPORTS",
      "logo": "/api/placeholder/80/40",
      "category": "deportes",
      "numbers": {
        "sd": 27,
        "isdbt": "61.4",
        "hd": 126,
      },
    },
    {
      "name": "EL GARAGE",
      "logo": "/api/placeholder/80/40",
      "category": "deportes",
      "numbers": {
        "sd": 28,
        "isdbt": "61.5",
        "hd": 127,
      },
    },
    {
      "name": "CARTOON NETWORK",
      "logo": "/api/placeholder/80/40",
      "category": "infantil",
      "numbers": {
        "sd": 29,
        "isdbt": "61.6",
        "hd": 128,
      },
    },
    {
      "name": "DISCOVERY KIDS",
      "logo": "/api/placeholder/80/40",
      "category": "infantil",
      "numbers": {
        "sd": 30,
        "isdbt": "61.7",
        "hd": 129,
      },
    },
    {
      "name": "DISNEY KIDS",
      "logo": "/api/placeholder/80/40",
      "category": "infantil",
      "numbers": {
        "sd": 31,
        "isdbt": "62.1",
        "hd": 130,
      },
    },
    {
      "name": "DISNEY JR",
      "logo": "/api/placeholder/80/40",
      "category": "infantil",
      "numbers": {
        "sd": 32,
        "isdbt": "62.2",
        "hd": 131,
      },
    },
    {
      "name": "DISNEY XD",
      "logo": "/api/placeholder/80/40",
      "category": "infantil",
      "numbers": {
        "sd": 33,
        "isdbt": "62.3",
        "hd": 132,
      },
    },
    {
      "name": "DISNEY CHANNEL",
      "logo": "/api/placeholder/80/40",
      "category": "infantil",
      "numbers": {
        "sd": 34,
        "isdbt": "62.4",
        "hd": 133,
      },
    },
    {
      "name": "NAT GEO KIDS",
      "logo": "/api/placeholder/80/40",
      "category": "infantil",
      "numbers": {
        "sd": 35,
        "isdbt": "62.5",
        "hd": 134,
      },
    },
    {
      "name": "PAKA PAKA",
      "logo": "/api/placeholder/80/40",
      "category": "infantil",
      "numbers": {
        "sd": 36,
        "isdbt": "62.6",
        "hd": 135,
      },
    },
    {
      "name": "LA NACION +",
      "logo": "/api/placeholder/80/40",
      "category": "noticias",
      "numbers": {
        "sd": 37,
        "isdbt": "63.1",
        "hd": 136,
      },
    },
    {
      "name": "ANIMAL PLANET",
      "logo": "/api/placeholder/80/40",
      "category": "documentales",
      "numbers": {
        "sd": 38,
        "isdbt": "63.2",
        "hd": 137,
      },
    },
    {
      "name": "NAT GEO",
      "logo": "/api/placeholder/80/40",
      "category": "documentales",
      "numbers": {
        "sd": 39,
        "isdbt": "63.3",
        "hd": 138,
      },
    },
    {
      "name": "DISCOVERY",
      "logo": "/api/placeholder/80/40",
      "category": "documentales",
      "numbers": {
        "sd": 40,
        "isdbt": "63.4",
        "hd": 139,
      },
    },
    {
      "name": "HOME & HEALTH",
      "logo": "/api/placeholder/80/40",
      "category": "documentales",
      "numbers": {
        "sd": 41,
        "isdbt": "63.5",
        "hd": 140,
      },
    },
    {
      "name": "HISTORY CHANNEL",
      "logo": "/api/placeholder/80/40",
      "category": "documentales",
      "numbers": {
        "sd": 42,
        "isdbt": "63.6",
        "hd": 141,
      },
    },
    {
      "name": "HISTORY CHANNEL 2",
      "logo": "/api/placeholder/80/40",
      "category": "documentales",
      "numbers": {
        "sd": 43,
        "isdbt": "63.7",
        "hd": 142,
      },
    },
    {
      "name": "TECNOPOLIS",
      "logo": "/api/placeholder/80/40",
      "category": "documentales",
      "numbers": {
        "sd": 44,
        "isdbt": "64.1",
        "hd": 143,
      },
    },
    {
      "name": "INVESTIGACION DISCOVERY",
      "logo": "/api/placeholder/80/40",
      "category": "documentales",
      "numbers": {
        "sd": 45,
        "isdbt": "64.2",
        "hd": 144,
      },
    },
    {
      "name": "VOLVER",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 46,
        "isdbt": "64.3",
        "hd": 145,
      },
    },
    {
      "name": "CINE AR",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 47,
        "isdbt": "64.4",
        "hd": 146,
      },
    },
    {
      "name": "FOX",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 48,
        "isdbt": "64.5",
        "hd": 147,
      },
    },
    {
      "name": "FX",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 49,
        "isdbt": "64.6",
        "hd": 148,
      },
    },
    {
      "name": "SONY",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 50,
        "isdbt": "64.7",
        "hd": 149,
      },
    },
    {
      "name": "UNIVERSAL CHANNEL",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 51,
        "isdbt": "65.1",
        "hd": 150,
      },
    },
    {
      "name": "WARNER",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 52,
        "isdbt": "65.2",
        "hd": 151,
      },
    },
    {
      "name": "AXN",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 54,
        "isdbt": "65.4",
        "hd": 153,
      },
    },
    {
      "name": "A&E MUNDO",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 55,
        "isdbt": "65.5",
        "hd": 409,
      },
    },
    {
      "name": "STUDIO UNIVERSAL",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 56,
        "isdbt": "65.6",
        "hd": 155,
      },
    },
    {
      "name": "FOX LIFE",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 57,
        "isdbt": "65.7",
        "hd": 156,
      },
    },
    {
      "name": "I-SAT",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 58,
        "isdbt": "66.1",
        "hd": 157,
      },
    },
    {
      "name": "GOLDEN",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 59,
        "isdbt": "66.2",
        "hd": 158,
      },
    },
    {
      "name": "FOX MOVIES",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 60,
        "isdbt": "66.3",
        "hd": 159,
      },
    },
    {
      "name": "SPACE",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 61,
        "isdbt": "66.4",
        "hd": 160,
      },
    },
    {
      "name": "TCM",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 62,
        "isdbt": "66.5",
        "hd": 161,
      },
    },
    {
      "name": "TNT",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 63,
        "isdbt": "66.6",
        "hd": 162,
      },
    },
    {
      "name": "AMC LATINOAMERICA",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 64,
        "isdbt": "66.7",
        "hd": 163,
      },
    },
    {
      "name": "CINECANAL",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 65,
        "isdbt": "67.1",
        "hd": 164,
      },
    },
    {
      "name": "CINEMAX",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 66,
        "isdbt": "67.2",
        "hd": 165,
      },
    },
    {
      "name": "EUROCHANNEL",
      "logo": "/api/placeholder/80/40",
      "category": "internacional",
      "numbers": {
        "sd": 67,
        "isdbt": "67.3",
        "hd": 166,
      },
    },
    {
      "name": "EUROPA EUROPA",
      "logo": "/api/placeholder/80/40",
      "category": "internacional",
      "numbers": {
        "sd": 68,
        "isdbt": "67.4",
        "hd": 167,
      },
    },
    {
      "name": "FILM & ARTS",
      "logo": "/api/placeholder/80/40",
      "category": "estilos de vida",
      "numbers": {
        "sd": 69,
        "isdbt": "67.5",
        "hd": 168,
      },
    },
    {
      "name": "TLC",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 70,
        "isdbt": "67.6",
        "hd": 169,
      },
    },
    {
      "name": "E ENTERTAINMENT",
      "logo": "/api/placeholder/80/40",
      "category": "estilos de vida",
      "numbers": {
        "sd": 71,
        "isdbt": "67.7",
        "hd": 170,
      },
    },
    {
      "name": "EL GOURMET",
      "logo": "/api/placeholder/80/40",
      "category": "estilos de vida",
      "numbers": {
        "sd": 72,
        "isdbt": "68.1",
        "hd": 171,
      },
    },
    {
      "name": "CANAL DE LAS ESTRELLAS",
      "logo": "/api/placeholder/80/40",
      "category": "estilos de vida",
      "numbers": {
        "sd": 73,
        "isdbt": "68.2",
        "hd": 172,
      },
    },
    {
      "name": "TBS",
      "logo": "/api/placeholder/80/40",
      "category": "peliculas",
      "numbers": {
        "sd": 74,
        "isdbt": "68.3",
        "hd": 173,
      },
    },
    {
      "name": "360",
      "logo": "/api/placeholder/80/40",
      "category": "educativo",
      "numbers": {
        "sd": 75,
        "isdbt": "69.1",
        "hd": 174,
      },
    },
    {
      "name": "CANAL U",
      "logo": "/api/placeholder/80/40",
      "category": "educativo",
      "numbers": {
        "sd": 76,
        "isdbt": "69.2",
        "hd": 175,
      },
    },
    {
      "name": "FRANCE 24 INTERNACIONAL",
      "logo": "/api/placeholder/80/40",
      "category": "internacional",
      "numbers": {
        "sd": 77,
        "isdbt": "69.3",
        "hd": 176,
      },
    },
    {
      "name": "RAI INTERNACIONAL",
      "logo": "/api/placeholder/80/40",
      "category": "internacional",
      "numbers": {
        "sd": 78,
        "isdbt": "69.4",
        "hd": 177,
      },
    },
    {
      "name": "TELEMUNDO INTERNACIONAL",
      "logo": "/api/placeholder/80/40",
      "category": "internacional",
      "numbers": {
        "sd": 79,
        "isdbt": "69.5",
        "hd": 178,
      },
    },
    {
      "name": "TELESUR INTERNACIONAL",
      "logo": "/api/placeholder/80/40",
      "category": "internacional",
      "numbers": {
        "sd": 80,
        "isdbt": "69.6",
        "hd": 179,
      },
    },
    {
      "name": "ARGENTINISIMA",
      "logo": "/api/placeholder/80/40",
      "category": "internacional",
      "numbers": {
        "sd": 81,
        "isdbt": "69.7",
        "hd": 180,
      },
    },
    {
      "name": "CRONICA MUSICAL",
      "logo": "/api/placeholder/80/40",
      "category": "musica",
      "numbers": {
        "sd": 82,
        "isdbt": "64.1",
        "hd": 181,
      },
    },
    {
      "name": "HTV",
      "logo": "/api/placeholder/80/40",
      "category": "musica",
      "numbers": {
        "sd": 83,
        "isdbt": "64.2",
        "hd": 182,
      },
    },
    {
      "name": "MUCH MUSIC",
      "logo": "/api/placeholder/80/40",
      "category": "musica",
      "numbers": {
        "sd": 84,
        "isdbt": "64.3",
        "hd": 183,
      },
    },
  ];

  export default channels;