HomeController = RouteController.extend({
	template: 'homePage',
})

Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', { name: 'homePage' });
Router.route('/articles', { name: 'articles' });
Router.route('/articles/add', { name: 'articleNew' });


