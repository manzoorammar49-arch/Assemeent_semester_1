const contactForm = document.getElementById('contactform');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {

        event.preventDefault(); // Prevent the default form submission 
        document.getElementById('success-message').classList.remove('d-none'); // Show the success message 
        contactForm.reset(); // Reset the form fields
    });
}

// PROJECT DETAILS PAGE (F05)
// The link looks like project_details.html?project=garden
// All the projects are already on the page but hidden (d-none).
// This code finds the one named in the link and shows it.
var projectDetailsPage = document.getElementById("projectDetailsPage");
if (projectDetailsPage) {
    var linkInfo = new URLSearchParams(window.location.search);   // read the link
    var projectName = linkInfo.get("project");                     // e.g. "garden"
    var chosenProject = document.getElementById("project-" + projectName);

    if (chosenProject) {
        chosenProject.classList.remove("d-none");   // show the project
    } else {
        document.getElementById("projectNotFound").classList.remove("d-none");   // wrong link
    }
}

// ALL PROJECTS (used by search, bookmarks and recommendations)
// If you add a new project to project_details.html, add it here too.
// id = the bit after ?project= in the link
var allProjects = [
    { id: "garden",    title: "Garden makeover",       category: "garden",     image: "garden_makeover.jpg",     tags: "garden step farm recycled wood bricks plants herbs outdoor" },
    { id: "shelves",   title: "Dry wall Shelves",      category: "building",   image: "drywall_shelves.jpg",     tags: "shelves drywall storage wall wood frame building" },
    { id: "bedroom",   title: "Painting my bedroom",   category: "painting",   image: "bedroom_painting.jpg",    tags: "bedroom paint walls colour roller indoor" },
    { id: "kitchen",   title: "Kitchen Renovation",    category: "renovation", image: "kitchen_renovation.jpg",  tags: "kitchen cupboards worktop tiles renovation" },
    { id: "floor",     title: "Laminated floor",       category: "renovation", image: "laminating_floor.jpg",    tags: "floor laminate flooring boards underlay renovation" },
    { id: "vegetable", title: "Vegetable Garden",      category: "garden",     image: "vegetabe_garden.jpg",     tags: "vegetable garden grow food raised beds soil outdoor" },
    { id: "bathroom",  title: "Bathroom Renovation",   category: "renovation", image: "bathroom_renovation.jpg", tags: "bathroom shower tiles vanity renovation plumbing" },
    { id: "fence",     title: "Painting the Fence",    category: "painting",   image: "painting_fence.jpg",      tags: "fence paint spray gun garden outdoor" },
    { id: "ikea",      title: "Building IKEA Shelves", category: "building",   image: "building_ikea.jpg",       tags: "ikea flat pack shelves furniture building" }
];

// Finds one project in the list above by its id
function findProject(id) {
    for (var i = 0; i < allProjects.length; i++) {
        if (allProjects[i].id === id) {
            return allProjects[i];
        }
    }
    return null;
}


// SAVING THINGS IN THE BROWSER
// We do not have a server or database, so things people add (tips, comments,
// likes...) are saved in the browser with localStorage.
// localStorage can only store text, so lists are turned into text with JSON.

// Gets a saved list. If nothing is saved yet, gives back an empty list []
function loadList(name) {
    var saved = localStorage.getItem(name);
    if (saved) {
        return JSON.parse(saved);
    }
    return [];
}

// Saves a list
function saveList(name, list) {
    localStorage.setItem(name, JSON.stringify(list));
}

