let list = document.getElementsByClassName('list-product')[0];

//button previous, button next
let preButton = document.getElementsByClassName('page-link')[0];
let nextButton = document.getElementsByClassName('page-link')[8];
let preLink = document.getElementsByClassName('page-item')[0];
let nextLink = document.getElementsByClassName('page-item')[8];

//pagination
let startPage = document.getElementsByClassName('page-link')[1];        //1
let nextStartPage = document.getElementsByClassName('page-link')[2];    //2
let presentPage = document.getElementsByClassName('page-link')[4];      
let preEndPage = document.getElementsByClassName('page-link')[6];       //5 
let endPage = document.getElementsByClassName('page-link')[7];          //6

//search
let search = document.getElementById('search-product');



axios.get('/api/product')
.then(item => {
    let numberProduct = item.data;
    
    //url Api
    let urlApi = '/api/product/pagination?page=';
    let number = 1;
    if(!localStorage.getItem('number-page')){
        localStorage.setItem('number-page', number)
    }  

    //render
    function render(urlApi, number){
        let products = []; 
        axios.get(urlApi + number)
            .then(item => {
                products.push(...item.data)
                presentPage.textContent = number;
                let string = products.map(function(item){
                    return `
                    <a href="/product/${item._id}" style="text-decoration : none; color : black">
                        <div class="card mt-4" style="width: 16rem; margin-right: 15px">
                            <img class="card-img-top position-relative" src="${item.image}" style="width: 16rem; height: 12rem; left: -1px" />
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">${item.description}</p>
                                <a class="btn btn-primary" href="/cart/add/${item._id}">Thêm vào giỏ hàng</a>
                            </div>
                        </div>
                    </a>`
                })
                list.innerHTML = string.join('');
            })
        
    }
    render(urlApi, localStorage.getItem('number-page'))
    preLink.setAttribute('class', 'page-item disabled');

    //Next Button
    nextButton.addEventListener('click', function(){
        number = parseInt(localStorage.getItem('number-page')) + 1;
        localStorage.setItem('number-page', number) 
        render(urlApi, number)
        presentPage.textContent = number;
        if(numberProduct / number <= 8){
            nextLink.setAttribute('class', 'page-item disabled');
            preLink.setAttribute('class', 'page-item');
        }
        else{
            nextLink.setAttribute('class', 'page-item');
            preLink.setAttribute('class', 'page-item');
        }
                
            
    })

    //Previous Button
    preButton.addEventListener('click', function(){
        number = parseInt(localStorage.getItem('number-page')) - 1;
        localStorage.setItem('number-page', number) 
        render(urlApi, number)
        presentPage.textContent = number;
        if(numberProduct / number === numberProduct){
            preLink.setAttribute('class', 'page-item disabled');
            nextLink.setAttribute('class', 'page-item');
        }
        else{
            preLink.setAttribute('class', 'page-item');
            nextLink.setAttribute('class', 'page-item');
        }     
            
    })      
        
    //Link Page 
    function addlinkPage(page, number){
        page.textContent = number;
        page.addEventListener('click', function(){
            render(urlApi, number)
            presentPage.textContent = parseInt(localStorage.getItem('number-page'));
            localStorage.setItem('number-page', number)
            if(numberProduct / number <= 7){
                nextLink.setAttribute('class', 'page-item disabled');
            }           
            if(numberProduct / number === numberProduct){
                preLink.setAttribute('class', 'page-item disabled');
                nextLink.setAttribute('class', 'page-item');
            }
            else{
                preLink.setAttribute('class', 'page-item');
                nextLink.setAttribute('class', 'page-item');
            }
        })
    }

    var maxPage = Math.round(numberProduct/8);
    let preMaxPage = Math.round(numberProduct/8 - 1);

    addlinkPage(startPage, 1);
    addlinkPage(nextStartPage, 2);
    addlinkPage(preEndPage, preMaxPage);
    addlinkPage(endPage, maxPage);
})


      
// search-product
let urlSearch = '/api/product/search?q='
search.addEventListener('click', function(){
    let products = []; 
    axios.get(urlSearch + document.getElementById('input-name-product').value)
        .then(item => {
            products.push(...item.data)
            presentPage.textContent = number;
            let string = products.map(function(item){
                return `
                <a href="/product/${item._id}" style="text-decoration : none; color : black">
                    <div class="card mt-4" style="width: 16rem; margin-right: 15px">
                        <img class="card-img-top position-relative" src="${item.image}" style="width: 16rem; height: 12rem; left: -1px" />
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.description}</p>
                            <a class="btn btn-primary" href="/cart/add/${item._id}">Thêm vào giỏ hàng</a>
                        </div>
                    </div>
                </a>`
            })
            list.innerHTML = string.join('');
        })   
})