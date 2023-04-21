sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("PR_MAINT_LHA.PR_MAINT_LHA.controller.Master", {
		onInit: function () {
			this._oSmartFilterBar = this.byId("smartFilterBar");
		},
		handleSelectionChange: function (oEvent) {
			// var oRouter = sap.ui.core.UIComponent().getRouterFor(this);
			var oContext = oEvent.getParameter('listItem').getBindingContext().getObject();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("TargetDetail", {
				Banfn: oContext.Banfn
			});
		},
		onCrPress: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("create");
		}

	});
});