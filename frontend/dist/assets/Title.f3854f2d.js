import{_ as l,i as _,s as d,o as t,l as p,w as u,d as s,c as i,e as a,t as r,u as m,p as g,f as h}from"./index.4890fbba.js";const v=o=>(g("data-v-411704c5"),o=o(),h(),o),y={class:"image-holder"},w=["src","alt"],k={class:"details"},S={class:"title-holder"},b={class:"title"},f={key:0,style:{color:"var(--secondary-text-color)"}},x={key:0,class:"rating"},C=v(()=>s("span",null,"\u2605",-1)),B={key:0,class:"material-symbols-outlined",style:{color:"var(--theme-color)"}},I={key:1,class:"overview"},N={__name:"Title",props:{title:String,overview:String,img:String,release:String,id:Number,type:String,rating:Number},setup(o){const e=o,n=_("store");return(T,D)=>{const c=d("router-link");return t(),p(c,{to:{name:e.type[0].toUpperCase()+e.type.substring(1),params:{id:e.id}},class:"title"},{default:u(()=>[s("div",y,[e.img?(t(),i("img",{key:0,src:"https://www.themoviedb.org/t/p/w154"+e.img,alt:e.title,loading:"lazy"},null,8,w)):a("",!0)]),s("section",k,[s("div",S,[s("span",b,r(e.title),1),e.release?(t(),i("span",f," ("+r(new Date(e.release).getFullYear())+")",1)):a("",!0)]),e.rating!==void 0?(t(),i("div",x,[C,s("span",null,r(e.rating),1),m(n).methods.watched.exists({type:e.type[0].toUpperCase()+e.type.substring(1),id:e.id.toString()})?(t(),i("span",B,"visibility")):a("",!0)])):a("",!0),e.overview?(t(),i("div",I,r(e.overview),1)):a("",!0)])]),_:1},8,["to"])}}},V=l(N,[["__scopeId","data-v-411704c5"]]);export{V as T};
