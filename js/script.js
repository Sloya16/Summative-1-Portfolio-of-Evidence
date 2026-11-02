console.log("JS is connected")

const form = document.getElementById("contact-form");
if(form){
    
    form.addEventListener("submit", function(event){
       event.preventDefault();
        let isValid = true;
        const name=document.getElementById("name").value.trim();
        const nameError = document.getElementById("name-error");
        if(name.length < 2){nameError.textContent="Please enter your full name";isValid=false;} else{nameError.textContent="";}
        
        const email=document.getElementById("email").value.trim();
        const emailError=document.getElementById("email-error");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailPattern.test(email)){
            emailError.textContent="Please enter a valid email address"; isValid=false;
        }else{
            emailError.textContent="";}
        
        const phone=document.getElementById("phone").value.trim();
        const phoneError=document.getElementById("phone-error");
        const phonePattern = /^0\d{9}$/;
        if(!phonePattern.test(phone)){
            phoneError.textContent="Please enter a valid Phone number"; isValid=false;
        }else{
            phoneError.textContent="";
        }
        
        const messageType=document.getElementById("type").value;
        const typeError=document.getElementById("type-error");
        if(messageType===""){
            typeError.textContent="Please choose a message type"; 
            isValid=false;
        }else{
            typeError.textContent="";
        }
        const message=document.getElementById("message").value.trim();
        const messageError=document.getElementById("message-error");
        if (message.length < 10){
            messageError.textContent = "please enter a message of at least 10 characters";
            isValid=false;
        }else{
            messageError.textContent="";
        }
        
        
        if(isValid){
            const recipient = "SibusisoKingsley@gmail.com";
            const subject = '${messageType} from ${name};'
            const body = "Name: " + name + "\n" + 
                          "Email: " + email + "\n" +
                          "Phone: " + phone + "\n" +
                          "Message Type: "+ messageType + "\n" +
                          "Message: "+ message;
            window.location.href = "mailto:" + recipient + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
            
    }
});
}

const enquiryForm = document.getElementById("enquiry-form");
if(enquiryForm){
    enquiryForm.addEventListener("submit", function(event){
       event.preventDefault();
        let isValid = true;
        const name=document.getElementById("name").value.trim();
        const nameError = document.getElementById("name-error");
        if(name.length < 2){nameError.textContent="Please enter your full name";isValid=false;} else{nameError.textContent="";}
        
        const email=document.getElementById("email").value.trim();
        const emailError=document.getElementById("email-error");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailPattern.test(email)){
            emailError.textContent="Please enter a valid email address"; isValid=false;
        }else{
            emailError.textContent="";}
        
        const phone=document.getElementById("phone").value.trim();
        const phoneError=document.getElementById("phone-error");
        const phonePattern = /^0\d{9}$/;
        if(!phonePattern.test(phone)){
            phoneError.textContent="Please enter a valid Phone number"; isValid=false;
        }else{
            phoneError.textContent="";
        }
        
        const orderType=document.getElementById("type").value;
        const orderError=document.getElementById("type-error");
        if(orderType===""){
            orderError.textContent="Please choose a order type"; 
            isValid=false;
        }else{
            orderError.textContent="";
        }
        const details=document.getElementById("details").value.trim();
        const detailsError=document.getElementById("details-error");
        if (details.length < 10){
            detailsError.textContent = "please enter at least 10 characters";
            isValid=false;
        }else{
            detailsError.textContent="";
        }
        const quantity=Number(document.getElementById("quantity").value);
        const quantityError=document.getElementById("quantity-error");
        if(!Number.isInteger(quantity) || quantity < 1){
            quantityError.textContent="Please enter a whole number of 1 or more";
            isValid=false;
        }else{
            quantityError.textContent="";
        }
        const date=document.getElementById("date").value;
        const dateError=document.getElementById("date-error");
        const today = new Date()
        today.setHours(0, 0, 0, 0);
        if(date===""){
            dateError.textContent="Please select a date";
            isValid=false;
        }else if(new Date(date) < today){
            dateError.textContent=" Please choose current or future date";
            isValid = false;
        }else{
            dateError.textContent = "";
        }
        
        if(isValid){
           const response = document.getElementById("enquiry-response");
            let message = "";
            if (orderType === "Custom cake"){
                message = `Thanks, ${name}. Custom cakes start from R450. We will confirm the final price for your ${quantity} cake(s) within two working days`;
            }else if (orderType === "Bulk bread order"){
                const total = quantity * 55;
                message = `Thanks, ${name}. ${quantity} loaves come to R${total}. We will confirm availability for ${date}.`;
            }else if (orderType === "Event catering"){
                message =`Thanks, ${name}. We will send you a catering quote within two working days`;
            }else{
                message = "Thank you. We will be in touch soon"
            }
            response.textContent = message;
            
            const data = {name:name, email:email, orderType:orderType, phone:phone, quantity: quantity, date:date, details:details,}
            
            response.textContent = "Sending your enquiry....";
            fetch("https://jsonplaceholder.typicode.com/posts",{
                method: "POST",
                    Headers: {"Content-type": "application/json"},
                        body: JSON.stringify(data)
            })
            .then(function(result){
                if(result.ok){
                    response.textContent = message;
                }else{
                    response.textContent = "Sorry We could not send your enquiry. Please try again.";
                }
            })
            .catch(function(){
                response.textContent ="Sorry We could not send your enquiry. Please check your internet connection and try again.";
            });
}
    
    
            });
}

