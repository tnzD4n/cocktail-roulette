"use strict";

// Dataset cocktail (50 drink classici + popolari)
const COCKTAILS = [
  { name: "Negroni", ingredients: ["3 cl Gin","3 cl Campari","3 cl Vermouth Rosso"], notes:"Old fashioned, scorza arancia" },
  { name: "Margarita", ingredients: ["5 cl Tequila","2 cl Triple Sec","2 cl Lime"], notes:"Coppetta con sale" },
  { name: "Old Fashioned", ingredients: ["6 cl Bourbon","Zucchero","2 dash Angostura"], notes:"Build in glass" },
  { name: "Mojito", ingredients: ["Rum bianco","Lime","Menta","Zucchero","Soda"], notes:"Highball" },
  { name: "Daiquiri", ingredients: ["Rum bianco","Lime","Zucchero"], notes:"Coppetta" },
  { name: "Martini Dry", ingredients: ["Gin","Vermouth dry"], notes:"Oliva o lemon twist" },
  { name: "Whiskey Sour", ingredients: ["Whiskey","Limone","Zucchero"], notes:"Con albume opz." },
  { name: "Caipirinha", ingredients: ["Cachaça","Lime","Zucchero"], notes:"Pestato" },
  { name: "Piña Colada", ingredients: ["Rum bianco","Latte di cocco","Ananas"], notes:"Blended" },
  { name: "Espresso Martini", ingredients: ["Vodka","Espresso","Liquore al caffè"], notes:"Shakerato" },
  { name: "Americano", ingredients: ["Campari","Vermouth rosso","Soda"], notes:"Build in glass" },
  { name: "Cosmopolitan", ingredients: ["Vodka","Triple Sec","Lime","Cranberry"], notes:"Shakerato" },
  { name: "Mai Tai", ingredients: ["Rum chiaro","Rum scuro","Triple Sec","Orzata","Lime"], notes:"Tiki style" },
  { name: "Manhattan", ingredients: ["Rye whiskey","Vermouth rosso","Angostura"], notes:"Mescolato" },
  { name: "Gin Tonic", ingredients: ["Gin","Acqua tonica","Ghiaccio"], notes:"Highball" },
  { name: "Paloma", ingredients: ["Tequila","Pompelmo","Lime","Soda"], notes:"Highball" },
  { name: "Bloody Mary", ingredients: ["Vodka","Succo di pomodoro","Spezie","Tabasco","Sedano"], notes:"Brunch classico" },
  { name: "Long Island Iced Tea", ingredients: ["Vodka","Gin","Rum","Tequila","Triple Sec","Cola"], notes:"Potente" },
  { name: "Tom Collins", ingredients: ["Gin","Limone","Zucchero","Soda"], notes:"Highball" },
  { name: "French 75", ingredients: ["Gin","Limone","Zucchero","Champagne"], notes:"Flute" },
  { name: "Sidecar", ingredients: ["Cognac","Triple Sec","Limone"], notes:"Coppetta" },
  { name: "Sazerac", ingredients: ["Rye whiskey","Assenzio (rinse)","Zucchero","Bitters"], notes:"New Orleans" },
  { name: "Gin Fizz", ingredients: ["Gin","Limone","Zucchero","Soda"], notes:"Frizzante" },
  { name: "Moscow Mule", ingredients: ["Vodka","Lime","Ginger beer"], notes:"Mug rame" },
  { name: "Cuba Libre", ingredients: ["Rum","Cola","Lime"], notes:"Highball" },
  { name: "Caipiroska", ingredients: ["Vodka","Lime","Zucchero"], notes:"Versione vodka della Caipirinha" },
  { name: "Bellini", ingredients: ["Pesca","Prosecco"], notes:"Inventato all’Harry’s Bar" },
  { name: "Kir Royale", ingredients: ["Crème de cassis","Champagne"], notes:"Flute" },
  { name: "Irish Coffee", ingredients: ["Whiskey irlandese","Caffè","Zucchero","Panna"], notes:"Caldo" },
  { name: "Mint Julep", ingredients: ["Bourbon","Menta","Zucchero","Ghiaccio tritato"], notes:"Kentucky Derby" },
  { name: "Aperol Spritz", ingredients: ["Aperol","Prosecco","Soda"], notes:"Calice" },
  { name: "Tequila Sunrise", ingredients: ["Tequila","Succo d’arancia","Grenadine"], notes:"Layered" },
  { name: "Rum Punch", ingredients: ["Rum","Succhi tropicali","Grenadine"], notes:"Party style" },
  { name: "Dark 'n' Stormy", ingredients: ["Rum scuro","Ginger beer","Lime"], notes:"Bermuda" },
  { name: "Hurricane", ingredients: ["Rum scuro","Rum chiaro","Passion fruit","Succo lime","Sciroppo"], notes:"Tiki glass" },
  { name: "Zombie", ingredients: ["Rum vari","Apricot brandy","Succhi frutta","Bitters"], notes:"Tiki potentissimo" },
  { name: "Blue Lagoon", ingredients: ["Vodka","Blue Curaçao","Limonata"], notes:"Colorato" },
  { name: "Singapore Sling", ingredients: ["Gin","Cherry brandy","Benedictine","Lime","Soda"], notes:"Highball" },
  { name: "Planter’s Punch", ingredients: ["Rum scuro","Succo lime","Sciroppo zucchero","Bitters"], notes:"Giamaica" },
  { name: "Boulevardier", ingredients: ["Bourbon","Campari","Vermouth rosso"], notes:"Negroni con bourbon" },
  { name: "Rob Roy", ingredients: ["Scotch whisky","Vermouth rosso","Bitters"], notes:"Scozzese" },
  { name: "White Lady", ingredients: ["Gin","Triple Sec","Succo limone"], notes:"Coppetta" },
  { name: "Clover Club", ingredients: ["Gin","Succo limone","Sciroppo lampone","Albume"], notes:"Pre-Proibizionismo" },
  { name: "Bramble", ingredients: ["Gin","Succo limone","Zucchero","Liquore more"], notes:"On the rocks" },
  { name: "Aviation", ingredients: ["Gin","Maraschino","Succo limone","Crème de violette"], notes:"Classico raro" },
  { name: "Vesper Martini", ingredients: ["Gin","Vodka","Lillet Blanc"], notes:"James Bond" },
  { name: "Pornstar Martini", ingredients: ["Vodka alla vaniglia","Passion fruit","Prosecco"], notes:"Moderno" },
  { name: "B52", ingredients: ["Kahlúa","Baileys","Grand Marnier"], notes:"Shot a strati" },
  { name: "Grasshopper", ingredients: ["Crème de menthe","Crème de cacao","Panna"], notes:"Dolce" },
  { name: "Harvey Wallbanger", ingredients: ["Vodka","Succo arancia","Galliano"], notes:"Anni 70" },
  { name: "Pisco Sour", ingredients: ["Pisco","Limone","Zucchero","Albume","Bitters"], notes:"Sud America" }
];

