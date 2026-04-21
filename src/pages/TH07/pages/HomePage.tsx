import React from "react"
import { Row, Col, Input, Tag, Pagination } from "antd"

import { Post, Tag as TagType } from "../types/blog"
import PostCard from "../components/post/PostCard"

interface Props {
  posts: Post[]
  tags: TagType[]
  openPost: (post: Post) => void
}

const HomePage: React.FC<Props> = ({ posts, tags, openPost }) => {

  const [search, setSearch] = React.useState("")
  const [debouncedSearch, setDebouncedSearch] = React.useState("")
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null)
  const [page, setPage] = React.useState(1)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => clearTimeout(timer)
  }, [search])

  const filteredPosts = posts.filter(post => {

    const matchSearch =
      post.title.toLowerCase().includes(debouncedSearch.toLowerCase())

    const matchTag =
      !selectedTag || post.tags.includes(selectedTag)

    const published = post.status === "published"

    return matchSearch && matchTag && published
  })

  const pageSize = 9

  const paginatedPosts = filteredPosts.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  return (
    <div>

      <Input.Search
        placeholder="Tìm kiếm bài viết..."
        style={{ marginBottom: 20 }}
        onChange={e => {
          setSearch(e.target.value)
          setPage(1)
        }}
      />

      <div style={{ marginBottom: 20 }}>
        <Tag
          color={!selectedTag ? "blue" : ""}
          onClick={() => setSelectedTag(null)}
          style={{ cursor: "pointer" }}
        >
          All
        </Tag>

        {tags.map(tag => (
          <Tag
            key={tag.id}
            color={selectedTag === tag.id ? "blue" : ""}
            onClick={() => {
              setSelectedTag(tag.id)
              setPage(1)
            }}
            style={{ cursor: "pointer" }}
          >
            {tag.name}
          </Tag>
        ))}
      </div>

      <Row gutter={[16, 16]}>
        {paginatedPosts.map(post => (
          <Col key={post.id} xs={24} sm={12} md={8}>
            <PostCard
              post={post}
              tags={tags}
              openPost={openPost}
            />
          </Col>
        ))}
      </Row>

      <div style={{ marginTop: 30, textAlign: "center" }}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={filteredPosts.length}
          onChange={setPage}
        />
      </div>

    </div>
  )
}

export default HomePage