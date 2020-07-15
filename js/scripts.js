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
    this.onInit();
    console.log(this.medias);
  }

  onInit() {
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
      let content_card2 = document.createElement('a');
      let content_card_img = document.createElement('img');
      let url = 'http://mernatus.com/shared/';
      //video medias
      if(media.type == "video"){
        if(media.place && media.comment){
          content_card2.innerHTML =`<a href='#' onclick="playVideo('`+media.filename+`', 'div-`+media.filename+`')">` + media.title + ` </a> <br>` + media.description + `<br>`+ media.place + `<br>`+ media.dates + `<br>`+ media.comment + ``;
        }else{
          content_card2.innerHTML =`<a href='#' onclick="playVideo('`+media.filename+`', 'div-`+media.filename+`')">` + media.title + ` </a> <br>` + media.description + `<br>`+ media.dates + ``;
        }
        card2[i].appendChild(content_card2);
      }else{
        //image medias
        if(media.type == "image") {
          console.log("es image");
          content_card_img.setAttribute('src', url+media.filename+'.jpeg');
          content_card_img.setAttribute("width", "100");
          content_card_img.setAttribute("height", "100");
          content_card_img.setAttribute("alt", "The Pulpit Rock");
          content_card_img.setAttribute("style", "filter: invert(1)");
          card2[i].appendChild(content_card_img);
        }
      }
      
      i++;
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