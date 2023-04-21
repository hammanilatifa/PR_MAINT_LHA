sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/Image",
	// "CameraFunctionality/libs/Download",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, Dialog, Button, Image, JSONModel) {
	"use strict";

	return Controller.extend("PR_MAINT_LHA.PR_MAINT_LHA.controller.CreatePR", {

		/**

		* Called when a controller is instantiated and its View controls (if available) are already created.

		* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.

		* @memberOf DADetailsFS.DADetailsFS.view.Create

		*/

		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();

			oRouter.getRoute("TargetDetail").attachPatternMatched(this._onObjectMatched, this);
			this._imageControl = new Image({
				width: "300px",
				height: "300px",
				visible: false
			});
			this.getView().addContent(this._imageControl);

		},
		onBack: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			oRouter.navTo("TargetMaster");

		},

		onAdd: function () { //to add a new row

			var oItem = new sap.m.ColumnListItem({

				cells: [new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap
					.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(),
					new sap.m.Input(), new sap.m.Input()
				]

			});

			var oTable = this.getView().byId("table2");

			oTable.addItem(oItem);

		},

		onAddC: function () {

			var oModel = this.getView().getModel();

			var tb = this.getView().byId("table2");

			var rowid = tb.getSelectedItems();

			if (rowid == '') {} else {

				var row;

				var bsart_var = this.getView().byId("bsart_id").getValue();
				var lpein_var = this.getView().byId("lpein_id").getValue();
				var werks_var = this.getView().byId("werks_id").getValue();
				var sakto_var = this.getView().byId("sakto_id").getValue();

				var Components = [];

				for (row of rowid) {

					Components.push({

						Matnr: row.mAggregations.cells[0]._lastValue,
						Txz01: row.mAggregations.cells[1]._lastValue,
						Matkl: row.mAggregations.cells[2]._lastValue,
						Ekorg: row.mAggregations.cells[3]._lastValue,
						Ekgrp: row.mAggregations.cells[4]._lastValue,
						Infnr: row.mAggregations.cells[5]._lastValue,
						Flief: row.mAggregations.cells[6]._lastValue,
						Menge: row.mAggregations.cells[7]._lastValue,
						Meins: row.mAggregations.cells[8]._lastValue,
						Preis: row.mAggregations.cells[9]._lastValue,
						Peinh: row.mAggregations.cells[10]._lastValue,
						Waers: row.mAggregations.cells[11]._lastValue,
						Knttp: row.mAggregations.cells[12]._lastValue,
						Konnr: row.mAggregations.cells[13]._lastValue,
						Ktpnr: row.mAggregations.cells[14]._lastValue

					});

				}

				var oData = {
					Bsart: bsart_var,
					Lpein: lpein_var,
					Werks: werks_var,
					Sakto: sakto_var,
					ZPRITEMSSet: Components
				}
				oModel.create("/ZPRHEADERSet", oData, {

					method: "POST",

					success: function (data) {

						debugger

						MessageToast.show(data.message);

					},

					error: function (e) {

						alert("error");

					}

				});

				oModel.refresh();

			}
		}

		,
		onValueHelpRequest_bsart: function () {
			debugger;
			var oInput = this.getView().byId("bsart_id");
			jQuery.sap.require("sap.ui.comp.valuehelpdialog.ValueHelpDialog");

			if (!this._oValueHelpDialog) {
				this._oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog("idValueHelp", {
					key: "Bsart",
					descriptionKey: "Bsart",
					supportMultiselect: false,
					ok: function (oEvent) {
						debugger;
						var aTokens = oEvent.getParameter("tokens");
						// var varInput = aTokens[0].mAggregations.customData[0].mProperties.value.Bsart;
						oInput.setTokens(aTokens);
						this.close();
					},
					cancel: function () {
						this.close();
						debugger;
					}
				});

			}
			debugger;
			var oColModel = new sap.ui.model.json.JSONModel();
			oColModel.setData({
				cols: [{
					template: "Bsart"
				}]
			});

			var oList = this._oValueHelpDialog.getTable();
			oList.setModel(oColModel, "columns");
			var oRowModel = new sap.ui.model.json.JSONModel();
			var helpURL = "/sap/opu/odata/sap/ZPR_V01_LHA_SRV/ZPRHEADERSet";
			var queryString = "?$select = Bsart & $format = json";
			oRowModel.loadData(helpURL, queryString, false);
			oRowModel.oData.d.results = [...new Map(oRowModel.oData.d.results.map((m) => [m.Bsart, m])).values()];;
			oList.setModel(oRowModel);
			oList.bindAggregation("rows", "/d/results");
			// oList.bindRows("/ZPRHEADERSet");

			this._oValueHelpDialog.open();

		},
		onValueHelpRequest_lpein: function () {
			debugger;
			var oInput = this.getView().byId("lpein_id");
			jQuery.sap.require("sap.ui.comp.valuehelpdialog.ValueHelpDialog");

			if (!this._oValueHelpDialog) {
				this._oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog("idValueHelp", {
					key: "Lpein",
					descriptionKey: "Lpein",
					supportMultiselect: false,
					ok: function (oEvent) {
						debugger;
						var aTokens = oEvent.getParameter("tokens");
						// var varInput = aTokens[0].mAggregations.customData[0].mProperties.value.Bsart;
						oInput.setTokens(aTokens);
						this.close();
					},
					cancel: function () {
						this.close();
						debugger;
					}
				});

			}
			debugger;
			var oColModel = new sap.ui.model.json.JSONModel();
			oColModel.setData({
				cols: [{
					template: "Lpein"
				}]
			});

			var oList = this._oValueHelpDialog.getTable();
			oList.setModel(oColModel, "columns");
			var oRowModel = new sap.ui.model.json.JSONModel();
			var helpURL = "/sap/opu/odata/sap/ZPR_V01_LHA_SRV/ZPRHEADERSet";
			var queryString = "?$select = Lpein & $format = json";
			oRowModel.loadData(helpURL, queryString, false);
			oRowModel.oData.d.results = [...new Map(oRowModel.oData.d.results.map((m) => [m.Lpein, m])).values()];;
			oList.setModel(oRowModel);
			oList.bindAggregation("rows", "/d/results");
			// oList.bindRows("/ZPRHEADERSet");

			this._oValueHelpDialog.open();

		},
		onValueHelpRequest_werks: function () {
			debugger;
			var oInput = this.getView().byId("werks_id");
			jQuery.sap.require("sap.ui.comp.valuehelpdialog.ValueHelpDialog");

			if (!this._oValueHelpDialog) {
				this._oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog("idValueHelp", {
					key: "Werks",
					descriptionKey: "Werks",
					supportMultiselect: false,
					ok: function (oEvent) {
						debugger;
						var aTokens = oEvent.getParameter("tokens");
						// var varInput = aTokens[0].mAggregations.customData[0].mProperties.value.Bsart;
						oInput.setTokens(aTokens);
						this.close();
					},
					cancel: function () {
						this.close();
						debugger;
					}
				});

			}
			debugger;
			var oColModel = new sap.ui.model.json.JSONModel();
			oColModel.setData({
				cols: [{
					template: "Werks"
				}]
			});

			var oList = this._oValueHelpDialog.getTable();
			oList.setModel(oColModel, "columns");
			var oRowModel = new sap.ui.model.json.JSONModel();
			var helpURL = "/sap/opu/odata/sap/ZPR_V01_LHA_SRV/ZPRHEADERSet";
			var queryString = "?$select = Werks & $format = json";
			oRowModel.loadData(helpURL, queryString, false);
			oRowModel.oData.d.results = [...new Map(oRowModel.oData.d.results.map((m) => [m.Werks, m])).values()];;
			oList.setModel(oRowModel);
			oList.bindAggregation("rows", "/d/results");
			// oList.bindRows("/ZPRHEADERSet");

			this._oValueHelpDialog.open();

		},
		onValueHelpRequest_sakto: function () {
			debugger;
			var oInput = this.getView().byId("sakto_id");
			jQuery.sap.require("sap.ui.comp.valuehelpdialog.ValueHelpDialog");

			if (!this._oValueHelpDialog) {
				this._oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog("idValueHelp", {
					key: "Sakto",
					descriptionKey: "Sakto",
					supportMultiselect: false,
					ok: function (oEvent) {
						debugger;
						var aTokens = oEvent.getParameter("tokens");
						// var varInput = aTokens[0].mAggregations.customData[0].mProperties.value.Bsart;
						oInput.setTokens(aTokens);
						this.close();
					},
					cancel: function () {
						this.close();
						debugger;
					}
				});

			}
			debugger;
			var oColModel = new sap.ui.model.json.JSONModel();
			oColModel.setData({
				cols: [{
					template: "Sakto"
				}]
			});

			var oList = this._oValueHelpDialog.getTable();
			oList.setModel(oColModel, "columns");
			var oRowModel = new sap.ui.model.json.JSONModel();
			var helpURL = "/sap/opu/odata/sap/ZPR_V01_LHA_SRV/ZPRHEADERSet";
			var queryString = "?$select = Sakto & $format = json";
			oRowModel.loadData(helpURL, queryString, false);
			oRowModel.oData.d.results = [...new Map(oRowModel.oData.d.results.map((m) => [m.Sakto, m])).values()];;
			oList.setModel(oRowModel);
			oList.bindAggregation("rows", "/d/results");
			// oList.bindRows("/ZPRHEADERSet");

			this._oValueHelpDialog.open();

		}

	});

});