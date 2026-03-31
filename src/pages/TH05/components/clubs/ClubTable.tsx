import React from 'react';
import { Table, Button, Space, Tag, Popconfirm } from 'antd';
import { Avatar } from 'antd';
import { Club } from '../../types/club';

interface Props {
	clubs: Club[];
	onEdit: (club: Club) => void;
	onDelete: (id: number) => void;
	onViewMembers: (club: Club) => void;
}

const ClubTable: React.FC<Props> = ({ clubs, onEdit, onDelete, onViewMembers }) => {
	const columns = [
		{
			title: 'Avatar',
			render: (_: any, record: Club) => <Avatar src={record.avatar} />,
		},
		{
			title: 'Club Name',
			dataIndex: 'name',
			sorter: (a: Club, b: Club) => a.name.localeCompare(b.name),
		},
		{
			title: 'Founded',
			dataIndex: 'foundedDate',
			sorter: (a: Club, b: Club) => new Date(a.foundedDate).getTime() - new Date(b.foundedDate).getTime(),
		},
		{
			title: 'President',
			dataIndex: 'president',
		},
		{
			title: 'Active',
			dataIndex: 'active',
			render: (active: boolean) => (active ? <Tag color='green'>Yes</Tag> : <Tag color='red'>No</Tag>),
		},
		{
			title: 'Actions',
			render: (_: any, record: Club) => (
				<Space>
					<Button onClick={() => onEdit(record)}>Edit</Button>

					<Popconfirm title='Delete this club?' onConfirm={() => onDelete(record.id)}>
						<Button danger>Delete</Button>
					</Popconfirm>

					<Button onClick={() => onViewMembers(record)}>Members</Button>
				</Space>
			),
		},
	];

	return <Table rowKey='id' dataSource={clubs} columns={columns} />;
};

export default ClubTable;
