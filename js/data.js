// Données des projets : modifie ici titres, descriptions et outils
var P=[
{t:"Côte d’Ivoire",c:"web",k:"Webmapping",d:"Application de webmapping (Leaflet) pour explorer les localités de Côte d'Ivoire.",o:["Leaflet","OSM","HumanData","GADM"],h:160,image:"./img/webmapping-localites-ci.webp",url:"https://jacquesamon21.github.io/atlas-localites-ci/"},
{t:"Suivi des activités d'une flotte de drones",c:"dash",k:"Dashboard",d:"Suivi en temps réel des activités de la flotte de drones.",o:["DAX","Power BI","PostgreSQL"],h:200,image:"./img/dashboard-vols-drone.webp"},
{t:"Occupation du sol par OBIA",c:"tele",k:"Télédétection",d:"Analyse spatio-temporelle du paysage dans l'ancienne boucle du cacao: Sous-prefecture de Niablé.",o:["eCognition","Sentinel-2","QGIS"],h:120,image:"./img/occupation-sol-niable.webp"},
//t:"Cartographie par drone",c:"terrain",k:"Terrain",d:"Levé photogrammétrique, orthomosaïque et modèle numérique de terrain.",o:["Drone","Photogrammétrie","MNT"],h:280},
{t:"Suivi de la cacaoculture",c:"web",k:"Webmapping",d:"Observatoire cartographique de l’évolution du couvert forestier en zone cacaoyère.",o:["Leaflet","GeoJSON"],h:330,image:"./img/webmapping-atlas-planteurs.webp",url:"https://jacquesamon21.github.io/webmapping_cacao/"},
//t:"Mobilité &amp; trafic urbain",c:"dash",k:"Dashboard",d:"Indicateurs de déplacements et points de congestion visualisés en temps réel.",o:["JavaScript","API","PostgreSQL"],h:40}
];

// Ajoutez vos villes ici, avec leurs coordonnées WGS84 (latitude, longitude).
var CITIES=[
   {name:"Niakaramadougou",lat:8.66089007,lng:-5.28921397,description:"Formation aux outils de collecte de données."},
   {name:"Béoumi",lat:7.67463881,lng:-5.58243315,description:"Mission de vols de drones pour cartographie et Formation aux outils de collecte de données."},
   {name:"Oumé",lat:6.38281438,lng:-5.41598036,description:"Mission d'inpection de travaux par drone."},
   {name:"Abengourou",lat:6.72772114,lng:-3.49246472,description:"Mission de Collecte par drone."},
   {name:"Tiassalé",lat:5.89564774,lng:-4.82466100,description:"Zone de concentrations de mes activités de cartographie et lieu de résidence."},
   {name:"Dabou",lat:5.32520580,lng:-4.37468024,description:"Mission de vols de drones pour cartographie."},
   {name:"Alépé",lat:5.50125513,lng:-3.66190450,description:"Mission de vols de drones pour cartographie d'exploitation d'ananas."},
   {name:"Divo",lat:5.83344070,lng:-5.35649433,description:"Mission de vols de drones pour cartographie d'exploitation d'hévéa."},

];

// Contour de la Côte d’Ivoire chargé depuis js/CIV.geojson.
var CI_BOUNDARY=[];

