
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('searchInput');
    const addTaskButton = document.getElementById('addBtn');
    const taskList = document.getElementById('AnimeItems');


    

     const addTask = (event) => {
        event.preventDefault(); /* Förhindrar att sidan laddas om när knappen klickas */
        const taskText = taskInput.value.trim();
        if (!taskText){ /* Om inget är ifyllt i inputfältet, returnera */
        return;
        }

        const li = document.createElement('li');
        li.textContent = taskText; /* gör så den text som skrivs in i inputfältet blir texten i listan */
        taskList.appendChild(li);
        taskInput.value = ''; /* Tömmer input fältet efter att man lagt till en uppgift */
    };

addTaskButton.addEventListener('click', addTask); /* när knappar klickas, körs lyssnare som gör rekomenderat i funktionen addTask */
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask(e);
    }
});








});