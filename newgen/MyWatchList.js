
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('searchInput');
    const addTaskButton = document.getElementById('addBtn');
    const taskList = document.getElementById('AnimeItems');
    const allBtn = document.getElementById('allBtn');
    const watchedBtn = document.getElementById('watchedBtn');
    let currentFilter = 'not-watched'; /* 'all', 'watched', 'not-watched' */

    /* Funktion för att filtrera anime-items */
    const filterItems = (filter) => {
        const items = taskList.querySelectorAll('li');
        items.forEach(item => {
            if (filter === 'all') {
                item.style.display = '';
            } else if (filter === 'watched') {
                item.style.display = item.classList.contains('watched') ? '' : 'none';
            } else if (filter === 'not-watched') {
                item.style.display = !item.classList.contains('watched') ? '' : 'none';
            }
        });
    };

    /* Event listeners för filter-knapparna */
    allBtn.addEventListener('click', () => {
        currentFilter = 'not-watched';
        allBtn.classList.add('active');
        watchedBtn.classList.remove('active');
        filterItems(currentFilter);
    });
    watchedBtn.addEventListener('click', () => {
        currentFilter = 'watched';
        watchedBtn.classList.add('active');
        allBtn.classList.remove('active');
        filterItems(currentFilter);
    });

    /* Sätt initial active state */
    allBtn.classList.add('active');






    const addTask = (event) => {
        event.preventDefault(); /* Förhindrar att sidan laddas om när knappen klickas */
        const taskText = taskInput.value.trim();
        if (!taskText){ 
        return; /* Om inget är ifyllt i inputfältet, returnera */
        }

        const li = document.createElement('li'); 
        li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn"><img src="Delete.png" alt="Delete"></button>
        <button class="edit-btn"><img src="Edit.png" alt="Edit"></button>
        <button class="watched-btn"><img src="Check.png" alt="Watched"></button>
        `;/* checkar compleated och ta bort + lagit in bilderna i/och knapparna(vanlig html)*/







        /* Event listener för edit knappen */
        const editBtn = li.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            const span = li.querySelector('span');
            const existingInput = li.querySelector('input[type="text"]');

            /* Om du är i editing, klickar du på gula knappen är samma som enter*/
            if (existingInput) {
                const newText = existingInput.value.trim();
                if (newText) {
                    const newSpan = document.createElement('span');
                    newSpan.textContent = newText;
                    li.replaceChild(newSpan, existingInput);
                }
                const watchedBtnDuringEdit = li.querySelector('.watched-btn');
                if (watchedBtnDuringEdit) watchedBtnDuringEdit.style.display = '';
                return;
            }

            /* När du börjar edit, så ljusterar du texten/"span"*/
            const currentText = span.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;
            li.replaceChild(input, span);
            input.focus();

            const watchedBtnDuringEdit = li.querySelector('.watched-btn'); /* Gömmer den gröna knappen*/
            if (watchedBtnDuringEdit) watchedBtnDuringEdit.style.display = 'none';

            const saveEdit = () => {
                const newText = input.value.trim();
                if (newText) {
                    const newSpan = document.createElement('span');
                    newSpan.textContent = newText;
                    li.replaceChild(newSpan, input);
                }
                if (watchedBtnDuringEdit) watchedBtnDuringEdit.style.display = '';
            };

            input.addEventListener('blur', saveEdit); /*Skriver in, samt sparar det du skrivit även om du klickar utanför   */
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    saveEdit();
                }
            });
        });
        taskList.appendChild(li);
        

        /* Event listener för delete knappen */
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            li.remove();



            if (currentFilter === 'watched') { 
                /*om man är i listan watched, och tar bort sista list-alternativet
                så hoppar du tillbaka i not watched*/
                const remainingWatched = taskList.querySelectorAll('li.watched').length;
                if (remainingWatched === 0) {
                    currentFilter = 'not-watched';
                    allBtn.classList.add('active');
                    watchedBtn.classList.remove('active');
                    filterItems(currentFilter);
                }
            }
        });
        


        /* Event listener för watched knappen / den gröna knappen */
        const watchedBtnItem = li.querySelector('.watched-btn');
        watchedBtnItem.addEventListener('click', () => {
            li.classList.toggle('watched');
            if (li.classList.contains('watched')) {
                watchedBtnItem.remove(); /*tar bort ur watchlisten och flyttar till watched */
            }

            filterItems(currentFilter);
            if (currentFilter === 'watched') {
                const remainingWatched = taskList.querySelectorAll('li.watched').length;
                if (remainingWatched === 0) {
                    currentFilter = 'not-watched';
                    allBtn.classList.add('active');
                    watchedBtn.classList.remove('active');
                    filterItems(currentFilter);
                }
            }
        });
        
        taskInput.value = ''; /* Tömmer input fältet efter att man lagt till en uppgift */
    };

addTaskButton.addEventListener('click', addTask); /* när knappar klickas, lyssnar den */
taskInput.addEventListener('keypress', (e) => { /*kollar efter keypresses*/
    if (e.key === 'Enter') { /*Gör så enter,är trigger*/
        addTask(e); /* e är förkortning av event, som skickas till addTask funktionen */
    }

});

});