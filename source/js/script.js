const videoPlayer = document.querySelector('.studio-design__wrap');
const poster = videoPlayer.querySelector('.studio-design__video-poster');
const video = videoPlayer.querySelector('.studio-design__video');
const playButton = videoPlayer.querySelector('.studio-design__button-play');

playButton.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playButton.classList.add('visually-hidden');
    poster.classList.add('visually-hidden');
  }
});
