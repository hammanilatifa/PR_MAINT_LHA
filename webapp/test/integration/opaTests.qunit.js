/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"PR_MAINT_LHA/PR_MAINT_LHA/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});