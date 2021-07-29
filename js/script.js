console.log('warsztat - infinite scroll');

let endOfThePage = 0;

let preloading = false; 


const showPreloader = () => {

    let preloader = document.getElementById('preloader');
    console.log('showPreloader()');
    preloader.style.display = 'block';

}


const hidePreloader = () => {

    let preloader = document.getElementById('preloader');
    console.log('hidePreloader()');
    preloader.style.display = 'none';
    
}

if(!preloading) {
    showPreloader();

const getData = () => {
 fetch('https://akademia108.pl/api/ajax/get-user.php')
 .then(res => res.json())
 .then(data => {

    let body = document.body;
    let hr = document.createElement('hr');
    body.appendChild(hr);

    for (let user of data){
        let pId = document.createElement('p');
        let pName = document.createElement('p');
        let pWebsite = document.createElement('p');

        pId.innerText = 'User ID: ${user.id}';
        pName.innerText = 'User Name: ${user.name}';
        pWebsite.innerHTML = 'User URL: ${user.pWebsite}<br />--------';

        let body = document.body;

        body.appendChild(pId);
        body.appendChild(pName);
        body.appendChild(pWebsite);
        
    }
preloading = false;

    hidePreloader();

     console.log(data);
 })
 .catch(error => {
     console.log(error);
 });
} }

const scrollToEndOfPage = () => {
    
    let d = document.documentElement;

    //height of an element`s content, including content not visible on the screen
    let scrollHeight = d.scrollHeight;

    //number of pixels that an element`s content is scrolled vertically
    
    let scrollTop = d.scrollTop;
    //inner height of an element in pixels

    let clientHeight = d.clientHeight;

    let sumScrollTopClientHeight = Match.ceil(scrollTop + clientHeight);

    console.log('scrollHeight: ${scrollHeight}');
    console.log('sumScrollTopClientHeight: ${sumScrollTopClientHeight}');
    console.log('clientHeight: ${clientHeight}');
    console.log('======================');

    if (sumScrollTopClientHeight >= scrollHeight){

        endOFThePage += 1;
        
        console.log('Scrolled to the end of page: ${endOfThePage}');
    }

    showPreloader();
    getData();
}




window.addEventListener('scroll',scrollToEndOfPage);