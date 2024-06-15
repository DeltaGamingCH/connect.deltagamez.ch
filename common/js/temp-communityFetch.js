/*Script edited by Jayden*/
// Working on a new version, this script is out of date.

let postBadge = "Community Post";

let loadMoreButton = document.querySelector(".container button");

let loadItems = 6;
let page = 0;

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

function loadData(){
    page++
    let communities = fetch(`http://ec2-34-205-76-164.compute-1.amazonaws.com:3000/api/v1/servers/view/${page}`).then(response => response.json())
    let container = document.querySelector('.container');

    communities = communities.servers;
    
    let out = "";
    for(let community of communities){
            let { monthNumber, dayNumber, yearNumber } = parseJoinDate(community.createdAt); /*Visualize: Data being cut into three pieces, from which they can be used for something else - advancedJoinDate and regularJoinDate.*/
            let regularJoinDate = `${monthNumber}/${dayNumber}`;
            let advancedJoinDate = `${getMonthName(monthNumber)} ${getDayAbbreviation(dayNumber)}, 20${yearNumber}`;
            let bannerStyled = "";
            if(community.ServerIcon){
                bannerStyled = `
                <div class="community-header-logo">
                    <div class="community-header-logo-icon}">
                        <img src="${community.ServerIcon}" alt="Community Icon">
                    </div>
                </div>
                `;
            }
            if(community.ServerBanner){
                bannerStyled = `
                <div class="community-header-logo">
                    <div class="community-header-logo-banner}">
                        <img src="${community.ServerBanner}" alt="Community Banner">
                    </div>
                </div>`;
            }
            out += `
                <li class="community">
                    <div class="community-header">
                        <div class="community-header-title">
                            <span class="community-header-title-badge tooltip-badge"></span>
                            <h2 class="community-header-title-title">
                                ${community.ServerName}
                            </h2>
                        </div>
                        ${bannerStyled}
                    </div>
                    <div class="community-main">
                        <p class="community-main-description">
                            ${community.ShortDesc}
                        </p>
                    </div>
                    <div class="community-footer">
                        <div class="community-footer-stats">
                            <div class="community-footer-stats-members">
                                <span class="community-footer-stats-members-icon tooltip-members"></span>
                                ${community.MemberCount}
                            </div>
                            <div class="community-footer-stats-date">
                                <span class="community-footer-stats-date-icon tooltip-date">${advancedJoinDate}</span>
                                ${regularJoinDate}
                            </div>
                        </div>
                        <a class="community-footer-join" href="${community.ServerInite}">
                            JOIN
                        </a>
                    </div>
                </li>
            `;
    }

    container.innerHTML += out;

    // Code will need to be changed in backend ->
    /* 
        if(document.querySelectorAll(".commcard").length == communities.length) {
            loadMoreButton.style.display = "none";
        }
    */
}