// add an event listener to the 'search-icon' element to handle file swapping on hover: 
const searchIcon = document.getElementById('search-icon');
const searchIconFile = document.getElementById('search-icon-file');

// Change the image on hover: 
searchIcon.addEventListener('mouseenter', () => {
    searchIconFile.src = '../assets/images/create-account/search-icon-blue.svg';
})

// Change the image back when mouse leaves: 
searchIcon.addEventListener('mouseleave', () => {
    searchIconFile.src = '../assets/images/create-account/search-icon.svg';
})