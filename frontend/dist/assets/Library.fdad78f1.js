import{_ as L,A as N,r as v,v as P,h as S,c as p,a as f,w as I,d as s,B as y,C as g,F as w,g as q,u as F,q as k,t as V,e as $,x as Q,y as U,i as z,k as H,o as r,b as M,l as x,D as R,p as j,f as A}from"./index.4890fbba.js";import{T as E}from"./Title.f3854f2d.js";import{H as K}from"./Title.7024bd11.js";import{_ as G}from"./NoResults.663cd16e.js";import{I as J}from"./ItemPanel.db316b93.js";const i=u=>(j("data-v-34165822"),u=u(),A(),u),O={class:"container wrapper"},W={class:"filter"},X=i(()=>s("option",{value:"movie"},"Filmy",-1)),Y=i(()=>s("option",{value:"tv"},"TV",-1)),Z=[X,Y],ee=["value"],te=R('<option value="popularity.desc" data-v-34165822>Popularita \u2193</option><option value="popularity.asc" data-v-34165822>Popularita \u2191</option><option value="release_date.desc" data-v-34165822>D\xE1tum vydania \u2193</option><option value="release_date.asc" data-v-34165822>D\xE1tum vydania \u2191</option><option value="revenue.desc" data-v-34165822>Tr\u017Eby \u2193</option><option value="revenue.asc" data-v-34165822>Tr\u017Eby \u2191</option>',6),ae=[te],se=i(()=>s("span",{class:"label"},"Filter",-1)),oe=i(()=>s("span",{class:"material-symbols-outlined",style:{"font-size":"1.25rem"}},"filter_alt",-1)),re=[se,oe],ne={key:0,class:"page-control"},ie=["disabled"],le=i(()=>s("span",{class:"material-symbols-outlined"},"chevron_left",-1)),pe=[le],ue={class:"current-page"},de=["disabled"],ce=i(()=>s("span",{class:"material-symbols-outlined"},"chevron_right",-1)),_e=[ce],ve={__name:"Library",setup(u){const o=Q(),d=U(),m=z("store"),a=N({type:o.query.type||"movie",genre:o.query.genre||28,sort:o.query.sort||"popularity.desc",page:1}),c=v(),l=v([]),b=v(!1),C=P(()=>`/discover/${o.query.type||"movie"}?sort=${o.query.sort||"popularity.desc"}&page=${o.query.page||1}&genre=${o.query.genre||28}`),T=async n=>{try{const t=await H({endpoint:n});l.value=l.value.concat(t.results.filter(e=>e.poster_path)),c.value=t.total_pages,a.page=t.page,b.value=!0}catch{d.push({name:"NotFound"})}},D=(n,t,e,_)=>{d.push({name:"Library",query:{type:n,sort:t,genre:_,page:e}})},h=n=>{const e={...o.query,page:n};d.push({name:"Library",query:e})};S(()=>{T(C.value)});const B=()=>{a.genre=m.state.genres[type.value].entries().next().value[0]};return(n,t)=>(r(),p("main",O,[f(K,{style:{"margin-bottom":"0"}},{default:I(()=>[M("Kni\u017Enica")]),_:1}),s("section",W,[y(s("select",{id:"type","onUpdate:modelValue":t[0]||(t[0]=e=>a.type=e),onChange:t[1]||(t[1]=e=>B())},Z,544),[[g,a.type]]),y(s("select",{id:"genres","onUpdate:modelValue":t[2]||(t[2]=e=>a.genre=e)},[(r(!0),p(w,null,q(F(m).state.genres[a.type],([e,_])=>(r(),p("option",{key:e,value:e},V(_),9,ee))),128))],512),[[g,a.genre]]),y(s("select",{id:"sortby","onUpdate:modelValue":t[3]||(t[3]=e=>a.sort=e)},ae,512),[[g,a.sort]]),s("button",{onClick:t[4]||(t[4]=e=>D(a.type,a.sort,1,a.genre)),class:"filter-button"},re)]),f(J,{placeholderData:{count:4,type:"title"}},{item:I(()=>[(r(!0),p(w,null,q(l.value,e=>(r(),x(E,{key:e.id,title:e.title||e.name,img:e.poster_path,release:e.release_date||e.first_air_date,overview:e.overview,id:e.id,type:a.type,rating:e.vote_average},null,8,["title","img","release","overview","id","type","rating"]))),128)),l.value.length===0&&b.value===!0?(r(),x(G,{key:0})):$("",!0)]),_:1}),l.value.length!==0?(r(),p("section",ne,[s("button",{class:k([{disabled:parseInt(a.page)===1},"arrow-button"]),disabled:parseInt(a.page)===1,onClick:t[5]||(t[5]=e=>h(parseInt(a.page)-1))},pe,10,ie),s("span",ue,V(a.page),1),s("button",{class:k([{disabled:parseInt(a.page)===parseInt(c.value)},"arrow-button"]),disabled:parseInt(a.page)===parseInt(c.value),onClick:t[6]||(t[6]=e=>h(parseInt(a.page)+1))},_e,10,de)])):$("",!0)]))}},fe=L(ve,[["__scopeId","data-v-34165822"]]);export{fe as default};
