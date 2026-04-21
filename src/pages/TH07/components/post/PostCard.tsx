import React from "react"
import { Card, Tag } from "antd"
import { Post, Tag as TagType } from "../../types/blog"

const { Meta } = Card

interface Props {
  post: Post
  tags: TagType[]
  openPost: (post: Post) => void
}

const PostCard: React.FC<Props> = ({ post, tags, openPost }) => {

  const postTags = tags.filter(t => post.tags.includes(t.id))

  return (
    <Card
      hoverable
      cover={
        <img
          src={post.cover}
          alt={post.title}
          style={{ height: 200, objectFit: "cover" }}
        />
      }
      onClick={() => openPost(post)}
    >
      <Meta
        title={post.title}
        description={post.summary}
      />

      <div style={{ marginTop: 10 }}>
        {postTags.map(tag => (
          <Tag key={tag.id}>{tag.name}</Tag>
        ))}
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: "#888" }}>
        {post.author} • {post.createdAt}
      </div>
    </Card>
  )
}

export default PostCard