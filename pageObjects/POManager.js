const { DashboardPage } = require('./DashboardPage');
const { LoginPage } = require('./LoginPage');

class POManager {
	constructor(page) {
		this.page = page;
		this.dashboardPage = new DashboardPage(this.page);
		this.loginPage = new LoginPage(this.page);
	}
	getDashboardPage() {
		return this.dashboardPage;
	}
	getLoginPage() {
		return this.loginPage;
	}
}
module.exports = { POManager };
