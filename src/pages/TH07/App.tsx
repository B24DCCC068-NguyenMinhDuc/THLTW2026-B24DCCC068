import React from 'react';
import { Layout, Tabs } from 'antd';
import { Post, Tag, Author } from './types/blog';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import AboutPage from './pages/AboutPage';
import ManagePostsPage from './pages/ManagePostsPage';
import ManageTagsPage from './pages/ManageTagsPage';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

interface AppProps {
	posts: Post[];
	setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
	tags: Tag[];
	setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
	author: Author;
}

const App: React.FC<AppProps> = ({ posts, setPosts, tags, setTags, author }) => {
	const [activeTab, setActiveTab] = React.useState('home');

	const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);

	const openPost = (post: Post) => {
		setSelectedPost(post);
		setActiveTab('post');
	};

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header style={{ color: 'white', fontSize: 18 }}>Personal Blog</Header>

			<Content style={{ padding: 24 }}>
				<Tabs activeKey={activeTab} onChange={setActiveTab}>
					<TabPane tab='Trang chủ' key='home'>
						<HomePage posts={posts} tags={tags} openPost={openPost} />
					</TabPane>

					<TabPane tab='Chi tiết bài viết' key='post' disabled={!selectedPost}>
						<PostPage
							post={selectedPost}
							posts={posts}
							tags={tags}
							setPosts={setPosts}
							goBack={() => setActiveTab('home')}
						/>
					</TabPane>

					<TabPane tab='Giới thiệu' key='about'>
						<AboutPage author={author} />
					</TabPane>

					<TabPane tab='Quản lý bài viết' key='manage-posts'>
						<ManagePostsPage posts={posts} setPosts={setPosts} tags={tags} />
					</TabPane>

					<TabPane tab='Quản lý thẻ' key='manage-tags'>
						<ManageTagsPage tags={tags} setTags={setTags} posts={posts} />
					</TabPane>
				</Tabs>
			</Content>
		</Layout>
	);
};

export default App;
