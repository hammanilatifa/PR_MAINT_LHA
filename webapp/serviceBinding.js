function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZPR_V01_LHA_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}