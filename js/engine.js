import { storyScenes, chapters, endings } from './story-data.js';
import { audio } from './audio.js';

class GameEngine {
  constructor() {
    this.score = 100;
    this.currentScene = null;
    this.dialogueIndex = 0;
    this.isTyping = false;
    this.typeTimer = null;
    this.choicesMade = [];
    this.correctCount = 0;
    this.state = 'title';
    this._bind();
    this._preloadImages();
  }

  _preloadImages() {
    const images = new Set();
    Object.values(storyScenes).forEach(scene => {
      if (scene.bg && scene.bg.endsWith('.jpg')) images.add(scene.bg);
    });
    ['bg_ending_gold','bg_ending_good','bg_ending_warn','bg_ending_bad','bg_ending_worst']
      .forEach(n => images.add(n + '.jpg'));
    images.forEach(src => {
      const img = new Image();
      img.src = 'assets/images/' + src;
    });
  }

  _bind() {
    document.getElementById('btn-start').addEventListener('click', () => {
        audio.init();
        audio.playClick();
        this.startGame();
    });
    document.getElementById('btn-replay').addEventListener('click', () => this.resetGame());
    document.addEventListener('keydown', (e) => this._onKey(e));
    // Touch support for mobile
    document.getElementById('dialogue-panel').addEventListener('click', () => {
      if (this.state === 'playing') this.advanceDialogue();
    });
    document.getElementById('regulation-panel').addEventListener('click', () => {
      if (this.state === 'regulation') this.dismissRegulation();
    });
  }

