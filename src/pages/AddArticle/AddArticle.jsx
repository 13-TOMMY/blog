import React, { useState } from "react";
import { auth, db, storage } from "../../config/firebaseCongfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { v4 } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./AddArticle.css";

function AddArticle() {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const categories = ["Health", "Food", "Travel", "Technology"];

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    ParagraghOne: "",
    ParagraghTwo: "",
    ParagraghThree: "",
    category: "",
    image: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");

    const imageRef = ref(storage, `images/${formData.image.name + v4()}`);

    uploadBytes(imageRef, formData.image)
      .then((res) => {
        getDownloadURL(res.ref).then((url) => {
          const articleRef = collection(db, "articles");
            
          addDoc(articleRef, {
            title: formData.title,
            summary: formData.summary,
            ParagraghOne: formData.ParagraghOne,
            ParagraghTwo: formData.ParagraghTwo,
            ParagraghThree: formData.ParagraghThree,
            category: formData.category,
            img: url,
            createdBy: user.displayName,
            userId: user.uid,
            createdAt: Timestamp.now().toDate(),
          });
        });
      })
      .then((res) => {
        toast("Article added successfully!", {
          type: "success",
          autoClose: 1000,
        });

        setTimeout(() => {
          navigate("/");
        }, 1000);
      });
  };
  return (
    <div className="add-article-container">
      <form className="add-article-form" onSubmit={handleSubmit}>
        <h2>Create Article</h2>
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Maximum 100 characters"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            placeholder="Maximum 120 characters"
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="paragraphOne">Paragraph One</label>
          <textarea
            id="paragraphOne"
            placeholder="Maximum 650 characters"
            onChange={(e) =>
              setFormData({ ...formData, ParagraghOne: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="paragraphTwo">Paragraph Two</label>
          <textarea
            id="paragraphTwo"
            placeholder="Maximum 650 characters"
            onChange={(e) =>
              setFormData({ ...formData, ParagraghTwo: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="paragraphThree">Paragraph Three</label>
          <textarea
            id="paragraphThree"
            placeholder="Maximum 650 characters"
            onChange={(e) =>
              setFormData({ ...formData, ParagraghThree: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Select</option>
            {categories.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group ">
          <label>Upload Image</label>
          <input
            type="file"
            id="image"
            className="img-input"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddArticle;
