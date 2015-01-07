define(function(require, exports, module) {
	require("fastclick");
	// require("touch_load_banner");
	FastClick.attach(document.body);

	var wxData = {
		title : "",
		link: "",
		desc: "",
		imgUrl: "",
		appid : ""
	};

	function changeWxData(_data){
		_data.title && ( wxData.title = _data.title );
		_data.desc && ( wxData.desc = _data.desc );
		_data.imgUrl && ( wxData.imgUrl = _data.imgUrl );
		_data.link && ( wxData.link = _data.link )
	}

	var shareSuccessCallBack = function(){};
    var _shareSuccess = function(func){
    	shareSuccessCallBack = func;
    }
    var isShare = true;

	WeixinApi.enableDebugMode();
	WeixinApi.ready(function(Api) {
		var wxCallbacks = {
			ready : function() {
				isShare = true;
			},
			cancel : function(resp) {
				isShare = false;
			},
			fail : function(resp) {
				isShare = false;
			},
			confirm : function(resp) {
				isShare = false;
				shareSuccessCallBack();
			},
			all : function(resp) {
				isShare && shareSuccessCallBack();
			}
		};
		Api.shareToFriend(wxData, wxCallbacks);
		Api.shareToTimeline(wxData, wxCallbacks);
		Api.shareToWeibo(wxData, wxCallbacks);
		Api.generalShare(wxData,wxCallbacks);
		Api.hook.enable(wxData,wxCallbacks);
	});

	window.changeWxData = changeWxData;
    window.shareSuccess = _shareSuccess;

});