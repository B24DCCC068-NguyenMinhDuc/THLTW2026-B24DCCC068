import React from 'react';
import { Button, Tag, Typography, Divider, Row, Col, Card } from 'antd';
import ReactMarkdown from 'react-markdown';

import { Post, Tag as TagType } from '../types/blog';

const { Title, Text } = Typography;

interface Props {
	post: Post | null;
	posts: Post[];
	tags: TagType[];
	setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
	goBack: () => void;
}

const PostPage: React.FC<Props> = ({ post, posts, tags, setPosts, goBack }) => {
	if (!post) {
		return <div>Chưa chọn bài viết</div>;
	}

	React.useEffect(() => {
		setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, views: p.views + 1 } : p)));
	}, []);

	const postTags = tags.filter((tag) => post.tags.includes(tag.id));

	const relatedPosts = posts
		.filter((p) => p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag)) && p.status === 'published')
		.slice(0, 3);

	return (
		<div>
			<Button onClick={goBack} style={{ marginBottom: 20 }}>
				← Quay lại danh sách
			</Button>

			<Title>{post.title}</Title>

			<Text type='secondary'>
				{post.author} • {post.createdAt} • {post.views} views
			</Text>

			<div style={{ marginTop: 10 }}>
				{postTags.map((tag) => (
					<Tag key={tag.id}>{tag.name}</Tag>
				))}
			</div>

			<Divider />

			<ReactMarkdown>{post.content}</ReactMarkdown>

			<Divider />

			<Title level={4}>Bài viết liên quan</Title>

			<Row gutter={[16, 16]}>
				{relatedPosts.map((r) => (
					<Col key={r.id} xs={24} md={8}>
						<Card hoverable cover={<img src={r.cover} alt={r.title} style={{ height: 150, objectFit: 'cover' }} />}>
							<Card.Meta title={r.title} description={r.summary} />
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default PostPage;
