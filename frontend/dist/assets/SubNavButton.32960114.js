import{_ as $,o as e,c as a,a as s,m as _,v as A,j as L,r as I,q as M,l as m,w as c,e as i,t as p,b as d,F as h,g as y,u as C,n as T,d as f,p as w,f as P,E as F,J as O,K as W,T as B,I as H}from"./index.88e82aa5.js";import{H as R}from"./Title.e6b178dd.js";const Y={},Z={class:"item"},q={class:"label"},J={class:"content"};function K(t,n){return e(),a("div",Z,[s("span",q,[_(t.$slots,"label",{},void 0,!0)]),s("span",J,[_(t.$slots,"content",{},void 0,!0)])])}const g=$(Y,[["render",K],["__scopeId","data-v-0351090e"]]);const U=t=>(w("data-v-fa704b80"),t=t(),P(),t),G={class:"title user-select-none"},Q={key:0,class:"details"},X={class:"ratings"},ee=U(()=>s("span",{class:"label"},"Hodnotenia",-1)),te=["href"],se={key:0},ae={class:"overview"},ne=U(()=>s("span",{class:"label"},"Preh\u013Ead",-1)),oe={key:1,class:"creators"},le={class:"name-job"},re={class:"jobs"},ce=["onError","src","alt","title"],ie={__name:"Details",props:{details:Object},setup(t){const n=t,l=A(),v=L("store"),u=I(l.name.charAt(0).toLowerCase()+l.name.substr(1)),o=I(n.details),k=I(null),N=(S,j)=>S.children[j].style.display="none";v.methods.recentItems.pushItem({type:u.value,title:o.value.title,id:l.params.id,poster:o.value.poster}),new Map().set("Pokra\u010Duje","more_horiz").set("Napl\xE1novany","event").set("V produkci\xED","build").set("Skon\u010Dil","check_circle").set("Zru\u0161en\xFD","cancel").set("Pilot","filter_1");const V=S=>parseFloat(S)<2.5?"low":parseFloat(S)<7?"medium":"high";return(S,j)=>{const E=M("router-link");return e(),a("section",G,[o.value.status||o.value.release_date||o.value.number_of_episodes||o.value.runtime||o.value.countries.length>0||o.value.languages.length>0?(e(),a("div",Q,[o.value.status?(e(),m(g,{key:0},{label:c(()=>[i("Status")]),content:c(()=>[i(p(o.value.status),1)]),_:1})):d("",!0),o.value.revenue?(e(),m(g,{key:1},{label:c(()=>[i("Z\xE1robok")]),content:c(()=>[i(p(o.value.revenue),1)]),_:1})):d("",!0),o.value.release_date?(e(),m(g,{key:2},{label:c(()=>[i("D\xE1tum vydania")]),content:c(()=>[i(p(o.value.release_date),1)]),_:1})):d("",!0),o.value.number_of_episodes?(e(),m(g,{key:3},{label:c(()=>[i("Po\u010Det epiz\xF3d")]),content:c(()=>[i(p(o.value.number_of_episodes)+" epiz\xF3d",1)]),_:1})):d("",!0),o.value.runtime?(e(),m(g,{key:4},{label:c(()=>[i("D\u013A\u017Eka")]),content:c(()=>[i(p(o.value.runtime),1)]),_:1})):d("",!0),o.value.languages.length!==0?(e(),m(g,{key:5},{label:c(()=>[i("Audio")]),content:c(()=>[(e(!0),a(h,null,y(o.value.languages,r=>(e(),a("span",{key:r.iso_639_1,style:{display:"block"}},p(r.english_name),1))),128))]),_:1})):d("",!0),o.value.countries.length!==0?(e(),m(g,{key:6},{label:c(()=>[i("P\xF4vod")]),content:c(()=>[(e(!0),a(h,null,y(o.value.countries,(r,b)=>(e(),a("span",{key:b,style:{display:"block"}},p(C(v).state.countries[(r.iso_3166_1||r).toLowerCase()]),1))),128))]),_:1})):d("",!0),o.value.genres.length!==0?(e(),m(g,{key:7},{label:c(()=>[i("\u017Danre")]),content:c(()=>[(e(!0),a(h,null,y(o.value.genres,r=>(e(),m(E,{key:r.id,to:`/library?type=${u.value}&genre=${r.id}`,style:{display:"block"}},{default:c(()=>[i(p(r.name),1)]),_:2},1032,["to"]))),128))]),_:1})):d("",!0)])):d("",!0),s("div",X,[ee,s("div",null,[(e(!0),a(h,null,y(o.value.ratings.filter(r=>r.rating),(r,b)=>(e(),a("a",{class:T(b===0?`primary ${V(r.rating)}`:"secondary"),key:b,href:r.url,target:"_blank"},[s("span",null,p(r.rating),1),b>0?(e(),a("span",se,p(r.name),1)):d("",!0)],10,te))),128))])]),s("div",ae,[ne,i(" "+p(o.value.overview||"Popis nie je dostupn\xFD."),1)]),o.value.creators.length>0?(e(),a("div",oe,[(e(!0),a(h,null,y(o.value.creators,r=>(e(),a("div",{class:"creator",key:r.id},[s("div",le,[f(E,{to:{name:"Person",params:{id:r.id}},class:"name"},{default:c(()=>[i(p(r.name),1)]),_:2},1032,["to"]),s("div",re,[(e(!0),a(h,null,y(r.jobs,(b,z)=>(e(),a("span",{key:z,class:"department comma-after"},p(b||"Tvorca"),1))),128))])])]))),128))])):d("",!0),o.value.networks.length!==0?(e(),a("div",{key:2,class:"networks",ref_key:"networks",ref:k},[(e(!0),a(h,null,y(o.value.networks,(r,b)=>(e(),a("img",{div:"",key:r.id,onError:z=>N(this.$refs.networks,b),src:`https://www.themoviedb.org/t/p/original${r.logo_path.split(".")[0]+".svg"}`,alt:r.name,title:r.name},null,40,ce))),128))],512)):d("",!0)])}}},mt=$(ie,[["__scopeId","data-v-fa704b80"]]);const de={class:"container"},_e={class:"people-panel"},ue={__name:"CastPanel",setup(t){return(n,l)=>(e(),a("section",de,[f(R,null,{default:c(()=>[_(n.$slots,"title",{},void 0,!0)]),_:3}),s("section",_e,[_(n.$slots,"card",{},void 0,!0)])]))}},$t=$(ue,[["__scopeId","data-v-535a0f9f"]]);const pe={class:"img"},ve={class:"name-holder"},he={class:"name"},ye={class:"character"},me={__name:"PersonCard",props:{type:String,id:Number},setup(t){const n=t;return(l,v)=>{const u=M("router-link");return e(),m(u,{to:{name:n.type[0].toUpperCase()+n.type.substring(1),params:{id:n.id}},class:"cast-card"},{default:c(()=>[s("div",pe,[_(l.$slots,"image")]),s("div",ve,[s("span",he,[_(l.$slots,"name")]),s("span",ye,[_(l.$slots,"character")])])]),_:3},8,["to"])}}},bt=$(me,[["__scopeId","data-v-5aa50aa6"]]);const $e=t=>(w("data-v-bd79c4fe"),t=t(),P(),t),be={key:0,class:"container media-panel user-select-none"},ge=["href"],fe=$e(()=>s("span",null,"\u25B6",-1)),ke={__name:"MediaPanel",props:{items:Array,type:String,title:String},setup(t){const n=t;return(l,v)=>n.items.length!==0?(e(),a("section",be,[f(R,{style:{"align-self":"flex-start","margin-bottom":"0"}},{default:c(()=>[i("M\xE9dia")]),_:1}),(e(!0),a(h,null,y(n.items,u=>(e(),a("a",{key:u.key,href:`https://www.youtube.com/watch?v=${u.key}`,target:"_blank"},[fe,s("span",null,[s("b",null,p(u.name),1),i(" (YouTube)")])],8,ge))),128))])):d("",!0)}},gt=$(ke,[["__scopeId","data-v-bd79c4fe"]]);const we=t=>(w("data-v-0c76d76d"),t=t(),P(),t),Pe={id:"player-holder",class:"player-holder user-select-none"},Se={key:0,class:"not-pressed"},Ie={key:0,class:"player-warning"},Ce=we(()=>s("span",null,"Prihl\xE1ste sa pre sledovanie",-1)),xe=[Ce],De=["src"],Ne={key:0,class:"warning"},je={__name:"Player",props:{isReady:Object,source:String,type:String,title:String,isPlayerWorking:Boolean},setup(t){const n=t,l=L("store"),v=I(!1),u=()=>{n.source&&(v.value=document.getElementById("player-holder").offsetTop<window.scrollY)};return F(()=>{document.addEventListener("scroll",u)}),O(()=>{document.addEventListener("scroll",u)}),W(()=>{document.removeEventListener("scroll",u)}),(o,k)=>(e(),a("section",Pe,[f(B,{name:"fade"},{default:c(()=>[!n.source&&n.isReady.status===!0?(e(),a("div",Se,[t.isPlayerWorking===!1?(e(),a("div",Ie,"Prehr\xE1va\u010D bol ozna\u010Den\xFD ako nefunk\u010Dn\xFD")):d("",!0),C(l).state.globalSettings.allowWatchWhileUnregistered||C(l).state.credentials.loggedIn?(e(),a("button",{key:1,onClick:k[0]||(k[0]=N=>o.$emit("setPlayer")),class:"play-button"},"\u25B6")):(e(),a("button",{key:2,class:"locked-player",onClick:k[1]||(k[1]=N=>o.$router.push("/login"))},xe))])):d("",!0)]),_:1}),f(B,{name:"fade"},{default:c(()=>[n.source?(e(),a("iframe",{key:0,class:T({pinned:v.value&&C(l).state.settings.pinnedPlayer}),src:n.source,frameborder:"0",loading:"lazy",allowfullscreen:""},null,10,De)):d("",!0)]),_:1}),n.isReady.status?d("",!0):(e(),a("span",Ne,p(n.isReady.message),1))]))}},ft=$(je,[["__scopeId","data-v-0c76d76d"]]);const Ee={class:"subnav user-select-none"},ze={class:"buttons"},kt={__name:"SubNav",setup(t,{expose:n}){return n({copyUrl:()=>{const v=navigator,u=window;v.clipboard.writeText(u.location.href),H({type:"warn",text:"URL adresa bola skop\xEDrovan\xE1"})}}),(v,u)=>(e(),a("nav",Ee,[s("div",ze,[_(v.$slots,"default",{},()=>[(e(),a(h,null,y(4,o=>s("button",{class:"placeholder",key:o})),64))])])]))}};const Be=t=>(w("data-v-0747c7d5"),t=t(),P(),t),Le={class:"player-holder"},Me=Be(()=>s("div",{class:"player"},null,-1)),Te=[Me],Re={__name:"PlayerPlaceholder",props:{type:String},setup(t){return(n,l)=>(e(),a("div",Le,Te))}},Ue=$(Re,[["__scopeId","data-v-0747c7d5"]]);const Ve={},x=t=>(w("data-v-b30800bd"),t=t(),P(),t),Ae={class:"title"},Fe={class:"details"},Oe=x(()=>s("div",{class:"label"},null,-1)),We=x(()=>s("div",{class:"content"},null,-1)),He=[Oe,We],Ye={class:"ratings"},Ze=x(()=>s("div",{class:"label"},null,-1)),qe={class:"overview"},Je=x(()=>s("div",{class:"label"},null,-1)),Ke={class:"creators"};function Ge(t,n){return e(),a("div",Ae,[s("div",Fe,[(e(),a(h,null,y(4,l=>s("div",{key:l,class:"detail"},He)),64))]),s("div",Ye,[Ze,s("div",null,[(e(),a(h,null,y(4,l=>s("div",{class:"rating",key:l})),64))])]),s("div",qe,[Je,(e(),a(h,null,y(3,l=>s("div",{class:"row",key:l})),64))]),s("div",Ke,[(e(),a(h,null,y(2,l=>s("div",{key:l,class:"creator"},[s("div",null,[(e(),a(h,null,y(2,v=>s("div",{key:v,class:"row"})),64))])])),64))])])}const Qe=$(Ve,[["render",Ge],["__scopeId","data-v-b30800bd"]]);const D=t=>(w("data-v-3e1e6087"),t=t(),P(),t),Xe={class:"user-select-none container"},et={class:"outter"},tt={key:0,class:"background-image"},st=["src"],at={class:"poster"},nt={class:"title"},ot=D(()=>s("div",{style:{background:"var(--font-color)",height:"calc(1.75rem * 1.1)",width:"160px","border-radius":"6px"}},null,-1)),lt=D(()=>s("div",{style:{background:"var(--font-color)",height:"calc(0.75rem * 1.4)",width:"100px","border-radius":"6px","margin-top":"5px"}},null,-1)),rt=D(()=>s("div",{style:{background:"var(--font-color)",height:"calc(0.75rem * 1.4)",width:"100px","border-radius":"6px"}},null,-1)),ct={class:"overview"},it=D(()=>s("div",{style:{background:"var(--font-color)",height:"calc(0.75rem * 1.4)",width:"100%","border-radius":"6px"}},null,-1)),dt={class:"player-details-holder"},_t={__name:"PlayerDetails",props:{type:String,bg:String|void 0},setup(t){return(n,l)=>(e(),a("section",Xe,[s("div",et,[t.bg?(e(),a("div",tt,[s("img",{onError:l[0]||(l[0]=v=>t.bg=!1),src:`https://image.tmdb.org/t/p/w1440_and_h320_multi_faces${t.bg}`,alt:"Obr\xE1zok v pozad\xED"},null,40,st)])):d("",!0),s("div",at,[_(n.$slots,"poster")]),s("div",nt,[_(n.$slots,"subnav"),s("div",null,[_(n.$slots,"title",{},()=>[ot]),_(n.$slots,"subtitle",{},()=>[lt])]),_(n.$slots,"tagline",{},()=>[rt]),s("div",ct,[_(n.$slots,"shortOverview",{},()=>[it])])])]),s("section",dt,[_(n.$slots,"player",{},()=>[f(Ue,{type:t.type},null,8,["type"])]),_(n.$slots,"details",{},()=>[f(Qe,{type:t.type},null,8,["type"])])])]))}},wt=$(_t,[["__scopeId","data-v-3e1e6087"]]);const ut={};function pt(t,n){return e(),a("button",{class:"sub-nav-button",onClick:n[0]||(n[0]=l=>t.$emit("handleClick"))},[_(t.$slots,"icon")])}const Pt=$(ut,[["render",pt],["__scopeId","data-v-f0c47cb0"]]);export{$t as C,mt as D,gt as M,ft as P,Pt as S,kt as _,wt as a,bt as b};