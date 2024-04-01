const { CartPage } = require('./CartPage');
const { DashboardPage } = require('./DashboardPage');
const { LoginPage } = require('./LoginPage');
const { OrdersHistoryPage } = require('./OrdersHistoryPage');
const { OrdersReviewPage } = require('./OrderReviewsPage');

class POManager {
	constructor(page) {
		this.page = page;
		this.cartPage = new CartPage(this.page);
		this.dashboardPage = new DashboardPage(this.page);
		this.loginPage = new LoginPage(this.page);
		this.ordersHistoryPage = new OrdersHistoryPage(this.page);
		this.ordersReviewPage = new OrdersReviewPage(this.page);
	}
	getCartPage() {
		return this.cartPage;
	}
	getDashboardPage() {
		return this.dashboardPage;
	}
	getLoginPage() {
		return this.loginPage;
	}
	getOrdersHistoryPage() {
		return this.ordersHistoryPage;
	}
	getOrdersReviewPage() {
		return this.ordersReviewPage;
	}
}
module.exports = { POManager };
