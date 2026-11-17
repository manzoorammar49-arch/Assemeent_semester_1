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

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const projects =[
    "Garden makeover",
    "Dry wall shelves",
    "Painting my bedroom",
    "Kitchen Renovation",
    "laminated floor",
    "Vegetable Garden",
    "Bathroom Renovation",
    "Painting the Fence",
    "Building IKEA Shelves",

];
searchButton.addEventListener('click', function() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProjects = projects.filter(project => project.toLowerCase().includes(searchTerm));
    if (filteredProjects.length > 0) {
        searchResults.innerHTML = filteredProjects.join('<br>');
    } else {
        searchResults.innerHTML = 'No results found.';
    }
    return project.toLowerCase().includes(searchTerm);


});




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



