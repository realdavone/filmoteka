import{_ as b,r as c,h as k,c as d,a as q,w,d as o,q as h,t as S,e as g,x,y as B,k as C,o as s,F as $,g as D,l as f,p as M,f as N}from"./index.4890fbba.js";import{T as P}from"./Title.f3854f2d.js";import{I as F}from"./ItemPanel.db316b93.js";import{_ as V}from"./NoResults.663cd16e.js";const m=l=>(M("data-v-c3e23aeb"),l=l(),N(),l),R={class:"items-holder"},T={key:0,class:"page-nav"},z=["disabled"],E=m(()=>o("i",{class:"fas fa-angle-left"},null,-1)),L=[E],j=["disabled"],A=m(()=>o("i",{class:"fas fa-angle-right"},null,-1)),G=[A],H={__name:"MovieSearch",setup(l){const i=c(!1),r=c([]),a=c(""),u=c(""),p=x(),_=B(),y=async(n,t)=>{try{const e=await C({endpoint:`/search/movie?query=${n}&page=${t}`});u.value=e.total_pages,a.value=e.page,r.value=e.results.filter(I=>I.poster_path!==null),i.value=!0}catch{_.push({name:"NotFound"})}},v=n=>{_.push({path:"/search/movie",query:{q:p.query.q,page:n}})};return k(()=>{y(p.query.q,p.query.page)}),(n,t)=>(s(),d("section",R,[q(F,{placeholderData:{count:4,type:"title"}},{item:w(()=>[(s(!0),d($,null,D(r.value,e=>(s(),f(P,{key:e.id,title:e.title,img:e.poster_path,release:e.release_date,overview:e.overview,id:e.id,type:"movie",rating:e.vote_average},null,8,["title","img","release","overview","id","rating"]))),128)),r.value.length===0&&i.value?(s(),f(V,{key:0})):g("",!0)]),_:1}),r.value.length>0&&i.value?(s(),d("section",T,[o("button",{class:h({disabled:parseInt(a.value)===1}),disabled:parseInt(a.value)===1,onClick:t[0]||(t[0]=e=>v(parseInt(a.value)-1))},L,10,z),o("span",null,S(a.value),1),o("button",{class:h({disabled:parseInt(a.value)>=parseInt(u.value)}),disabled:parseInt(a.value)>=parseInt(u.value),onClick:t[1]||(t[1]=e=>v(parseInt(a.value)+1))},G,10,j)])):g("",!0)]))}},U=b(H,[["__scopeId","data-v-c3e23aeb"]]);export{U as default};
