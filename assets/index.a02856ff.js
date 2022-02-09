var z=Object.defineProperty;var S=(e,t,r)=>t in e?z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var i=(e,t,r)=>(S(e,typeof t!="symbol"?t+"":t,r),r);const X=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const y of a.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&c(y)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerpolicy&&(a.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?a.credentials="include":s.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}};X();var R="/canvas-fireworks/assets/burst1.4e7b4737.mp3",$="/canvas-fireworks/assets/lift3.6ebed2d1.mp3";const F=new Audio(R),N=new Audio($);function k(e){e.paused?e.play():e.currentTime=0}class P{play(t){t=="lift"&&k(N),t=="burst"&&k(F)}}const d=document.querySelector(".sound-on"),u=document.querySelector(".sound-off"),M=document.querySelector(".sound-control"),f=document.querySelector(".play"),g=document.querySelector(".pause"),L=document.querySelector(".play-pause");let v=!1,w=!0;M==null||M.addEventListener("click",()=>{v?(d==null||d.classList.remove("active"),u==null||u.classList.add("active"),v=!1):(d==null||d.classList.add("active"),u==null||u.classList.remove("active"),v=!0)});L==null||L.addEventListener("click",()=>{w?(g==null||g.classList.remove("active"),f==null||f.classList.add("active"),w=!1,b()):(g==null||g.classList.add("active"),f==null||f.classList.remove("active"),w=!0,x())});const q=new P,o=document.querySelector("#canvas"),n=o.getContext("2d");let l=[],m=[];o.width=window.innerWidth;o.height=window.innerHeight;window.addEventListener("resize",()=>{o.width=window.innerWidth,o.height=window.innerHeight});function h(e,t){return Math.floor(Math.random()*(e-t)+t)}function A(e,t){return Math.random()*(e-t)+t}const p=[330,353,18,182,13,346,327,229,1,275,232,7];class C{constructor(t,r,c,s){i(this,"x");i(this,"y");i(this,"speed",Math.cos(Math.random()*Math.PI/2)*5);i(this,"size",Math.random()*(6-2)+2);i(this,"angle",Math.random()*Math.PI*2);i(this,"vx",Math.cos(this.angle)*this.speed);i(this,"vy",Math.sin(this.angle)*this.speed);i(this,"gravity",.05);i(this,"resistance",.998);i(this,"shrink",A(.05,.15));i(this,"color");i(this,"rainbowColor");i(this,"isRainbow");this.x=t,this.y=r,this.isRainbow=s,this.color=`hsla(${c}, 100%, ${h(40,100)}%, 1)`,this.rainbowColor=`hsla(${p[h(0,p.length-1)]}, ${h(80,100)}%, ${h(10,90)}%, 1)`}update(){this.vx*=this.resistance,this.vy*=this.resistance,this.vy+=this.gravity,this.x+=this.vx,this.y+=this.vy,this.size>.2&&(this.size-=this.shrink)}draw(){n.beginPath(),n.fillStyle=this.isRainbow?this.rainbowColor:this.color,n.arc(this.x,this.y,this.size,0,Math.PI*2),n.fill()}}class B{constructor(t,r,c,s,a){i(this,"x",o.width/2);i(this,"y",o.height);i(this,"size",2);i(this,"color");i(this,"targetX");i(this,"targetY");i(this,"velX");i(this,"velY");i(this,"angle");i(this,"isExploded",!1);i(this,"hue");i(this,"isRainbow");this.color=c,this.targetX=t,this.targetY=r,this.angle=Math.atan2(this.targetX-o.width/2,this.targetY-o.height),this.velX=Math.sin(this.angle),this.velY=Math.cos(this.angle),this.hue=s,this.isRainbow=a}update(){this.x+=this.velX*10,this.y+=this.velY*10,this.y<=this.targetY+5&&this.explode()}draw(){n.beginPath(),n.fillStyle=this.color,n.arc(this.x,this.y,this.size,0,Math.PI*2),n.fill()}explode(){let t=Math.random()*(300-150)+150;for(let r=1;r<t;r++)m.push(new C(this.targetX+Math.random()*5,this.targetY,this.hue,this.isRainbow));v&&q.play("burst"),this.isExploded=!0}}function H(){for(let e=0;e<m.length;e++)m[e].draw(),m[e].update(),m[e].size<=.2&&(m.splice(e,1),e--)}function E(){if(n.fillStyle="hsla(0, 0%, 0% ,0.2)",n.fillRect(0,0,o.width,o.height),(l==null?void 0:l.length)>0)for(let e=0;e<l.length;e++)l[e].update(),l[e].draw(),l[e].isExploded&&(l.splice(e,1),e--);H(),requestAnimationFrame(E)}function W(){o.addEventListener("click",e=>{I(e.clientX,e.clientY)})}function I(e,t){let r=p[h(0,p.length-1)],c=`hsla(${r}, 100%, 50%, 1)`;l.push(new B(e,t,c,r,!(Math.random()<.5))),v&&q.play("lift")}let Y;function x(){Y=setInterval(()=>{I(h(o.width*.25,o.width*.75),h(150,o.height/3))},400)}function b(){clearInterval(Y)}document.addEventListener("visibilitychange",()=>{document.hidden?b():w&&x()});W();E();x();