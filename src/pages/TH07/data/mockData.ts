import { Post, Tag, Author } from '../types/blog';

export const mockTags: Tag[] = [
	{ id: 'react', name: 'React' },
	{ id: 'typescript', name: 'TypeScript' },
	{ id: 'javascript', name: 'JavaScript' },
	{ id: 'webdev', name: 'Web Development' },
	{ id: 'ai', name: 'AI' },
];

export const mockAuthor: Author = {
  name: "Nguyễn Văn A",
  avatar: "https://cdn-icons-png.freepik.com/512/6858/6858504.png",
  bio: "Sinh viên CNTT yêu thích AI và phát triển Web.",
  skills: ["React", "TypeScript", "NodeJS", "AI"],
  social: {
    github: "https://github.com/example",
    facebook: "https://facebook.com/example"
  }
}

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Getting Started with React",
    slug: "getting-started-react",
    summary: "Introduction to React basics",
    content: "# React Basics\nReact is a JavaScript library for building UI.",
    cover: "https://picsum.photos/400/200?1",
    tags: ["react", "javascript"],
    status: "published",
    views: 12,
    createdAt: "2026-01-01",
    author: "Nguyễn Văn A"
  },
  {
    id: "2",
    title: "Understanding TypeScript",
    slug: "understanding-typescript",
    summary: "Why TypeScript improves JavaScript development",
    content: "# TypeScript\nTypeScript adds types to JavaScript.",
    cover: "https://picsum.photos/400/200?2",
    tags: ["typescript", "javascript"],
    status: "published",
    views: 9,
    createdAt: "2026-01-02",
    author: "Nguyễn Văn A"
  },
  {
    id: "3",
    title: "Building UI with Ant Design",
    slug: "antd-ui",
    summary: "Using Ant Design in React projects",
    content: "# Ant Design\nAnt Design provides beautiful UI components.",
    cover: "https://picsum.photos/400/200?3",
    tags: ["react", "webdev"],
    status: "published",
    views: 6,
    createdAt: "2026-01-03",
    author: "Nguyễn Văn A"
  }
]