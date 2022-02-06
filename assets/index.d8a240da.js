var u=Object.defineProperty;var g=(t,i,r)=>i in t?u(t,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[i]=r;var e=(t,i,r)=>(g(t,typeof i!="symbol"?i+"":i,r),r);const p=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))d(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&d(c)}).observe(document,{childList:!0,subtree:!0});function r(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerpolicy&&(n.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?n.credentials="include":s.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(s){if(s.ep)return;s.ep=!0;const n=r(s);fetch(s.href,n)}};p();const h=document.querySelector("#canvas"),o=h.getContext("2d");let a=[],l=[];h.width=window.innerWidth;h.height=window.innerHeight;window.addEventListener("resize",()=>{h.width=window.innerWidth,h.height=window.innerHeight});class y{constructor(i,r){e(this,"x");e(this,"y");e(this,"speed",Math.cos(Math.random()*Math.PI/2)*5);e(this,"size",Math.random()*(6-2)+2);e(this,"color",`hsla(${Math.random()*400+12}, 100%, 60%, 1)`);e(this,"angle",Math.random()*Math.PI*2);e(this,"vx",Math.cos(this.angle)*this.speed);e(this,"vy",Math.sin(this.angle)*this.speed);e(this,"gravity",.05);e(this,"resistance",.998);e(this,"shrink",Math.random()*(.15-.05)+.05);this.x=i,this.y=r}update(){this.vx*=this.resistance,this.vy*=this.resistance,this.vy+=this.gravity,this.x+=this.vx,this.y+=this.vy,this.size>.2&&(this.size-=this.shrink)}draw(){o.beginPath(),o.fillStyle=this.color,o.arc(this.x,this.y,this.size,0,Math.PI*2),o.fill()}}class m{constructor(i,r,d){e(this,"x",h.width/2);e(this,"y",h.height);e(this,"size",2.5);e(this,"color");e(this,"targetX");e(this,"targetY");e(this,"velX");e(this,"velY");e(this,"angle");e(this,"isExploded",!1);this.color=d,this.targetX=i,this.targetY=r,this.angle=Math.atan2(this.targetX-h.width/2,this.targetY-h.height),this.velX=Math.sin(this.angle),this.velY=Math.cos(this.angle)}update(){this.x+=this.velX*12,this.y+=this.velY*12,this.y<=this.targetY+5&&this.explode()}draw(){o.beginPath(),o.fillStyle=this.color,o.arc(this.x,this.y,this.size,0,Math.PI*2),o.fill()}explode(){let i=Math.random()*(300-150)+150;for(let r=1;r<i;r++)l.push(new y(this.targetX+Math.random()*5,this.targetY));this.isExploded=!0}}function w(){for(let t=0;t<l.length;t++)l[t].draw(),l[t].update(),l[t].size<=.2&&(l.splice(t,1),t--)}function f(){if(o.fillStyle="hsla(0, 0%, 0% ,0.2)",o.fillRect(0,0,h.width,h.height),(a==null?void 0:a.length)>0)for(let t=0;t<a.length;t++)a[t].update(),a[t].draw(),a[t].isExploded&&(a.splice(t,1),t--);w(),requestAnimationFrame(f)}function v(){document.addEventListener("click",t=>{let i=Math.random()*360;a.push(new m(t.clientX,t.clientY,`hsla(${i}, 100%, 60%, 1)`))})}v();f();