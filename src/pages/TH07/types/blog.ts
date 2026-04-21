export interface Tag {
  id: number
  name: string
}

export interface Author {
  name: string
  avatar: string
  bio: string
  skills: string[]
  social: {
    github?: string
    linkedin?: string
    facebook?: string
  }
}

export type PostStatus = "draft" | "published"

export interface Post {
  id: number
  title: string
  slug: string
  summary: string
  content: string
  cover: string
  tags: string[]
  status: PostStatus
  views: number
  createdAt: string
  author: string
}

export interface PostFormData {
  title: string
  slug: string
  summary: string
  content: string
  cover: string
  tags: string[]
  status: PostStatus
}