// --- Gestione random senza ripetizione ---
let bag = [];
function refillBag(){
  bag = Array.from(COCKTAILS.keys());
  for(let i = bag.length-1; i>0; i--){
    const r = crypto.getRandomValues(new Uint32Array(1))[0] / 2**32;
    const j = Math.floor(r*(i+1));
    [bag[i],bag[j]]=[bag[j],bag[i]];
  }
  updateLeft();
}

function draw(){
  if(bag.length===0) refillBag();
  const idx = bag.pop();
  const drink = COCKTAILS[idx];
  renderDrink(drink);
  updateLeft();
}

function renderDrink(d){
  document.getElementById("drinkName").textContent = d.name;
  const ul = document.getElementById("ingredients");
  ul.replaceChildren();
  d.ingredients.forEach(i=>{
    const li = document.createElement("li");
    li.textContent=i;
    ul.appendChild(li);
  });
  document.getElementById("notes").textContent = d.notes || "";
}

function updateLeft(){
  document.getElementById("leftTag").textContent=`Rimasti: ${bag.length}/${COCKTAILS.length}`;
}

async function copyCurrent(){
  const name = document.getElementById("drinkName").textContent;
  if(!name || name==="—") return;
  const ings = Array.from(document.querySelectorAll("#ingredients li")).map(li=>li.textContent);
  const payload = `${name}\n${ings.map(i=>"• "+i).join("\n")}`;
  try{
    await navigator.clipboard.writeText(payload);
    alert("Ingredienti copiati!");
  }catch{
    alert("Impossibile copiare");
  }
}

// Event listeners
document.getElementById("drawBtn").addEventListener("click", draw);
document.getElementById("copyBtn").addEventListener("click", copyCurrent);

// Init
refillBag();
renderDrink({name:"—",ingredients:[],notes:"Clicca «Estrai» per iniziare"});
