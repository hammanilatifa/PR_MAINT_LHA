sap.ui.define([
	"sap/ui/core/mvc/Controller",

	"sap/ui/model/Filter",

	"sap/ui/model/FilterOperator",

	"sap/ui/model/FilterType",

	"sap/m/MessageToast",

	"sap/ui/model/json/JSONModel"
], function (Controller, Filter, FilterOperator, FilterType, MessageToast, JSONModel) {
	"use strict";

	return Controller.extend("PR_MAINT_LHA.PR_MAINT_LHA.controller.ModifyPR", {
		onInit: function () {

			var oRouter = this.getOwnerComponent().getRouter();

			oRouter.getRoute("TargetModify").attachPatternMatched(this._onObjectMatched, this);

		},

		onBack: function (oEvent) {

			// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			// oRouter.navTo("TargetDetail");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var pattern = oRouter.oHashChanger.hash;
			var b = pattern.substring(7);
			oRouter.navTo("TargetDetail", {
				Banfn: b
			});
		},
		_onObjectMatched: function (oEvent) {

			var cc = oEvent.getParameter("arguments").Banfn;

			var oView = this.getView();

			oView.bindElement({

				path: "/ZPRHEADERSet(" + "'" + cc + "'" + ")"

			});
			var p = "/ZPRHEADERSet(" + "'" + cc + "'" + ")";
			// // this.getmodelconfirm(cc);

			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPR_V01_LHA_SRV/");

			// var oFilter = [];

			// oFilter.push(new Filter("Banfn", FilterOperator.EQ, cc));

			oModel.read(p + "/ZPRITEMSSet", {

				// filters: oFilter,

				success: function (results, error) {

					// debugger

					// sap.m.MesageToast.show(results);

					var data = results.results;

					// var oTable = oView.byId("table1");
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
		onAdd: function () { //to add a new row

			var oItem = new sap.m.ColumnListItem({

				cells: [new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap
					.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(),
					new sap.m.Input(), new sap.m.Input()
				]

			});

			var oTable = this.getView().byId("table1");

			oTable.addItem(oItem);

		},
		onupdtH: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var pattern = oRouter.oHashChanger.hash;
			var cc = pattern.substring(7);

			var oModel = this.getView().getModel();

			var bsart_var = this.getView().byId("bsart_id").getValue();
			var lpein_var = this.getView().byId("lpein_id").getValue();
			var werks_var = this.getView().byId("werks_id").getValue();
			var sakto_var = this.getView().byId("sakto_id").getValue();

			var oData = {
				Bsart: bsart_var,
				Lpein: lpein_var,
				Werks: werks_var,
				Sakto: sakto_var
			}
			oModel.update("/ZPRHEADERSet('" + cc + "')", oData, {

				// method: "MERGE",

				success: function (data) {

					// debugger

					// MessageToast.show(data.message);
					alert("updated PR header successfully!");

				},

				error: function (e) {

					alert("error");

				}

			});

			oModel.refresh();
		},

		onupdtI: function () {
			// To get Banfn
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var pattern = oRouter.oHashChanger.hash;
			var cc = pattern.substring(7);

			var oModel = this.getView().getModel();

			var tb = this.getView().byId("table1");

			var rowid = tb.getSelectedItems();

			if (rowid == '') {} else {

				var row;

				// var bsart_var = this.getView().byId("bsart_id").getValue();
				// var lpein_var = this.getView().byId("lpein_id").getValue();
				// var werks_var = this.getView().byId("werks_id").getValue();
				// var sakto_var = this.getView().byId("sakto_id").getValue();

				var Components = [];
				// var Bnfpo_sel = this.getView().byId("bnfpo").getValue();
				var bnfpos = [];

				for (row of rowid) {

					Components.push({
						Bnfpo: row.mAggregations.cells[0]._lastValue,
						Matnr: row.mAggregations.cells[1]._lastValue,
						Txz01: row.mAggregations.cells[2]._lastValue,
						Matkl: row.mAggregations.cells[3]._lastValue,
						Ekorg: row.mAggregations.cells[4]._lastValue,
						Ekgrp: row.mAggregations.cells[5]._lastValue,
						Infnr: row.mAggregations.cells[6]._lastValue,
						Flief: row.mAggregations.cells[7]._lastValue,
						Menge: row.mAggregations.cells[8]._lastValue,
						Meins: row.mAggregations.cells[9]._lastValue,
						Preis: row.mAggregations.cells[10]._lastValue,
						Peinh: row.mAggregations.cells[11]._lastValue,
						Waers: row.mAggregations.cells[12]._lastValue,
						Knttp: row.mAggregations.cells[13]._lastValue,
						Konnr: row.mAggregations.cells[14]._lastValue,
						Ktpnr: row.mAggregations.cells[15]._lastValue

					});

					bnfpos.push(row.mAggregations.cells[0]._lastValue);
				}

				var bnfpo;
				var component;
				for (let i = 0; i < Components.length; i++) {
					for (let j = 0; j < bnfpos.length; j++) {
						if (Components[i].Bnfpo == bnfpos[j]) {
							bnfpo = bnfpos[j];

							var oData = Components[i];
							oModel.update("/ZPRITEMSSet(Banfn='" + cc + "',Bnfpo='" + bnfpo + "')", oData, {

								method: "MERGE",

								success: function (data) {

									// debugger

									// MessageToast.show(data.message);
									alert("updated item - "+bnfpo+" successfully!");

								},

								error: function (e) {

									alert("error");

								}

							});
						}
					}
				}

				// var oData = {
				// 	// ZPRITEMSSet: 
				// 	Components
				// }

				// oModel.update("/ZPRITEMSSet('Banfn=" + cc + ",Bnfpo='" + Components.Bnfpo + ")", oData, {

				// 	// method: "MERGE",

				// 	success: function (data) {

				// 		// debugger

				// 		// MessageToast.show(data.message);
				// 		alert("updated item - " + data.message);

				// 	},

				// 	error: function (e) {

				// 		alert("error");

				// 	}

				// });

				// oModel.refresh();

			}
		}
	});
});