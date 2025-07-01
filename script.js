document.addEventListener('DOMContentLoaded', () => {
  const totalPages = 6;
  let currentPage = 1;

  const img = document.getElementById('pdfImage');
  const nextPageBtn = document.getElementById('nextPage');
  const intermission = document.getElementById('intermission');
  const goToLetter = document.getElementById('goToLetter');
  const letterSection = document.getElementById('letterSection');
  const letter = document.getElementById('letter');

  function handleNextPage() {
    currentPage++;
    if (currentPage <= totalPages) {
      img.src = `pages/page_${currentPage}.png`;
    }

    if (currentPage === totalPages) {
      nextPageBtn.textContent = 'Finalizar';
      nextPageBtn.removeEventListener('click', handleNextPage);
      nextPageBtn.addEventListener('click', () => {
        document.getElementById('pages').style.display = 'none';
        intermission.style.display = 'block';
      });
    }
  }

  nextPageBtn.addEventListener('click', handleNextPage);

  goToLetter.addEventListener('click', () => {
    intermission.style.display = 'none';
    letterSection.style.display = 'block';
    typeText(letter, fullLetter);
    startFallingImages(); // Começa aqui
  });

  function typeText(container, text) {
    container.innerHTML = '';
    let index = 0;
    function type() {
      if (index < text.length) {
        container.innerHTML += text[index] === '\n' ? '<br/>' : text[index];
        index++;
        setTimeout(type, 30);
      }
    }
    type();
  }

  const fullLetter = `Delborinha, 

 Tem gente que passa pela nossa vida e deixa lembranças. Mas tem gente que chega e vira casa. E você, desde o começo, foi isso pra mim: abrigo, calmaria, sorriso no meio do caos. 

 Eu queria poder te dar o mundo — mas hoje, te dou o que tenho de mais verdadeiro: palavras que saem direto do que sinto por você

 Lembro perfeitamente da primeira vez que te vi. Você ainda não tinha me notado, e eu fiquei ali, parado, só te observando. Parecia que o tempo tinha parado junto comigo. E quando a gente se abraçou… cara, se eu pudesse escolher um lugar pra morar, seria naquele abraço. É uma memória que eu carrego no peito como quem guarda um segredo precioso. 

 Com você, eu sou diferente. E gosto de ser. Você me deixa leve, me faz baixar a guarda, falar o que sinto, sem medo. Com você, eu não escondo, eu transbordo. E mesmo nos dias em que a gente tá longe, é como se eu te sentisse aqui do meu lado. 

 Te chamar de Delborinha já virou hábito, mas a verdade é que esse apelido carrega carinho, afeto, e um tanto de saudade. Porque você faz falta. Todo dia. E mesmo que a rotina te sugue, você sempre arruma tempo pra mim. Isso me faz sentir especial. Me faz sentir visto. 

 Você é uma pessoa rara. Tem luz própria. É beleza que não cabe só no que se vê, mas no que se sente estando perto de você. E eu tive a sorte — talvez até o privilégio — de te conhecer, de te ter por perto, e de te amar em silêncio, mas com toda a intensidade do mundo. 

 Sim, eu te amo. Com verdade, com carinho, com aquele sentimento que não pede nada em troca, mas que torce, que cuida e que vibra por você. Sempre. Se é errado te ter como prioridade… então deixa eu errar mais um pouco. 
 
 Feliz vida, Delborinha. Que ela te traga tudo o que você merece: amor, paz, sorrisos sinceros, forró na alma e gente que saiba te valorizar como eu sei.`;

  // partículas
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      speedY: Math.random() * 1 + 0.5
    };
  }

  for (let i = 0; i < 80; i++) {
    particles.push(createParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#fce4d6';
      ctx.fill();
      p.y += p.speedY;
      if (p.y > canvas.height) {
        p.y = 0;
        p.x = Math.random() * canvas.width;
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
});

function startFallingImages() {
  const container = document.getElementById('fallingImagesContainer');
  container.style.display = 'block';

  const emojis = ['🎈', '❤️', '🎈', '🎂', '🎈', '❤️', '🎂', '🎈', '❤️', '🎈', '🎂', '🎈', '❤️', '🎂']; // repita para variar mais

  setInterval(() => {
    const emoji = document.createElement('div');
    const sidePadding = 100; // margem mínima das laterais
    const sideWidth = 200;   // faixa de onde os emojis surgem
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.classList.add('floating-emoji');
    emoji.style.left = Math.random() < 0.5
      ? `${sidePadding + Math.random() * sideWidth}px` // faixa à esquerda
      : `${window.innerWidth - sidePadding - sideWidth + Math.random() * sideWidth}px`; // faixa à direita
    emoji.style.animationDuration = `${6 + Math.random() * 4}s`; // mais suave
    emoji.style.fontSize = `${30 + Math.random() * 20}px`; // tamanhos variados

    container.appendChild(emoji);

    setTimeout(() => {
      emoji.remove();
    }, 10000);
  }, 1000); // nova frequência
}
