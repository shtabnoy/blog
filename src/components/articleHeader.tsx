import * as React from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import colors from "../utils/colors"
import { Category, Author } from "../types/Article"

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  margin-bottom: 8px;
  h2 {
    margin-top: 0;
    margin-bottom: 0;
  }
  .categories {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-end;
    .category {
      font-size: 16px;
      background-color: ${colors.shakespeare};
      color: white;
      padding: 2px 12px;
      border-radius: 12px;
      cursor: pointer;
      white-space: nowrap;
      &:not(:first-of-type) {
        margin-left: 10px;
      }
    }
  }
`

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  .fullname-date {
    color: ${colors.mountainMeadow};
    a {
      margin-right: 16px;
    }
  }
  .languages {
    color: ${colors.shakespeare};
  }
`

interface ArticleHeaderProps {
  id: string
  title: string
  categories: Category[]
  author: Author
  published: string
  languages: string[]
}

const ArticleHeader = ({
  id,
  title,
  categories,
  author,
  published,
  languages,
}: ArticleHeaderProps) => (
  <>
    <TopSection>
      <h2>
        <Link to={`/${id}`}>{title}</Link>
      </h2>
      <div className="categories">
        {categories.map((category: Category) => (
          <span key={category.id} className="category">
            {category.name}
          </span>
        ))}
      </div>
    </TopSection>
    <BottomSection>
      <div className="fullname-date">
        <Link to={`/authors/${author.id.toString()}`}>{author.fullName}</Link>
        <span>{published}</span>
      </div>
      <div className="languages">&#123; {languages.join(", ")} &#125;</div>
    </BottomSection>
  </>
)

export default ArticleHeader
