/* ByUs UI clone - data + navigation */

const CHATS = [
  { title: '그 노래 좋아해요?', who: '신해인', last: '그러니까 약속해요. 다음에 보면 꼭 그 노래 들려주기로.', count: 3 },
  { title: '그 노래 좋아해요?', who: '신해인', last: '근데 여운 씨, 지금 문 닫혀요. 쫓겨나기 전에 얼른 내려요.', count: 11 },
  { title: '그 노래 좋아해요?', who: '신해인', last: '인사는 내리기 전에 해도 늦지 않아요. 아직 세 정거장 남았으니까.', count: 8 },
  { title: '그 노래 좋아해요?', who: '신해인', last: '제 이름은 신해인. 그쪽 이름은요?', count: 0 },
  { title: '그 노래 좋아해요?', who: '이여운', last: '내일 받아야겠네', count: 23 },
  { title: '그 노래 좋아해요?', who: '신해인', last: '제 이름은 신해인. 그쪽 이름은요?', count: 0 },
  { title: '그 노래 좋아해요?', who: '신해인', last: '제 이름은 신해인. 그쪽 이름은요?', count: 0 },
];

const NOTICES = [
  { title: '2026년 10월 28일 구매 대화', time: '어제', desc: '젤리 70개로 1건의 대화를 나누었어요.' },
  { title: '2026년 10월 27일 구매 대화', time: '2일 전', desc: '젤리 170개로 2건의 대화를 나누었어요.' },
  { title: '[완료] 캐릭터 답장 수신 오류 복구 안내', time: '3일 전', desc: '안녕하세요, byUs입니다. 10월 27일(화) 오후 5시경부터 일부 작품의 채팅방에서 발생한 캐릭터 답장 수신 오류가 오후 7시경 모두 복구되었습니다. 이용에 불편을 드려 죄송합니다.' },
  { title: '💜<내 최애는 막차를 탄다> 신해인 스토리 런칭!', time: '3일 전', desc: '💜<내 최애는 막차를 탄다> 신해인 스토리 런칭! (+출시 기념 젤리 할인) 안녕하세요, byUs입니다. <내 최애는 막차를 탄다>의 신해인 스토리가 오픈되었습니다.' },
  { title: '[안내] 캐릭터 답장 수신 오류 안내', time: '3일 전', desc: '안녕하세요, byUs입니다. 10월 27일(화) 오후 5시경부터 일부 작품의 채팅방에서 캐릭터의 답장을 받지 못하는 오류가 발생하고 있어 확인 중입니다.' },
  { title: '2026년 10월 26일 구매 대화', time: '3일 전', desc: '젤리 255개로 3건의 대화를 나누었어요.' },
  { title: '[안내] 스토리 1일 제작 가능 개수 변경 안내', time: '4일 전', desc: '안녕하세요, byUs입니다. 더 많은 창작자분들이 쾌적한 환경에서 창작 활동을 이어갈 수 있도록 2026년 10월 26일(월)부터 스토리 1일 제작 가능 개수가 변경됩니다.' },
  { title: '2026년 10월 25일 구매 대화', time: '5일 전', desc: '젤리 85개로 1건의 대화를 나누었어요.' },
];

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function renderChats() {
  const ul = document.getElementById('chat-list');
  ul.innerHTML = CHATS.map((c) => `
    <li class="chat-item">
      <div class="chat-item__img"><img src="assets/img/haein.jpg" alt="" loading="lazy"></div>
      <div class="chat-item__body">
        <h3 class="chat-item__title">${esc(c.title)}</h3>
        <p class="chat-item__last">${esc(c.who)} · ${esc(c.last)}</p>
        <p class="chat-item__count">총 나눈 대화 ${c.count}</p>
      </div>
      <button class="kebab" aria-label="더보기"><i></i><i></i><i></i></button>
    </li>`).join('');
}

