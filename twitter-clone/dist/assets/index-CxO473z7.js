(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))d(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&d(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function d(a){if(a.ep)return;a.ep=!0;const l=n(a);fetch(a.href,l)}})();const s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));function f(e,t=0){return(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase()}let c;const m=new Uint8Array(16);function w(){if(!c){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");c=crypto.getRandomValues.bind(crypto)}return c(m)}const h=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),p={randomUUID:h};function y(e,t,n){e=e||{};const d=e.random??e.rng?.()??w();if(d.length<16)throw new Error("Random bytes length must be >= 16");return d[6]=d[6]&15|64,d[8]=d[8]&63|128,f(d)}function i(e,t,n){return p.randomUUID&&!e?p.randomUUID():y(e)}const k=[{handle:"@Zack",profilePic:"images/zack.jpg",likes:1,retweets:0,tweetText:"Bro, I found a box full of premium treats behind the big tree at the park! First one there gets them all! 🦴🔥",replies:[],isLiked:!1,isRetweeted:!1,uuid:i()},{handle:"@Tanggol",profilePic:"images/tanggol.jpg",likes:3,retweets:2,tweetText:"I need volunteers for a one-way mission to hunt for food in the wild 🍗🌲. No experience necessary 🐾",replies:[{handle:"@Pandaman ✅",profilePic:"images/pandaman.jpg",tweetText:"Yes! Sign me up! 😎🛩",uuid:i()}],isLiked:!1,isRetweeted:!1,uuid:i()},{handle:"@Zack",profilePic:"images/zack.jpg",likes:0,retweets:0,tweetText:"How to use a camera?",tweetImage:"images/zackSelfie.jpg",replies:[],isLiked:!1,isRetweeted:!1,uuid:i()},{handle:"@Ringgo",profilePic:"images/ringgo.jpg",likes:3,retweets:3,tweetText:"Are you a hunter if you only kill a cockroach?",replies:[{handle:"@Dexter",profilePic:"images/dexter.jpg",tweetText:"No. Obviously not. Go get a job in McDonald's.",uuid:i()},{handle:"@Toga",profilePic:"images/toga.jpg",tweetText:"You are wonderful just as you are! ❤️",uuid:i()}],isLiked:!1,isRetweeted:!1,uuid:i()},{handle:"@Polka",profilePic:"images/polka.jpg",likes:2200,retweets:1230,tweetText:"Who wants to share a bowl of cream tonight? 😽💕",replies:[{handle:"@Dexter",profilePic:"images/dexter.jpg",tweetText:"Only if you promise extra cuddles after! 😻🥛",uuid:i()},{handle:"@Pandaman ✅",profilePic:"images/pandaman.jpg",tweetText:"@Dexter I saw your scandal 😝",tweetImage:"images/eut.jpg",uuid:i()}],isLiked:!1,isRetweeted:!1,uuid:i()},{handle:"@Tanggol",profilePic:"images/tanggol.jpg",likes:6,retweets:4,tweetText:"Rate my outfit! 🐾",tweetImage:"images/tanggolOutfit.jpg",replies:[{handle:"@Pandaman ✅",profilePic:"images/pandaman.jpg",tweetText:"2",uuid:i()},{handle:"@Toga",profilePic:"images/toga.jpg",tweetText:"cute 😍",uuid:i()}],isLiked:!1,isRetweeted:!1,uuid:i()},{handle:"@Tigger",profilePic:"images/tigger.jpg",likes:10,retweets:3,tweetText:"If you don't see me in few days I'm dead already",replies:[{handle:"@Dexter",profilePic:"images/dexter.jpg",tweetText:"attention seeker",uuid:i()},{handle:"@Toga",profilePic:"images/toga.jpg",tweetText:"don't give up",tweetImage:"images/hugs.gif",uuid:i()},{handle:"@Zack",profilePic:"images/zack.jpg",tweetText:"nahhh",uuid:i()},{handle:"@Tanggol",profilePic:"images/tanggol.jpg",tweetText:"where are you?",uuid:i()},{handle:"@Pandaman",profilePic:"images/pandaman.jpg",tweetText:"",tweetImage:"images/coffin.gif",uuid:i()},{handle:"@Ringgo",profilePic:"images/ringgo.jpg",tweetText:"RIP",uuid:i()},{handle:"@Polka",profilePic:"images/polka.jpg",tweetText:"",tweetImage:"images/pink.gif",uuid:i()}],isLiked:!1,isRetweeted:!1,uuid:i()}];let o=JSON.parse(localStorage.getItem("tweets"))||k;document.addEventListener("click",e=>{e.target.dataset.like?x(e.target.dataset.like):e.target.dataset.retweet?T(e.target.dataset.retweet):e.target.dataset.reply?P(e.target.dataset.reply):e.target.id==="tweet-btn"?j():e.target.dataset.sendreply?v(e.target.dataset.sendreply):e.target.dataset.delete&&I(e.target.dataset.delete)});const x=e=>{const t=o.find(n=>n.uuid===e);t.isLiked?t.likes--:t.likes++,t.isLiked=!t.isLiked,u()},T=e=>{const t=o.find(n=>n.uuid===e);t.isRetweeted?t.retweets--:t.retweets++,t.isRetweeted=!t.isRetweeted,u()},P=e=>{document.querySelector(`#replies-${e}`).classList.toggle("hidden"),document.querySelector(`#reply-form-${e}`).classList.toggle("hidden")},j=()=>{const e=document.getElementById("tweet-input");e.value.trim()!==""&&(o.unshift({uuid:`${Date.now()}`,profilePic:"images/profile.jpg",handle:"@Johnsen",tweetText:e.value,tweetImage:"",likes:0,retweets:0,isLiked:!1,isRetweeted:!1,replies:[]}),e.value="",u())},v=e=>{const t=document.getElementById(`reply-input-${e}`),n=t.value.trim();n&&(o.find(a=>a.uuid===e).replies.push({profilePic:"images/profile.jpg",handle:"@Johnsen",tweetText:n,tweetImage:""}),t.value="",u())},I=e=>{o=o.filter(t=>t.uuid!==e),u()},$=()=>{let e="";return o.forEach(t=>{let n="",d="",a="";t.isLiked&&(n="liked"),t.isRetweeted&&(d="retweeted"),t.replies.length>0&&t.replies.forEach(r=>{let g="";r.tweetImage&&(g=`<img src="${r.tweetImage}" class="reply-image">`),a+=`
    <div class="tweet-reply">
        <div class="tweet-inner">
            <img src="${r.profilePic}" class="profile-pic">
                <div>
                 <p class="handle">${r.handle}</p>
                    <p class="tweet-text">${r.tweetText}</p>
                    ${g}
                </div>
            </div>
        </div>   
            `});let l="";t.tweetImage&&(l=`<img src="${t.tweetImage}" class="tweet-image">`),e+=`
    <div class="tweet">
    <div class="tweet-inner">
        <img src="${t.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${t.handle}</p>
            <p class="tweet-text">${t.tweetText}</p>
            ${l}
            <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots" data-reply="${t.uuid}" ></i>
                    ${t.replies.length}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-heart ${n}" data-like="${t.uuid}" ></i>
                    ${t.likes}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-retweet ${d}" data-retweet="${t.uuid}" ></i>
                    ${t.retweets}
                </span>
                <span class="tweet-detail">
            <i class="fa-solid fa-trash delete-btn" data-delete="${t.uuid}" title="Delete"></i>
          </span>
            </div>   
             <div id="reply-form-${t.uuid}" class="hidden reply-form">
          <input type="text" id="reply-input-${t.uuid}" placeholder="Reply...">
          <button data-sendreply="${t.uuid}">Send</button>
        </div>

        </div>            
    </div>
    <div id="replies-${t.uuid}" class="hidden">
        ${a}</div>
</div>
    `}),e},u=()=>{document.querySelector("#feed").innerHTML=$(),localStorage.setItem("tweets",JSON.stringify(o))};u();
