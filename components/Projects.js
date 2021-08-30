import GetImageURL, {GetTeaserURL} from './Images.js';

export default function Projects(projects, themes, about){
    return `
    <section id="content">
        <div id="theme" class="text-wrapper theme-info">
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

export function DefaultInfo(projects){
    let projectNumber = projects.length;
    return `
    <h1 class="title">All Projects (${projectNumber})</h1>
    `
}

export function SubmitButton(about){
    return `
        <div class="project-box">
            <img src="assets/images/add-placeholder.png" div class="teaser">
            <div class="info">
                <div class="project-overview">
                    <div class="project-title">
                        <a href="${about[0].form}" target="_blank"><strong>Submit Project → </strong></a>
                    </div>
                </div>
            </div>
        </div>
    `
}

export function ProjectItems(about, projects){
    return projects.map(d=>`
        
        <div class="project-box">
            <img src="${(GetTeaserURL(d.images))}" div class="teaser">
            <div class="info">
                <div class="project-overview">
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



export function handleProjectFilter(data){
    
    let conds = document.querySelectorAll('.filter input[name="project-filter"]');
    // console.log(conds);
    conds.forEach(cond=>cond.addEventListener('change', function(event){
        
        let checked = event.target.value; //Array.from(conds).filter(d=>d.checked).map(d=>d.value);
        // console.log(checked);
        if (checked==='all'){
            document.querySelector('.theme-info').innerHTML = DefaultInfo(data.projects);
            document.querySelector('.project-list').innerHTML = SubmitButton(data.about) + ProjectItems(data.about, data.projects);
        }else{
            checked = checked.replace(/ /g, "").toLowerCase();
            let filteredProjects = data.projects.filter(d=>{
                // return d.id.some(id=>checked === checked.toLowerCase());
                d.hackathon = d.hackathon.replace(/ /g, "").toLowerCase();
                return d.hackathon === checked;
            });

            let checkedTheme = data.themes.filter(d=>{
                d.id = d.name.replace(/ /g, "").toLowerCase();
                return d.id === checked;
            });
            // console.log('filteredProjects', filteredProjects);
            // console.log('checkedTheme', checkedTheme);
            document.querySelector('.theme-info').innerHTML = UpdateThemeInfo(filteredProjects, checkedTheme);
            document.querySelector('.project-list').innerHTML = SubmitButton(data.about) + ProjectItems(data.about, filteredProjects);
        }
    
    }));
    
}

export function UpdateThemeInfo(projects, theme){
    let projectNumber = projects.length;
    return `
        <h1 class="title">${theme[0].name} (${projectNumber})</h1>
        <p>${theme[0].description}</p>
        <div class="project-img">
        </div>
        <a href="${theme[0].buttonlink}" target="_blank">
            <button class="button" style="margin-top: 30px; margin-bottom: 50px;">${theme[0].buttonlabel}</button>
        </a>
        ${(ResourcesButton(theme[0].resources))}
    `
}

export function ResourcesButton(resources) {
    if (resources==="") {
        return '';
    }else {
    return `
    <a href="${resources}" target="_blank">
        <button class="button" style="margin-top: 30px; margin-bottom: 50px;">More Resources</button>
    </a>
    `
    }
}