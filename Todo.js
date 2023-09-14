
const inputElement = document.getElementById('problems');
const createBtn = document.getElementById('button');
const listElement = document.getElementById('listElement');
const themeModeBtn = document.getElementById('themeMode');
let completed = false;
const listCookies = []
const notes = [
  // {
  //   title: 'www',
  //   completed: false,
  // },
];


// Функция рендеринга списка заметок из notes
function render() {
  listElement.innerHTML = '';
  // if (notes.length === 0) {
  //   listElement.innerHTML = '<p>Заметок нет</p>'
  // }
  for (let i = 0; i < notes.length; i++) {
    listElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i));
  }
}
render();

// Обработчик нажатия на кнопку 'Добавить'
createBtn.onclick = function () {
  if (inputElement.value.length === 0) {
    return;
  }
  const newNote = {
    title: inputElement.value,
    completed: false,
  };
  notes.push(newNote);
  render();
  inputElement.value = '';
};

// Обработчик конопок удаления/подтверждения
listElement.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = parseInt(event.target.dataset.index);
    const type = event.target.dataset.type;

    if (type === 'toggle') {
      notes[index].completed = !notes[index].completed;
    } else if (type === 'remove') {
      notes.splice(index, 1);
    }

    render();
  }
};

// Шаблон элемента списка задач
function getNoteTemplate(note, index) {
  return `
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span class="note-text ${
          note.completed ? 'text-decoration-line-through' : ''
        }">${note.title}</span>
    <div class='buttons'> 
        <button class="btn btn-small btn-${
          note.completed ? 'warning' : 'success'
        }" data-index="${index}" data-type="toggle"></button>
        <button class="btn btn-small btn-danger" data-type="remove" data-index="${index}"></button>
    </div>

      </li>
    `;
}

// Обработчик нажатия на кнопку смены темы
themeModeBtn.onclick = function () {
  let theme = document.getElementById('styleLink');
  let themeModeImg = document.getElementById('themeImg');

  if (theme.getAttribute('href') === '/css/light-theme.css') {
    theme.href = '/css/dark-theme.css';
    themeModeImg.src = '/images/theme_mode_dark.png';
  } else {
    theme.href = '/css/light-theme.css';
    themeModeImg.src = '/images/theme_mode_light.png';
  }
};

// Cookies object
const cookies = (function () {
  return {
    setCookie: (cname, cvalue, exdays) => {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      const expires = 'expires=' + d.toUTCString();
      document.cookie = cname + '=' + cvalue + '; ' + expires;
    },

    deleteCookie(cname) {
      this.setCookie(cname, '', -1);
    },

    getCookie: (cname) => {
      const name = cname + '=';
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i += 1) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
      }
      return '';
    },
    checkCookie: (cname) => {
      const cookie = window.CookieObj.getCookie(cname);
      if (cookie !== '') {
        return true;
      }
      return false;
    },
  };
})();
window.CookieObj = cookies;

// Функция сохранения куки
function saveCookies() {
    for (let i = 0; i < notes.length; i++) {
      cookies.setCookie(i, notes[i].title);
    }
}

// Функция, возвращающая список всех куки
function listCookie() {
  const cookiesList = []
  let cookie = document.cookie
  let cookieObjects = []
  let cookies = cookie.split(';').reduce(
      (cookies, cookie) => {
          const [name, val] = cookie.split('=').map(c => c.trim());
          cookies['id'] = name
          cookies['title'] = val
          cookiesList.push(cookies)
          return cookiesList;
      }, {});
  return cookiesList
}

// async function getCookiesList() {
//     let promiseCookies = await cookieStore.getAll();
//     if (promiseCookies) {
//       console.log(promiseCookies);
//     } else {
//       console.log("Cookie not found");
//     }
//     return cookies
// }

// getCookiesList()

const p = cookieStore.getAll()

p.then(() => {
  console.log('Promise resolved')
})