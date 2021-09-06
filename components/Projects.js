import GetImageURL, {GetTeaserURL} from './Images.js';

// return HTML for project section
export default function Projects(projects, category, about){
    return `
    <section id="content">
        <div id="theme" class="text-wrapper">
        ${DefaultInfo(projects)}
        </div>    

        <div id="projects" class="wrapper">
            <div class="project-list">
                ${SubmitButton(about)}
                ${ProjectItems(about, projects)}
                </div>
            </div>
        </div>
    </section>`;
}

// show number of projects
export function DefaultInfo(projects){
    let projectNumber = projects.length;
    return `
    <p class="project-number">${projectNumber} submitted</p>
    `
}

// add a submit button
export function SubmitButton(about){
    return `
        <div class="project-box">
            <img src="assets/images/add-placeholder.png" div class="teaser">
            <div class="info">
                <div class="project-overview">
                    <div class="project-title">
                        <a href="${about[0].form}" target="_blank"><strong>Submit → </strong></a>
                    </div>
                </div>
            </div>
        </div>
    `
}

// return HTML for project items
export function ProjectItems(about, projects){
    return projects.map(d=>`
        
        <div class="project-box">
            
            <img src="${(GetTeaserURL(d.images))}" div class="teaser">
            <div class="info">
                <div class="project-overview">
                    <div class="project-theme">
                        ${d.category}
                    </div>
                    <div class="project-title">
                        <a href="?project=${d.title}"><strong>${d.title}</strong></a>
                    </div>
                    <div class="project-subtitle">
                        ${d.subtitle}
                    </div>
                    <div class="project-authors">
                        By ${d.authors}
                    </div>
                </div>    
            </div>
        </div> 
    `).join('');
}

// filter projects by tags
export function handleProjectFilter(data){
    let conds = document.querySelectorAll('.filter input[name="project-filter"]');
    conds.forEach(cond=>cond.addEventListener('change', function(event){
        let checked = event.target.value; 
        if (checked==='all'){
            document.querySelector('.theme-info').innerHTML = DefaultInfo(data.projects);
            document.querySelector('.project-list').innerHTML = SubmitButton(data.about) + ProjectItems(data.about, data.projects);
        }else{
            checked = checked.replace(/ /g, "").toLowerCase();
            let filteredProjects = data.projects.filter(d=>{
                // return d.id.some(id=>checked === checked.toLowerCase());
                d.id = d.hackathon.replace(/ /g, "").toLowerCase();
                return d.id === checked;
            });
            let checkedTheme = data.themes.filter(d=>{
                d.id = d.name.replace(/ /g, "").toLowerCase();
                return d.id === checked;
            });
            document.querySelector('.theme-info').innerHTML = UpdateThemeInfo(filteredProjects, checkedTheme);
            document.querySelector('.project-list').innerHTML = SubmitButton(data.about) + ProjectItems(data.about, filteredProjects);
        }
    }));
}

// show category information
export function UpdateThemeInfo(projects, category){
    let projectNumber = projects.length;
    return `
        <div class="theme-container">
        <h1 class="title">${category[0].name} </h1>
        <p>${category[0].description}</p>
        <a href="${category[0].buttonlink}" target="_blank">
            <button class="button" style="margin-top: 30px; margin-bottom: 50px;">${category[0].buttonlabel}</button>
        </a>
        ${(ResourcesButton(category[0].resources))}
        </div>
        
        <p class="project-number">${projectNumber} submitted</p>
    `
}

// add a button for resources
export function ResourcesButton(resources) {
    if (resources==="") {
        return '';
    }else {
    return `
    <a href="${resources}" target="_blank">
        <button class="button" style="margin-top: 30px; margin-bottom: 50px;">Resources</button>
    </a>
    `
    }
}