function renderNotices() {
  const ul = document.getElementById('notice-list');
  ul.innerHTML = NOTICES.map((n) => `
    <li class="notice-item">
      <div class="notice-item__icon">
        <svg viewBox="0 0 24 24"><path d="M3 10v4a1 1 0 0 0 1 1h3l7 4.5a1 1 0 0 0 1.5-.9V5.4a1 1 0 0 0-1.5-.9L7 9H4a1 1 0 0 0-1 1z"/><path d="M18 9.5a3.5 3.5 0 0 1 0 5" stroke="currentColor" stroke-width="2" fill="none"/></svg>
      </div>
      <div class="notice-item__body">
        <div class="notice-item__head">
          <h3 class="notice-item__title is-unread">${esc(n.title)}</h3>
          <span class="notice-item__time">${esc(n.time)}</span>
        </div>
        <p class="notice-item__desc">${esc(n.desc)}</p>
      </div>
    </li>`).join('');
}

/* ---------- navigation ---------- */
const screens = document.querySelectorAll('.screen');
const tabs = document.querySelectorAll('.tab');
const tabbar = document.querySelector('.tabbar');
let lastTab = 'home';

function show(name) {
  screens.forEach((s) => s.classList.toggle('is-active', s.dataset.screen === name));
  const isTab = [...tabs].some((t) => t.dataset.tab === name);
  if (isTab) {
    lastTab = name;
    tabs.forEach((t) => t.classList.toggle('is-active', t.dataset.tab === name));
  }
  tabbar.style.display = isTab ? '' : 'none';
  window.scrollTo(0, 0);
  if (location.hash !== '#' + name) history.replaceState(null, '', '#' + name);
}

tabs.forEach((t) => t.addEventListener('click', () => show(t.dataset.tab)));
document.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => show(b.dataset.go)));
document.querySelectorAll('[data-back]').forEach((b) => b.addEventListener('click', () => show(lastTab)));

/* home: 스토리 / 캐릭터 segmented tabs */
const segTabs = document.querySelectorAll('.seg__tab');
const panels = document.querySelectorAll('.panel');
segTabs.forEach((t) => t.addEventListener('click', () => {
  const name = t.dataset.panel;
  segTabs.forEach((x) => {
    const on = x === t;
    x.classList.toggle('is-active', on);
    x.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  panels.forEach((p) => p.classList.toggle('is-active', p.dataset.panel === name));
}));
/* deep link: ?tab=character */
const wantTab = new URLSearchParams(location.search).get('tab');
const wantBtn = wantTab && document.querySelector(`.seg__tab[data-panel="${wantTab}"]`);
if (wantBtn) wantBtn.click();

/* home: hero banner dots (auto-rotate indicator) */
const heroDots = document.querySelectorAll('.hero__dots i');
if (heroDots.length) {
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % heroDots.length;
    heroDots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
  }, 3500);
}

/* ---------- creator profile ---------- */
const AUTHORS = {
  '진돌':   { avatar: 'ph-maru',    followers: 1043, following: 47, works: 82, series: 2,
              bio: '63만 유튜버<br/>네이버웹툰 &lt;진돌히디만화&gt; 작가' },
  '흑요석': { avatar: 'ph-eunhyuk', followers: 2311, following: 12, works: 36, series: 2,
              bio: '그림 담당입니다. 캐릭터 일러스트와 표지 작업을 주로 올립니다.<br/>작업 문의는 DM으로 부탁드려요.' },
  '2사장':  { avatar: 'ph-basket',  followers: 5820, following: 3,  works: 14, series: 2,
              bio: '농구 이야기를 그립니다.<br/>가비지타임 공식 캐릭터 챗을 운영 중입니다.' },
};

