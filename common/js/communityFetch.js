/*async function getCommunities() {
    let communities = await fetch('http://ec2-34-205-76-164.compute-1.amazonaws.com:3000/api/v1/servers/view/1').then(response => response.json())
    console.log(communities)
}
getCommunities()*/

async function loadCommunities() {
    let data = await fetch('/common/js/server-testdata.json').then(response => response.json()); //http://ec2-34-205-76-164.compute-1.amazonaws.com:3000/api/v1/servers/view/1 /common/js/server-testdata.json
    console.log('Communities have successfully been loaded.')
    displayCommunities(data.servers); 
    highlightEffect();
}

function displayCommunities(communities) {
    const container = document.querySelector('.container');
    for(let community of communities){
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
                        ${community.MemberCount} Members
                    </div>
                    <div class="community-footer-stats-date">
                        <span class="community-footer-stats-date-icon tooltip-date"></span>
                        ${new Date(community.createdAt).toLocaleDateString()}
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

document.addEventListener('DOMContentLoaded', loadCommunities);