  _onKey(e) {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      if (this.state === 'title') this.startGame();
      else if (this.state === 'playing') this.advanceDialogue();
      else if (this.state === 'regulation') this.dismissRegulation();
    }
    if (this.state === 'choosing' && e.code.startsWith('Digit')) {
      const n = parseInt(e.key);
      if (n >= 1 && n <= 3) this.selectChoice(n - 1);
    }
  }

  resetGame() {
    audio.stopTheme();
    clearInterval(this.typeTimer);
    this.score = 100;
    this.currentScene = null;
    this.dialogueIndex = 0;
    this.isTyping = false;
    this.choicesMade = [];
    this.correctCount = 0;
    this.state = 'title';
    document.getElementById('integrity-fill').style.width = '100%';
    document.getElementById('integrity-fill').classList.remove('warn', 'danger');
    document.getElementById('integrity-value').textContent = '100';
    document.getElementById('choice-panel').classList.add('hidden');
    document.getElementById('regulation-panel').classList.add('hidden');
    document.getElementById('dialogue-panel').classList.add('hidden');
    document.getElementById('chapter-transition').classList.add('hidden');
    const bg = document.getElementById('bg-layer');
    bg.className = '';
    bg.style.backgroundImage = "url('assets/images/bg_title.jpg')";
    this.showScreen('title-screen');
  }

  startGame() {
    this.showScreen('game-screen');
    this.state = 'transition';
    this.showChapterTransition(1, () => {
      this.loadScene('ch1_s1');
    });
  }

  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

  loadScene(sceneId) {
    const scene = storyScenes[sceneId];
    if (!scene) { console.error('Scene not found:', sceneId); return; }
    this.currentScene = scene;
    this.dialogueIndex = 0;

    const bg = document.getElementById('bg-layer');
    if (scene.bg.endsWith('.jpg') || scene.bg.endsWith('.webp')) {
      bg.className = '';
      bg.style.backgroundImage = `url('assets/images/${scene.bg}')`;
    } else {
      bg.className = scene.bg || 'bg-office';
      bg.style.backgroundImage = '';
    }

    const ch = chapters.find(c => c.num === scene.chapter);
    if (ch) document.getElementById('hud-chapter').textContent = ch.label;

    if (scene.chapter === 1) audio.playTheme('calm');
    else if (scene.chapter === 5) audio.playTheme('ending');
    else audio.playTheme('suspense');

    document.getElementById('choice-panel').classList.add('hidden');
    document.getElementById('regulation-panel').classList.add('hidden');
    document.getElementById('dialogue-panel').classList.add('hidden');

    this.state = 'playing';
    this.showDialogue();
  }

  showDialogue() {
    const scene = this.currentScene;
    if (this.dialogueIndex >= scene.dialogues.length) {
      if (scene.choices) {
        this.showChoices(scene.choices);
      } else if (scene.next) {
        if (scene.next === '__ending__') { this.showEnding(); return; }
        const nextScene = storyScenes[scene.next];
        if (nextScene && nextScene.chapter !== scene.chapter) {
          this.state = 'transition';
          this.showChapterTransition(nextScene.chapter, () => this.loadScene(scene.next));
        } else {
          this.loadScene(scene.next);
        }
      }
      return;
    }

    const d = scene.dialogues[this.dialogueIndex];
    const panel = document.getElementById('dialogue-panel');
    const textEl = document.getElementById('dialogue-text');
    const plate = document.getElementById('speaker-plate');
    const hint = document.getElementById('advance-hint');

    panel.classList.remove('hidden');
    hint.classList.remove('visible');

    if (d.speaker) {
      document.getElementById('speaker-name').textContent = d.speaker;
      document.getElementById('speaker-icon').textContent = this._speakerIcon(d.speaker);
      plate.classList.add('visible');
      plate.style.borderLeftColor = this._speakerColor(d.speaker);
    } else {
      plate.classList.remove('visible');
    }

    this.isTyping = true;
    const fullText = d.text;
    const cssClass = d.type || 'narration';
    textEl.innerHTML = '';
    let i = 0;
    if (cssClass === 'dialogue') audio.playType();
    clearInterval(this.typeTimer);
    this.typeTimer = setInterval(() => {
      if (i < fullText.length) {
        textEl.innerHTML = `<span class="${cssClass}">${fullText.substring(0, i + 1)}</span>`;
        i++;
      } else {
        clearInterval(this.typeTimer);
        this.isTyping = false;
        hint.classList.add('visible');
      }
    }, 35);
  }

  advanceDialogue() {
    if (this.isTyping) {
      clearInterval(this.typeTimer);
      this.isTyping = false;
      const d = this.currentScene.dialogues[this.dialogueIndex];
      const cssClass = d.type || 'narration';
      document.getElementById('dialogue-text').innerHTML = `<span class="${cssClass}">${d.text}</span>`;
      document.getElementById('advance-hint').classList.add('visible');
      return;
    }
    this.dialogueIndex++;
    this.showDialogue();
  }

  showChoices(choices) {
    this.state = 'choosing';
    document.getElementById('dialogue-panel').classList.add('hidden');
    const panel = document.getElementById('choice-panel');
    const list = document.getElementById('choice-list');
    list.innerHTML = '';
    choices.forEach((c, i) => {
      const card = document.createElement('div');
      card.className = 'choice-card';
      card.innerHTML = `<span class="choice-key">${i + 1}</span><span class="choice-text">${c.text}</span>`;
      card.addEventListener('click', () => this.selectChoice(i));
      list.appendChild(card);
    });
    panel.classList.remove('hidden');
  }

  selectChoice(index) {
    if (this.state !== 'choosing') return;
    const choices = this.currentScene.choices;
    if (index >= choices.length) return;

    audio.playClick();
    const choice = choices[index];
    this.choicesMade.push({ scene: this.currentScene.id, choice: index, score: choice.score });

    this.score = Math.max(0, Math.min(100, this.score + (choice.score || 0)));
    if (choice.score === 0) this.correctCount++;
    this.updateIntegrity();

    const cards = document.querySelectorAll('.choice-card');
    cards.forEach((c, i) => {
      if (i === index) c.classList.add('selected');
      else c.classList.add('faded');
    });

    setTimeout(() => {
      document.getElementById('choice-panel').classList.add('hidden');
      if (this.currentScene.regulation) {
        this.showRegulation(this.currentScene.regulation, choice.next);
      } else {
        this.loadScene(choice.next);
      }
    }, 800);
  }

  showRegulation(reg, nextScene) {
    this.state = 'regulation';
    audio.playWarning();
    this._pendingNext = nextScene;
    const panel = document.getElementById('regulation-panel');
    document.getElementById('reg-title').textContent = reg.title;
    document.getElementById('reg-article').textContent = reg.article;
    document.getElementById('reg-content').textContent = reg.content;
    panel.classList.remove('hidden');
  }

  dismissRegulation() {
    document.getElementById('regulation-panel').classList.add('hidden');
    this.state = 'playing';
    if (this._pendingNext) {
      this.loadScene(this._pendingNext);
      this._pendingNext = null;
    }
  }

  showChapterTransition(chapterNum, cb) {
    const ch = chapters.find(c => c.num === chapterNum);
    if (!ch) { cb(); return; }
    const el = document.getElementById('chapter-transition');
    document.getElementById('ct-chapter').textContent = ch.label;
    document.getElementById('ct-title').textContent = ch.title;
    document.getElementById('ct-desc').textContent = ch.desc;
    el.classList.remove('hidden');
    setTimeout(() => { el.classList.add('hidden'); cb(); }, 3000);
  }

  updateIntegrity() {
    const fill = document.getElementById('integrity-fill');
    const val = document.getElementById('integrity-value');
    fill.style.width = this.score + '%';
    val.textContent = this.score;
    fill.classList.remove('warn', 'danger');
    if (this.score < 40) fill.classList.add('danger');
    else if (this.score < 70) fill.classList.add('warn');
  }

  showEnding() {
    audio.stopTheme();
    setTimeout(() => audio.playSuccess(), 500);
    let ending;
    let bgImg;
    if (this.score >= 95) { ending = endings.gold; bgImg = 'bg_ending_gold.jpg'; }
    else if (this.score >= 80) { ending = endings.good; bgImg = 'bg_ending_good.jpg'; }
    else if (this.score >= 60) { ending = endings.warn; bgImg = 'bg_ending_warn.jpg'; }
    else if (this.score >= 40) { ending = endings.bad; bgImg = 'bg_ending_bad.jpg'; }
    else { ending = endings.worst; bgImg = 'bg_ending_worst.jpg'; }

    const bg = document.getElementById('bg-layer');
    bg.className = '';
    bg.style.backgroundImage = `url('assets/images/${bgImg}')`;

    const screen = document.getElementById('ending-screen');
    screen.className = 'screen active ' + ending.class;
    document.getElementById('ending-icon').textContent = ending.icon;
    document.getElementById('ending-type').textContent = ending.type;
    document.getElementById('ending-title').textContent = ending.title;
    document.getElementById('ending-story').textContent = ending.story;
    document.getElementById('stat-integrity').textContent = this.score;
    document.getElementById('stat-correct').textContent = this.correctCount + '/8';
    document.getElementById('stat-articles').textContent = this.choicesMade.length + '条';
    document.getElementById('ending-regulation').textContent = ending.regulation || '';
    this.showScreen('ending-screen');
  }

  _speakerColor(name) {
    const map = { '肖明': '#d4a843', '刘芳': '#e88fa5', '王总': '#7a8a9a', '赵磊': '#9b59b6', '陈主任': '#2ecc71', '张总': '#c1272d', '母亲': '#e88fa5', '检查组长': '#3498db', '对方代表': '#3498db' };
    return map[name] || '#d4a843';
  }
  _speakerIcon(name) {
    const map = { '肖明': '👤', '刘芳': '👩', '王总': '👔', '赵磊': '🧑', '陈主任': '👨', '张总': '🤵', '母亲': '👵', '检查组长': '👔', '对方代表': '🧑' };
    return map[name] || '👤';
  }
}

new GameEngine();
