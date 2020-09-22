const photoswitch = () => {
    const team = document.getElementById('command');
    let teamPhoto = team.querySelectorAll('.command__photo');
    let tempPhoto;
    teamPhoto.forEach((item) => {
        item.addEventListener('mouseover', (event) => {
            tempPhoto = event.target.src;
            event.target.src = event.target.dataset.img
        });
        item.addEventListener('mouseleave', (event) => {
            event.target.src = tempPhoto;
        })
    })
};
export default photoswitch;