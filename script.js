const menuBtn=document.getElementById("menuBtn");
const mobileMenu=document.getElementById("mobileMenu");

menuBtn.addEventListener("click",()=>{
  const open=mobileMenu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded",open);
  mobileMenu.setAttribute("aria-hidden",!open);
});
mobileMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  mobileMenu.classList.remove("open");
  menuBtn.setAttribute("aria-expanded","false");
  mobileMenu.setAttribute("aria-hidden","true");
}));

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const navLinks=document.querySelectorAll(".desktop-nav a");
const sections=[...document.querySelectorAll("main section[id]")];
const navObserver=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+entry.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px",threshold:0});
sections.forEach(section=>navObserver.observe(section));

window.addEventListener("mousemove",(e)=>{
  if(window.innerWidth<900 || window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const x=(e.clientX/window.innerWidth-.5);
  const y=(e.clientY/window.innerHeight-.5);
  document.querySelector(".hero-orbit").style.transform=`translate(${x*12}px,${y*8}px)`;
  document.querySelectorAll(".tree").forEach((tree,i)=>{
    tree.style.marginLeft=`${x*(i+1)*2}px`;
  });
});
