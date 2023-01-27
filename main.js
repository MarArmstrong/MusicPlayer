// Selects all the element in the HTML page and assigns them to a variable

let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [{
    name: "Conqueror",
    artist: "Pentakill",
    image: "https://images.genius.com/2d719edd297952a4c00cbc90f2a6dd51.1000x1000x1.png",
    path: "Conqueror.mp3"
},
{
    name: "Drum Go Dum",
    artist: "KDA",
    image: "https://i1.sndcdn.com/artworks-sQoymGzNJ2OEF7eH-7Oxz1Q-t500x500.jpg",
    path: "Drum_go_dum.mp3"
},
{
    name: "Flowers",
    artist: "Miley Cyrus",
    image: "https://images.genius.com/d6183c82a7d7a66c516aebbe69bdf0be.300x300x1.png",
    path: "Flowers.mp3"
},
{
    name: "Glimpse of Us",
    artist: "Joji",
    image: "https://upload.wikimedia.org/wikipedia/en/4/4a/Joji_-_Glimpse_of_Us.png",
    path: "Glimpse_of_us.mp3"
},
{
    name: "Huggin' & Kissin'",
    artist: "Big Black Delta",
    image: "https://i.scdn.co/image/ab67616d0000b273ead6e66371d98a87c69f8cb9",
    path: "Huggin_&_Kissin.mp3"
},
{
    name: "If U Seek Amy",
    artist: "Britney Spears",
    image: "https://i.scdn.co/image/ab67616d0000b27354c6edd554935d73e159e199",
    path: "If_U_Seek_Amy.mp3"
},
{
    name: "Into You",
    artist: "Ariana Grande",
    image: "https://upload.wikimedia.org/wikipedia/en/7/74/Into_You_Ariana_Grande_cover.png",
    path: "Into_you.mp3"
},
{
    name: "J-M-B",
    artist: "Zeal & Ardol",
    image: "https://i.ytimg.com/an/QADPTnfn6i4/551291490372492166_mq.jpg?v=620ce154",
    path: "J-M-B.mp3"
},
{ 
    name: "KICK BACK",
    artist: "Kenshi Yonezu",
    image: "https://i0.wp.com/anitrendz.net/news/wp-content/uploads/2022/10/kenshi-yonezu-kick-back-song-cover-e1665514829791.jpeg",
    path: "KICK_BACK.mp3"
},
{
    name: "Let it Happen",
    artist: "Tame Impala",
    image: "https://i.ytimg.com/vi/-ed6UeDp1ek/maxresdefault.jpg",
    path: "Let_it_Happen.mp3"
},
{
    name: "Lightbringer",
    artist: "Pentakill",
    image: "http://1.bp.blogspot.com/-QDIla2ajLCE/U4aGixa3PnI/AAAAAAAABL0/p0H4RrePs3w/s1600/smite+and+ignite.jpg",
    path: "Lightbringer.mp3"
},
{
    name: "Shakira: Bzrp Music Sessions, Vol.53",
    artist: "Shakira / Bzrp",
    image: "https://lh3.googleusercontent.com/LvHSTzb8gw7hlPMsDQAPsAXfTUqxIWyAVYS8wIwNly6D8q2vfE7s1LymiywyjmQr2Ns9Yt9NJ7k7nLU=w544-h544-l90-rj",
    path: "Music_Sessions_Vol_53.mp3"
},
{
    name: "Veridis Quo",
    artist: "Daft Punk",
    image: "https://i1.sndcdn.com/artworks-000120147395-b49x4t-t500x500.jpg",
    path: "Veridis_Quo.mp3"
},
{
    name: "糖果色恋爱学",
    artist: " - ANK feat.kumako",
    image: "https://i1.sndcdn.com/artworks-000588071261-6ox7w2-t500x500.jpg",
    path: "糖果色恋爱学_ANK_feat_kumako.mp3"
},
{
    name: "絶対希望バースデー",
    artist: "Megumi Ogata",
    image: "https://m.media-amazon.com/images/I/51EQB2H9JfL._AC_SX355_.jpg",
    path: "絶対希望バースデー.mp3"
},
{
    name: "Circles",
    artist: "Post Malone",
    image: "https://i1.sndcdn.com/artworks-9eDXZyDaKdxirdWF-xz4esw-t500x500.jpg",
    path: "Circles.mp3"
},
{
  name: "残桜zanka",
  artist: "Megumi Ogata",
  image: "https://m.media-amazon.com/images/I/51EQB2H9JfL._AC_SX355_.jpg",
  path: "残桜zanka.mp3"
},
{
  name: "LUVORATORRRRRY![狛枝 凪斗] ダンガンロンパ",
  artist: "Megumi Ogata",
  image: "https://m.media-amazon.com/images/I/51EQB2H9JfL._AC_SX355_.jpg",
  path: "LUVORATORRRRRY![狛枝 凪斗] ダンガンロンパ.mp3"
},
{
  name: "Silhouette",
  artist: "KANA-BOON",
  image: "https://splice.com/blog/wp-content/uploads/2021/10/Naruto_OP_Silhouette_BlogPost-800x500@2x.jpg",
  path: "Silhouette.mp3"
},
{
  name: "Lazy Bones",
  artist: "Green Day",
  image: "https://i.redd.it/z299iyordl381.jpg",
  path: "Lazy_Bones.mp3"
}
];

function random_bg_color() {

    // Get a number between 64 to 256 (for  lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
  
    // Make a color with the given values
    let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
  
    // Set the background  color
    document.body.style.background = bgColor;
  }
  
  function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    curr_track.src = track_list[track_index].path;
    curr_track.load();
  
    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = "PLAYING: " + (track_index + 1) + " OF " + track_list.length;
  
    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);
    random_bg_color();
  }
  
  function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }
  
  // Load the first track in the tracklist
  loadTrack(track_index);
  
  function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
  }
  
  function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }
  
  function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
  }
  
  function nextTrack() {
    if (track_index < track_list.length - 1)
      track_index += 1;
    else track_index = 0;
    loadTrack(track_index);
    playTrack();
  }
  
  function prevTrack() {
    if (track_index > 0)
      track_index -= 1;
    else track_index = track_list.length;
    loadTrack(track_index);
    playTrack();
  }
  
  function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
  }
  
  function setVolume() {
    curr_track.volume = volume_slider.value / 100;
  }
  
  function seekUpdate() {
    let seekPosition = 0;
  
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
  
      seek_slider.value = seekPosition;
  
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
  
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
  
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }