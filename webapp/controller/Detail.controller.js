sap.ui.define([

	"sap/ui/core/mvc/Controller",

	"sap/ui/model/Filter",

	"sap/ui/model/FilterOperator",

	"sap/ui/model/FilterType",

	"sap/m/PDFViewer",

	"sap/ui/model/json/JSONModel"

], function (Controller, Filter, FilterOperator, FilterType, PDFViewer, JSONModel) {

	"use strict";

	return Controller.extend(".PR_MAINT_LHA.controller.Detail", {

		/**

		 * Called when a controller is instantiated and its View controls (if available) are already created.

		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.

		 * @memberOf DADetailsFS.DADetailsFS.controller.Detail

		 */

		onInit: function () {

			var oRouter = this.getOwnerComponent().getRouter();

			oRouter.getRoute("TargetDetail").attachPatternMatched(this._onObjectMatched, this);

		},

		onBack: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			oRouter.navTo("TargetMaster");

		},

		_onObjectMatched: function (oEvent) {

			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "DD/MM/YYYY"
			});
			// var dateFormatted = dateFormat.format(Badat);

			var cc = oEvent.getParameter("arguments").Banfn;

			var oView = this.getView();

			oView.bindElement({

				path: "/ZPRHEADERSet(" + "'" + cc + "'" + ")"

			});
			var p = "/ZPRHEADERSet(" + "'" + cc + "'" + ")";
			// // this.getmodelconfirm(cc);

			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPR_V01_LHA_SRV/");

			var oFilter = [];

			oFilter.push(new Filter("Banfn", FilterOperator.EQ, cc));

			oModel.read(p + "/ZPRITEMSSet", {

				// filters: oFilter,

				success: function (results, error) {

					// debugger

					// sap.m.MesageToast.show(results);

					var data = results.results;

					var oTable = oView.byId("table1");
					// oTable.mProperties.entitySet = data;

					// debugger

					var oODataJSONModel = new JSONModel();

					oODataJSONModel.setData(results);

					// debugger

					oView.setModel(oODataJSONModel, "model");

					// debugger

				},

				error: function (error) {

					sap.m.MesageToast.show(error);

				}

			});

		},
		onPreview: function (oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			var pattern = oRouter.oHashChanger.hash;
			var banfn = pattern.substring(7);

			var opdfViewer = new PDFViewer();
			this.getView().addDependent(opdfViewer);
			var sServiceURL = this.getView().getModel().sServiceUrl;
			var sSource = sServiceURL + "/SFORMSet('" + banfn + "')/$value";
			opdfViewer.setSource(sSource);
			opdfViewer.setTitle("PR SMARTFORM");
			opdfViewer.open();

		},
		onModify: function (oEvent) {

			// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// oRouter.navTo("TargetModify");

			// var oContext = oEvent.getParameter('listItem').getBindingContext().getObject();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var pattern = oRouter.oHashChanger.hash;
			var b = pattern.substring(7);
			oRouter.navTo("TargetModify", {
				Banfn: b
			});

		}

	});

});