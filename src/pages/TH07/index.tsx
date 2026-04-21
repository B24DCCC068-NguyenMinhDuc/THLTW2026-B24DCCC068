import React from "react"
import App from "./App"

import { Post, Tag, Author } from "./types/blog"
import { mockPosts, mockTags, mockAuthor } from "./data/mockData"

const RootApp: React.FC = () => {
  const [posts, setPosts] = React.useState<Post[]>(mockPosts)
  const [tags, setTags] = React.useState<Tag[]>(mockTags)
  const [author] = React.useState<Author>(mockAuthor)

  return (
    <App
      posts={posts}
      setPosts={setPosts}
      tags={tags}
      setTags={setTags}
      author={author}
    />
  )
}

export default RootApp;