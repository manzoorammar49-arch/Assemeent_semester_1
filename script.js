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
        document.getElementById("projectExtras").classList.remove("d-none");   // comments etc. (F11)
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
// Checks the email and password against the account saved when signing up.
// If they match, it remembers that the person is logged in and opens their profile (F10).

var loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        var email = document.getElementById("loginEmail").value.trim().toLowerCase();
        var password = document.getElementById("loginPassword").value;
        var message = document.getElementById("message");

        var savedEmail = (localStorage.getItem("userEmail") || "").toLowerCase();
        var savedPassword = localStorage.getItem("userPassword");

        if (savedEmail === "") {
            message.textContent = "No account found. Please sign up first.";
            message.style.color = "red";
        } else if (email === savedEmail && password === savedPassword) {
            localStorage.setItem("loggedIn", "yes");
            message.textContent = "Logged in! Taking you to your profile...";
            message.style.color = "green";
            window.location.href = "profile.html";
        } else {
            message.textContent = "Wrong email or password. Please try again.";
            message.style.color = "red";
        }

    });

}

// SIGN UP FORM

var signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        var name = document.getElementById("signupName").value.trim();
        var email = document.getElementById("signupEmail").value.trim();
        var password = document.getElementById("signupPassword").value;

        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        localStorage.setItem("memberSince", todayText());
        localStorage.setItem("userBio", "");
        localStorage.setItem("loggedIn", "yes");   // log them in straight away (F10)

        document.getElementById("signupMessage").innerHTML = 'Account created successfully! <a href="profile.html">Go to your profile</a>';
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



// NAVBAR LOGIN BUTTON (F10)
// When someone is logged in, the green "Login" button in the navbar
// changes to "My profile" on every page.
var navLoginButton = document.querySelector('nav a.btn[href="login.html"]');
if (navLoginButton && currentUserName() !== "") {
    navLoginButton.textContent = "My profile";
    navLoginButton.href = "profile.html";
}


// USER PROFILE PAGE (F10)
// Only runs on profile.html
var profilePage = document.getElementById("profilePage");

if (profilePage) {

    if (currentUserName() === "") {
        // Nobody is logged in, so show the "please log in" box instead
        document.getElementById("profileLoggedOut").classList.remove("d-none");
    } else {
        profilePage.classList.remove("d-none");

        var userName = currentUserName();
        document.getElementById("profileName").textContent = userName;
        document.getElementById("profileEmail").textContent = localStorage.getItem("userEmail");
        document.getElementById("profileSince").textContent = localStorage.getItem("memberSince") || "2026";
        document.getElementById("profileInitial").textContent = userName.charAt(0).toUpperCase();
        document.getElementById("profileBio").value = localStorage.getItem("userBio") || "";

        // Save the "About me" box
        document.getElementById("profileForm").addEventListener("submit", function(event) {
            event.preventDefault();
            localStorage.setItem("userBio", document.getElementById("profileBio").value.trim());
            document.getElementById("profileSaved").classList.remove("d-none");
        });

        // Show the tips this person has shared (F06)
        var myPostsHtml = "";
        var myPostCount = 0;
        var everyPost = loadList("homehubPosts");
        for (var p = 0; p < everyPost.length; p++) {
            if (everyPost[p].author === userName) {
                myPostsHtml += postCard(everyPost[p]);
                myPostCount++;
            }
        }
        if (myPostsHtml === "") {
            myPostsHtml = '<p class="text-muted">You have not shared any tips yet. <a href="submit_tip.html">Share one now</a></p>';
        }
        document.getElementById("myPosts").innerHTML = myPostsHtml;
        document.getElementById("profileTipCount").textContent = myPostCount;

        // Log out button
        document.getElementById("logoutButton").addEventListener("click", function() {
            localStorage.setItem("loggedIn", "no");
            window.location.href = "index.html";
        });
    }
}



// COMMENTS AND DISCUSSION (F11)
// Only runs on project_details.html.
// All comments are saved in one list called "homehubComments".
// Each comment remembers which project it belongs to, e.g.
//   { project: "garden", name: "Sam", text: "Looks great!", date: "19 November 2026" }
var commentForm = document.getElementById("commentForm");

if (commentForm && projectName) {

    var commentNameBox = document.getElementById("commentName");
    if (currentUserName() !== "") {
        commentNameBox.value = currentUserName();   // fill in the name if logged in
    }

    commentForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var comments = loadList("homehubComments");
        comments.push({
            project: projectName,
            name: commentNameBox.value.trim(),
            text: document.getElementById("commentText").value.trim(),
            date: todayText()
        });
        saveList("homehubComments", comments);

        document.getElementById("commentText").value = "";
        showComments();
    });

    showComments();
}

// Shows the comments for the project that is open
function showComments() {
    var comments = loadList("homehubComments");
    var html = "";
    var count = 0;

    for (var i = 0; i < comments.length; i++) {
        if (comments[i].project === projectName) {
            count++;
            html += '<div class="border-top py-3">' +
                        '<strong>' + safeText(comments[i].name) + '</strong> ' +
                        '<span class="text-muted small">' + safeText(comments[i].date) + '</span>' +
                        '<p class="mb-0 mt-1">' + safeText(comments[i].text) + '</p>' +
                    '</div>';
        }
    }

    if (html === "") {
        html = '<p class="text-muted">No comments yet. Start the discussion!</p>';
    }
    document.getElementById("commentList").innerHTML = html;
    document.getElementById("commentCount").textContent = count;
}
