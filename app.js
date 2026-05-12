const slider=document.getElementById('slider');
const main=document.getElementById('main');
const search=document.getElementById('search');
const btn=document.getElementById('themeToggle');

let pageTop=1,pageOngoing=1;

// Theme
if(localStorage.theme==='dark'){
 document.body.classList.add('dark');
 btn.textContent='☀️';
}
btn.onclick=()=>{
 document.body.classList.toggle('dark');
 localStorage.theme=document.body.classList.contains('dark')?'dark':'light';
 btn.textContent=document.body.classList.contains('dark')?'☀️':'🌙';
};

main.innerHTML=`
<h3>🔥 Top Anime</h3>
<div id="topList" class="grid"></div>

<h3>📺 Ongoing Anime</h3>
<div id="ongoingList" class="grid"></div>

<div style="text-align:center;padding:10px">
<button id="loadMore">Load More</button>
</div>
`;

const topList=document.getElementById('topList');
const ongoingList=document.getElementById('ongoingList');

async function loadTop(){
 const r=await fetch(`https://api.jikan.moe/v4/top/anime?page=${pageTop}`);
 const d=await r.json();
 d.data.forEach(a=>card(a,topList));
 pageTop++;
}
async function loadOngoing(){
 const r=await fetch(`https://api.jikan.moe/v4/seasons/now?page=${pageOngoing}`);
 const d=await r.json();
 d.data.forEach(a=>card(a,ongoingList));
 pageOngoing++;
}

function card(a,parent){
 const div=document.createElement('div');
 div.className='card';
 div.innerHTML=`
 <div class="rating">⭐ ${a.score||'N/A'}</div>
 <img src="${a.images.jpg.image_url}">
 <p>${a.title}</p>`;
 div.onclick=()=>location.href=`watch.html?title=${encodeURIComponent(a.title)}`;
 parent.appendChild(div);

 if(slider.children.length<10){
  const img=document.createElement('img');
  img.src=a.images.jpg.image_url;
  img.onclick=()=>location.href=`watch.html?title=${encodeURIComponent(a.title)}`;
 slider.appendChild(img);
 }
}

document.getElementById('loadMore').onclick=()=>{
 loadTop();
 loadOngoing();
};

loadTop();
loadOngoing();

search.oninput=()=>{
 const v=search.value.toLowerCase();
 document.querySelectorAll('.card').forEach(c=>{
  c.style.display=c.innerText.toLowerCase().includes(v)?'block':'none';
 });
};