const accordionButtons = document.querySelectorAll(".accordion-btn");

accordionButtons.forEach(function (button){
    button.addEventListener("click", function(){
        const panel = button.nextElementSibling;
        panel.classList.toggle("open");
        
        const isOpen = panel.classList.contains("open");
        button.setAttribute("aria-expanded", String(isOpen));
    });
    
    
});

const products =[
    {name: "Country sourdough", category: "Breads", description: "Crisp crust, open crumb, 24-hour ferment.", price: "R55"},
    {name: "Seeded rye", category: "Breads", description: "Sunflower, flax and pumpkin seeds.", price: "R60"},
    {name: "Soft rolls", category: "Breads", description: "Pack of six, baked each morning.", price: "R40"},
    {name: "Chocolate celebration cake", category: "Cakes", description: "Three layers with ganache.", price: "R450"},
    {name: "Vanilla berry cake", category: "Cakes", description: "Light sponge with fresh cream.", price: "R420"},
    {name: "Custom cake", category: "Cakes", description: "Tell us your theme and guest count", price: "Quote on request"},
    {name: "Butter croissant", category: "Pastries", description: "Laminated by hand.", price: "R28"},
    {name: "Custard tart", category: "Pastries", description: "Short pastry, silky filling.", price: "R25"},
    {name: "Cinnamon swirl", category: "Pastries", description: "Glazed and still warm.", price: "R30"},
];
const productList = document.getElementById("product-list");

function showProducts(items){
 productList.innerHTML = "";
    items.forEach(function(product){
        productList.innerHTML += `
    <article class="card">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">${product.price}</p>
    </article>`;
    });
}
function filterProducts() {
    const searchText = document.getElementById("search").value.toLowerCase().trim();
    const category = document.getElementById("category").value;
    const noResults = document.getElementById("no-results");

    const results = products.filter(function (product) {
        const matchesText = product.name.toLowerCase().includes(searchText) ||
                            product.description.toLowerCase().includes(searchText);
        const matchesCategory = category === "All" || product.category === category;
        return matchesText && matchesCategory;
    });

    showProducts(results);

    if (results.length === 0) {
        noResults.textContent = "No products match your search.";
    } else {
        noResults.textContent = "";
    }
}

if (productList) {
    showProducts(products);
    document.getElementById("search").addEventListener("input", filterProducts);
    document.getElementById("category").addEventListener("change", filterProducts);
}

const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");

function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
}

if (lightbox) {
    galleryImages.forEach(function (img) {
        img.addEventListener("click", function () {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add("open");
            lightbox.setAttribute("aria-hidden", "false");
        });
    });

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });
}

const mapElement = document.getElementById("map");

if(mapElement){
    const branches =[
        {name: "Lakeside mall", address:"18b Tom Jones street", lat: -26.184560957609406,lng: 28.313847900043385},
        {name: "Lakefield Junction", address:"99 Sunnyside Avenue", lat:-26.18167340879042, lng:28.293165077721817}
    ];
    
    const map = L.map("map").setView([branches[0].lat,branches[0].lng], 13);
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution: "Tiles &copy; Esri"
}).addTo(map);
    
    branches.forEach(function(branch){
        L.marker([branch.lat, branch.lng])
        .addTo(map)
        .bindPopup(`<strong>${branch.name}</strong><br>${branch.address}`);
    });
}

const revealItems = document.querySelectorAll(".reveal");

if("IntersectionObserver" in window){
    const observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
            if(entry.isIntersecting){
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },{threshold:0.15});
    
    revealItems.forEach(function(item){
        observer.observe(item);
    });
}else{
    revealItems.forEach(function(item){
        item.classList.add("visible");
    });
}

