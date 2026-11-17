// FILTER AND SORT PROJECTS (F04)
// This file is only used on projects_page.html

var categorySelect = document.getElementById("categorySelect");
var sortSelect = document.getElementById("sortSelect");
var resetButton = document.getElementById("resetButton");
var projectList = document.getElementById("projectList");
var noProjectsMessage = document.getElementById("noProjectsMessage");

// Only run this code if the filter boxes are on the page
if (categorySelect && sortSelect && projectList) {

    // When the user changes the category or the sort order, update the projects
    categorySelect.addEventListener("change", updateProjects);
    sortSelect.addEventListener("change", updateProjects);

    // Reset button puts everything back to the start
    resetButton.addEventListener("click", function() {
        categorySelect.value = "all";
        sortSelect.value = "newest";
        updateProjects();
    });

    // CATEGORY FROM THE LINK (F02)
    // If the page was opened like projects_page.html?category=garden
    // then pick "garden" in the Category box before showing the projects
    var linkInfo = new URLSearchParams(window.location.search);
    var categoryFromLink = linkInfo.get("category");

    if (categoryFromLink) {
        // Only use it if it matches one of the options in the Category box
        var matchingOption = categorySelect.querySelector('option[value="' + categoryFromLink + '"]');
        if (matchingOption) {
            categorySelect.value = categoryFromLink;
        }
    }

    // Show the projects in the right order when the page first loads
    updateProjects();
}

function updateProjects() {

    var chosenCategory = categorySelect.value;
    var chosenSort = sortSelect.value;

    // Get all the project cards and put them in a list (array) so we can sort them
    var projects = Array.from(document.querySelectorAll(".project-item"));

    // ---- SORTING ----
    projects.sort(function(a, b) {

        var titleA = a.querySelector(".card-title").textContent.toLowerCase();
        var titleB = b.querySelector(".card-title").textContent.toLowerCase();

        // Dates are written like 2026-05-10, so they can be compared as text
        var dateA = a.getAttribute("data-date");
        var dateB = b.getAttribute("data-date");

        if (chosenSort === "az") {
            return titleA.localeCompare(titleB);   // A to Z
        } else if (chosenSort === "za") {
            return titleB.localeCompare(titleA);   // Z to A
        } else if (chosenSort === "oldest") {
            return dateA.localeCompare(dateB);     // oldest first
        } else {
            return dateB.localeCompare(dateA);     // newest first
        }
    });

    // Put the cards back on the page in the new order
    for (var i = 0; i < projects.length; i++) {
        projectList.appendChild(projects[i]);
    }

    // ---- FILTERING ----
    var shownCount = 0;

    for (var j = 0; j < projects.length; j++) {

        var projectCategory = projects[j].getAttribute("data-category");

        if (chosenCategory === "all" || chosenCategory === projectCategory) {
            projects[j].classList.remove("d-none");   // show the card
            shownCount++;
        } else {
            projects[j].classList.add("d-none");      // hide the card
        }
    }

    // If no cards are showing, show the "no projects" message
    if (shownCount === 0) {
        noProjectsMessage.classList.remove("d-none");
    } else {
        noProjectsMessage.classList.add("d-none");
    }
}