const CHARACTERS = {
  '진돌':   [
    { tag: 'ORIGINAL', title: '부채 선비', series: '야행 <夜行>', count: '52.3만', img: 'assets/img/orig-1.png' },
    { tag: 'ORIGINAL', title: '무관 조족등', series: '야행 <夜行>', count: '18.6만', img: 'assets/img/orig-3.png' },
    { tag: 'ORIGINAL', title: '어항 선녀', series: '야행 <夜行>', count: '9.4만', img: 'assets/img/orig-2.png' },
    { tag: 'ORIGINAL', title: '청사초롱', series: '야행 <夜行>', count: '27.1만', img: 'assets/img/orig-4.png' },
    { tag: 'ORIGINAL', title: '까스날로 3세', series: '중앙 난방 공국', count: '6.2만', img: 'assets/img/orig-5.png' },
    { tag: 'ORIGINAL', title: '케로센 베일', series: '중앙 난방 공국', count: '4.8만', img: 'assets/img/orig-6.png' },
  ],
  '흑요석': [
    { tag: 'ORIGINAL', title: '부채 선비', series: '야행 <夜行>', count: '52.3만', img: 'assets/img/orig-1.png' },
    { tag: 'ORIGINAL', title: '무관 조족등', series: '야행 <夜行>', count: '18.6만', img: 'assets/img/orig-3.png' },
    { tag: 'ORIGINAL', title: '어항 선녀', series: '야행 <夜行>', count: '9.4만', img: 'assets/img/orig-2.png' },
    { tag: 'ORIGINAL', title: '청사초롱', series: '야행 <夜行>', count: '27.1만', img: 'assets/img/orig-4.png' },
  ],
  '2사장':  [
    { tag: '', title: '고은혁', series: '가비지타임', count: '27.1만', img: 'assets/img/orig-4.png' },
  ],
};

const SERIES = [
  { tag: 'ORIGINAL', title: '야행 <夜行>', parts: '4부작', desc: '달 밝은 밤, 인간이 아닌 것들과 함께 걷는 법.', img: 'assets/img/orig-4.png' },
  { tag: 'ORIGINAL', title: '중앙 난방 공국', parts: '2부작', desc: '온기가 배급되는 도시, 군주와 반역자.', img: 'assets/img/orig-5.png' },
];

function tagHtml(tag) {
  if (!tag) return '';
  const mod = tag === 'ORIGINAL' ? ' work__tag--original' : '';
  return `<span class="work__tag${mod}">${esc(tag)}</span>`;
}

function renderProfile(name) {
  const a = AUTHORS[name] || AUTHORS['진돌'];
  document.getElementById('profile-name').textContent = name;
  document.getElementById('profile-followers').textContent = a.followers.toLocaleString();
  document.getElementById('profile-following').textContent = a.following;
  document.getElementById('profile-bio').innerHTML = a.bio;
  document.getElementById('series-count').textContent = `${a.series}개`;
  const av = document.getElementById('profile-avatar');
  av.className = `profile__avatar ph ${a.avatar}`;

  currentAuthor = name;
  renderWorks(name, null);

  document.getElementById('series-grid').innerHTML = SERIES.map((s) => `
    <a class="work" href="#" data-series-title="${esc(s.title)}">
      <div class="work__thumb${s.img ? '' : ' ph ' + s.ph}">
        ${s.img ? `<img src="${s.img}" alt="${esc(s.title)}" loading="lazy">` : ''}
        ${tagHtml(s.tag)}
        <span class="work__parts">${esc(s.parts)}</span>
      </div>
      <h4 class="work__title">${esc(s.title)}</h4>
      <p class="work__desc">${esc(s.desc)}</p>
    </a>`).join('');
}

/* 작품 목록 (시리즈 필터 지원) */
let currentAuthor = null;
function renderWorks(name, seriesFilter) {
  const all = CHARACTERS[name] || [];
  const chars = seriesFilter ? all.filter((w) => w.series === seriesFilter) : all;
  document.getElementById('works-count').textContent = `${chars.length}건`;

  const tag = document.getElementById('works-filter');
  tag.hidden = !seriesFilter;
  if (seriesFilter) tag.querySelector('span').textContent = seriesFilter;

  document.getElementById('works-grid').innerHTML = chars.map((w) => `
    <a class="work" href="#">
      <div class="work__thumb${w.img ? '' : ' ph ' + w.ph}">
        ${w.img ? `<img src="${w.img}" alt="${esc(w.title)}" loading="lazy">` : ''}
        ${tagHtml(w.tag)}
      </div>
      <h4 class="work__title">${esc(w.title)}</h4>
      <p class="work__series">${esc(w.series || '')}</p>
      <p class="work__count">${esc(w.count)}</p>
    </a>`).join('');
}

