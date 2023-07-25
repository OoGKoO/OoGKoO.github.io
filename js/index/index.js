var iUp = (function () {
	var t = 0,
		d = 150,
		clean = function () {
			t = 0;
		},
		up = function (e) {
			setTimeout(function () {
				$(e).addClass("up")
			}, t);
			t += d;
		},
		down = function (e) {
			$(e).removeClass("up");
		},
		toggle = function (e) {
			setTimeout(function () {
				$(e).toggleClass("up")
			}, t);
			t += d;
		};
	return {
		clean: clean,
		up: up,
		down: down,
		toggle: toggle
	}
})();

$(document).ready(function () {				// 所有物品淡入
	$(".iUp").each(function (i, e) {
		iUp.up(e);
	});

	var f_idx = 0;
	var c_idx = 0;

	var mobile_flag = isMobile();
	if (mobile_flag) {
		console.info("移动端");
		$("#player").css("display", "none");
	} else {
		console.info("PC端")
	}


	fetch('https://v0.yiketianqi.com/api?unescape=1&version=v61&appid=77525287&appsecret=rh1OES5j').then(function (res) {				//获取天气接口
		return res.json();
	}).then(function (w) {
		$('#weather').html(w.city + " " + w.wea + " " + w.tem + "℃");
	}).catch(function (werr) {
		console.error(werr);
	})

	fetch('https://v1.hitokoto.cn').then(function (res) {							//获取一言接口
		return res.json();
	}).then(function (e) {
		$('#yiyan').html(e.hitokoto + "<br/> ——   " + "「<strong>" + e.from + "</strong>」")
	}).catch(function (err) {
		console.error(err);
	})



	var url = 'https://bird.ioliu.cn/v1?url=https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8';				//获取Bing每日一图
	var imgUrls = JSON.parse(sessionStorage.getItem("imgUrls"));
	var index = sessionStorage.getItem("index");
	var $panel = $('#panel');
	if (imgUrls == null) {
		imgUrls = new Array();
		index = 0;
		$.get(url, function (result) {
			images = result.images;
			for (let i = 0; i < images.length; i++) {
				const item = images[i];
				imgUrls.push(item.url);
			}
			var imgUrl = imgUrls[index];
			var url = "https://www.bing.com" + imgUrl;
			$panel.css("background", "url('" + url + "') center center no-repeat #666");
			$panel.css("background-size", "cover");
			sessionStorage.setItem("imgUrls", JSON.stringify(imgUrls));
			sessionStorage.setItem("index", index);
		});
	} else {
		if (index == 7)
			index = 0;
		else
			index++;
		var imgUrl = imgUrls[index];
		var url = "https://www.bing.com" + imgUrl;
		$panel.css("background", "url('" + url + "') center center no-repeat #666");
		$panel.css("background-size", "cover");
		sessionStorage.setItem("index", index);
	}

});



url_choose = "https://www.bing.com/search?q=";						//搜索功能
var edge = document.getElementById("search_choose_icon_edge")
var chrome = document.getElementById("search_choose_icon_chrome")
var baidu = document.getElementById("search_choose_icon_baidu")
function choose_edge() {
	url_choose = "https://www.bing.com/search?q=";
	$("#search_text").attr("placeholder", "Bing搜索...");
	edge.style.border = "2px solid white";
	chrome.style.border = "none";
	baidu.style.border = "none";
}
function choose_chrome() {
	url_choose = "https://www.google.com/search?q=";
	$("#search_text").attr("placeholder", "Google搜索...");
	chrome.style.border = "2px solid white";
	edge.style.border = "none";
	baidu.style.border = "none";
}
function choose_baidu() {
	url_choose = "https://www.baidu.com/s?wd=";
	$("#search_text").attr("placeholder", "百度搜索...");
	baidu.style.border = "2px solid white";
	edge.style.border = "none";
	chrome.style.border = "none";
}
function search() {
	search_text = document.getElementById("search_text").value;
	url = url_choose + search_text;
	window.open(url, "_blank")
}
$("#search_text").on("keypress", function (event) {				//按回车键搜索
	if (event.keyCode == 13) {
		$("#search_btn").trigger("click");
	}
});
