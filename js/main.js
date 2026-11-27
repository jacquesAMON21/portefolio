// Logique : grille de projets, filtres, carte interactive, animations au défilement
var g=document.getElementById("grid");
g.innerHTML=P.map(function(p){
 var th='<svg viewBox="0 0 300 150" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="a'+p.h+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl('+p.h+',70%,45%)"/><stop offset="1" stop-color="hsl('+(p.h+60)+',75%,35%)"/></linearGradient></defs><rect width="300" height="150" fill="url(#a'+p.h+')"/><g fill="none" stroke="rgba(255,255,255,.28)"><circle cx="220" cy="50" r="30"/><circle cx="220" cy="50" r="55"/><circle cx="220" cy="50" r="85"/><path d="M0 110C60 70 120 130 180 90S260 120 300 100"/></g><circle cx="220" cy="50" r="5" fill="#fff"/></svg>';
 var thumb=p.image
  ?'<button class="thumb image-thumb" type="button" data-image="'+p.image+'" data-title="'+p.t+'" aria-label="Afficher l’image en plein écran : '+p.t+'"><img src="'+p.image+'" alt="'+p.t+'"><span>Agrandir l’image</span></button>'
  :'<div class="thumb">'+th+'</div>';
 var projectLink=p.url
  ?'<a class="btn g project-link" href="'+p.url+'" target="_blank" rel="noopener noreferrer">Visiter le site ↗</a>'
  :'';
 return '<article class="glass card" data-c="'+p.c+'">'+thumb+'<div class="in"><small>'+p.k+'</small><h3>'+p.t+'</h3><p>'+p.d+'</p><div class="tools">'+p.o.map(function(o){return '<span>'+o+'</span>'}).join("")+'</div>'+projectLink+'</div></article>'}).join("");
var imageViewer=document.getElementById("image-viewer");
var imageViewerImg=document.getElementById("image-viewer-img");
document.querySelectorAll(".image-thumb").forEach(function(button){
 button.addEventListener("click",function(){
  imageViewerImg.src=button.dataset.image;
  imageViewerImg.alt=button.dataset.title;
  imageViewer.showModal();
 });
});
document.getElementById("image-viewer-close").addEventListener("click",function(){
 imageViewer.close();
});
document.addEventListener("keydown",function(event){
 if(event.key==="Escape"&&imageViewer.open) imageViewer.close();
});
imageViewer.addEventListener("click",function(event){
 if(event.target===imageViewer) imageViewer.close();
});
document.querySelectorAll(".filters button").forEach(function(b){b.onclick=function(){
 document.querySelectorAll(".filters button").forEach(function(x){x.classList.remove("on")});b.classList.add("on");
 var f=b.dataset.f;document.querySelectorAll(".card").forEach(function(c){c.classList.toggle("hide",f!=="all"&&c.dataset.c!==f)})}});
var info=document.getElementById("info");
var mapStatus=document.getElementById("map-status");
var leafletMapElement=document.getElementById("atlas-map");

function setMapStatus(message){mapStatus.textContent=message}
function setCityInfo(city){
 info.textContent="";
 var title=document.createElement("h3");
 title.textContent=city.name;
 var description=document.createElement("p");
 description.textContent=city.description||"Ville ajoutée à l’Atlas de la Côte d’Ivoire.";
 info.appendChild(title);
 info.appendChild(description);
}

if(typeof L==="undefined"){
 setMapStatus("La carte n’a pas pu être chargée. Vérifiez votre connexion Internet puis rechargez la page.");
}else{
 var osm=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
  maxZoom:19,
  attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
 });
 var googleSatellite=L.tileLayer("https://mt{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",{
  maxZoom:20,
  subdomains:"0123",
  attribution:"© Google"
 });
 var openTopo=L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{
  maxZoom:17,
  attribution:"© OpenTopoMap, © OSM"
 });
 var map=L.map("atlas-map",{
  layers:[osm],
  scrollWheelZoom:true,
  //maxBounds:[ [3.8,-9], [11,-2] ],
  maxBoundsViscosity:0.8
 });
 var fullscreenButton=document.getElementById("map-fullscreen");
 function updateFullscreenButton(){
   var fullscreen=Boolean(document.fullscreenElement);
   fullscreenButton.textContent=fullscreen?"⛶":"⛶";
   fullscreenButton.setAttribute("aria-label",fullscreen?"Quitter le plein écran":"Afficher la carte en plein écran");
   fullscreenButton.title=fullscreen?"Quitter le plein écran":"Plein écran";
   map.invalidateSize();
 }
 fullscreenButton.addEventListener("click",function(){
  if(document.fullscreenElement){
   document.exitFullscreen();
  }else{
   leafletMapElement.requestFullscreen();
  }
 });
 document.addEventListener("fullscreenchange",updateFullscreenButton);
 var civLayer=L.layerGroup().addTo(map);
 var citiesLayer=L.layerGroup().addTo(map);
 L.control.layers({
  "OpenStreetMap":osm,
  "Google Satellite":googleSatellite,
  "OpenTopoMap":openTopo
 },{
  "CIV":civLayer,
  "Villes":citiesLayer
 },{
  collapsed:true
 }).addTo(map);
 fetch("js/CIV.geojson")
  .then(function(response){
   if(!response.ok) throw new Error("Impossible de charger js/CIV.geojson.");
   return response.json();
  })
  .then(function(countryData){
   var country=L.geoJSON(countryData,{
    style:{
     color:"#41acbd",
     weight:3,
     opacity:0.9,
     fillColor:"#32b7e7",
     fillOpacity:0.09,
     interactive:false
    }
   }).addTo(civLayer);
   map.fitBounds(country.getBounds(),{padding:[22,22],maxZoom:7});

   var geometry=countryData.features[0].geometry;
   var polygons=geometry.type==="MultiPolygon"?geometry.coordinates:[geometry.coordinates];
   var largest=polygons.reduce(function(best,polygon){
    var ring=polygon[0];
    return ring.length>best.length?ring:best;
   },[]);
   CI_BOUNDARY=largest.map(function(point){return[point[1],point[0]]});
  })
  .catch(function(error){
   setMapStatus("Contour de la Côte d’Ivoire indisponible : "+error.message);
  });

 CITIES.forEach(function(city){
  var marker=L.circleMarker([city.lat,city.lng],{
   radius:7,
   color:"#fff",
   weight:2,
   fillColor:"#f5a524",
   fillOpacity:0.8,
  }).addTo(citiesLayer);
  marker.bindTooltip(city.name);
  marker.on("click",function(){setCityInfo(city)});
 });

 if(CITIES.length){
  setCityInfo(CITIES[0]);
 }else{
  var emptyTitle=document.createElement("h3");
  emptyTitle.textContent="Votre atlas, vos villes";
  var emptyDescription=document.createElement("p");
  emptyDescription.textContent="Aucune ville n’est affichée pour le moment. Ajoutez vos villes dans le tableau CITIES de js/data.js (nom, lat, lng, description).";
  info.appendChild(emptyTitle);
  info.appendChild(emptyDescription);
 }
 setMapStatus("Plein écran pour explorer la carte");
}

var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("v");io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll(".rv").forEach(function(e){io.observe(e)});
