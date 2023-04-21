sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("PR_MAINT_LHA.PR_MAINT_LHA.controller.App", {
		onInit: function () {
			// this._oSmartFilterBar = this.byId("smartFilterBar");
			// this.getRouter().initialize();
		}
		// ,
		// 	handleSelectionChange: function(oEvent){
		// 		var oContext = oEvent.getParameter("ZPRITEMSSet").getBindingContext().getObject();
		// 		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		// 		oRouter.navTo("detail", {
		// 			Banfn: oContext.Banfn
		// 		}
		// 		);

		// }
		// iPress: function (oEvent) {
		// 	var oRouter = this.getOwnerComponent().getRouter();
		// 	oRouter.navTo("Detail");
		// }
	});
});