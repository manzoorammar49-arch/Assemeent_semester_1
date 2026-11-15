const contactForm = document.getElementById('contactform');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {

        event.preventDefault(); // Prevent the default form submission 
        document.getElementById('success-message').classList.remove('d-none'); // Show the success message 
        contactForm.reset(); // Reset the form fields
    });
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



