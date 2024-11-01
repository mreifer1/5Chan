import React, {useState} from "react";

function PostComment({postId, comments, addComment}) {
    const [isCommentBoxVisible, setCommentBoxVisible] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            addComment(postId, commentText);
            setCommentText('');
            setAuthor('');
            setCommentBoxVisible(false);
        }
    };

    return(
        <div>
            <button onClick={() => setCommentBoxVisible(!isCommentBoxVisible)}>
                {isCommentBoxVisible ? 'Cancel' : 'Add Comment'}
            </button>
            
            {isCommentBoxVisible && (
                <div>
                    <input type="text" value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Enter author(optional)"
                    />
                    <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Enter your comment" required 
                    />
                    <button onClick={handleSubmit}>Submit Comment</button>
                </div>
            )}
            
            <div>
                <h4>Comments:</h4>
                {comments && comments.length > 0 ? (comments.map((comment) => 
                (<p key={comment._id}>{comment.text}</p>))) : (<p>No comments yet.</p>)
                }
            </div>
        </div>
    );
};

export default PostComment;