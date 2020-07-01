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
  //     "Access-Control-Allow-Credentials": 'http://127.0.0.1:5500',
  //   },
  // })
  // fetch("http://mernatus.com/shared/media-list-moianes.json")
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
    //console.log(val.title)
    // contenido.innerHTML += `
    // <tr>
    //   <th scope="row">1</th>
    //   <td>Mark</td>
    //   <td>Otto</td>
    //   <td>Mdo</td>
    // </tr>
    
    // `;
    contenido.innerHTML += `
    <tr>
      <th scope="row">${ val.id }</th>
      <td>${ val.title }</td>
      <td>${ val.autor }</td>
    </tr>
    
    `;
  }
}