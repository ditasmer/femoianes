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

/**maximize image**/
function maxImage(nom_video, nom_div) {
  console.log("maxImage");
  var x = document.getElementById(nom_div);
  var v = document.getElementById(nom_video);
  var x = document.createElement("IMG");
  x.setAttribute("src", "http://mernatus.com/shared/siesquehihacasesdalgu-01.jpeg");
  x.setAttribute("width", "304");
  x.setAttribute("height", "228");
  x.setAttribute("alt", "The Pulpit Rock");
  document.body.appendChild(x);
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
    //this.onInit();
    this.onInitPrintResults();
    console.log(this.medias);
  }

  onInitPrintResults() {
    console.log("onInit");
    let body_cards = document.getElementsByClassName("body_card");
 
    //clean body cards
    for (let card of body_cards){
      console.log(card);
      while (card.childNodes.length > 0){
        card.removeChild(card.childNodes[0]);
      }
    }

    //add body cards
    let card2 = document.getElementsByClassName("body_card");
    console.log(card2.length);
    let i = 0;
    this.medias.forEach((media) => {
      let card_video = document.createElement('a');
      let card_img = document.createElement('img');
      let card_link = document.createElement('a');
      let url = 'http://mernatus.com/shared/';
      //video medias
      if(media.type == "video"){
        if(media.place && media.comment){
          //card_video.innerHTML =`<a href='#' onclick="playVideo('`+media.filename+`', 'div-`+media.filename+`')">` + media.title + ` </a> <br>` + media.description + `<br>`+ media.place + `<br>`+ media.dates + `<br>`+ media.comment + ``;
          card_video.setAttribute('href', '#');
          card_video.setAttribute('onclick', 'playVideo("'+media.filename+'","div-'+media.filename+'")');
          card_video.setAttribute('style', 'display: inline-grid; text-align: -webkit-center');
          let text = document.createTextNode(media.title);
          card_video.appendChild(text);
          card_video.innerHTML += `<br>`;
          text = document.createTextNode(media.description);
          card_video.appendChild(text);
          card_video.innerHTML += `<br>`;
          text = document.createTextNode(media.place);
          card_video.appendChild(text);
          card_video.innerHTML += `<br>`;
          text = document.createTextNode(media.dates);
          card_video.appendChild(text);
          card_video.innerHTML += `<br>`;
          text = document.createTextNode(media.comment);
          card_video.appendChild(text);
          
        }else{
          //card_video.innerHTML =`<a href='#' onclick="playVideo('`+media.filename+`', 'div-`+media.filename+`')">` + media.title + ` </a> <br>` + media.description + `<br>`+ media.dates + ``;
          card_video.setAttribute('href', '#');
          card_video.setAttribute('onclick', 'playVideo("'+media.filename+'","div-'+media.filename+'")');
          card_video.setAttribute('style', 'display: inline-grid; text-align: -webkit-center');
          let text = document.createTextNode(media.title);
          card_video.appendChild(text);
          card_video.innerHTML += `<br>`;
          text = document.createTextNode(media.description);
          card_video.appendChild(text);
          card_video.innerHTML += `<br>`;
          text = document.createTextNode(media.dates);
          card_video.appendChild(text);
          card_video.innerHTML += `<br>`;
        }
        card2[i].appendChild(card_video);
      }else{
        //image medias
        if(media.type == "image") {
          console.log("es image");
          card_link.setAttribute('href', url+media.filename+'.jpeg');
          card_link.setAttribute('target', '_blank');
          card_link.setAttribute('style', 'display: inline-grid; text-align: -webkit-center');
          let text = document.createTextNode('#'+media.filename);
          card_link.appendChild(text);
          card_img.setAttribute('src', url+media.filename+'.jpeg');
          card_img.setAttribute("width", "100");
          //card_img.setAttribute("height", "100");
          card_img.setAttribute("alt", "The Pulpit Rock");
          card_img.setAttribute("style", "filter: invert(1)");
          card_link.appendChild(card_img);
          card2[i].appendChild(card_link);
        }
      }
      
      i++;
    });

  }

  onInitCleanScreen() {
    console.log("onInit");
    let body_cards = document.getElementsByClassName("body_card");
 
    //clean body cards
    for (let card of body_cards){
      console.log(card);
      while (card.childNodes.length > 0){
        card.removeChild(card.childNodes[0]);
      }
    }

    //add Inicial video body cards
    let card2 = document.getElementsByClassName("body_card");
    console.log(card2.length);
    let i = 0;
    this.medias.forEach((media) => {
      let card_video = document.createElement('a');
      let url = 'http://mernatus.com/shared/';
      //video medias
      if(media.selection == "init"){
        if(media.place && media.comment){
          //card_video.innerHTML =`<a href='#' onclick="playVideo('`+media.filename+`', 'div-`+media.filename+`')">` + media.title + ` </a> <br>` + media.description + `<br>`+ media.place + `<br>`+ media.dates + `<br>`+ media.comment + ``;
          card_video.setAttribute('href', '#');
          card_video.setAttribute('onclick', 'playVideo("'+media.filename+'","div-'+media.filename+'")');
          card_video.setAttribute('style', 'display: inline-grid; text-align: -webkit-center');
          let text = document.createTextNode(media.title);
          card_video.appendChild(text);
          card_video.innerHTML += `<br>`;
          text = document.createTextNode(media.description);
          card_video.appendChild(text);
          card_video.innerHTML += `<br>`;
          text = document.createTextNode(media.place);
          card_video.appendChild(text);
          card_video.innerHTML += `<br>`;
          text = document.createTextNode(media.dates);
          card_video.appendChild(text);
          card_video.innerHTML += `<br>`;
          text = document.createTextNode(media.comment);
          card_video.appendChild(text);
          
        }else{
          //card_video.innerHTML =`<a href='#' onclick="playVideo('`+media.filename+`', 'div-`+media.filename+`')">` + media.title + ` </a> <br>` + media.description + `<br>`+ media.dates + ``;
          card_video.setAttribute('href', '#');
          card_video.setAttribute('onclick', 'playVideo("'+media.filename+'","div-'+media.filename+'")');
          card_video.setAttribute('style', 'display: inline-grid; text-align: -webkit-center');
          let text = document.createTextNode(media.title);
          card_video.appendChild(text);
          card_video.innerHTML += `<br>`;
          text = document.createTextNode(media.description);
          card_video.appendChild(text);
          card_video.innerHTML += `<br>`;
          text = document.createTextNode(media.dates);
          card_video.appendChild(text);
          card_video.innerHTML += `<br>`;
        }
        card2[i].appendChild(card_video);
        i++;
      }
      
      
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
    //this.onInit();
    if((this.medias.length === 0) || (key_word==="")){
      this.onInitCleanScreen();
    }else{
      this.onInitPrintResults();
    }
  }
 
  refresh(dataJson){
    this.medias = dataJson;
    this.mediasBK = this.medias;
    //this.onInit();
    this.onInitCleanScreen();
  }
}
let searcher = new SearchMedias();
let form = document.getElementById("searchForm");
form.addEventListener("submit", () => {
  searcher.searchsearch("new_word");
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
  ////show 3 videos onload
  //searcher.searchsearch("new_word");
};