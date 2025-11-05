const cl = console.log;

// ==== DOM ELEMENTS ====
const showModelbtn = document.getElementById("showModelbtn");
const movieModel = document.getElementById("movieModel");
const backDrop = document.getElementById("backDrop");
const movieContainer = document.getElementById("movieContainer");
const movieForm = document.getElementById("movieForm");

const closeModel = [...document.querySelectorAll(".closeModel")];

const addMovieBtn = document.getElementById("addMovieBtn");
const updateMovieBtn = document.getElementById("updateMovieBtn");

const movieTitleControl = document.getElementById("movieTitle");
const movieImgurlControl = document.getElementById("movieImgurl");
const movieDescriptionControl = document.getElementById("movieDescription");
const movieRatingControl = document.getElementById("movieRating");

// ==== MOVIE DATA ====
let moviesArr = [
    { id: 1, title: "Demon Slayer: Kimetsu no Yaiba", year: 2019, rating: 3.9, image: "https://www.themoviedb.org/t/p/w1280/aFRDH3P7TX61FVGpaLhKr6QiOC1.jpg", description: "Tanjiro Kamado joins the Demon Slayer Corps after demons slaughter his family and curse his sister." },
    { id: 2, title: "Death Note", year: 2006, rating: 3.8, image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/qDhbGqjZ7yFwa7FMIzuiQTQMfEQ.jpg", description: "A high school student discovers a notebook with deadly powers and sets out to rid the world of criminals." },
    { id: 3, title: "Naruto: Shippuden", year: 2007, rating: 4.3, image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/bBqEiQbbfyt4MWR3NhDZMbS4Wp8.jpg", description: "Naruto Uzumaki continues his journey to become Hokage, facing powerful enemies and protecting his friends." },
    { id: 4, title: "Jujutsu Kaisen", year: 2020, rating: 3.6, image: "https://image.tmdb.org/t/p/w440_and_h660_face/gdIrmf2DdY5mgN6ycVP0XlzKzbE.jpg", description: "A boy swallows a cursed object and joins a school of sorcerers to fight deadly curses." },
    { id: 5, title: "One Punch Man", year: 2015, rating: 4.3, image: "https://image.tmdb.org/t/p/w440_and_h660_face/iE3s0lG5QVdEHOEZnoAxjmMtvne.jpg", description: "Saitama is a superhero who can defeat any opponent with a single punch but struggles with boredom and purpose." },
    { id: 6, title: "My Hero Academia", year: 2016, rating: 3.5, image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/tTrI6PwqzxkgO3dvQ7BEKXM7SYR.jpg", description: "In a world where most people have superpowers, a powerless boy dreams of becoming the greatest hero." },
    { id: 7, title: "Dragon Ball Z", year: 1989, rating: 4.5, image: "https://image.tmdb.org/t/p/w440_and_h660_face/6VKOfL6ihwTiB5Vibq6QTfzhxA6.jpg", description: "Goku and his friends defend Earth from powerful foes in epic battles spanning the universe." },
    { id: 8, title: "Hunter x Hunter", year: 2011, rating: 2.4, image: "https://image.tmdb.org/t/p/w440_and_h660_face/ucpgmUR1h5Te1BYegKItoPjOeF7.jpg", description: "Gon Freecss becomes a Hunter to find his missing father while facing dangerous adventures and enemies." }
];


if (localStorage.getItem("moviesArr")) {
    moviesArr = JSON.parse(localStorage.getItem("moviesArr"));
}

const uuid = () => {
    return String("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
};

const setBadgeClass = (rating) => {
    if (rating >= 4.5) return "badge-success";
    if (rating >= 3.5) return "badge-warning";
    return "badge-danger";
};

// ==== CREATE MOVIE CARDS ====
const createMovieCards = (arr) => {
    let result = "";
    arr.forEach((movie) => {
        result += `
        <div class="col-md-3 col-sm-6" id="${movie.id}">
            <div class="card movieCard text-white">
                <div class="card-header bg-dark text-white text-center">
                    <div class="row">
                        <div class="col-10">
                            <h2 class="m-0">${movie.title}</h2>
                        </div>
                        <div class="col-2 d-flex justify-content-start align-items-center">
                            <span class="badge ${setBadgeClass(movie.rating)}">${movie.rating}</span>
                        </div>
                    </div>
                </div>
                <div class="card-body p-0">
                    <figure>
                        <img src="${movie.image}" alt="${movie.title}" title="${movie.title}" class="img-fluid">
                        <figcaption>
                            <h5>${movie.title}</h5>
                            <p>${movie.description}</p>
                        </figcaption>
                    </figure>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-sm btn-warning" onclick="onEdit(this)">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="onRemove(this)">Remove</button>
                </div>
            </div>
        </div>`;
    });
    movieContainer.innerHTML = result;
};

createMovieCards(moviesArr);

// ==== ADD MOVIE ====
const onMovieAdd = (eve) => {
    eve.preventDefault();

    const movieObj = {
        id: uuid(),
        title: movieTitleControl.value,
        image: movieImgurlControl.value,
        description: movieDescriptionControl.value,
        rating: parseFloat(movieRatingControl.value)
    };

    moviesArr.unshift(movieObj);
    localStorage.setItem("moviesArr", JSON.stringify(moviesArr));
    createMovieCards(moviesArr);


    movieForm.reset();
    addMovieBtn.classList.remove("d-none");
    updateMovieBtn.classList.add("d-none");
    onModelToggle();

    Swal.fire("Added!", "New Movie added successfully!", "success");
};

// ==== REMOVE MOVIE ====
const onRemove = (ele) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You want to remove this movie?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#dc3545",
        confirmButtonText: "Yes, remove it!"
    }).then((result) => {
        if (result.isConfirmed) {
            const REMOVE_ID = ele.closest(".col-md-3").id;
            const index = moviesArr.findIndex((m) => m.id == REMOVE_ID);
            if (index > -1) {
                moviesArr.splice(index, 1);
                localStorage.setItem("moviesArr", JSON.stringify(moviesArr));
                ele.closest(".col-md-3").remove();

                Swal.fire("Deleted!", "Movie has been removed successfully.", "success");
            }
        }
    });
};

// ==== EDIT MOVIE ====
const onEdit = (ele) => {
    const EDIT_ID = ele.closest(".col-md-3").id;
    localStorage.setItem("EDIT_ID", EDIT_ID);

    const EDIT_OBJ = moviesArr.find((movie) => movie.id == EDIT_ID);

    movieTitleControl.value = EDIT_OBJ.title;
    movieImgurlControl.value = EDIT_OBJ.image;
    movieDescriptionControl.value = EDIT_OBJ.description;
    movieRatingControl.value = EDIT_OBJ.rating;

    onModelToggle();
    addMovieBtn.classList.add("d-none");
    updateMovieBtn.classList.remove("d-none");
};

// ==== UPDATE MOVIE ====
const onMovieUpdate = () => {
    const editID = localStorage.getItem("EDIT_ID");
    ///localStorage.removeItem("EDIT_ID");
    movieForm.reset();

    const UPDATED_OBJ = {
        id: editID,
        title: movieTitleControl.value,
        image: movieImgurlControl.value,
        description: movieDescriptionControl.value,
        rating: parseFloat(movieRatingControl.value)
    };

    const index = moviesArr.findIndex(m => m.id == editID);
    moviesArr[index] = UPDATED_OBJ;
    localStorage.setItem("moviesArr", JSON.stringify(moviesArr))
    // Update specific card
    const card = document.getElementById(editID);

    card.innerHTML = `
            <div class="card movieCard text-white">
                <div class="card-header bg-dark text-white text-center">
                    <div class="row">
                        <div class="col-10">
                            <h2 class="m-0">${UPDATED_OBJ.title}</h2>
                        </div>
                        <div class="col-2 d-flex justify-content-start align-items-center">
                            <span class="badge ${setBadgeClass(UPDATED_OBJ.rating)}">${UPDATED_OBJ.rating}</span>
                        </div>
                    </div>
                </div>
                <div class="card-body p-0">
                    <figure>
                        <img src="${UPDATED_OBJ.image}" alt="${UPDATED_OBJ.title}" title="${UPDATED_OBJ.title}" class="img-fluid">
                        <figcaption>
                            <h5>${UPDATED_OBJ.title}</h5>
                            <p>${UPDATED_OBJ.description}</p>
                        </figcaption>
                    </figure>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-sm btn-warning" onclick="onEdit(this)">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="onRemove(this)">Remove</button>
                </div>
            </div>
        `;



    movieForm.reset();
    addMovieBtn.classList.remove("d-none");
    updateMovieBtn.classList.add("d-none");


    Swal.fire({
        title: "Updated!",
        text: "Movie details updated successfully!",
        icon: "success",
        timer: 2000,
        confirmButtonColor: "#212529",
    });

}



// ==== MODAL TOGGLE ====
function onModelToggle() {
    movieModel.classList.toggle("active");
    backDrop.classList.toggle("active");
}

// ==== EVENT LISTENERS ====
closeModel.forEach((btn) => btn.addEventListener("click", onModelToggle));
showModelbtn.addEventListener("click", onModelToggle);

movieForm.addEventListener("submit", onMovieAdd);
updateMovieBtn.addEventListener("click", onMovieUpdate);


