var pos = document.documentElement;
pos.addEventListener("mousemove", (e) => {
  pos.style.setProperty("--x", e.clientX + "px");
  pos.style.setProperty("--y", e.clientY + "px");
});

function playVideo(nom_video, nom_div) {
  console.log(playVideo);
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



function getMediaList() {
  // fetch("http://mernatus.com/shared/media-list-moianes.json", {
  //   mode: "no-cors",
  //   headers: {
  //     "Access-Control-Allow-Origin" : "*", 
  //     "Access-Control-Allow-Credentials": true,
  //   },
  // })
    fetch("media-list-moianes.json")
    .then((response) => response.json())
    .then((data) => {
      tableMedias(data);
    })
    .catch((error) => console.error(error));
}

function tableMedias(data) {
  var contenido = document.querySelector('#content-media');
  console.log(data);
  console.log('hola');
  contenido.innerHTML = '';
  for(let val of data){
    contenido.innerHTML += `
    <tr>
      <th scope="row">${ val.id }</th>
      <td>${ val.title }</td>
      <td>${ val.autor }</td>
    </tr>
    
    `;
  }
}

class SearchMedias {
  constructor() {
    this.medias = [
      { nombre: "fr", edad: 23 },
      { nombre: "frasdf", edad: 22 },
      { nombre: "frou", edad: 2 },
    ];
    console.log(this.medias);
    this.mediasBK = this.medias;
    this.onInit();
    console.log(this.medias);
  }

  onInit() {
    let body_list = document.getElementById("body_list");
    while (body_list.rows.length > 0) {
      body_list.deleteRow(0);
    }
    this.medias.forEach((media) => {
      let fila = body_list.insertRow(body_list.rows.length);
      fila.insertCell(0).innerHTML = media.nombre;
      fila.insertCell(1).innerHTML = media.edad;
    });
  }
  search(id) {
    let key_word = document.getElementById(id).value;
    this.medias = this.mediasBK;
    this.medias = this.medias.filter((media) => {
      //return -1 when match
      return media.nombre.toLowerCase().indexOf(key_word) > -1;
    });
    this.onInit();
  }
}
let searcher = new SearchMedias();
let form = document.getElementById("searchForm");
form.addEventListener("submit", () => {
  searcher.search("new_word");
});