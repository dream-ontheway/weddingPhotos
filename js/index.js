$(function(){
	var banner = {
		banner_arrow : function(){
			$(".banner").hover(function(){
				$(".banner_next_arrow,.banner_prev_arrow").css('display','block');
			},function(){
				$(".banner_next_arrow,.banner_prev_arrow").css('display','none');
			})
		},
		header_nav : function(){
			$(window).scroll(function(){
				var scroll = $(window).scrollTop();
				if(scroll >= 46){
					$(".header_content").css({'position':'fixed','top':'0','left':'0'});
					$('.banner').css({'padding-top':'100px'});
					$(".return_top").css("display",'block');
				}else{
					$(".header_content").css("position",'static')
					$('.banner').css({'padding-top':'0'});
					$(".return_top").css("display",'none');
				}
			})
		}
	}
	return_top = function(){
		$('html,body').animate({'scrollTop':'0'},500)
	}

	nav_bottom_line = function(){
		$("nav ul li").each(function(i,v){
			$(v).hover(function(){
				$("nav ul li p").eq(i).addClass("redline");
				$("nav ul li a").eq(i).css('color','#b71524');
			},function(){
				$("nav ul li p").eq(i).removeClass('redline');
				$("nav ul li a").eq(i).css('color','#777777');
			})
		})
	}

	banner.banner_arrow();
	banner.header_nav();
	nav_bottom_line();
})