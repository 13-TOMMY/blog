import React, { useEffect, useState } from "react";
import "./Banner.css";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from '../../config/firebaseCongfig';


const Banner = () => {
  const [mainArticle, setMainArticle] = useState({});
  const [otherArticles, setOtherArticles] = useState([]);

  useEffect(() => {

    const articlesRef = collection(db, "articles");
    const q = query(articlesRef, orderBy("createdAt", "desc"), limit(5));

   
    getDocs(q, articlesRef).then((res) => {
        const articles = res.docs.map((item) => {
          return {
            ...item.data(),
            id: item.id,
          };
        });
        setMainArticle(articles[0]);
        setOtherArticles(articles.splice(1));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="banner-container">
      <div
        className="main-article-container"
        key={mainArticle?.id}
        style={{ backgroundImage: `url(${mainArticle?.img})` }}
      >
        <div className="banner-info">
          <h2>{mainArticle?.title}</h2>
          <div className="main-article-info">
            <p>{mainArticle?.createdAt?.toDate().toDateString()}</p>
          </div>
        </div>
      </div>
      <div className="other-articles-container">
        {otherArticles.map((item) => {
          return (
            <div
              className="other-article-item"
              key={item.id}
              style={{ backgroundImage: `url(${item?.img})` }}
            >
              <div className="banner-info">
                <h3>{item?.title}</h3>
                <div className="main-article-info">
                  <small>{item?.createdAt?.toDate().toDateString()}</small>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Banner;