/*
PRAVIDLA HRY:

- Hra má dva hráče, kteří se střídají každé kolo
- V každé kole hází hráč kostkou kolikrát chce. Hodnota každého hodu se přičítá k jeho bodů v daném kole.
- Pokud na kostce padne 1, ztrácí všechny body v daném kole a na řadu se dostává hráč dvě.
- Hráč může zvolit "dost", což znamená, že všechny body nahrané v jeho kole se přičtou k jeho celkovým bodům. Poté je na řadě hráč dvě.
- Hra končí jakmile jeden z hráčů dosáhne dopředu určeného počtu bodů (typicky 100 bodů).

*/

let body;
let bodyVKole;
let aktivniHrac;
let kostka;
let koncoveBody;
let hraProbiha;

init();

document.querySelector(".kostka").style.display = 'none'; 

document.querySelector('.tlacitko-hod').addEventListener('click', function() {
if (hraProbiha) {
    // nahodne cislo
    kostka = Math.floor(Math.random() * 6) + 1;
    // zobrazit vysledek
    let kostkaDOM = document.querySelector('.kostka');
    kostkaDOM.style.display = 'block';
    kostkaDOM.textContent = kostka;
    //aktualizovat body kola pokud padla/nepadla 1
    if (kostka !== 1) {
        // pricti body
        bodyVKole += kostka;
        document.querySelector('#soucasne-' + aktivniHrac).textContent = bodyVKole;
    } else {
        // prepni hrace
        // if (aktivniHrac === 0) {
        //     aktivniHrac = 1;
        // } else {
        //     aktivniHrac = 0;
        // };
        dalsiHrac();

    };
}
});

document.querySelector('.tlacitko-dost').addEventListener('click', function (){
    if (hraProbiha) {
        // pridat soucasne body k celkovym bodum hrace
        body[aktivniHrac] += bodyVKole;
        // aktualizovat UI - zobrazit nahrane body
        document.querySelector('#body-' + aktivniHrac).textContent = body[aktivniHrac]
        // zkontrolovat, zda hrac jiz vyhral
        if (body[aktivniHrac] >= koncoveBody) {
            document.querySelector('#jmeno-' + aktivniHrac).textContent = "Vítěz!";
            document.querySelector('.hrac-' + aktivniHrac + '-panel').classList.remove('aktivni'); 
            document.querySelector('.hrac-' + aktivniHrac + '-panel').classList.add('vitez');   
            document.querySelector('.kostka').style.display = 'none';
            hraProbiha = false;
        } else {
            // prepnout hrace
            dalsiHrac();
        }   
    }    
});

function dalsiHrac() {
    aktivniHrac === 0 ? aktivniHrac = 1 : aktivniHrac = 0;
    bodyVKole = 0;

    document.getElementById('soucasne-0').textContent = '0';
    document.getElementById('soucasne-1').textContent = '0';
    //prepnout aktivni tridu
    document.querySelector('.hrac-0-panel').classList.toggle('aktivni');
    document.querySelector('.hrac-1-panel').classList.toggle('aktivni');
};

document.querySelector('.tlacitko-novy').addEventListener('click', init);

function init() {
    body = [0, 0];
    aktivniHrac = 0;
    bodyVKole = 0;
    koncoveBody = 100;
    hraProbiha = true;

    document.querySelector(".kostka").style.display = 'none'; 

    document.getElementById('body-0').textContent = '0';
    document.getElementById('body-1').textContent = '0';
    document.getElementById('soucasne-0').textContent = '0';
    document.getElementById('soucasne-1').textContent = '0';   

    document.querySelector('#jmeno-0').textContent = "Hráč 1";
    document.querySelector('#jmeno-1').textContent = "Hráč 2";

    document.querySelector('.hrac-0-panel').classList.remove('aktivni');
    document.querySelector('.hrac-1-panel').classList.remove('aktivni');
    document.querySelector('.hrac-0-panel').classList.remove('vitez');
    document.querySelector('.hrac-1-panel').classList.remove('vitez');
    document.querySelector('.hrac-0-panel').classList.add('aktivni');
};