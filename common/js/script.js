let postBadge = "Community Post";

let postsContainer = document.querySelector(".posts");
let loadMoreButton = document.querySelector(".posts button");

let loadItems = 6;
let page = 1;

function getMonthName(monthNumber){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[monthNumber - 1];
}
function getDayAbbreviation(dayNumber){
    if (dayNumber >= 11 && dayNumber <= 13) {
        return dayNumber + 'th';
    }
    switch (dayNumber % 10){
        case 1: return dayNumber + 'st';
        case 2: return dayNumber + 'nd';
        case 3: return dayNumber + 'rd';
        default: return dayNumber + 'th';
    }
}

function parseJoinDate(joinDate){ /*Splits the value "community.joinDate" to "joinDateSeparated" in order to extract the single digits to display it differently. Year digits -> 20XX, Month digits "1" -> "January", Day digits -> number"th"*/
    let joinDateSeparated = joinDate.split('/');
    let monthNumber = parseInt(joinDateSeparated[0]);
    let dayNumber = parseInt(joinDateSeparated[1]);
    let yearNumber = parseInt(joinDateSeparated[2]);

    return { monthNumber, dayNumber, yearNumber };
}

function loadInitialItems(){
    let communities = fetch("http://ec2-34-205-76-164.compute-1.amazonaws.com:3000/api/v1/servers/view/1").then(response => response.json())
    JSON.parse(localStorage.getItem("communities"));
    let out = "";
    let bannerStyled = "";
    for(let community of communities){
            let { monthNumber, dayNumber, yearNumber } = parseJoinDate(community.joinDate); /*Visualize: Data being cut into three pieces, from which they can be used for something else - advancedJoinDate and regularJoinDate.*/
            let regularJoinDate = `${monthNumber}/${dayNumber}`;
            let advancedJoinDate = `${getMonthName(monthNumber)} ${getDayAbbreviation(dayNumber)}, 20${yearNumber}`;
            bannerStyled = `style="background-image: url('${community.banner}');"`;
            out += `
                <li class="commcard">
                    <div class="commcard-header">
                        <div class="commcard-header-title">
                            <div class="holder">
                                <icon class="commcard-header-title-icon"></icon>
                                <span class="tooltip tooltip-community-badge">${postBadge}</span>
                            </div>
                            <h2 class="commcard-header-title-title">${community.title}</h2>
                        </div>
                        <div class="commcard-header-banner"${bannerStyled}>
                        </div>
                    </div>
                    <div class="commcard-main">
                        <p class="commcard-main-description description-p">${community.description}</p>
                    </div>
                    <div class="commcard-footer">
                        <div class="commcard-footer-stats">
                            <div class="commcard-footer-stats-members">
                                <div class="holder">
                                    <icon class="commcard-footer-stats-members-icon"></icon>
                                    <p class="holder holder-dgdevs-members">${community.members}</p>
                                    <span class="tooltip tooltip-dgdevs-members">${community.members}+ Members</span>
                                </div>
                            </div>
                            <div class="commcard-footer-stats-date">
                                <div class="holder">
                                    <icon class="commcard-footer-stats-date-icon"></icon>
                                    <p class="holder holder-dgdevs-date">${regularJoinDate}</p>
                                    <span class="tooltip tooltip-dgdevs-date">Joined ${advancedJoinDate}</span>
                                </div>
                            </div>
                        </div>
                        <a class="commcard-footer-join" href="${community.invite}">JOIN</a>
                    </div>
                </li>
            `;
    }

    let div = document.createElement("ul");
    div.classList.add('container');
    postsContainer.insertBefore(div, loadMoreButton);
    div.innerHTML = out;
}

function loadData(){
    page++
    let communities = fetch(`https://api.deltagamez.ch/api/v1/servers/view/${page}`).then(response => response.json())
    let container = document.querySelector('.container');
    
    let out = "";
    for(let community of communities){
            let { monthNumber, dayNumber, yearNumber } = parseJoinDate(community.joinDate); /*Visualize: Data being cut into three pieces, from which they can be used for something else - advancedJoinDate and regularJoinDate.*/
            let regularJoinDate = `${monthNumber}/${dayNumber}`;
            let advancedJoinDate = `${getMonthName(monthNumber)} ${getDayAbbreviation(dayNumber)}, 20${yearNumber}`;
            bannerStyled = `style="background-image: url('${community.banner}');"`;
            out += `
                <li class="commcard">
                    <div class="commcard-header">
                        <div class="commcard-header-title">
                            <div class="holder">
                                <icon class="commcard-header-title-icon"></icon>
                                <span class="tooltip tooltip-community-badge">${postBadge}</span>
                            </div>
                            <h2 class="commcard-header-title-title">${community.title}</h2>
                        </div>
                        <div class="commcard-header-banner"${bannerStyled}>
                        </div>
                    </div>
                    <div class="commcard-main">
                        <p class="commcard-main-description description-p">${community.description}</p>
                    </div>
                    <div class="commcard-footer">
                        <div class="commcard-footer-stats">
                            <div class="commcard-footer-stats-members">
                                <div class="holder">
                                    <icon class="commcard-footer-stats-members-icon"></icon>
                                    <p class="holder holder-dgdevs-members">${community.members}</p>
                                    <span class="tooltip tooltip-dgdevs-members">${community.members}+ Members</span>
                                </div>
                            </div>
                            <div class="commcard-footer-stats-date">
                                <div class="holder">
                                    <icon class="commcard-footer-stats-date-icon"></icon>
                                    <p class="holder holder-dgdevs-date">${regularJoinDate}</p>
                                    <span class="tooltip tooltip-dgdevs-date">Joined ${advancedJoinDate}</span>
                                </div>
                            </div>
                        </div>
                        <a class="commcard-footer-join" href="https://discord.gg/sYpmUFQ">JOIN</a>
                    </div>
                </li>
            `;
    }

    container.innerHTML += out;

    if(document.querySelectorAll(".commcard").length == communities.length) {
        loadMoreButton.style.display = "none";
    }
    /*fadeIn(container); REMOVED FADE IN ANIMATION TEMPORARY*/
}

/* TEMPOARY REMOVED FADE IN ANIMATION
function fadeIn(div){
    let opacity = 0;
    let interval = setInterval(function(){
        if(opacity <= 1){
            opacity = opacity + 0.1;
            div.style.opacity = opacity;
        } else {
            clearInterval(interval);
        }
    }, 50); /*Time in miliseconds divided by 10 || 100=1s*//*
}
*/