/* 시리즈 카드 클릭 -> 작품 탭(오리지널)으로 이동 + 해당 시리즈만 표시 */
document.getElementById('series-grid').addEventListener('click', (e) => {
  const card = e.target.closest('[data-series-title]');
  if (!card) return;
  e.preventDefault();
  renderWorks(currentAuthor, card.dataset.seriesTitle);
  document.querySelectorAll('.pill').forEach((p) => p.classList.toggle('is-active', p.dataset.pill === 'character'));
  document.querySelectorAll('.pill-panel').forEach((p) => p.classList.toggle('is-active', p.dataset.pill === 'character'));
  document.querySelectorAll('.ptab').forEach((t) => t.classList.toggle('is-active', t.dataset.ptab === 'works'));
  document.querySelectorAll('.ppanel').forEach((p) => p.classList.toggle('is-active', p.dataset.ptab === 'works'));
  document.querySelector('.ptabs').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* 필터 해제 */
document.getElementById('works-filter').addEventListener('click', () => renderWorks(currentAuthor, null));

/* author name -> profile */
document.addEventListener('click', (e) => {
  const link = e.target.closest('.author__link');
  if (!link) return;
  e.preventDefault();
  e.stopPropagation();
  openProfile(link.dataset.author);
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const link = e.target.closest && e.target.closest('.author__link');
  if (!link) return;
  e.preventDefault();
  openProfile(link.dataset.author);
});

function openProfile(name) {
  renderProfile(name);
  // reset to 작품 tab / 캐릭터 pill
  document.querySelectorAll('.pill').forEach((p) => p.classList.toggle('is-active', p.dataset.pill === 'character'));
  document.querySelectorAll('.pill-panel').forEach((p) => p.classList.toggle('is-active', p.dataset.pill === 'character'));
  document.querySelectorAll('.ptab').forEach((t) => t.classList.toggle('is-active', t.dataset.ptab === 'works'));
  document.querySelectorAll('.ppanel').forEach((p) => p.classList.toggle('is-active', p.dataset.ptab === 'works'));
  show('profile');
}

/* profile tabs: 작품 / 시리즈 / 피드 */
document.querySelectorAll('.ptab').forEach((t) => t.addEventListener('click', () => {
  document.querySelectorAll('.ptab').forEach((x) => x.classList.toggle('is-active', x === t));
  document.querySelectorAll('.ppanel').forEach((p) => p.classList.toggle('is-active', p.dataset.ptab === t.dataset.ptab));
}));

/* profile pills: 스토리 / 캐릭터 */
document.querySelectorAll('.pills').forEach((g) => g.addEventListener('click', (e) => {
  const pill = e.target.closest('.pill');
  if (!pill) return;
  g.querySelectorAll('.pill').forEach((p) => p.classList.toggle('is-active', p === pill));
  document.querySelectorAll('.pill-panel').forEach((p) => p.classList.toggle('is-active', p.dataset.pill === pill.dataset.pill));
}));

/* filter chips: single select within a group */
document.querySelectorAll('.chips').forEach((group) => {
  group.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    group.querySelectorAll('.chip').forEach((c) => c.classList.toggle('is-active', c === chip));
    const filter = chip.dataset.filter;
    if (filter) {
      const panel = group.closest('.panel') || document;
      panel.querySelectorAll('.story-card[data-series]').forEach((card) => {
        card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.series !== filter);
      });
    }
  });
});

/* prevent placeholder links from jumping */
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href="#"]');
  if (a) e.preventDefault();
});

renderChats();
renderNotices();
const initial = location.hash.replace('#', '');
show(['home', 'chat', 'create', 'more', 'notice'].includes(initial) ? initial : 'home');

/* deep link: ?author=진돌[&ptab=series] */
const qs = new URLSearchParams(location.search);
if (qs.get('author')) {
  openProfile(qs.get('author'));
  const pt = document.querySelector(`.ptab[data-ptab="${qs.get('ptab')}"]`);
  if (pt) pt.click();
  const pl = document.querySelector(`.pill[data-pill="${qs.get('pill')}"]`);
  if (pl) pl.click();
  if (qs.get('series')) renderWorks(qs.get('author'), qs.get('series'));
}
/* deep link: ?filter=central (runs after chip handlers are attached) */
const wantChip = qs.get('filter') && document.querySelector(`.chip[data-filter="${qs.get('filter')}"]`);
if (wantChip) wantChip.click();