// Stops people typing HTML code into a form and breaking the page.
// e.g. "<b>hi</b>" is shown as the text <b>hi</b> instead of bold "hi"
function safeText(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// Today's date written nicely, e.g. "19 November 2026"
function todayText() {
    return new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

// The name of the person logged in, or "" if nobody is logged in
function currentUserName() {
    if (localStorage.getItem("loggedIn") === "yes") {
        return localStorage.getItem("userName") || "";
    }
    return "";
}


// KEYWORD SEARCH (F03)
// Only runs on the homepage, because that is the only page with the search box.
// (Before, this ran on every page and crashed, which stopped the login code working.)
var searchButton = document.getElementById('searchButton');
var searchInput = document.getElementById('searchInput');
var searchResults = document.getElementById('searchResults');

if (searchButton && searchInput && searchResults) {

    searchButton.addEventListener('click', runSearch);

    // Pressing Enter in the box also searches
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            runSearch();
        }
    });
}

function runSearch() {
    var searchTerm = searchInput.value.toLowerCase().trim();
    var html = '';

    for (var i = 0; i < allProjects.length; i++) {
        var project = allProjects[i];
        var text = (project.title + ' ' + project.category).toLowerCase();
        if (searchTerm !== '' && text.includes(searchTerm)) {
            // Each result is a link to the project page
            html += '<a class="d-block py-2" href="project_details.html?project=' + project.id + '">' + project.title + '</a>';
        }
    }

    if (html !== '') {
        searchResults.innerHTML = html;
    } else {
        searchResults.innerHTML = '<p class="py-2 mb-0">No results found.</p>';
    }
}




// LOGIN FORM

var loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        document.getElementById("message").textContent = "Login button pressed successfully!";
        document.getElementById("message").style.color = "green";

    });

}

// SIGN UP FORM

var signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        var name = document.getElementById("signupName").value;
        var email = document.getElementById("signupEmail").value;
        var password = document.getElementById("signupPassword").value;

        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);

        document.getElementById("signupMessage").textContent = "Account created successfully!";
        document.getElementById("signupMessage").style.color = "green";

        signupForm.reset();

    });

}






// SUBMIT A TIP, GUIDE OR RECOMMENDATION (F06)
// Used on submit_tip.html (the form and the list) and index.html (latest tips).
// Every post is saved in a list called "homehubPosts".
// Each post looks like:
//   { type: "tip", title: "...", category: "garden", text: "...", author: "...", date: "..." }

var tipForm = document.getElementById("tipForm");

if (tipForm) {

    // If someone is logged in, fill in their name for them
    var tipAuthorBox = document.getElementById("tipAuthor");
    if (currentUserName() !== "") {
        tipAuthorBox.value = currentUserName();
    }

    tipForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var newPost = {
            type: document.getElementById("tipType").value,
            title: document.getElementById("tipTitle").value.trim(),
            category: document.getElementById("tipCategory").value,
            text: document.getElementById("tipText").value.trim(),
            author: tipAuthorBox.value.trim() || "Anonymous",
            date: todayText()
        };

        // Add the new post to the start of the list, so newest is first
        var posts = loadList("homehubPosts");
        posts.unshift(newPost);
        saveList("homehubPosts", posts);

        document.getElementById("tipMessage").classList.remove("d-none");
        tipForm.reset();
        if (currentUserName() !== "") {
            tipAuthorBox.value = currentUserName();
        }

        showPosts("allPosts", 100);
    });
}

// Makes the HTML for one post card
function postCard(post) {
    // A different colour badge for each type of post
    var badgeColours = { tip: "bg-success", guide: "bg-primary", recommendation: "bg-warning text-dark" };
    var badge = badgeColours[post.type] || "bg-secondary";

    return '<div class="col-md-6 col-lg-4">' +
               '<div class="card h-100 shadow-sm border-start border-success border-4">' +
                   '<div class="card-body">' +
                       '<span class="badge ' + badge + ' text-capitalize mb-2">' + safeText(post.type) + '</span> ' +
                       '<span class="badge bg-light text-dark text-capitalize mb-2">' + safeText(post.category) + '</span>' +
                       '<h5 class="card-title">' + safeText(post.title) + '</h5>' +
                       '<p class="card-text">' + safeText(post.text) + '</p>' +
                       '<p class="text-muted small mb-0">By ' + safeText(post.author) + ' &middot; ' + safeText(post.date) + '</p>' +
                   '</div>' +
               '</div>' +
           '</div>';
}

