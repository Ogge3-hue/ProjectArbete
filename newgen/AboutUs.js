document.addEventListener('DOMContentLoaded', function() {
    const randomizerGame = document.querySelector('.randomizer-game');
    const randomizeBtn = document.getElementById('randomize-btn');
    const animeResult = document.getElementById('anime-result');
    const storageKey = 'savedAnime';



 if (randomizeBtn) {
    // kallar tillbaka sparat resultat från localStorage om det finns, annars visar randomize-knappen
    const saved = localStorage.getItem(storageKey);
    if (saved) {
        animeResult.textContent = saved;
        randomizeBtn.textContent = 'Clear Saved';
    } else {
        randomizeBtn.textContent = 'Randomize';
    }
    
    randomizeBtn.addEventListener('click', function() {
        // visa sparat resultat om det finns, annars randomisera nytt
        const currentlySaved = localStorage.getItem(storageKey);
        if (currentlySaved) {
            localStorage.removeItem(storageKey);
            animeResult.textContent = '';
            randomizeBtn.textContent = 'Randomize';
            return;
        }

        const animeList = [ // listan av alternativen för randomizer
            "Attack on Titan",
            "Demon Slayer",
            "My Hero Academia",
            "Jujutsu Kaisen",
            "One Piece",
            "Naruto",
            "Bleach",
            "Dragon Ball Z",
            "Hells Paradise",
            "Tokyo Revengers",
            "Fullmetal Alchemist: Brotherhood",
            "Death Note",
            "Sword Art Online",
            "One Punch Man",
            "Mob Psycho 100",
            "Black Clover",
            "Fairy Tail",
            "Haikyuu!!",
            "Blue Lock",
            "Mashle: Magic and Muscles",
            "Fire Force",
            "Spy x Family",
            "Berserk",
            "Vinland Saga",
            "Akame ga Kill!",  
            "The Rising of the Shield Hero",
            "Made in Abyss",
            "The Promised Neverland",
            "Dr. Stone",
            "Cyberpunk: Edgerunners",
            "Chainsaw Man",
            "Tokyo Ghoul",
            "Parasyte: The Maxim",
            "Erased",
            "Hunter X Hunter",
            "Gachiakuta",
            "Oshi no Ko",
            "Frieren: Beyond Journey's End",
            "Blue Period",
            "Dorohedoro",
            "Kingdom",
            "Tougen Anki",
            "Fate Strange Fake",
            "MF Ghost",
            "Kaguya-sama: Love is War",
            "The Quintessential Quintuplets",
            "Mushuko Tensei: Jobless Reincarnation",
            "The Ancient Magus' Bride",
            "86: Eighty-Six",
            "The Devil is a Part-Timer!",
            "Re:Zero - Starting Life in Another World",
            "My dress-up darling",
            "Horimiya",
            "The apothecary diaries",
            "Kaiju No. 8",
            "Sword Art Online",
            "DAN DA DAN",
            "The Eminence in Shadow",
            "Assassination Classroom"


        ];
        const randomAnime = animeList[Math.floor(Math.random() * animeList.length)];
        animeResult.textContent = randomAnime; //random anime visas i resultatdiven
        localStorage.setItem(storageKey, randomAnime);
    });
 }


});