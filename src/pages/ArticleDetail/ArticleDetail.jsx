import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db} from '../../config/firebaseCongfig'
import { useParams } from 'react-router-dom'
import Likes from '../../components/Likes/Likes'
import './ArticleDetail.css'

function ArticleDetail() {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    const docRef = doc(db, "articles", articleId);
    getDoc(docRef).then((res) => {
      setArticle(res.data());
    });
  }, []);

  return (
    <div>
      <h1>{article?.title}</h1>
      <h2>{article?.summary}</h2>
      <div className="details-info-container">
        <p>Category: {article?.category}</p>
        <p>
          <span className="article-span">Author:</span>{" "}
          {article?.createdBy?.toUpperCase()}
        </p>
        <p>
        <span className="article-span">Published:</span>{" "}
          {article?.createdAt?.toDate().toDateString()}
        </p>
        <Likes articleId={articleId} />
      </div>
      <div className="details-content">
        <img src={article?.img} className='details-img' />
        <p className='article-description'>{article?.ParagraghOne}</p>
        <p className='article-description'>{article?.ParagraghTwo}</p>
        <p className='article-description'>{article?.ParagraghThree}</p>
      </div>
    </div>
  )
}

export default ArticleDetail