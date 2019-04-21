interface Author {
  id: string
  fullName: string
}

interface Category {
  id: string
  name: string
}

interface Translation {
  id: string
  language: "en" | "ru"
  title: string
  description: string
  content: string
}

export default interface Article {
  id: string
  title: string
  published: string
  author: Author
  categories: Category[]
  translations: Translation[]
}
