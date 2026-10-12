/* Общие части: шапка, подвал, формы, меню. Слоты контактов – в объекте SITE. */
const SITE = {
  name: 'Колобок',
  phone: '+7 (800) 123-45-67',        // {{телефон}}
  phoneHref: '+78001234567',
  email: 'info@kolobok.ru',            // {{почта}}
  formEndpoint: '',                    // {{ссылка-записи}}: сюда придёт адрес приёма заявок
};

const NAV = [
  ['index.html#menu', 'Меню'], ['index.html#kak', 'Как стать клиентом'],
  ['index.html#partners', 'Партнёры'], ['banketi.html', 'Банкеты'],
  ['tochki.html', 'Наши точки'], ['tochki.html#vakansii', 'Вакансии'],
];
const page = location.pathname.split('/').pop() || 'index.html';

document.getElementById('nav').innerHTML = `
<nav class="nav"><div class="wrap">
  <a class="logo" href="index.html"><span class="bun" id="bun"></span>${SITE.name}</a>
  <div class="menu" id="menu">${NAV.map(([h, t]) =>
    `<a href="${h}"${h.split('#')[0] === page && !h.includes('#') ? ' aria-current="page"' : ''}>${t}</a>`).join('')}</div>
  <a class="tel" href="tel:${SITE.phoneHref}">${SITE.phone}</a>
  <button class="btn sm" data-open="callback">Связаться</button>
  <button class="burger" id="burger" aria-label="Меню">☰</button>
</div></nav>`;

document.getElementById('foot').innerHTML = `
<footer><div class="wrap">
  <div class="grid">
    <div><a class="logo" href="index.html"><span class="bun"></span>${SITE.name}</a>
      <p>Народная столовая. Комплексное питание для команд и банкеты.</p></div>
    <div><h4>Разделы</h4><a href="index.html">Корпоративным клиентам</a><a href="banketi.html">Банкеты</a><a href="tochki.html">Наши точки</a><a href="tochki.html#vakansii">Вакансии</a></div>
    <div><h4>Города</h4><a href="tochki.html#bryansk">Брянск</a><a href="tochki.html#moskva">Москва</a><a href="tochki.html#spb">Санкт-Петербург</a></div>
    <div><h4>Контакты</h4><a href="tel:${SITE.phoneHref}">${SITE.phone}</a><a href="mailto:${SITE.email}">${SITE.email}</a></div>
  </div>
  <div class="copy"><span>© ${SITE.name}, ${new Date().getFullYear()}</span><span>Политика конфиденциальности: {{ссылка}}</span></div>
</div></footer>`;

/* Модальные формы */
const field = (l, n, t = 'text', extra = '') => `<label>${l}<input name="${n}" type="${t}" ${extra}></label>`;
const hallOpts = ['Народная Столовая (Ленина)', 'Народная Столовая (Московский 86)', 'Народная Столовая (3 Интернационала)']
  .map(h => `<option>${h}</option>`).join('');
document.getElementById('modals').innerHTML = `
<dialog id="callback"><button class="x" data-close aria-label="Закрыть">×</button>
  <h2>Закажите звонок</h2><p class="sub">Перезвоним в течение 15 минут в рабочее время.</p>
  <form data-form>${field('Ваше имя', 'name', 'text', 'required autocomplete="name"')}${field('Телефон', 'phone', 'tel', 'required placeholder="+7 (___) ___-__-__" autocomplete="tel"')}
  <button class="btn" type="submit">Заказать звонок</button><p class="fine">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.</p></form>
  <div class="ok"><h2>Заявка отправлена</h2><p>Мы свяжемся с вами в ближайшее время.</p></div></dialog>

<dialog id="corp"><button class="x" data-close aria-label="Закрыть">×</button>
  <h2>Забронируйте обеды</h2><p class="sub">Подготовим предложение для вашей команды за 15 минут.</p>
  <form data-form>${field('Ваше имя', 'name', 'text', 'required')}${field('Телефон', 'phone', 'tel', 'required')}${field('Почта', 'email', 'email')}${field('Количество сотрудников', 'staff', 'number', 'min="1" placeholder="Например, 25"')}
  <button class="btn" type="submit">Отправить заявку</button><p class="fine">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.</p></form>
  <div class="ok"><h2>Заявка отправлена</h2><p>Подготовим предложение и свяжемся с вами.</p></div></dialog>

<dialog id="banquet"><button class="x" data-close aria-label="Закрыть">×</button>
  <h2>Бронирование банкета</h2><p class="sub">Выберите зал и дату, остальное уточним по телефону.</p>
  <form data-form>${field('Ваше имя', 'name', 'text', 'required')}${field('Телефон', 'phone', 'tel', 'required')}${field('Почта', 'email', 'email')}
  <label>Зал<select name="hall" id="hallSel">${hallOpts}</select></label>
  <div class="two">${field('Дата', 'date', 'date')}${field('Гостей', 'guests', 'number', 'min="1"')}</div>
  <label>Тип события<select name="type"><option>День рождения</option><option>Свадьба</option><option>Корпоратив</option><option>Юбилей</option><option>Другое</option></select></label>
  <button class="btn" type="submit">Отправить заявку</button></form>
  <div class="ok"><h2>Заявка отправлена</h2><p>Менеджер свяжется с вами и подтвердит дату.</p></div></dialog>`;

