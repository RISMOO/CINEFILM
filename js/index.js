/**
    * @description      : 
    * @author           : mauri
    * @group            : 
    * @created          : 28/07/2021 - 20:19:35
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 28/07/2021
    * - Author          : mauri
    * - Modification    : 
**/
const form = document.getElementById('searchForm')
const searchInput = document.getElementById('searchInput')
const result = document.getElementById('result')
let rechercher = document.getElementById('rechercher')

let movies = [];
let search = '';
const fetchMovies = async () => {
    //va chercher sur l'api 
    movies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=f7f86c0190c2232169179191904f6de6&query=${search}`)
        //apres query on rajoute la variable dynamique qui retournera le resultat
        .then((res) => res.json()); //on converti le résultat en json
    console.log(movies)
};
//movies appele l'api 
const moviesDisplay = async () => {
    await fetchMovies(); //retour de l'api de la fonction précedente
    //on affichera seulement 12 films
    movies.results.length = 12;
    result.innerHTML = movies.results.map(
        (movie) =>
            //pour recuperer l'image sur lapi https://developers.themoviedb.org/3/getting-started/images
            `<li>
<h2>
${movie.original_title}
</h2>
<div class="card-content">

<img src ="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>
<div class="infos">
<p>${movie.overview} </p>
<p>Popularité : ${movie.popularity} ⭐</p>
<p style="color:red;">Date de sortie : <strong>${movie.release_date}</strong></p>
</div>
</div>
</li>`
    )
        .join(""); //enleve la virgule entre chaque élementq
};



form.addEventListener("submit", (e) => {
    e.preventDefault(); // on annule le comportement par default de la page 
    //on recupere la valeur de notre input 
    //console.log(searchInput.value);

    search = searchInput.value;
    if (search) {
        var btn = document.createElement("button");
        btn.classList.add("newbutton");
        btn.innerHTML = "RESET";
        document.body.appendChild(btn);
       
        btn.addEventListener("click", function () {

            result.innerText = "";
            searchInput.value ="";
            document.getElementById('rechercher').disabled = false;
            btn.remove();

        });

        //fetchMovies(); //on appelle la fonction
        //on appele la fonction
        document.getElementById('rechercher').disabled = true;

        moviesDisplay();


    }
});









