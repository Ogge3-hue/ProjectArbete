
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('searchInput');
    const addTaskButton = document.getElementById('addBtn');
    const taskList = document.getElementById('AnimeItems');
    const notWatchedBtn = document.getElementById('notWatchedBtn');
    const watchedBtn = document.getElementById('watchedBtn');
    let currentFilter = 'not-watched'; /* 'all', 'watched', 'not-watched' */

    /* Funktion för att filtrera anime-items - centraliserad: sätter currentFilter, uppdaterar knappar och renderar */
const filterItems = (filter) => {
    currentFilter = filter;
    
 // uppdatera active-klass på filterknapparna
    if (notWatchedBtn) { if (filter === 'not-watched') notWatchedBtn.classList.add('active');
       else notWatchedBtn.classList.remove('active');
    }
    if (watchedBtn) { if (filter === 'watched') watchedBtn.classList.add('active');
        else watchedBtn.classList.remove('active');
    }
    renderItems();
};

const readList = () => { // Anime Lista Array, ID/Title/watched? 
const raw = localStorage.getItem('animeList'); 
//hämtar data från localStorage, om det inte finns så returnerar den en tom array
    if (!raw) return [];
    try { const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
// gammal data blir till strings
    return parsed.map(entry => {
        if (typeof entry === 'string') { return { id: `id-${Date.now()}-${Math.random()}`, title: entry, watched: false };
}
// kollar så id och watched finns
    return {id: entry.id || `id-${Date.now()}-${Math.random()}`,
title: entry.title || '',
watched: !!entry.watched,};
});} 
catch (e) {return [];}
};

const writeList = (arr) => localStorage.setItem('animeList', JSON.stringify(arr)); 
//sparar till localstorage, skriver hela listan som json.
const addAnime = (title) => { const list = readList();
// nytt item i listan, med id (watched=false) så den ligger i not watched.
const item = { id: `id-${Date.now()}-${Math.random()}`, title, watched: false };
list.push(item);
writeList(list);

};

const deleteAnime = (id) => { const list = readList().filter(i => i.id !== id);
writeList(list);
};

const toggleWatched = (id) => { const list = readList();
const idx = list.findIndex(i => i.id === id);
if (idx > -1) { list[idx].watched = !list[idx].watched; writeList(list);}
// togglar watched status(bolean från false till true), så den flyttas mellan watched och not watched
};

const updateTitle = (id, newTitle) => { const list = readList();
const idx = list.findIndex(i => i.id === id); //hitta item via ID, ändra titel och sparar.
    if (idx > -1) { list[idx].title = newTitle; writeList(list);}
};


// Rendrar från anime-list där titlarna vet om det är watched
const renderItems = () => { taskList.innerHTML = '';
const list = readList();
    let itemsToShow = [];
        if (currentFilter === 'watched') itemsToShow = list.filter(i => i.watched);
        else itemsToShow = list.filter(i => !i.watched);

itemsToShow.forEach(item => { const li = document.createElement('li');
    li.dataset.id = item.id;
    li.className = item.watched ? 'watched' : '';
    li.innerHTML = `
        <span>${item.title}</span>
        <button class="delete-btn"><img src="Delete.png" alt="Delete"></button>
        <button class="edit-btn"><img src="Edit.png" alt="Edit"></button>
        ${item.watched ? '<button class="unwatch-btn"><img src="Bakpilen.png" alt="Unwatch"></button>' :
        '<button class="watched-btn"><img src="Check.png" alt="Watched"></button>'}`;
attachListenersToLi(li, item);
taskList.appendChild(li);});
};

function attachListenersToLi(li, item) { const id = item.id;
// kopplar knapparna till sina funktioner, watched/unwatched.
const deleteBtn = li.querySelector('.delete-btn');
const editBtn = li.querySelector('.edit-btn');
const watchedBtn = li.querySelector('.watched-btn');
const unwatchBtn = li.querySelector('.unwatch-btn');
    if (deleteBtn) deleteBtn.addEventListener('click', () => { deleteAnime(id); renderItems(); });
    if (watchedBtn) watchedBtn.addEventListener('click', () => { toggleWatched(id); renderItems(); });
    if (unwatchBtn) unwatchBtn.addEventListener('click', () => { toggleWatched(id); renderItems(); });
    if (editBtn) {editBtn.addEventListener('click', () => { const span = li.querySelector('span');

const existingInput = li.querySelector('input[type="text"]');
    if (existingInput) return;

const current = span.textContent;
const input = document.createElement('input');
    input.type = 'text';
    input.value = current;
    li.replaceChild(input, span);
    input.focus();

const save = () => {
const v = input.value.trim();
    if (v) updateTitle(id, v);
    renderItems();};

    input.addEventListener('blur', save);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') save(); });
});}}

// Filter knapparna klickhändelser, ändrar currentFilter och renderar om listan.
notWatchedBtn.addEventListener('click', () => { filterItems('not-watched'); });

watchedBtn.addEventListener('click', () => { filterItems('watched'); });

// Initiala tillståndet: visa not-watched
filterItems('not-watched');

// Lägg till anime titel
const addTask = (event) => { event.preventDefault();
const text = taskInput.value.trim();
    if (!text) return;
addAnime(text);
taskInput.value = '';
    renderItems();};

addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTask(e); });});