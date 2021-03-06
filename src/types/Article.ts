export interface Author {
  id: string
  fullName: string
}

export interface Category {
  id: string
  name: string
}

export interface Translation {
  id: string
  language: "en" | "ru"
  title: string
  description: string
  content: string
}

export interface Article {
  id: string
  title: string
  published: string
  author: Author
  categories: Category[]
  translations: Translation[]
}
