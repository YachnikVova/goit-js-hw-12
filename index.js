/* empty css                      */import{a as M,S as A,i as p}from"./assets/vendor-73qhTu8_.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const O="55655169-5dca28bc7cc616be385f48ac4",R="https://pixabay.com/api/",_=15;async function y(e,o){const{data:n}=await M.get(R,{params:{key:O,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:_}});return n}const h=document.querySelector(".gallery"),g=document.querySelector(".loader"),L=document.querySelector(".load-more"),x=new A(".gallery a",{captionsData:"alt",captionDelay:250});function b(e){const o=e.map(({webformatURL:n,largeImageURL:a,tags:t,likes:r,views:s,comments:$,downloads:B})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${a}">
          <img
            class="gallery-image"
            src="${n}"
            alt="${t}"
          />
        </a>
        <div class="gallery-info">
          <p><b>Likes</b>${r}</p>
          <p><b>Views</b>${s}</p>
          <p><b>Comments</b>${$}</p>
          <p><b>Downloads</b>${B}</p>
        </div>
      </li>
    `).join("");h.insertAdjacentHTML("beforeend",o),x.refresh()}function D(){h.innerHTML=""}function w(){g.classList.remove("hidden")}function v(){g.classList.add("hidden")}function S(){L.classList.remove("hidden")}function d(){L.classList.add("hidden")}const u=document.querySelector(".form"),G=document.querySelector(".load-more"),H=15;let c="",i=1,f=0;const m=new Set,l=e=>p.error({message:e,position:"topRight"}),I=e=>p.info({message:e,position:"topRight"});d();u.addEventListener("submit",async e=>{if(e.preventDefault(),c=u.elements.searchQuery.value.trim(),i=1,f=0,m.clear(),D(),d(),!c)return l("Введи щось...");w();try{const o=await y(c,i);if(f=o.totalHits,!o.hits.length)return l("Порожньо. Нічого не знайдено.");if(b(q(o.hits)),E())return P();S()}catch{l("Щось зламалось...")}finally{v()}u.reset()});G.addEventListener("click",async()=>{i++,d(),w();try{const e=await y(c,i);if(b(q(e.hits)),N(),E())return P();S()}catch{l("Щось зламалось...")}finally{v()}});const q=e=>e.filter(o=>m.has(o.id)?!1:(m.add(o.id),!0)),E=()=>i*H>=f,P=()=>{d(),I("Кінець. Більше нічого нема.")},N=()=>{const e=document.querySelector(".gallery-item");if(!e)return;const o=e.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})};
//# sourceMappingURL=index.js.map
