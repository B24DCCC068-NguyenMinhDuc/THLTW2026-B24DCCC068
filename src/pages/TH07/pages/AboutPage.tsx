import React from 'react';
import { Card, Avatar, Typography, Tag, Space } from 'antd';
import { GithubOutlined, LinkedinOutlined, FacebookOutlined } from '@ant-design/icons';
import { Author } from '../types/blog';

const { Title, Paragraph } = Typography;

interface Props {
	author: Author;
}

const AboutPage: React.FC<Props> = ({ author }) => {
	return (
		<div style={{ maxWidth: 700, margin: '0 auto' }}>
			<Card>
				<div style={{ textAlign: 'center' }}>
					<Avatar src={author.avatar} size={120} />
					<Title level={3} style={{ marginTop: 16 }}>
						{author.name}
					</Title>
				</div>
				<Paragraph style={{ textAlign: 'center' }}>{author.bio}</Paragraph>
				<div style={{ textAlign: 'center', marginTop: 20 }}>
					<Title level={5}>Kỹ năng</Title>
					<Space wrap>
						{author.skills.map((skill) => (
							<Tag key={skill} color='blue'>
								{skill}
							</Tag>
						))}
					</Space>
				</div>
				<div style={{ textAlign: 'center', marginTop: 20 }}>
					<Title level={5}>Liên kết</Title>
					<Space size='large'>
						{author.social.github && (
							<a href={author.social.github}>
								<GithubOutlined style={{ fontSize: 24 }} />
							</a>
						)}
						{author.social.linkedin && (
							<a href={author.social.linkedin}>
								<LinkedinOutlined style={{ fontSize: 24 }} />
							</a>
						)}
						{author.social.facebook && (
							<a href={author.social.facebook}>
								<FacebookOutlined style={{ fontSize: 24 }} />
							</a>
						)}
					</Space>
				</div>
			</Card>
		</div>
	);
};

export default AboutPage;
