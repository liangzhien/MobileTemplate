define(function(require, exports, module) {

	require("common");
	var loadImg = require("loadImg");

	var imgArr = ["images/loading.gif"];
	var loading = $(".loading"),loadingData = $(".loading_data");
	loadImg(imgArr,function(_imgs){
		loading.remove();
	},function(_per){
		loadingData.width(_per+"%");
	});

});