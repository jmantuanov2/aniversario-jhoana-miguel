const $ = id => document.getElementById(id);

const stars = $('stars');
for (let i = 0; i < 65; i++) {
  const star = document.createElement('span');
  star.className = 'star';
  star.textContent = '✦';
  star.style.left = Math.random() * 100 + '%';
  star.style.top = Math.random() * 100 + '%';
  star.style.fontSize = (6 + Math.random() * 10) + 'px';
  star.style.animationDelay = Math.random() * 3 + 's';
  stars.appendChild(star);
}

function makeHearts(count = 1) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = ['❤️', '💕', '💗', '✨'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (16 + Math.random() * 24) + 'px';
    heart.style.animationDuration = (3 + Math.random() * 3) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6500);
  }
}

const videos = Array.from(document.querySelectorAll('.gallery video'));
let currentVideoIndex = 0;

async function playNextVideo() {
  const video = videos[currentVideoIndex];
  if (!video) {
    $('videoStatus').textContent = 'Terminamos de ver nuestros videos ❤️';
    return;
  }

  $('videoStatus').textContent = `Reproduciendo video ${currentVideoIndex + 1} de ${videos.length} ❤️`;
  try {
    await video.play();
  } catch (error) {
    console.error(`No se pudo reproducir el video ${currentVideoIndex + 1}.`, error);
    $('videoStatus').textContent = 'El navegador no pudo iniciar los videos automáticamente.';
  }
}

videos.forEach(video => {
  video.addEventListener('ended', () => {
    currentVideoIndex++;
    playNextVideo();
  });
});

let opened = false;
$('openBtn').addEventListener('click', () => {
  if (opened) return;
  opened = true;
  playMusic();
  $('envelope').classList.add('open');
  $('openBtn').textContent = 'Preparando tu sorpresa...';
  makeHearts(18);
  setTimeout(() => {
    $('cover').classList.add('hidden');
    $('surprise').classList.remove('hidden');
    window.scrollTo(0, 0);
    makeHearts(24);
    playNextVideo();
  }, 1400);
});

async function playMusic() {
  const audio = $('music');
  try {
    await audio.play();
    $('musicBtn').textContent = '❚❚ Pausar nuestra canción';
    $('musicStatus').textContent = 'Reproduciendo nuestra canción ❤️';
  } catch (error) {
    console.error('No se pudo reproducir la canción.', error);
    $('musicStatus').textContent = 'No se pudo reproducir. Comprueba que assets/cancion.mp3 exista y sea un archivo de audio válido.';
  }
}

$('musicBtn').addEventListener('click', async () => {
  const audio = $('music');
  if (audio.paused) {
    await playMusic();
  } else {
    audio.pause();
    $('musicBtn').textContent = '♫ Reproducir nuestra canción';
    $('musicStatus').textContent = 'Canción pausada.';
  }
});

$('heartBtn').addEventListener('click', () => {
  $('lastMessage').classList.remove('hidden');
  $('heartBtn').textContent = '¡Te quiero, Jhoana! ❤️';
  makeHearts(45);
});
