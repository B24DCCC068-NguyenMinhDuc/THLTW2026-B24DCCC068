export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todo-list',
		name: 'TodoList',
		icon: 'OrderedListOutlined',
		component: './TodoList',
	},
	{
		path: '/bai-tap-1',
		name: 'BaiTap1',
		icon: 'FileTextOutlined',
		component: './BaiTap1',
	},
	{
		path: '/TH01-bai1',
		name: 'TH01-Baitap1',
		icon: 'FileTextOutlined',
		component: './TH01-Bai1',
	},
	{
		path: '/TH01-bai2',
		name: 'TH01-Baitap2',
		icon: 'FileTextOutlined',
		component: './TH01-Bai2',
	},
	{
		path: '/TH02-bai1',
		name: 'TH02-Baitap1',
		icon: 'FileTextOutlined',
		component: './TH02-Bai1'
	},
	{
		path: '/TH02-bai2',
		name: 'TH02-Baitap2',
		icon: 'EditOutlined',
		component: './TH02-Bai2',
	},
	{
		path: '/TH03',
		name: 'TH03',
		icon: 'CustomerServiceOutlined',
		component: './TH03',
	},
	{
		path: './TH04',
		name: 'TH04',
		icon: 'CheckCircleOutlined',
		component: './TH04',
	},
	{
		path: './TH05',
		name: 'TH05 - Clubs Management',
		icon: 'ApartmentOutlined',
		component: './TH05',
	},
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
