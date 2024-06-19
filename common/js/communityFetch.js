/*async function getCommunities() {
    let communities = await fetch('http://ec2-34-205-76-164.compute-1.amazonaws.com:3000/api/v1/servers/view/1').then(response => response.json())
    console.log(communities)
}
getCommunities()*/

async function loadCommunities() {
    let data = await fetch('/common/js/server-testdata.json').then(response => response.json()); //http://ec2-34-205-76-164.compute-1.amazonaws.com:3000/api/v1/servers/view/1 /common/js/server-testdata.json
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
        communityElement.className = 'community';
        communityElement.innerHTML = `
            <div class="community-header">
                <div class="community-header-title">
                    <span class="community-header-title-badge tooltip-badge"></span>
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
                    <div class="community-footer-stats-members">
                        <span class="community-footer-stats-members-icon tooltip-members"></span>
                        ${community.MemberCount}
                    </div>
                    <div class="community-footer-stats-date">
                        <span class="community-footer-stats-date-icon tooltip-date"></span>
                        ${formattedDate}
                    </div>
                </div>
                <a class="community-footer-join" href="${community.ServerInvite}">
                    JOIN
                </a>
            </div>
        `;
    
        container.appendChild(communityElement);
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

