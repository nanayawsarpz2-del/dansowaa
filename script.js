/* =====================================================================
   CONFIG — this is the only section you should need to edit.
   ===================================================================== */
const CONFIG = {
  herName: "Her Name",

  introMessage: [
    "I've been wanting to tell you something for a while.",
    "So instead of trying to say everything perfectly —",
    "I made you this."
  ],

  // Put your photos inside a /images folder next to index.html.
  photos: [
    { src: "images/her-1.jpg", caption: "the one from that day", size: "hero", rotate: -1 },
    { src: "images/her-2.jpg", caption: "you, being you", rotate: 3 },
    { src: "images/her-3.jpg", caption: "my favorite one", rotate: -4 },
    { src: "images/her-4.jpg", caption: "this made me laugh so hard", rotate: 2 }
  ],

  song: {
    title: "Her Favorite Song",
    artist: "Artist Name",
    src: "music/her-song.mp3"          // <-- put her-song.mp3 inside a /music folder
  },

  // Optional: a short video moment (a clip of the two of you, a voice memo
  // turned video, whatever). Leave src as-is and it just won't show a video
  // section at all -- only add a file here if you actually want to use one.
  video: {
    enabled: false,                    // <-- set to true once you've added a video file
    src: "video/her-video.mp4",        // <-- put her-video.mp4 inside a /video folder
    caption: "just one more thing..."
  },

  proposalQuestion: "Will you be my girlfriend?",

  noMessages: [
    "Wait, that felt like a misclick. Try again? 🥺",
    "Hmm. Let's pretend that didn't happen.",
    "Okay but hear me out first...",
    "That button's clearly broken. This one isn't though →",
    "I did make you a whole website though 😭",
    "Running away won't change the question.",
    "Bold strategy. Doesn't change my answer though.",
    "I'll just wait here. I've got time.",
    "Okay but what if you just... said yes?",
    "This is my final offer: still yes?",
    "You're really committed to this bit, huh?",
    "Okay, I respect the persistence. Still asking though."
  ],

  finalMessage: [
    "I've been ready for this since the day I met you.",
    "You don't know how long I've been hoping I'd get to ask you this.",
    "From the day I met you, there was something about you that stayed with me.",
    "And now I finally get to call you my girlfriend.",
    "I promise to make you smile, support you, annoy you just a little, and make as many good memories with you as I can.",
    "So — thank you for saying yes."
  ]
};

/* ===================================================================== */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- opening interaction ---------- */
const openSeal = document.getElementById('open-seal');
const firstStoryScreen = document.querySelector('#screen-open').nextElementSibling;
openSeal.addEventListener('click', () => {
  firstStoryScreen.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
});

/* ---------- fill in config text ---------- */
document.getElementById('track-title').textContent = CONFIG.song.title;
document.getElementById('track-artist').textContent = CONFIG.song.artist;
document.getElementById('audio').src = CONFIG.song.src;

/* ---------- optional video moment ---------- */
// This section only appears if CONFIG.video.enabled is true above.
if (CONFIG.video && CONFIG.video.enabled) {
  const videoSection = document.createElement('section');
  videoSection.className = 'screen';
  videoSection.innerHTML = `
    <span class="kicker reveal">and this one, too</span>
    <h2 class="title reveal">${CONFIG.video.caption}</h2>
    <div class="video-frame reveal">
      <video controls playsinline preload="none" src="${CONFIG.video.src}"></video>
    </div>
  `;
  // insert it right after the photos section, before the song section
  document.getElementById('screen-photos').insertAdjacentElement('afterend', videoSection);
}
document.getElementById('q1').textContent = `Okay, ${CONFIG.herName}...`;

const introEls = [document.getElementById('intro-line-1'), document.getElementById('intro-line-2'), document.getElementById('intro-line-3')];
if(CONFIG.introMessage.length === 3){
  introEls[0].innerHTML = CONFIG.introMessage[0];
  introEls[1].innerHTML = CONFIG.introMessage[1];
  introEls[2].innerHTML = `<em>${CONFIG.introMessage[2]}</em>`;
}

