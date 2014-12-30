define(function(require, exports, module) {
	require("weixinApi");
	require("fastclick");

	FastClick.attach(document.body);
	
	var wxData = {
		title : "",
		link: "",
		desc: "",
		imgUrl: ""
	};

	var _changeWxData = function(_data){
		_data.title && ( wxData.title = _data.title );
		_data.desc && ( wxData.desc = _data.desc );
		_data.imgUrl && ( wxData.imgUrl = _data.imgUrl );
		_data.link && ( wxData.link = _data.link );
	}

	var _shareSuccessCallBack = function(){};
    var _shareSuccess = function(func){
    	_shareSuccessCallBack = func;
    }

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
				_shareSuccessCallBack();
			},
			all : function(resp) {
				isShare && _shareSuccessCallBack();
			}
		};
		Api.shareToFriend(wxData, wxCallbacks);
		Api.shareToTimeline(wxData, wxCallbacks);
		Api.shareToWeibo(wxData, wxCallbacks);
		WeixinJSBridge.call('showOptionMenu');
	});

	window.changeWxData = _changeWxData;
    window.shareSuccess = _shareSuccess;
});