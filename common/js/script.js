async function getCommunities() {
    let communities = await fetch('http://ec2-34-205-76-164.compute-1.amazonaws.com:3000/api/v1/servers/view/1').then(response => response.json())
    console.log(communities)
}
getCommunities()