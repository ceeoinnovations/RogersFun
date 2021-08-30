
import MainPage from './components/MainPage.js';
import ProjectPage from './components/ProjectPage.js';
import Navbar from './components/Navbar.js';

Promise.all([
      d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vRzuPHi-ZjhY9HfLv7HjMCCwy6NyzWJyxjj03fHfSJtTHAkCkvoN8Lm705rWP-y5LFMDmXj-9rBe_qC/pub?output=csv"),
      d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vSNhuYWG4ylr1-xZSDcBunRrKJyLqPIC37VOGoW8QG0Knve2YeIem2az2t0vVXz1769WALBxjs3U_J2/pub?output=csv"),
      d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vQFY7mscoie7ADrYeLpnUwHhA3wDZ9lF0Go-n-q_IT2m-2BrtcZ9bvAv8PSIsQBjAFy_4YypxLRmj9U/pub?output=csv"),
      ])
      .then(([about, themes, projects]) => {
        const data = {about, themes, projects};
        console.log(data);

    // determine what page to render
    let params = new URLSearchParams(window.location.search);
    if (params.get('project')==null){
        MainPage(data);
    }else{
        let project = data.projects.find(d=>d.title===params.get('project'));
        Navbar('project')
        ProjectPage(project, about);
        hljs.highlightAll();
        lightGallery(document.getElementById('lightgallery'), {
            plugins: [lgZoom, lgThumbnail, lgVideo],
            speed: 500,
            thumbnail: true
        });
    } 
});