// Shows up to "howMany" posts inside the box with the id "boxId"
function showPosts(boxId, howMany) {
    var box = document.getElementById(boxId);
    if (!box) {
        return;
    }

    var posts = loadList("homehubPosts");
    var html = "";
    for (var i = 0; i < posts.length && i < howMany; i++) {
        html += postCard(posts[i]);
    }

    if (html === "") {
        html = '<p class="text-muted text-center">No tips shared yet. Be the first!</p>';
    }
    box.innerHTML = html;
}

showPosts("allPosts", 100);     // submit_tip.html shows every post
showPosts("latestPosts", 3);    // index.html shows the newest 3



// PHOTO GALLERY (F07)
// Only runs on gallery.html
var galleryGrid = document.getElementById("galleryGrid");

if (galleryGrid) {

    var galleryPhotos = [];   // the projects being shown right now
    var currentPhoto = 0;     // which photo is open in the pop-up

    // Shows the photos for one category ("all" shows every photo)
    function showGallery(category) {
        galleryPhotos = [];
        var html = "";

        for (var i = 0; i < allProjects.length; i++) {
            if (category === "all" || allProjects[i].category === category) {
                galleryPhotos.push(allProjects[i]);
                var number = galleryPhotos.length - 1;
                html += '<div class="col-6 col-md-4 col-lg-3">' +
                            '<img src="' + allProjects[i].image + '" alt="' + allProjects[i].title + '"' +
                            ' class="gallery-photo shadow-sm" data-number="' + number + '" tabindex="0">' +
                            '<p class="small text-center mt-1 mb-0">' + allProjects[i].title + '</p>' +
                        '</div>';
            }
        }
        galleryGrid.innerHTML = html;
    }

    // Puts photo number "number" in the pop-up
    function openPhoto(number) {
        // Go round in a loop: after the last photo comes the first one again
        if (number < 0) {
            number = galleryPhotos.length - 1;
        }
        if (number >= galleryPhotos.length) {
            number = 0;
        }
        currentPhoto = number;

        var project = galleryPhotos[number];
        document.getElementById("photoModalTitle").textContent = project.title;
        document.getElementById("photoModalImage").src = project.image;
        document.getElementById("photoModalImage").alt = project.title;
        document.getElementById("photoModalLink").href = "project_details.html?project=" + project.id;
    }

    var photoModal = new bootstrap.Modal(document.getElementById("photoModal"));

    // Clicking (or pressing Enter on) a photo opens the pop-up
    galleryGrid.addEventListener("click", function(event) {
        if (event.target.classList.contains("gallery-photo")) {
            openPhoto(Number(event.target.getAttribute("data-number")));
            photoModal.show();
        }
    });
    galleryGrid.addEventListener("keydown", function(event) {
        if (event.key === "Enter" && event.target.classList.contains("gallery-photo")) {
            openPhoto(Number(event.target.getAttribute("data-number")));
            photoModal.show();
        }
    });

    document.getElementById("photoPrev").addEventListener("click", function() {
        openPhoto(currentPhoto - 1);
    });
    document.getElementById("photoNext").addEventListener("click", function() {
        openPhoto(currentPhoto + 1);
    });

    // The category buttons
    var galleryButtons = document.querySelectorAll("#galleryButtons button");
    for (var b = 0; b < galleryButtons.length; b++) {
        galleryButtons[b].addEventListener("click", function() {
            // Make the clicked button green and the others outlined
            for (var j = 0; j < galleryButtons.length; j++) {
                galleryButtons[j].className = "btn btn-outline-success rounded-pill px-4";
            }
            this.className = "btn btn-success rounded-pill px-4";
            showGallery(this.getAttribute("data-category"));
        });
    }

    showGallery("all");
}
