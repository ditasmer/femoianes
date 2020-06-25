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
  fetch("http://mernatus.com/shared/media-list-moianes.json", {
    // https://api.github.com/orgs/nodejs
    mode: 'no-cors'
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Prints result from `response.json()` in getRequest
    })
    .catch((error) => console.error(error));
}