import { tweetsData as defaultTweetsData } from "./data.js";

// storing data in local storage
let tweetsData =
  JSON.parse(localStorage.getItem("tweets")) || defaultTweetsData;
// tweetsData must be an array of tweet objects

// Event listeners for buttons and tweet creation
document.addEventListener("click", (e) => {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.id === "tweet-btn") {
    handleTweetBtnClick();
  } else if (e.target.dataset.sendreply) {
    handleSendReply(e.target.dataset.sendreply);
  } else if (e.target.dataset.delete) {
    handleDeleteClick(e.target.dataset.delete);
  }
});

const handleLikeClick = (tweetId) => {
  const targetTweetObj = tweetsData.find((tweet) => tweet.uuid === tweetId);
  if (targetTweetObj.isLiked) {
    targetTweetObj.likes--;
  } else {
    targetTweetObj.likes++;
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked;
  render();
};

const handleRetweetClick = (tweetId) => {
  const targetTweetObj = tweetsData.find((tweet) => tweet.uuid === tweetId);
  if (targetTweetObj.isRetweeted) {
    targetTweetObj.retweets--;
  } else {
    targetTweetObj.retweets++;
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
  render();
};

const handleReplyClick = (replyId) => {
  document.querySelector(`#replies-${replyId}`).classList.toggle("hidden");
  document.querySelector(`#reply-form-${replyId}`).classList.toggle("hidden");
};

// Handle new tweet button click
const handleTweetBtnClick = () => {
  const tweetInput = document.getElementById("tweet-input");
  if (tweetInput.value.trim() !== "") {
    tweetsData.unshift({
      uuid: `${Date.now()}`,
      profilePic: "images/profile.jpg",
      handle: "@Johnsen",
      tweetText: tweetInput.value,
      tweetImage: "",
      likes: 0,
      retweets: 0,
      isLiked: false,
      isRetweeted: false,
      replies: [],
    });
    tweetInput.value = "";
    render();
  }
};

// send reply
const handleSendReply = (tweetId) => {
  const input = document.getElementById(`reply-input-${tweetId}`);
  const text = input.value.trim();
  if (text) {
    const targetTweetObj = tweetsData.find((tweet) => tweet.uuid === tweetId);
    targetTweetObj.replies.push({
      profilePic: "images/profile.jpg",
      handle: "@Johnsen",
      tweetText: text,
      tweetImage: "",
    });
    input.value = "";
    render();
  }
};

// handle delete tweets
const handleDeleteClick = (tweetId) => {
  tweetsData = tweetsData.filter((tweet) => tweet.uuid !== tweetId);
  render();
};

// Render feed
const getFeedHtml = () => {
  let feedHtml = "";

  tweetsData.forEach((tweet) => {
    const likeIconClass = tweet.isLiked ? "liked" : "";
    const retweetIconClass = tweet.isRetweeted ? "retweeted" : "";
    let repliesHTML = "";
    if (tweet.replies.length > 0) {
      tweet.replies.forEach((reply) => {
        let replyImageHtml = "";
        if (reply.tweetImage) {
          replyImageHtml = `<img src="${reply.tweetImage}" class="reply-image">`;
        }

        repliesHTML += `
    <div class="tweet-reply">
        <div class="tweet-inner">
            <img src="${reply.profilePic}" class="profile-pic">
                <div>
                 <p class="handle">${reply.handle}</p>
                    <p class="tweet-text">${reply.tweetText}</p>
                    ${replyImageHtml}
                </div>
            </div>
        </div>   
            `;
      });
    }

    let tweetImageHtml = "";
    if (tweet.tweetImage) {
      tweetImageHtml = `<img src="${tweet.tweetImage}" class="tweet-image">`;
    }

    feedHtml += `
    <div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            ${tweetImageHtml}
            <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}" ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}" ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}" ></i>
                    ${tweet.retweets}
                </span>
                <span class="tweet-detail">
            <i class="fa-solid fa-trash delete-btn" data-delete="${tweet.uuid}" title="Delete"></i>
          </span>
            </div>   
             <div id="reply-form-${tweet.uuid}" class="hidden reply-form">
          <input type="text" id="reply-input-${tweet.uuid}" placeholder="Reply...">
          <button data-sendreply="${tweet.uuid}">Send</button>
        </div>

        </div>            
    </div>
    <div id="replies-${tweet.uuid}" class="hidden">
        ${repliesHTML}</div>
</div>
    `;
  });

  return feedHtml;
};

const render = () => {
  document.querySelector("#feed").innerHTML = getFeedHtml();
  localStorage.setItem("tweets", JSON.stringify(tweetsData));
  // localStorage only stores strings, so stringify the array
};

render();
