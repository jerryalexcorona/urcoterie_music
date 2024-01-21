function shareVideo() {
    const videoLink = document.getElementById("videoLink").value;
    const comment = document.getElementById("comment").value;

    // Global variables
    let commentCounter = 0;
    let shareCounter = 0;


    // Function to extract video ID from the link
    function getVideoIdFromLink(link) {
        const patterns = [
            /(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|y\/|\/yt\/|\/v\/|\/e\/|r\/|\/c\/|\/u\/\w+\/|\/user\/\w+\/|embed\/|watch\?.*v=|&v=|\?v=)([^"&?\/\s]{11})/,
            /^https:\/\/www\.youtube\.com\/playlist\?list=([^&]+)/
        ];

        for (const pattern of patterns) {
            const match = link.match(pattern);
            if (match) {
                return match[1];
            }
        }

        console.error("Could not extract video ID from the link:", link);
        return null;
    }

    // Function to share a video
    function shareVideo() {
        const videoLink = document.getElementById("videoLink").value;
        const comment = document.getElementById("comment").value;
    }

    // Function to update the comment and share count display
    function updateCountDisplay() {
        const countDisplay = document.getElementById("countDisplay");
        if (countDisplay) {
            countDisplay.textContent = `Comments: ${commentCounter}, Shares: ${shareCounter}`;
        }
    }

    // Function to create a comment element with a given text and user name
    function createComment(userName, text) {
        // Increment the comment counter
        commentCounter++;

        // Update the comment count display
        updateCountDisplay();

        // Clear the comment input field
        document.getElementById("comment").value = "";
    }

    // Function to create a post element with a given video ID, comment, and user name
    function createPost(userName, videoId, comment) {
        // Increment the share counter
        shareCounter++;

        // Update the share count display
        updateCountDisplay();

        // Clear the comment input field
        document.getElementById("comment").value = "";
    }


    // Extract video ID from the link
    const videoId = getVideoIdFromLink(videoLink);

    if (videoId) {
        // Create post element
        const post = createPost(videoId, comment);

        // Add post to feed
        document.getElementById("feed").appendChild(post);

        // Clear input fields
        document.getElementById("videoLink").value = "";
        document.getElementById("comment").value = "";
    } else {
        console.error("Invalid YouTube video link. Please use a valid link.");
    }

    function handlePlayerError(playerId, errorCode) {
        const errorMessages = {
            2: "The video you have requested is not available.",
            5: "The requested content cannot be played in an HTML5 player.",
            100: "The owner of the video has restricted it from being played on certain sites.",
            101: "The owner of the video does not allow it to be embedded."
        };

        const errorMessage = errorMessages[errorCode] || "An error occurred while loading the video.";

        alert(errorMessage);
        document.getElementById(playerId).innerHTML = ''; // Remove player if there's an error
    }

    // Get the feed element
    let feed = document.getElementById("feed");

    // Add a click event listener to the feed element
    feed.addEventListener("click", function (event) {
        // Get the target element of the event
        let target = event.target;

        // Check if the target is a share button
        if (target.classList.contains("share-button")) {
            // Get the post element that contains the share button
            let post = target.closest(".post");

            // Get the video ID from the post element
            let videoId = post.dataset.videoId;

            // Get the comment from the post element
            let comment = post.querySelector(".comment").textContent;

            // Create a new post element with the same video and comment
            let newPost = createPost(videoId, comment);

            // Add the new post to the feed
            feed.appendChild(newPost);
        }

        // Check if the target is a comment button
        if (target.classList.contains("comment-button")) {
            // Get the post element that contains the comment button
            let post = target.closest(".post");

            // Get the comment input element
            let commentInput = post.querySelector(".comment-input");

            // Get the comment from the input value
            let comment = commentInput.value;

            // If the comment is not empty, create a comment element and append it to the post
            if (comment) {
                let commentElement = createComment(comment);
                post.appendChild(commentElement);
            } else {
                // Otherwise, alert the user that the comment is empty
                alert("Empty comment");
            }
        }
    });

    // Function to create a post element with a given video ID and comment
function createPost(videoId, comment) {
    // Create a new div element
    let post = document.createElement("div");
    post.className = "post";
    // Set the data attribute to store the video ID
    post.dataset.videoId = videoId;
    // Set the inner HTML to include the user name, comment, player, share button, comment input, and comment button
    post.innerHTML = `<p><strong>User:</strong> shared a video</p><p class="comment"><strong>Comment:</strong> ${comment}</p><div id="player-${videoId}"></div>
                      <button class="share-button" onclick="sharePost('${videoId}', '${comment}')">Share</button>
                      <input type="text" class="comment-input" placeholder="Write a comment" />
                      <button class="comment-button" onclick="commentPost('${videoId}')">Comment</button>`;

    // Load YouTube Player API script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize YouTube player when API is ready
    window.onYouTubeIframeAPIReady = function () {
        const player = new YT.Player(`player-${videoId}`, {
            height: "315",
            width: "560",
            videoId: videoId,
            events: {
                onError: function (event) {
                    const errorCode = event.data;
                    handlePlayerError(`player-${videoId}`, errorCode);
                },
            },
        });
    };

    // Return the post element
    return post;
}

    // Function to share a post
    function sharePost(videoId, comment) {
        // Implement share functionality
        // You can customize this function to handle sharing posts
        alert(`Sharing post with video ID: ${videoId} and comment: ${comment}`);
    }

    // Function to comment on a post
    function commentPost(videoId) {
        // Implement comment functionality
        // You can customize this function to handle commenting on posts
        alert(`Commenting on post with video ID: ${videoId}`);
    }

    // Function to create a comment element with a given text
    function createComment(text) {
        // Create a new div element
        let comment = document.createElement("div");
        comment.className = "comment";
        // Set the text content to the comment text
        comment.textContent = text;
        // Return the comment element
        return comment;
    }
}

