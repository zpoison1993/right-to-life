import type Author from './author'

type PostType = {
  slug: string
  title: string
  date: string
  coverImage: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
}

type StaticItem = {
  slug: string
  title: string
  coverImage: string
  content: string
}

export { PostType, StaticItem }
