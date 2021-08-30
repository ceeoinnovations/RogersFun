export default function GetImageURL(image){
    if (image===""){
        return '';
        // assets/global/project-placeholder.png
    }else if (image.startsWith("http") && image.includes("drive.google.com")){
        // for Google Form auto-generated link
        const url = new URL(image); 
        const urlParams = new URLSearchParams(url.search);
        if (urlParams.get("id")){
            return `https://drive.google.com/uc?export=view&id=${urlParams.get("id")}`;
        }else{
            const id = image.split('/').slice(-2)[0];// second from last
            return `https://drive.google.com/uc?export=view&id=${id}`;
        }

        // for Google Drive sharable link
        // let id = "";
        // const url = new URL(image);
        // id = TemplateIdFrom(url);
        // // console.log('id: ' + id);
        // return `https://drive.google.com/uc?id=${id}`;
    }else{
        return image;
    }
}

export function GetTeaserURL(images){
    GetImageArr(images);

    // convert comma separated string into an array 
    let imageArray = images.split(', ');
    // make the first image teaser
    let teaser = imageArray[0];
    teaser = GetImageURL(teaser);
    return teaser;
}

export function TemplateIdFrom(url) {
    url.toString();
    let match = url.href.match(/([a-z0-9_-]{25,})[$/&?]/i);
    return match[1];
    // 1. /([a-z0-9_-]{25,})[$/&?]/i
    // 2. /\/d\/(.+)\//
}

export function GetImageArr(images){
    // convert comma separated string into an array 
    let imageArray = images.split(', ');
    return imageArray;
}

export function GetEmbedVideo(video){
    // https://drive.google.com/open?id=1GMGi4L22EsxRAlxk8s9PPiAUlSqCd6oP
    // <iframe src="https://drive.google.com/file/d/1a0d6L2N4rsP4ZeGVNuheLJa0pJeVauJd/preview" width="640" height="480"></iframe>

    if (video===""){
        return '';
    }else if (video.startsWith("http") && video.includes("drive.google.com")){
        // for Google Form auto-generated link
        const url = new URL(video); 
        const urlParams = new URLSearchParams(url.search);
        if (urlParams.get("id")){
            return `<iframe id="current" src="https://drive.google.com/file/d/${urlParams.get("id")}/preview" width="640" height="480"></iframe>`;
        }else{
            const id = video.split('/').slice(-2)[0];// second from last
            return `https://drive.google.com/file/d/${id}/preview`;
        }

    }else{
        return video;
    }

}

export function GetVideoURL(video){
    if (video===""){
        return '';
    }else if (video.startsWith("http") && video.includes("drive.google.com")){
        // for Google Form auto-generated link
        const url = new URL(video); 
        const urlParams = new URLSearchParams(url.search);
        if (urlParams.get("id")){
            // return `https://drive.google.com/file/d/${urlParams.get("id")}/preview`;
            // return `https://drive.google.com/uc?export=download&id=${urlParams.get("id")}`;
            return `https://drive.google.com/uc?id=${urlParams.get("id")}`;
        }else{
            const id = video.split('/').slice(-2)[0];// second from last
            // return `https://drive.google.com/file/d/${id}/preview`;
            // return `https://drive.google.com/uc?export=download&id=${id}`;
            return `https://drive.google.com/uc?id=${id}`;
        }

    }else{
        return video;
    }
}