document.querySelector('#q3 .heartbeat').textContent = CONFIG.proposalQuestion;

/* ---------- build scrapbook ---------- */
const scrapbook = document.getElementById('scrapbook');
CONFIG.photos.forEach((p, i) => {
  const el = document.createElement('div');
  el.className = 'polaroid' + (p.size === 'hero' ? ' hero' : '');
  el.style.setProperty('--r', (p.rotate || 0) + 'deg');
  el.innerHTML = `
    <div class="frame">
      <img src="${p.src}" alt="" loading="lazy" onerror="this.style.display='none'; this.parentElement.querySelector('.ph-fallback').style.display='flex';">
      <div class="ph-fallback" style="display:none">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3z"/></svg>
        add ${p.src.split('/').pop()}
      </div>
    </div>
    <span class="cap">${p.caption || ''}</span>
  `;
  scrapbook.appendChild(el);
});

/* ---------- final message paragraphs ---------- */
const finalMsgEl = document.getElementById('final-msg');
CONFIG.finalMessage.forEach(line => {
  const p = document.createElement('p');
  p.textContent = line;
  finalMsgEl.appendChild(p);
});

/* =====================================================================
   AMBIENT FLOATING PARTICLES (subtle, paused when reduced-motion)
   ===================================================================== */
if(!reduceMotion){
  const ambient = document.getElementById('ambient');
  const glyphs = ['♡','✦','·'];
  for(let i=0;i<10;i++){
    const s = document.createElement('span');
    s.textContent = glyphs[Math.floor(Math.random()*glyphs.length)];
    s.style.left = Math.random()*100 + '%';
    s.style.setProperty('--drift', (Math.random()*60 - 30) + 'px');
    s.style.animationDuration = (14 + Math.random()*10) + 's';
    s.style.animationDelay = (Math.random()*14) + 's';
    s.style.fontSize = (10 + Math.random()*10) + 'px';
    ambient.appendChild(s);
  }
}

/* =====================================================================
   SCROLL REVEAL
   ===================================================================== */
const revealTargets = document.querySelectorAll('.reveal, .polaroid, .player, .cta');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.35 });
revealTargets.forEach((el, i) => {
  el.style.transitionDelay = (i % 6) * 60 + 'ms';
  io.observe(el);
});
// re-stagger polaroids within their own container so they don't all share global index delay oddly
document.querySelectorAll('.polaroid').forEach((el, i) => {
  el.style.transitionDelay = (i * 110) + 'ms';
});

/* =====================================================================
   MUSIC PLAYER
   ===================================================================== */
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const playerEl = document.getElementById('player');
const progress = document.getElementById('progress');
const progressFill = document.getElementById('progress-fill');
const songHint = document.getElementById('song-hint');

const ICON_PLAY = '<path d="M8 5v14l11-7z"/>';
const ICON_PAUSE = '<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>';

let audioAvailable = true;
audio.addEventListener('error', () => { audioAvailable = false; songHint.textContent = 'add her-song.mp3 to /music/'; });

playBtn.addEventListener('click', () => {
  if(!audioAvailable){ return; }
  if(audio.paused){
    audio.play().then(() => {
      playIcon.innerHTML = ICON_PAUSE;
      playerEl.classList.add('playing');
      songHint.textContent = 'our song';
    }).catch(() => {
      audioAvailable = false;
      songHint.textContent = 'add her-song.mp3 to /music/';
    });
  } else {
    audio.pause();
    playIcon.innerHTML = ICON_PLAY;
    playerEl.classList.remove('playing');
  }
});

