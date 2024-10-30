const mapEl=document.getElementById("map"),supplierViewEl=document.getElementById("supplier-view"),closeSupplierViewEl=document.getElementById("close-supplier-view-btn"),supplierTitleEl=document.getElementById("supplier-view--title"),supplierLinkEl=document.getElementById("supplier-view--link"),supplierDescEl=document.getElementById("supplier-view--desc"),supplierAddrEl=document.getElementById("supplier-view--addr"),supplierImgEl=document.getElementById("supplier-view--img"),supplierImgWrapper=supplierImgEl.closest("div"),nextSupplierBtnEl=document.getElementById("next-supplier-btn"),previousSupplierBtnEl=document.getElementById("previous-supplier-btn");mapboxgl.accessToken="pk.eyJ1IjoiYXJkZWEtYXBwcyIsImEiOiJjbTJsdWtpNG0wZjlwMnJxdDI3ZTl6c2VrIn0.i5FwYK_rj7P7uEDA_wR1Yw",console.error("!!! DEV TOKEN"),defaultCenter=[-.41565168572231065,52.564292899166944];const map=new mapboxgl.Map({container:"map",center:defaultCenter,zoom:9}),suppliers={blondeBeet:{name:"Blonde Beet",desc:"Plant-based café in Stamford",img:"/img/suppliers/blonde_beet.webp",lngLat:[-.4757147,52.6534476],address:["7 St Paul's Street","Stamford","PE9 2BE"],link:"https://www.blondebeet.co.uk/"},wildHeartCafe:{name:"Wild Heart Café",desc:"Café sourcing local ingredients",img:"/img/suppliers/wild_heart.webp",lngLat:[-.3778873,52.7685432],address:["Angel Precinct","Bourne","PE10 9AE"],link:"https://www.wildheartcafe.co.uk/"},bythamsCommunityShop:{name:"Bythams Community Shop & Café",desc:"Community shop in Castle Bytham",img:"/img/suppliers/bythams_community_shop.webp",lngLat:[-.5331444,52.7507953],address:["46 Station Rd","Castle Bytham","NG33 4SJ"],link:"https://bythams.shop/"},vineHouse:{name:"Vine House",desc:'"Passionate about locally sourced food"',img:"/img/suppliers/vine_house.webp",lngLat:[-.2170644,52.7200317],address:["Main Road","Deeping St Nicholas","PE11 3DG"],link:"https://www.vinehousefarmshopcafe.co.uk/"},berrysCoffeeHouse:{name:"Berry's Coffee House",desc:"Café in Thrapston",img:"/img/suppliers/berrys_coffee_house.webp",lngLat:[-.5369919,52.3972421],address:["7 The Bullring","Thrapston","NN14 4NP"],link:"https://www.instagram.com/berrysthrapston/"},grimsthrorpeFarmShop:{name:"Grimsthorpe Farm Shop",desc:"Farm shop within the Grimsthorpe Castle estate",img:"/img/suppliers/grimsthorpe_farm_shop.webp",lngLat:[-.4523920553382475,52.79254981569452],address:["The Estate Yard","Grimsthorpe","PE10 0LY"],link:"https://grimsthorpe.co.uk/farm-shop/"}},supplierKeys=Object.keys(suppliers);let activeSupplierIndex=0;function removeImgLoader(){supplierImgWrapper.classList.remove("loading")}supplierImgEl.addEventListener("load",removeImgLoader);function hideSupplierInfo(){supplierViewEl.classList.add("hidden"),closeSupplierViewEl.removeEventListener("click",hideSupplierInfo),mapEl.style.pointerEvents="auto"}function showSupplierInfo(e,t){activeSupplierIndex=t,supplierViewEl.classList.remove("hidden"),closeSupplierViewEl.addEventListener("click",hideSupplierInfo);const n=suppliers[e];supplierTitleEl.innerText=n.name,supplierLinkEl.href=n.link,supplierDescEl.innerText=n.desc,supplierAddrEl.innerText=n.address.join(`
`),supplierImgEl.src=n.img,supplierImgWrapper.classList.add("loading"),map.jumpTo({center:n.lngLat}),mapEl.style.pointerEvents="none"}function onNext(){const e=(activeSupplierIndex+1)%supplierKeys.length,t=supplierKeys[e];showSupplierInfo(t,e)}function onPrevious(){const e=activeSupplierIndex===0?supplierKeys.length-1:activeSupplierIndex-1,t=supplierKeys[e];showSupplierInfo(t,e)}nextSupplierBtnEl.addEventListener("click",onNext),previousSupplierBtnEl.addEventListener("click",onPrevious);function getMarkerEl(e,t){const n=document.createElement("div");return n.classList.add("supplier-marker"),n.addEventListener("click",()=>showSupplierInfo(e,t)),n}for(i=0;i<supplierKeys.length;i++){const e=supplierKeys[i],t=suppliers[e];new mapboxgl.Marker({element:getMarkerEl(e,i)}).setLngLat(t.lngLat).addTo(map)}