function program() {

    const mainPage = document.getElementById("mainPage");

    let projects = null;
    fetch("projects.json")
    .then(file => {return file.json()})
    .then(data => { projects = data; })
    .then(() => loadMainSelectionScreen());

    function loadMainSelectionScreen() {
        console.log(projects);
        console.log(projects[0].title);

        for (let i = 0; i < projects.length; i++) {
            const currentProject = projects[i];
            const projectDisplay = document.createElement("a");
            projectDisplay.classList.add("project-display");
            
            if (currentProject["github-link"].length > 0) {
                projectDisplay.setAttribute("href", currentProject["github-link"]);
                projectDisplay.setAttribute("target", "_blank");
            }

            const projectImageDisplay = document.createElement("div");
            projectImageDisplay.classList.add("project-image-display");

            for (let imageIndex = 0; imageIndex < currentProject.images.length; imageIndex++) {
                const newImage = document.createElement("img");
                newImage.classList.add("project-image-display");
                newImage.setAttribute("src", currentProject.images[imageIndex]);
                projectImageDisplay.append(newImage);
            }

            const projectTitle = document.createElement("h1");
            projectTitle.classList.add("project-title");
            projectTitle.innerText = currentProject.title;

            const projectDescription = document.createElement("h3");
            projectDescription.classList.add("project-description");
            projectDescription.innerText = currentProject.description;

            const projectDateData = document.createElement("div");
                projectDateData.classList.add("project-date-data");
            {   
                const dateCreated = document.createElement("h3");
                dateCreated.innerText = `Date Created: ${currentProject["date-created"]}`;

                const lastModified = document.createElement("h3");
                lastModified.innerText = `Last Modified: ${currentProject["last-modified"]}`;

                const completed = document.createElement("h3");
                completed.innerText = `Completed: ${currentProject["date-completed"]}`;
                
                projectDateData.append(dateCreated);
                projectDateData.append(lastModified);
                projectDateData.append(completed);
            }

            projectDisplay.append(projectImageDisplay);
            projectDisplay.append(projectTitle);
            projectDisplay.append(projectDescription);
            projectDisplay.append(projectDateData);
            mainPage.append(projectDisplay);
        }
    }




}

$(window).on('load', program);