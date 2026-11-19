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



