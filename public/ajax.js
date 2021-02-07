var start = 0;
var end = 4;
var products=[];
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
var urlApi = 'http://localhost:3001/api/product';

axios.get(urlApi)
.then(item => {
    
    products.push(...item.data)
    var product = products.slice(start, end)
    
    presentPage.textContent = 1;
    endPage.textContent = Math.round(products.length/4);
    preEndPage.textContent = Math.round(products.length/4) - 1;
    preLink.setAttribute('class', 'page-item disabled');
    nextButton.addEventListener('click', function(){
        start+=4;
        end+=4;
        if(end >= products.length){
            var product = products.slice(start, end);
            nextLink.setAttribute('class', 'page-item disabled');
            preLink.setAttribute('class', 'page-item');
            presentPage.textContent = Math.round(end/4);
            render(product);
        }
        else{
            var product = products.slice(start, end);
            nextLink.setAttribute('class', 'page-item');
            preLink.setAttribute('class', 'page-item');
            presentPage.textContent = Math.round(end/4);
            render(product);
        }
        
    })

    preButton.addEventListener('click', function(){
        start-=4;
        end-=4;
        if(start < 4 ){
            var product = products.slice(start, end);
            preLink.setAttribute('class', 'page-item disabled');
            nextLink.setAttribute('class', 'page-item');
            presentPage.textContent = Math.round(end/4);
            render(product);
        }
        else{
            var product = products.slice(start, end);
            preLink.setAttribute('class', 'page-item');
            nextLink.setAttribute('class', 'page-item');
            presentPage.textContent = Math.round(end/4);
            render(product);
        }
    })
    function addlinkPage(page){
        page.addEventListener('click', function(){
            end = page.textContent * 4;
            start = end - 4;
            var product = products.slice(start, end);
            presentPage.textContent = Math.round(end/4);
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
            render(product);
        })
    }
    addlinkPage(startPage);
    addlinkPage(nextStartPage);
    addlinkPage(preEndPage);
    addlinkPage(endPage );
      
    function render(product){
        var string = product.map(function(item){
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
    }
    render(product)

});