audio.addEventListener('timeupdate', () => {
  if(audio.duration){
    const percent = audio.currentTime / audio.duration * 100;
    progressFill.style.width = percent + '%';
    progress.setAttribute('aria-valuenow', Math.round(percent));
  }
});
audio.addEventListener('ended', () => {
  playIcon.innerHTML = ICON_PLAY;
  playerEl.classList.remove('playing');
});
progress.addEventListener('click', (e) => {
  if(!audio.duration) return;
  const rect = progress.getBoundingClientRect();
  setAudioProgress((e.clientX - rect.left) / rect.width);
});
progress.addEventListener('keydown', (e) => {
  if(!audio.duration) return;
  if(e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
    e.preventDefault();
    const step = e.key === 'ArrowRight' ? 5 : -5;
    setAudioProgress(audio.currentTime / audio.duration + step / 100);
  }
});
function setAudioProgress(ratio){
  const boundedRatio = Math.max(0, Math.min(1, ratio));
  audio.currentTime = boundedRatio * audio.duration;
}

/* =====================================================================
   ACT ONE -> ACT TWO TRANSITION
   ===================================================================== */
const actOne = document.getElementById('act-one');
const actTwo = document.getElementById('act-two');
const stageQuestion = document.getElementById('stage-question');
const q1 = document.getElementById('q1'), q2 = document.getElementById('q2'), q3 = document.getElementById('q3');
const choiceRow = document.getElementById('choice-row');
let transitionStarted = false;

document.getElementById('cta-continue').addEventListener('click', () => {
  if(transitionStarted) return;
  transitionStarted = true;
  actOne.classList.add('leaving');
  setTimeout(() => {
    actOne.style.display = 'none';
    actTwo.classList.add('show');
    runQuestionSequence();
  }, reduceMotion ? 0 : 650);
});

function runQuestionSequence(){
  const delays = reduceMotion ? [0,0,0,0] : [150, 1100, 2400, 3600];
  setTimeout(() => q1.classList.add('in'), delays[0]);
  setTimeout(() => q2.classList.add('in'), delays[1]);
  setTimeout(() => q3.classList.add('in'), delays[2]);
  setTimeout(() => choiceRow.classList.add('in'), delays[3]);
}

/* =====================================================================
   NO BUTTON — playful dodge
   ===================================================================== */
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const toast = document.getElementById('toast');
let noAttempts = 0;
let toastTimer = null;

function showToast(msg){
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function dodgeNoButton(){
  const container = choiceRow.getBoundingClientRect();
  const btnRect = btnNo.getBoundingClientRect();
  const yesRect = btnYes.getBoundingClientRect();

  const w = btnRect.width, h = btnRect.height;
  const maxX = Math.max(0, container.width - w);
  const maxY = Math.max(0, container.height - h);

  let x, y, tries = 0;
  do {
    x = Math.random() * maxX;
    y = Math.random() * maxY;
    tries++;
  } while (
    tries < 12 &&
    // keep clear of the YES button (relative coords within container)
    Math.abs((x) - (yesRect.left - container.left)) < (w * 0.9) &&
    Math.abs((y) - (yesRect.top - container.top)) < (h * 1.1)
  );

  btnNo.style.left = x + 'px';
  btnNo.style.top = y + 'px';
  btnNo.style.right = 'auto';
}

function handleNoAttempt(e){
  e.preventDefault();
  noAttempts++;
  const msgs = CONFIG.noMessages;
  const msg = msgs[Math.min(noAttempts - 1, msgs.length - 1)];
  showToast(msg);
  if(!reduceMotion){
    dodgeNoButton();
    btnNo.classList.remove('dodge');
    void btnNo.offsetWidth;
    btnNo.classList.add('dodge');
  }
}
btnNo.addEventListener('click', handleNoAttempt);

/* =====================================================================
   YES BUTTON — celebration
   ===================================================================== */
const celebration = document.getElementById('celebration');
const yesHeadline = document.getElementById('yes-headline');
const signBlock = document.getElementById('sign-block');
let decisionMade = false;

btnYes.addEventListener('click', () => {
  if(decisionMade) return;
  decisionMade = true;
  stageQuestion.style.display = 'none';
  celebration.classList.add('show');
  launchConfetti();
  setTimeout(() => yesHeadline.classList.add('in'), 150);

  const paras = finalMsgEl.querySelectorAll('p');
  paras.forEach((p, i) => {
    setTimeout(() => p.classList.add('in'), reduceMotion ? 0 : 700 + i * 420);
  });

  const revealSignAt = reduceMotion ? 300 : 700 + paras.length * 420 + 500;
  setTimeout(() => signBlock.classList.add('in'), revealSignAt);
});

/* =====================================================================
   SIGNATURE
   ===================================================================== */
const nameInput = document.getElementById('name-input');
const signBtn = document.getElementById('sign-btn');
const keepsake = document.getElementById('keepsake');
const keepsakeCard = document.getElementById('keepsake-card');
const ksName = document.getElementById('ks-name');
const ksDate = document.getElementById('ks-date');

nameInput.addEventListener('input', () => {
  signBtn.disabled = nameInput.value.trim().length === 0;
});

signBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if(!name || signBtn.disabled) return;
  signBtn.disabled = true;
  signBlock.classList.remove('in');
  signBlock.style.display = 'none';

  ksName.textContent = name;
  ksDate.textContent = 'Signed: ' + new Date().toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' });
  keepsake.classList.add('show');
  requestAnimationFrame(() => keepsakeCard.classList.add('in'));

  if(!reduceMotion) launchConfetti(0.5);
});

