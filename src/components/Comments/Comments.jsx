import React, { useState, useEffect } from "react";
import "./Comments.css";
import { auth, db } from "../../config/firebaseCongfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

function Comments({ articleId }) {
  const [user] = useAuthState();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // get reference to comments collection
    const commentsRef = collection(db, "comments");

    // get the comments
    // getDocs(commentsRef)
    //   .then((res) => {
    //     // convert to array
    //     const comments = res.docs.map((item) => ({
    //       ...item.data(),
    //       id: item.id,
    //     }));
    //     setComments(comments);
    //   })
    //   .catch((err) => console.log(err));

    // filter to show only comments for this article
    const q = query(commentsRef, where("articleId", "==", articleId));

    onSnapshot(q, (snapshot) => {
      // convert to array
      const comments = snapshot.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }));

      setComments(comments);
    });
  }, []);

  const addNewComment = (e) => {
    e.preventDefault();
    const commentsRef = collection(db, "comments");

    addDoc(commentsRef, {
      userId: user?.uid,
      articleId: articleId,
      content: newComment,
      username: user?.displayName,
    }).then((res) => {
      toast("Comment added!", {
        type: "success",
        autoClose: 1500,
      });
      setNewComment("");
    });
  };
  const deleteComment = (id) => {
    deleteDoc(doc(db, "comments", id))
      .then((res) => {
        toast("Comment deleted successfully!", {
          type: "success",
          autoClose: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="comments-container">
        {comments.map((item) => (
          <div className="comment" key={item.id}>
            <p>
              <span>{item.username}</span>
              {item.content}
            </p>
            {
              /* each comment has uid
                      compare to see if I am the owner of the comment to delete it */
              user?.uid === item.userId && (
                <button onClick={() => deleteComment(item.id)}>Delete</button>
              )
            }
          </div>
        ))}
      </div>

      {user ? (
        <form onSubmit={addNewComment}>
          <input
            type="text"
            placeholder="Add comment"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
        </form>
      ) : (
        <p>Please login to comment</p>
      )}
    </div>
  );
}

export default Comments;
