import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 10px;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin: 0;
  color: #333;
`;

const Excerpt = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 5px 0;
`;

const Info = styled.p`
  font-size: 0.8rem;
  color: #999;
`;

function ArticleCard({ article }) {
  return (
    <Card>
      <Link to={`/article/${article.id}`}>
        <Thumbnail src={article.thumbnail || '/assets/default-thumbnail.jpg'} alt={article.title} />
        <Content>
          <Title>{article.title}</Title>
          <Excerpt>{article.excerpt}</Excerpt>
          <Info>⏳ {article.readingTime} min read</Info>
        </Content>
      </Link>
    </Card>
  );
}

export default ArticleCard;       