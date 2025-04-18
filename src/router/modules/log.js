const router = [
	{
		path: "log",
    name: 'log',
		component: () => import("@/views/log/LogView.vue"),
		meta: {
			order: 2, // 排序用（二级路由）
			title:'操作日志',
			needLogin: true // 表示进入这个路由是否需要登录
		},
	}
];

export default router;