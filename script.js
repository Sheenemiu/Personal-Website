const toggle = document.getElementById("themeToggle");
toggle.onclick = () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  toggle.textContent = dark ? "☀️" : "🌙";
  localStorage.setItem("theme", dark ? "dark" : "light");
};
if(localStorage.getItem("theme")==="dark") document.body.classList.add("dark");


const sections = document.querySelectorAll("section");
window.addEventListener("scroll",()=>{
  sections.forEach(s=>{
    if(s.getBoundingClientRect().top < window.innerHeight-100) s.classList.add("show");
  });
});

const skillSection = document.getElementById('skills');
const skillBars = document.querySelectorAll('.bar span');

function animateSkills() {
  if(skillSection.getBoundingClientRect().top < window.innerHeight - 100){
    skillBars.forEach(bar => {
      bar.style.width = bar.getAttribute('data-level'); 
    });
    window.removeEventListener('scroll', animateSkills);
  }
}

window.addEventListener('scroll', animateSkills);


function resizeMasonry(){
  const gallery = document.querySelector(".gallery");
  const images = gallery.querySelectorAll("img");
  images.forEach(img=>{
    const rowHeight = parseInt(window.getComputedStyle(gallery).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(gallery).getPropertyValue('gap'));
    const rowSpan = Math.ceil((img.getBoundingClientRect().height + rowGap)/(rowHeight + rowGap));
    img.style.gridRowEnd = "span "+rowSpan;
  });
}
window.addEventListener("load", resizeMasonry);
window.addEventListener("resize", resizeMasonry);


const modal = document.getElementById("modal");
const modalImg = modal.querySelector("img");
document.querySelectorAll(".gallery img").forEach(img=>{
  img.addEventListener("click", ()=>{
    modalImg.src = img.src;
    modal.classList.add("show");
  });
});
modal.addEventListener("click", ()=>{
  modal.classList.remove("show");
});

function filterArt(type){
  document.querySelectorAll(".gallery img").forEach(img=>{
    img.style.display = (type==="all" || img.dataset.type===type) ? "block" : "none";
  });
  
  setTimeout(()=>{
    resizeMasonry();
    applyZoom();
  }, 100);
}
window.filterArt = filterArt; 


const typingElement = document.querySelector('.typing');
const textToType = "Artist • Computer Engineering Student • Certified Lover Girl";
let index = 0;

function typeText() {
  if (index <= textToType.length) {
    typingElement.textContent = textToType.slice(0, index);
    index++;
    setTimeout(typeText, 100); 
  }
}

typeText(); 


setInterval(() => {
  typingElement.style.borderRightColor =
    typingElement.style.borderRightColor === 'transparent' ? 'var(--pink)' : 'transparent';
}, 500);
