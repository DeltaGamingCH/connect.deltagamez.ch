async function loadCommunities() {
    let data = await fetch('https://api.deltagamez.ch:3000/api/v1/servers/view/1').then(response => response.json()); //common/js/server-testdata.json
    //Hello there :) 
    //Instead of stalking our code, why don't you join writing it. https://deltagamez.ch/dg/jobs
    //When directly calling our api through your browser (not over connect) your IP is public to us.
    console.log('Communities have successfully been loaded.')
    displayCommunities(data.servers); 
    setTooltipContent(data.servers);
    highlightEffect();
}

function displayCommunities(communities) {
    const container = document.querySelector('.container');
    for(let community of communities){
        
        //Date Conversion
        const createdAtDate = new Date(community.createdAt);
        const year = createdAtDate.getFullYear();
        const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(createdAtDate);
        const formattedDate = `${month}, ${year}`;

        //Display Community
        const communityElement = document.createElement('li');
        container.appendChild(communityElement);
        communityElement.className = 'community';
        communityElement.innerHTML = `
            <div class="community-header">
                <div class="community-header-title tooltip-badge">
                    <span class="community-header-title-badge"></span>
                    <h2 class="community-header-title-title">${community.ServerName}</h2>
                </div>
                <div class="community-header-logo">
                    <div class="community-header-logo-icon"></div>
                </div>
            </div>
            <div class="community-main">
                <p class="community-main-description">${community.ShortDesc}</p>
            </div>
            <div class="community-footer">
                <div class="community-footer-stats">
                    <div class="community-footer-stats-members tooltip-members">
                        <span class="community-footer-stats-members-icon"></span>
                        ${community.MemberCount}
                    </div>
                    <div class="community-footer-stats-date tooltip-date">
                        <span class="community-footer-stats-date-icon"></span>
                        ${formattedDate}
                    </div>
                </div>
                <a class="community-footer-join" href="${community.ServerInvite}">
                    JOIN
                </a>
            </div>
        `;
        const serverIcon = communityElement.querySelector('.community-header-logo-icon');
        serverIcon.style.backgroundImage = `url(${community.ServerIcon})`;
    }
}

function setTooltipContent(communities) {
    
    const tooltipBadge = document.querySelectorAll('.tooltip-badge');
    const tooltipMembers = document.querySelectorAll('.tooltip-members');
    const tooltipDate = document.querySelectorAll('.tooltip-date');

    tooltipBadge.forEach((element) => {
        element.setAttribute('tooltip-badge-content', 'Verified Community');
    });

    tooltipMembers.forEach((element, index) => {
        if (communities[index]) {
            element.setAttribute('tooltip-members-content', communities[index].MemberCount + " Members");
        }
    });

    tooltipDate.forEach((element, index) => {
        if (communities[index]) {
            const createdAtDate = new Date(communities[index].createdAt);
            const formattedDate = createdAtDate.toLocaleDateString('en-US', {
                year: 'numeric',
                day: 'numeric',
                month: 'long'
            });
            element.setAttribute('tooltip-date-content', "Joined " + formattedDate);
        }
    });
}

document.addEventListener('DOMContentLoaded', loadCommunities);

