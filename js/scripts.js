/**cursor circle performance**/
var pos = document.documentElement;
pos.addEventListener("mousemove", (e) => {
  pos.style.setProperty("--x", e.clientX + "px");
  pos.style.setProperty("--y", e.clientY + "px");
});

/**event dblclick disapear first div */
pos.addEventListener('dblclick', show);
function show(e) {
  console.log("show");
  var circle_element = document.querySelector('.banner');
  circle_element.style.clipPath =  "circle(1000px at center)"
}

/**play video and player window open/close**/
function playVideo(nom_video, nom_div) {
  console.log("playVideo");
  var x = document.getElementById(nom_div);
  var v = document.getElementById(nom_video);
  if (x.style.display === "none") {
    x.style.display = "block";
    v.autoplay = true;
    v.load();
  } else {
    x.style.display = "none";
    v.pause();
  }
}

/**class filter searcher**/
class SearchMedias {
  constructor() {
    this.medias = [
      { id: 1, title: "...", filename: "---", author: "+++" },
      { id: 2, title: "...", filename: "---", author: "+++" },
      { id: 3, title: "...", filename: "---", author: "+++" },

    ];
    console.log("SearchMedias constructor");
    console.log(this.medias);
    this.mediasBK = this.medias;
    this.onInit();
    console.log(this.medias);
  }

  onInit() {
    console.log("onInit");
    let body_list = document.getElementById("body_list");
    let body_cards = document.getElementsByClassName("body_card");
    let first_card = document.getElementsByTagName("p")[0];
 
    //create custom innerHTML
    let content_card = document.createElement('a');
    content_card.innerHTML =`<a href='#' onclick='playVideo('siesquehihacasesdalgu', 'div-siesquehihacasesdalgu')'>#siesquehihacasesdalgu </a> <br>retrats al voltant de la taula<br>7 al 21 de maig 2020`;
    first_card.appendChild(content_card);
 
    //clean body cards
    for (let card of body_cards){
      console.log(card);
      //card.removeChild(card.childNodes[0]);
      while (card.childNodes.length > 0){
        //document.getElementsByClassName("body_card")[0].removeChild(document.getElementsByClassName("body_card")[0].childNodes[0])
        //body_cards[0].removeChild(body_cards[0].childNodes[0]);
        card.removeChild(card.childNodes[0]);
      }
    }
    //clean body list
    while (body_list.rows.length > 0) {
      body_list.deleteRow(0);
    }

    //add body cards
    let card2 = document.getElementsByTagName("p");
    let i = 0;
    this.medias.forEach((media) => {
      //let first_card2 = document.getElementsByTagName("p")[0];
      let content_card2 = document.createElement('a');
      if(media.place && media.comment){
        content_card2.innerHTML =`<a href='#' onclick="playVideo('`+media.filename+`', 'div-`+media.filename+`')">` + media.title + ` </a> <br>` + media.description + `<br>`+ media.place + `<br>`+ media.dates + `<br>`+ media.comment + ``;
      }else{
        content_card2.innerHTML =`<a href='#' onclick="playVideo('`+media.filename+`', 'div-`+media.filename+`')">` + media.title + ` </a> <br>` + media.description + `<br>`+ media.dates + ``;
      }
      card2[i].appendChild(content_card2);
      i++;
    });
    //add body list
    this.medias.forEach((media) => {
      let fila = body_list.insertRow(body_list.rows.length);
      fila.insertCell(0).innerHTML = media.id;
      fila.insertCell(1).innerHTML = media.title;
      fila.insertCell(2).innerHTML = media.author;
    });
  }

  search(id) {
    console.log("search");
    let key_word = document.getElementById(id).value;
    this.medias = this.mediasBK;
    let res = false;
    this.medias = this.medias.filter((media) => {
      //return -1 when match
      return media.title.toLowerCase().indexOf(key_word.toLowerCase()) > -1;
    });   
    this.onInit();
  }
 
  refresh(dataJson){
    this.medias = dataJson;
    this.mediasBK = this.medias;
    this.onInit();
  }
}
let searcher = new SearchMedias();
let form = document.getElementById("searchForm");
form.addEventListener("submit", () => {
  searcher.search("new_word");
});

/**init local json data onload**/
const promiseOfSomeJsonData = fetch("media-list-moianes.json")
  .then((response) => response.json())
  .then((data) => {
    console.log("in async");
    console.log(data);
    return data;
  })
  .catch((error) => console.error(error));
  
window.onload = async () => {
  let dataJson = await promiseOfSomeJsonData;
  console.log("onload");
  console.log(dataJson);

  //refresh searcher medias and mediasBK
  searcher.refresh(dataJson);
};