/* =====================================================================
   CONFETTI (lightweight canvas, hearts + stars + rects)
   ===================================================================== */
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
function resizeCanvas(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const confettiColors = ['#5C1F2E', '#C98A93', '#A9832E', '#E7C9CC', '#D8BE86'];
let particles = [];
let confettiRAF = null;

function makeParticle(){
  const shape = ['heart','star','rect'][Math.floor(Math.random()*3)];
  return {
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.3,
    vx: (Math.random() - 0.5) * 2.2,
    vy: 2 + Math.random() * 2.5,
    size: 7 + Math.random() * 7,
    rotation: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.2,
    color: confettiColors[Math.floor(Math.random()*confettiColors.length)],
    shape,
    life: 0,
    maxLife: 260 + Math.random() * 120
  };
}

function drawHeart(size){
  ctx.beginPath();
  const s = size / 2;
  ctx.moveTo(0, s * 0.6);
  ctx.bezierCurveTo(s, -s * 0.6, s * 1.6, s * 0.5, 0, s * 1.5);
  ctx.bezierCurveTo(-s * 1.6, s * 0.5, -s, -s * 0.6, 0, s * 0.6);
  ctx.closePath();
  ctx.fill();
}
function drawStar(size){
  const spikes = 5, outer = size / 2, inner = outer / 2.3;
  ctx.beginPath();
  for(let i=0;i<spikes*2;i++){
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / spikes) * i;
    ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  ctx.closePath();
  ctx.fill();
}

function stepConfetti(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.02;
    p.rotation += p.vr;
    p.life++;
    const fade = p.life > p.maxLife * 0.7 ? 1 - (p.life - p.maxLife * 0.7) / (p.maxLife * 0.3) : 1;
    ctx.save();
    ctx.globalAlpha = Math.max(0, fade);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    if(p.shape === 'heart') drawHeart(p.size);
    else if(p.shape === 'star') drawStar(p.size);
    else ctx.fillRect(-p.size/2, -p.size/4, p.size, p.size/2);
    ctx.restore();
  });
  particles = particles.filter(p => p.life < p.maxLife && p.y < canvas.height + 40);
  if(particles.length > 0){
    confettiRAF = requestAnimationFrame(stepConfetti);
  } else {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confettiRAF = null;
  }
}

function launchConfetti(intensity = 1){
  const count = reduceMotion ? 0 : Math.floor(90 * intensity);
  for(let i=0;i<count;i++){
    setTimeout(() => particles.push(makeParticle()), i * 8);
  }
  if(!confettiRAF && count > 0) confettiRAF = requestAnimationFrame(stepConfetti);
}
