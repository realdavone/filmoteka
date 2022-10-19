import{_ as v,j as f,o as i,c as d,a as e,u as p,k as m,I as A,p as b,f as k,r as $,S as U,F as h,g as w,t as C,b as g,U as E,l as y,V as j,d as R,w as x,W as D,X as N,e as O,y as W}from"./index.88e82aa5.js";const T=t=>(b("data-v-c43b6d84"),t=t(),k(),t),L={class:"settings"},V={class:"row"},z=T(()=>e("span",{class:"label"},"Povolen\xE9 registr\xE1cie",-1)),B=["data-active"],J={class:"row"},P=T(()=>e("span",{class:"label"},"Sledovanie bez registr\xE1cie",-1)),F=["data-active"],Z=T(()=>e("span",{class:"label"},"Refresh tokeny",-1)),M={__name:"Config",setup(t){const s=f("store"),_=async(n,c)=>{try{await m({endpoint:"/config/update",options:{method:"PUT",headers:{"Content-Type":"application/json","access-token":s.state.credentials.accessToken},body:JSON.stringify({[n]:!c})}})}catch(a){console.log(a)}},l=async()=>{try{const n=await m({endpoint:"/config/clear-tokens",options:{method:"DELETE",headers:{"Content-Type":"application/json","access-token":s.state.credentials.accessToken}}});n.success&&A({type:"success",text:n.message})}catch(n){console.log(n)}};return(n,c)=>{var a,r;return i(),d("section",L,[e("div",V,[z,e("button",{"data-active":(a=p(s).state.globalSettings)==null?void 0:a.allowRegistration,class:"toggle-button",onClick:c[0]||(c[0]=o=>{var u;return _("allowRegistration",(u=p(s).state.globalSettings)==null?void 0:u.allowRegistration)})},null,8,B)]),e("div",J,[P,e("button",{"data-active":(r=p(s).state.globalSettings)==null?void 0:r.allowWatchWhileUnregistered,class:"toggle-button",onClick:c[1]||(c[1]=o=>{var u;return _("allowWatchWhileUnregistered",(u=p(s).state.globalSettings)==null?void 0:u.allowWatchWhileUnregistered)})},null,8,F)]),e("div",{class:"row"},[Z,e("button",{onClick:l,class:"remove-button"},"Zmaza\u0165")])])}}},S=v(M,[["__scopeId","data-v-c43b6d84"]]),G={};function H(t,s){return i(),d("div",null," \u0160tatistiky ")}const X=v(G,[["render",H]]);const q={class:"recommended"},K=["src","alt"],Q={class:"timestamp"},Y=["onClick"],ee={key:0},te={__name:"Recommended",async setup(t){let s,_;const l=$([]);l.value=([s,_]=U(()=>m({endpoint:"/title/recommended"})),s=await s,_(),s);const n=a=>new Intl.RelativeTimeFormat("sk",{localeMatcher:"best fit",style:"short"}).format(-Math.floor((new Date-new Date(a))/(1e3*60*60)),"hours"),c=async a=>{(await m({endpoint:"/title/recommend",options:{method:"DELETE",headers:{"Content-Type":"application/json","access-token":E.state.credentials.accessToken},body:JSON.stringify({id:a})}})).success&&(l.value=l.value.filter(o=>o._id!==a))};return(a,r)=>(i(),d(h,null,[e("section",q,[(i(!0),d(h,null,w(l.value,o=>(i(),d("div",{key:o._id,class:"item"},[e("img",{src:`https://www.themoviedb.org/t/p/w300${o.title.img}`,alt:o.title.savedTitle},null,8,K),e("span",Q,C(n(o.createdAt)),1),e("button",{class:"remove-button",onClick:u=>c(o._id)},"Zmaza\u0165",8,Y)]))),128))]),l.value.length===0?(i(),d("p",ee,"\u017Diadne odpor\xFA\u010Dane")):g("",!0)],64))}},se=v(te,[["__scopeId","data-v-1e5dff73"]]);const oe=t=>(b("data-v-0e8593f8"),t=t(),k(),t),ne={class:"user"},ae={class:"details"},ce={key:0,class:"material-symbols-outlined label"},ie={key:1,class:"material-symbols-outlined owner"},le={class:"control"},re=oe(()=>e("span",null,"Admin",-1)),de=["data-active"],_e={__name:"User",props:{user:Object},emits:["removeUser"],setup(t,{emit:s}){const{user:_}=t,l=f("store"),n=$(_.isAdmin),c=async r=>{try{(await m({endpoint:"/user/toggleadmin",options:{method:"PATCH",headers:{"Content-Type":"application/json","access-token":l.state.credentials.accessToken},body:JSON.stringify({id:r})}})).success&&(n.value=!n.value)}catch(o){console.log(o)}},a=async r=>{try{(await m({endpoint:"/user/delete",options:{method:"DELETE",headers:{"Content-Type":"application/json","access-token":l.state.credentials.accessToken},body:JSON.stringify({id:r})}})).success&&s("removeUser",r)}catch(o){console.log(o)}};return(r,o)=>{var u;return i(),d("div",ne,[e("div",ae,[((u=p(l).state.credentials.user)==null?void 0:u.email)===t.user.email?(i(),d("span",ce,"person_filled")):g("",!0),e("span",null,C(t.user.email),1),t.user.isOwner?(i(),d("span",ie,"verified_user")):g("",!0)]),e("div",le,[re,e("button",{"data-active":n.value,class:"toggle-button",onClick:o[0]||(o[0]=I=>c(t.user._id))},null,8,de)]),e("button",{onClick:o[1]||(o[1]=I=>a(t.user._id)),class:"remove-user"},"Zmaza\u0165")])}}},ue=v(_e,[["__scopeId","data-v-0e8593f8"]]);const pe={class:"users"},me={__name:"Users",async setup(t){let s,_;const l=f("store"),n=$([]);n.value=([s,_]=U(()=>m({endpoint:"/user/all",options:{method:"GET",headers:{"Content-Type":"application/json","access-token":l.state.credentials.accessToken}}})),s=await s,_(),s);const c=a=>{n.value.users=n.value.users.filter(r=>r._id!==a)};return(a,r)=>(i(),d("section",pe,[(i(!0),d(h,null,w(n.value.users,o=>(i(),y(ue,{key:o._id,user:o,onRemoveUser:c},null,8,["user"]))),128))]))}},ve=v(me,[["__scopeId","data-v-cb9f5e8f"]]);const he=t=>(b("data-v-1071e190"),t=t(),k(),t),ge={class:"container"},ye={class:"dashboard"},fe=he(()=>e("span",null,"Ovl\xE1dac\xED panel",-1)),be={class:"columns"},ke={class:"menu"},$e=["data-active","onClick"],we={class:"material-symbols-outlined"},Ce={class:"content"},Te={name:"Admin"},xe=Object.assign(Te,{setup(t){const s=j(S),_=[{component:S,icon:"settings",name:"Nastavenia"},{component:se,icon:"recommend",name:"Odpor\xFA\u010Dan\xE9"},{component:ve,icon:"group",name:"U\u017E\xEDvatelia"},{component:X,icon:"analytics",name:"\u0160tatistiky"}];return(l,n)=>(i(),d("main",ge,[e("section",ye,[e("header",null,[R(N,{height:30}),fe]),e("div",be,[e("aside",ke,[(i(),d(h,null,w(_,(c,a)=>e("button",{key:a,class:"tab","data-active":p(s)===c.component,onClick:r=>s.value=c.component},[e("span",we,C(c.icon),1)],8,$e)),64))]),e("section",Ce,[(i(),y(D,null,{fallback:x(()=>[O("Loading")]),default:x(()=>[(i(),y(W(p(s))))]),_:1}))])])])]))}}),Ue=v(xe,[["__scopeId","data-v-1071e190"]]);export{Ue as default};