document.addEventListener('click', e => {
  const o = e.target.closest('[data-open]');
  if (o) {
    const d = document.getElementById(o.dataset.open);
    if (o.dataset.hall) d.querySelector('#hallSel').value = o.dataset.hall;
    d.querySelector('form').hidden = false; d.querySelector('.ok').classList.remove('on');
    d.showModal(); return;
  }
  if (e.target.closest('[data-close]')) e.target.closest('dialog').close();
  if (e.target.tagName === 'DIALOG') e.target.close();
  if (e.target.closest('#burger')) document.getElementById('menu').classList.toggle('open');
});

document.addEventListener('submit', async e => {
  const f = e.target.closest('form[data-form]'); if (!f) return;
  e.preventDefault();
  const data = Object.fromEntries(new FormData(f));
  if (SITE.formEndpoint) {
    try { await fetch(SITE.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); } catch (_) {}
  }
  f.hidden = true; f.reset();
  const ok = f.parentElement.querySelector('.ok') || f.nextElementSibling;
  ok.classList.add('on');
  f.parentElement.querySelectorAll('.sub').forEach(s => s.hidden = true);
});

/* Колобок катится при прокрутке */
const bun = document.getElementById('bun');
addEventListener('scroll', () => bun.style.setProperty('--roll', (scrollY * .4) + 'deg'), { passive: true });

/* Каталог блюд (названия и граммовки из макета клиента) */
const MENU = {
  'Первые блюда': [['Борщ с говядиной', '300 г', 'Говядина, свёкла, капуста, картофель, морковь, лук, томатная паста, сметана, зелень'], ['Суп куриный с лапшой', '250 г', 'Курица, лапша, морковь, лук, картофель, зелень'], ['Щи из свежей капусты', '300 г', 'Капуста, картофель, морковь, лук, томатная паста, сметана, зелень'], ['Суп-пюре из тыквы', '250 г', 'Тыква, сливки, лук, морковь, пряности']],
  'Горячие блюда': [['Куриная котлета с пюре', '250 г', 'Куриное филе, картофельное пюре, молоко, сливочное масло'], ['Рыба запечённая с овощами', '250 г', 'Филе рыбы, перец, морковь, лук, лимон, специи'], ['Говядина с грибами', '270 г', 'Говядина, шампиньоны, лук, сливки, специи'], ['Курица в сливочном соусе', '250 г', 'Куриное филе, сливки, грибы, лук, зелень, специи']],
  'Гарниры': [['Рис отварной', '150 г', 'Рис длиннозёрный, масло сливочное, соль'], ['Гречка с грибами', '150 г', 'Гречка, шампиньоны, лук, масло'], ['Картофель фри', '150 г', 'Картофель, масло растительное, соль'], ['Овощи на гриле', '150 г', 'Кабачок, перец, баклажан, помидор, оливковое масло, специи']],
  'Салаты': [['Салат из сухофруктов', '150 г', 'Курага, чернослив, изюм, яблоко, сметана'], ['Салат «Греческий»', '150 г', 'Помидоры, огурцы, перец, фета, оливки, оливковое масло'], ['Цезарь с курицей', '150 г', 'Курица, романо, пармезан, сухарики, соус Цезарь'], ['Оливье с курицей', '150 г', 'Курица, картофель, морковь, огурцы, горошек, майонез']],
  'Напитки': [['Компот из сухофруктов', '200 мл', 'Сухофрукты, яблоко, груша, чернослив, сахар'], ['Кисель ягодный', '200 мл', 'Ягоды, крахмал, сахар'], ['Чай с лимоном', '200 мл', 'Чай чёрный, лимон, сахар'], ['Морс клюквенный', '200 мл', 'Клюква, сахар, вода']],
};
const PHOTO = '<div class="ph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/></svg>фото блюда</div>';
const dishCard = ([n, w, c]) => `<article class="dish">${PHOTO}<h3>${n}</h3><span class="w">${w}</span><p>Состав: ${c}</p></article>`;

const full = document.getElementById('fullMenu');
if (full) {
  const cats = Object.keys(MENU);
  full.innerHTML = `<div class="tabs" role="tablist">${['Всё', ...cats].map((c, i) => `<button role="tab" aria-selected="${i === 0}" data-cat="${c}">${c}</button>`).join('')}</div><div id="menuBody"></div>`;
  const paint = cat => document.getElementById('menuBody').innerHTML = (cat === 'Всё' ? cats : [cat])
    .map(c => `<h3 class="cat-title">${c}</h3><div class="dishes">${MENU[c].map(dishCard).join('')}</div>`).join('');
  paint('Всё');
  full.addEventListener('click', e => {
    const b = e.target.closest('[data-cat]'); if (!b) return;
    full.querySelectorAll('[data-cat]').forEach(x => x.setAttribute('aria-selected', x === b));
    paint(b.dataset.cat);
  });
}

/* Меню недели на главной: пример, пока нет реального меню от шеф-повара */
const week = document.getElementById('week');
if (week) {
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const cats = Object.keys(MENU).filter(c => c !== 'Салаты');
  const today = (new Date().getDay() + 6) % 7;
  const paint = d => document.getElementById('weekBody').innerHTML = cats.map((c, i) => dishCard(MENU[c][(d + i) % 4])).join('');
  week.innerHTML = `<div class="tabs" role="tablist">${days.map((d, i) => `<button role="tab" aria-selected="${i === today}" data-d="${i}">${d}</button>`).join('')}</div><div class="dishes" id="weekBody"></div>`;
  paint(today);
  week.addEventListener('click', e => {
    const b = e.target.closest('[data-d]'); if (!b) return;
    week.querySelectorAll('[data-d]').forEach(x => x.setAttribute('aria-selected', x === b));
    paint(+b.dataset.d);
  });
}
