const clientId = "43ce054477e8412488f4f770e5b677aa";
const clientSecret = "48b7b435c1c6429bb05e0a707bf18827";
console.log("searchartist() triggered")
 
async function searchartist() {
  const artistName = document.getElementById("artistinput").value;
  
  const result = await fetch(`http://localhost:3000/search?artist=${artistName}`);

  const data = await result.json();
  const artist = data.artists.items[0];

  if (!artist) {
    document.getElementById("results").innerText = "Artist not found.";
    return;
  }

  document.getElementById("results").innerHTML = `
    <h2>${artist.name}</h2>
    <img src="${artist.images[0]?.url}" width="200">
    <p>Followers: ${artist.followers.total}</p>
    <p>Genres: ${artist.genres.join(", ")}</p>
  `;
  



const artistId = artist.id;


const albumsRes = await fetch(`http://localhost:3000/albums?artistId=${artistId}`);
const albumsData = await albumsRes.json();


let albumHTML = "<h3>Albums:</h3><ul id='albumlist'>";
albumsData.items.forEach(album => {
  albumHTML += `<li>${album.name}</li>`;
});
albumHTML += "</ul>";

document.getElementById("results").innerHTML += albumHTML;


const topTracksRes = await fetch(`http://localhost:3000/top-tracks?artistId=${artistId}`);
  const topTracksData = await topTracksRes.json();
  
  let trackHTML = "<h3>Top Tracks:</h3><ul id='tracklist'>";
  topTracksData.tracks.forEach(track => {
    
    trackHTML += `
      <li>
        ${track.name}
        <br>
        ${track.preview_url ? 
        `<audio controls src="${track.preview_url}"></audio>` :`<em>no preview available</em> <br>`
         } 
         <a href="${track.external_urls.spotify}" target="_blank">Listen on spotify</a> </br>
         <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(track.name +'' +artist.name)}" target="_blank">
         Search on youtube </a></li><br>
    `;
    
  });
  trackHTML += "</ul>";
  
  document.getElementById("results").innerHTML += trackHTML;

  const msg= document.getElementById("scrollmsg");
  msg.classList.add("show");

}