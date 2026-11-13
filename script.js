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
