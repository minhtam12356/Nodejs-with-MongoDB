var list = document.getElementsByClassName('list-product')[0];

//button previous, button next
var preButton = document.getElementsByClassName('page-link')[0];
var nextButton = document.getElementsByClassName('page-link')[8];
var preLink = document.getElementsByClassName('page-item')[0];
var nextLink = document.getElementsByClassName('page-item')[8];

//pagination
var startPage = document.getElementsByClassName('page-link')[1];        //1
var nextStartPage = document.getElementsByClassName('page-link')[2];    //2
var presentPage = document.getElementsByClassName('page-link')[4];      
var preEndPage = document.getElementsByClassName('page-link')[6];       //5 
var endPage = document.getElementsByClassName('page-link')[7];          //6

//url Api
var urlApi = '/api/product/pagination?page=';
var number = 1;
if(!localStorage.getItem('number-page')){
    localStorage.setItem('number-page', number)
}  

//render
function render(number){
    var products = []; 
    axios.get(urlApi + number)
        .then(item => {
            products.push(...item.data)
            presentPage.textContent = number;
            var string = products.map(function(item){
                return `
                <div class="card mt-4" style="width: 16rem">
                    <img class="card-img-top position-relative" src="${item.image}" style="width: 16rem; height: 12rem; left: -1px" />
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.description}</p>
                        <a class="btn btn-primary" href="/cart/add/${item._id}">Thêm vào giỏ hàng</a>
                    </div>
                </div>`
            })
            list.innerHTML = string.join('');
        })
    
}
render(localStorage.getItem('number-page'))
preLink.setAttribute('class', 'page-item disabled');
//Next Button
nextButton.addEventListener('click', function(){
    number = parseInt(localStorage.getItem('number-page')) + 1;
    localStorage.setItem('number-page', number) 
    render(number)
    presentPage.textContent = number;
    axios.get(urlApi + (number + 1))
        .then(item => {
            if(typeof item.data == 'string'){
                nextLink.setAttribute('class', 'page-item disabled');
                preLink.setAttribute('class', 'page-item');
            }
            else{
                nextLink.setAttribute('class', 'page-item');
                preLink.setAttribute('class', 'page-item');
            }
            
        })
})

//Previous Button
preButton.addEventListener('click', function(){
    number = parseInt(localStorage.getItem('number-page')) - 1;
    localStorage.setItem('number-page', number) 
    render(number)
    presentPage.textContent = number;
    axios.get(urlApi + (number - 1))
        .then(item => {
            if(typeof item.data == 'string'){
                preLink.setAttribute('class', 'page-item disabled');
                nextLink.setAttribute('class', 'page-item');
            }
            else{
                preLink.setAttribute('class', 'page-item');
                nextLink.setAttribute('class', 'page-item');
            }
            
        })
})      
    
//Page 1

    function addlinkPage(page, number){
        page.addEventListener('click', function(){
            render(number)
            presentPage.textContent = parseInt(localStorage.getItem('number-page'));
            localStorage.setItem('number-page', number) 
            if(end >= products.length){
                nextLink.setAttribute('class', 'page-item disabled');
            }           
            if(start < 4 ){
                preLink.setAttribute('class', 'page-item disabled');
                nextLink.setAttribute('class', 'page-item');
            }
            else{
                preLink.setAttribute('class', 'page-item');
            }
        })
    }
    addlinkPage(startPage, 1);
    addlinkPage(nextStartPage, 2);
    addlinkPage(preEndPage, 5);
    addlinkPage(endPage, 6);
      
// });
