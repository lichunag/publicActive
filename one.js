# publicActive
/使用存js写的动画
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css" media="screen">
		*{margin:0;padding:0;}
<!--   最外层的div设置的宽度是你显示的宽度,设置超出隐藏 -->
		#box{
			width: 400px;
			height: 150px;
			margin:100px auto;
			position: relative;
			overflow: hidden;
		}
<!--   这个div是包含图片的div,宽度是图片的总和,要设置相对定位   -->
		#box>#content{
            width: 2400px;
            height: 150px;
            position: absolute;
            top: 0px;
            left: 0px;
		}
		#box>#content>span{
			width: 400px;
			height: 150px;
			background-color: pink;
			float: left;
			color: black;
			font-size: 30px;
			font-family: '微软雅黑';
			/*margin:10px 0px 0px 10px;*/
		}
		#bottom{position: absolute;
			bottom:5px;
			right: 20px;
			height: 30px;
		}
        #bottom>ul>li{
            display: inline-block;
            height: 30px;
            padding:0px 10px;
            line-height: 30px;
            background-color: rgba(144,178,71,0.7);      
        }
        #bottom>ul .active{background-color: rgba(255,242,0,0.3);}
	</style>
</head>
<body>
	<div id="box">
		<div id="content">
			<span>显示内容1</span>
			<span>显示内容2</span>
			<span>显示内容3</span>
			<span>显示内容4</span>
			<span>显示内容5</span>
			<!-- <span>显示内容1</span> -->
		</div>

		<div id="bottom">
			<ul>
				<li class="active">1</li>
				<li>2</li>
				<li>3</li>
				<li>4</li>
				<li>5</li>
			</ul>
		</div>
	</div>

<script>
//定义一个定时器
var timer = setInterval(doMove,500);
//定义一个变量计算下标
var showNum = 0;
function doMove(){
	activeName(showNum);
	showNum++;
	if(showNum == 5){
		showNum = 0;
	}
}
  function activeName(indexNum){
	var spanElement = document.querySelectorAll('#content>span');
	var liList = document.querySelectorAll("#bottom>ul>li");
	for(var i = 0;i < spanElement.length;i++){
		if(indexNum == i){
			spanElement[i].style.display = 'block';
			liList[i].className = 'active';
		}else{
			spanElement[i].style.display = 'none';
			liList[i].className = '';
		}
	}
}
 var liList = document.querySelectorAll('#bottom>ul>li');
 for(var j = 0;j < liList.length;j++){
 	liList[j].index = j;
 	liList[j].onmouseover = function(){
 		var index = this.index;
 		clearInterval(timer);
 		activeName(index);
 	}
 	liList[j].onmouseout = function(){
 		showNum = this.index;
 		timer = setInterval(doMove,500);
 	}

 }
</script>
</body>
</html>

//这个是项目
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<link rel="stylesheet" href="">
	<style type="text/css" media="screen">
		*{ margin: 0px;padding: 0px; }
		.clear:after{ content: "";clear: both;display: block;overflow: hidden;height: 0px; }
		.clear{ -ms-zoom:1; }

		.box{ width: 490px;height: 170px; margin: 100px auto;  position: relative;overflow: hidden;}
		.contianer{position: absolute;top:0px;left: 0px;width: 3430px;height: 170px;}
		.contianer>img{ float: left; }

		.indicator{ position: absolute;bottom: 5px;right: 5px; }
		.indicator>ul>li{ float: left;list-style: none;width: 30px;height: 30px;background-color: rgba(0,0,0,0.5);margin-left: 5px;text-align: center;line-height: 30px;color:white; }

		.indicator>ul>li.active{ background-color: red; }
	</style>
</head>
<body>
	<div class="box">
		<div class="contianer clear">
			<img src="images/img1.jpg" alt="">
			<img src="images/img2.jpg" alt="">
			<img src="images/img3.jpg" alt="">
			<img src="images/img4.jpg" alt="">
			<img src="images/img5.jpg" alt="">
			<img src="images/img6.jpg" alt="">
			<img src="images/img1.jpg" alt="">
		</div>
		<div class="indicator">
			<ul class="clear">
				<li class="active">1</li>
				<li>2</li>
				<li>3</li>
				<li>4</li>
				<li>5</li>
				<li>6</li>
			</ul>
		</div>
	</div>

	<script>
        var containerEle = document.getElementsByClassName('contianer')[0];
        var currentShowIndex = 0;
        var outerTimer = setInterval(doMove,2000);
        var innerTimer;
		function doMove(){
			//获取当前值，每次向左移动490px
			// var currentLeft = getStyle(containerEle,'left');

			// containerEle.style.left = (parseInt(currentLeft) - 490)+'px';
			//需要把containerEle 坐标 慢慢的向左移动490px，必须使用定时器
             
            //定时器的作用，把container的位置在0.03s的事件，从当前的位置向左移动到490px 
            currentShowIndex++;
            //把传入的index对应的指示器，高亮显示
            showActive(currentShowIndex);

            //当移动到最后一个时候，直接显示第0个指示器
            if( currentShowIndex == 6){
            	showActive(0);
            }

            clearInterval(innerTimer);
            var totalDistane = -490;
            var currentMove = 0;
			innerTimer = setInterval(function(){
				 //-10  -20  -30  -40 -50......
                 currentMove -= 10;
                 
                 //设置contianer的式样，做移动
                 //先获取原有的值
                 var currentLeft = getStyle(containerEle,'left');
                 containerEle.style.left = (parseInt(currentLeft) - 10 ) + 'px';
                 //临界值的判断
                 if( currentMove <= -490){
                    clearInterval(innerTimer);
                    //当动画结束后判断，当前显示的是不是最后一张
                    //如果是，重新复位
                    if( currentShowIndex >= 6 ){
                    	currentShowIndex = 0;
                    	containerEle.style.left = '0px';
                        showActive(currentShowIndex); 
                    }
                 }
			},20);
		}

         //获取某一个对象obj， 属性名为sytleName的  属性值
         //E.g  获取 containerEle.style.left 
		function getStyle( obj,styleName ){
             if( obj.currentStyle ){
             	return obj.currentStyle[styleName];
             }else{
             	//div:after{ }
             	return getComputedStyle(obj,null)[styleName];
             }
		}

        //把下标为index的指示器，高亮
		function showActive(index){
           var indicatorList = document.querySelectorAll('.indicator li');
           for( var i = 0; i < indicatorList.length; i++ ){
           	 if( i == index ){
           	 	indicatorList[i].className = 'active';
           	 }else{
           	 	indicatorList[i].className = '';
           	 }
           }
		}

       var indicatorList = document.querySelectorAll('.indicator li');
       for( var i = 0; i < indicatorList.length;i++ ){
	        indicatorList[i].index = i;

	       	indicatorList[i].onmouseover = function(){
                //停掉外部的定时器
	       		clearInterval(outerTimer);
	       		clearInterval(innerTimer);
	            //this.index
	            //高亮指示器
	            showActive(this.index);
                
                //显示固定位置的那个图片
                containerEle.style.left = this.index * -490 + 'px';
	       	}

	       	indicatorList[i].onmouseout  = function(){
                currentShowIndex = this.index;
                outerTimer = setInterval(doMove,2000);
	       	}
       }

	</script>
</body>
</html>

//这个是使用jquery写的一个鼠标上移出现的动画
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<link rel="stylesheet" href="">
	<script src="js/jquery-1.11.3.js"></script>
	<style type="text/css" media="screen">
		*{ margin: 0px;padding: 0px; }
		.clear:after{ content: "";display: block;clear: both;overflow: height;height: 0px; }
        .box{ width: 1400px;margin:50px 50px;}
        li{ float: left; width: 200px;height: 260px;overflow: hidden;list-style: none;text-align: center;}
        h3{ width: 200px;height: 260px;display: inline-block; color: white;box-sizing: border-box;padding:90px;background-color:rgba(0,0,0,0.5);}
	</style>
</head>
<body>
	<div class="box">
	    <ul class="clear">
	    	<li style="background: url(images/1.jpg) no-repeat center">
	    		<h3>酒店管理</h3> 
	    	</li>
	    	<li style="background: url(images/2.jpg) no-repeat center">
	    		<h3>酒店管理</h3>
	    	</li>
	    	<li style="background: url(images/3.jpg) no-repeat center">
	    		<h3>酒店管理</h3>
	    	</li>
	    	<li style="background: url(images/4.jpg) no-repeat center">
	    		<h3>酒店管理</h3>
	    	</li>
	    	<li style="background: url(images/5.jpg) no-repeat center">
	    		<h3>酒店管理</h3>
	    	</li>
	    	<li style="background: url(images/6.jpg) no-repeat center">
	    		<h3>酒店管理</h3>
	    	</li>
	    </ul>		
	</div>
	<script>
		$(function(){
			$('li').hover(function(){
			   $(this).find('h3').fadeOut();	
               $(this).stop(true).animate({"width":"400px"},'fast').siblings().stop(true).animate({"width":"160px"},'fast');
			},function(){
				$(this).find('h3').fadeIn();
				$(this).stop(true).animate({"width":"200px"},'fast').siblings().stop(true).animate({"width":"200px"},'fast');
			});
		})
	</script>
</body>
</html>

// 网站中换肤操作,引用jquery库
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css" media="screen">
	.clear:after{
		height: 0px;
		display: block;
		clear: both;
		overflow: hidden;
		content: "";
	}
	.clear{-ms-zoom:1;}
	li{list-style: none;}
	a{text-decoration: none;}
	header{
           background-color: #eee;
		}
	.header-content{
         width: 990px;
         margin:0px auto;
		}
		.ul-list{
			list-style: none;
		}
		.ul-list li{
			float: left;
			width: 15px;
			height: 15px;
			margin-left: 5px;
			background: url(images/theme.gif);
			background-position: 0px 0px;
			cursor: pointer;
		}
		.ul-list> li.color1{background-position: 0px 0px;}
		.ul-list> li.color1.active{background-position: 0px 15px;}
		.ul-list> li.color2{background-position: 15px 0px;}
		.ul-list> li.color2.active{background-position: 15px 15px;}
		.ul-list> li.color3{background-position: 35px 0px;}
		.ul-list> li.color3.active{background-position: 35px 15px;}
		.ul-list> li.color4{background-position: 55px 0px;}
		.ul-list> li.color4.active{background-position: 55px 15px;}
		.ul-list> li.color5{background-position: 75px 0px;}
		.ul-list> li.color5.active{background-position: 75px 15px;}
		.ul-list> li.color6{background-position: 95px 0px;}
		.ul-list> li.color6.active{background-position: 95px 15px;}
		nav{
			background:gray;
		}
		nav>ul>li{
          float: left;
          padding:15px 20px;
          color: white;
          cursor: pointer;
		}
	</style>
</head>
<body>
<header>
	<div class="header-content">
		<div class="clear">
			<img style="float: left;" src="images/logo.gif" alt="">
			<input style="float:left;margin-top: 20px;margin-left:5px;" type="text" name="" placeholder="请输入内容">
		
		<div style="float:right;">
			<ul class="ul-list clear">
				<li class="color1" data-color0="red"></li>
				<li class="color2" data-color1="green"></li>
				<li class="color3" data-color2="pink"></li>
				<li class="color4" data-color3="blue"></li>
				<li class="color5" data-color4="gray"></li>
				<li class="color6" data-color5="black"></li>
			</ul>
		</div>
		</div>
<nav>
	<ul class="clear">
		<li>东西</li>
		<li>东西</li>
		<li>东西</li>
		<li>东西</li>
		<li>东西</li>
	</ul>
</nav>
	</div>
</header>
	<script src="jQuery/jquery-3.1.0.min.js"></script>
	<script>
		$(function(){
			$('.ul-list li').click(function(){
				var index = $(this).index();
				// var arr = ["red","blue","green","pink","gray","blue"];
				$(this).addClass('active').siblings().removeClass('active');
				// $('nav').css({
				// 	//这里容易犯得错误是:字符串拼接问题,里面使用逗号连接
				// 	background: arr[ $(this).index() ],
				// });
                $('nav').css({
                	// 其中的data是获取了你自定义元素的属性值
                	background:$(this).data('color'+index),
                })
			});
		});
	</script>
</body>
</html>

//带点击的轮播图
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css" media="screen">
		*{margin:0px;padding:0px;}
		.clear:after{
			height:0px;
			clear: both;
			display: block;
			overflow: hidden;
			content: "";
		}
		.clear{-ms-zoom:1;}
		a{text-decoration: none;}
		li{list-style: none;}
#jnBrand {
    float: left;
    height: 230px;
    margin: 10px auto;
    /*overflow: hidden;*/
    width: 790px;
}
#jnBrandTab {
    border-bottom: 1px solid #E4E4E4;
    height: 29px;
    width: 790px;
    float: left;
}
#jnBrandTab h2 {
    height: 29px;
    line-height: 29px;
    left: 0;
    position: absolute;
    width: 100px;
}
#jnBrandTab ul {
      float: right;
    margin-right: 10px;
}
#jnBrandTab li {
display: inline-block;
}
#jnBrandTab li a {
    background-color: #E4E4E4;
    color: #000000;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    padding: 0 10px;
}
#jnBrandTab .chos {
    background: url("images/chos.gif") no-repeat scroll 50% bottom transparent;
    padding-bottom: 3px;
}
#jnBrandTab .chos a {
    background-color: #FA5889;
    color: #FFFFFF;
    outline: 0 none;
}
#jnBrandContent{
	width: 760px;
	height: 190px;
	margin-top: 40px;
	overflow: hidden;
}
#jnBrandList{
    width: 780px;
    height: 230px;
    position: relative;
}
#jnBrandList>ul{
	width: 3200px;
	position: absolute;
    top:0px;
    left: 0px;
}
#jnBrandList>ul li{
	float: left;

}
#jnBrandContent li span>a {
 color:#666666;
 display: block;
 width: 190px;
 background-color: gray;
 height: 20px;
 line-height: 20px;
 text-align: center;
 margin-left: 5px;
}

#jnBrandContent li a:hover{
    color: #008CD7;
    text-decoration: none;
}
	</style>
</head>
<body>
<div id="jnBrand">
	<div id="jnBrandTab" class="clear">
		<h2 title="品牌活动">品牌活动</h2>
		<ul>
			<li><a href="#" title="#">运动</a></li>
			<li><a href="#" title="#">女鞋</a></li>
			<li><a href="#" title="#">男鞋</a></li>
			<li><a href="#" title="#">童鞋</a></li>
		</ul>
	</div>
	<div id="jnBrandContent">
		<div id="jnBrandList">
			<ul class="clear">
				<li>
					<a href="#" class="JS_live"><img src="images/upload/20120217.jpg" alt="耐克"></a>
					<span><a href="#">耐克</a></span>
				</li>
				<li>
					<a href="#" class="JS_live"><img src="images/upload/20120218.jpg" alt="阿迪达斯"></a>
					<span><a href="#">阿迪达斯</a></span>
				</li>
				<li>
					<a href="#" class="JS_live"><img src="images/upload/20120219.png" alt="李宁"></a>
					<span><a href="#">李宁</a></span>
				</li>
				<li>
					<a href="#" class="JS_live"><img src="images/upload/20120220.png" alt="安踏"></a>
					<span><a href="#">安踏</a></span>
				</li>
				<li>
					<a href="#" class="JS_live"><img src="images/upload/20120217.jpg" alt="耐克"></a>
					<span><a href="#">耐克</a></span>
				</li>
				<li>
					<a href="#" class="JS_live"><img src="images/upload/20120218.jpg" alt="阿迪达斯"></a>
					<span><a href="#">阿迪达斯</a></span>
				</li>
				<li>
					<a href="#" class="JS_live"><img src="images/upload/20120219.png" alt="李宁"></a>
					<span><a href="#">李宁</a></span>
				</li>
				<li>
					<a href="#" class="JS_live"><img src="images/upload/20120220.png" alt="安踏"></a>
					<span><a href="#">安踏</a></span>
				</li>
				<li>
					<a href="#" class="JS_live"><img src="images/upload/20120217.jpg" alt="耐克"></a>
					<span><a href="#">耐克</a></span>
				</li>
				<li>
					<a href="#" class="JS_live"><img src="images/upload/20120218.jpg" alt="阿迪达斯"></a>
					<span><a href="#">阿迪达斯</a></span>
				</li>
				<li>
					<a href="#" class="JS_live"><img src="images/upload/20120219.png" alt="李宁"></a>
					<span><a href="#">李宁</a></span>
				</li>
				<li>
					<a href="#" class="JS_live"><img src="images/upload/20120220.png" alt="安踏"></a>
					<span><a href="#">安踏</a></span>
				</li>
				<li>
					<a href="#" class="JS_live"><img src="images/upload/20120217.jpg" alt="耐克"></a>
					<span><a href="#">耐克</a></span>
				</li>
				<li>
					<a href="#" class="JS_live"><img src="images/upload/20120218.jpg" alt="阿迪达斯"></a>
					<span><a href="#">阿迪达斯</a></span>
				</li>
				<li>
					<a href="#" class="JS_live"><img src="images/upload/20120219.png" alt="李宁"></a>
					<span><a href="#">李宁</a></span>
				</li>
				<li>
					<a href="#" class="JS_live"><img src="images/upload/20120220.png" alt="安踏"></a>
					<span><a href="#">安踏</a></span>
				</li>												
			</ul>
		</div>
	</div>
</div>

	<script src="jQuery/jquery-3.1.0.min.js"></script>
	<script>
		$(function(){
      //    $("#jnBrandTab ul li a").click(function(){
      //       $(this).parent().addClass('chos').siblings().removeClass('chos');
      //       var sum = $('#jnBrandTab li a').index(this);
      //       showBrandList(sum);
      //       return false;
      //       //设置最后一个元素为点击的样式
      //    }).eq(0).click();
      // }); 
      $('#jnBrandTab ul li a').click(function(){
      	$(this).parent().addClass('chos').siblings().removeClass('chos');
      	var sum = $('#jnBrandTab li a').index(this);
      	showBrandList(sum);
      	return false;
      	//巧妙地让第一个显示
      }).eq(0).click();
  });
      // }).eq(0).click();
         // function showBrandList(index){
         //   var $rollobj = $('#jnBrandList');
         //   var rollWidth = $rollobj.find('li').outerWidth();
         //   rollWidth = rollWidth * 4;
         //   $rollobj.stop(true,false).animate({left:-rollWidth*index},1000);
         // }

         //先定义一个函数
         function showBrandList(index){
         	var $rollobj = $('#jnBrandList');
         	var $rollWidth = $rollobj.outerWidth();
         	rollWidth = rollWidth * 4;
         	$rollobj.stop(true,false).animate({left:-rollWidth*index},1000);
         }

	</script>
</body>
</html>
			  
			  
//网站评级 星级那种
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css" media="screen">
		*{margin:0px;padding:0px;}
	.clear:after{
		height: 0px;
		display: block;
		clear: both;
		visibility: hidden;
		font-size: 0px;
		content: "";
	}
	.clear{-ms-zoom:1;}		
         .box{
         	position: relative;
         	margin:80px auto;
            width: 80px;
         }
         .box>ul{
         	list-style: none;
         }
         .box li{
         	float: left;
         	width: 16px;
         	height: 16px;
         	cursor: pointer;
         }
         .str-img{
         	position: absolute;
         	width: 80px;
         	height: 16px;
         	background: url(images/star-matrix.gif);
         	top:0px;
         	left: 0px;
            background-position: 0px 0px;
            /*通过z-index调节低一点可以让li的样式起作用*/
            z-index: -1;
         }

         div .str-img.hover0{
         	background-position: 0px -96px;
         }
         div .str-img.hover1{
         	background-position: 0px -112px;
         }
         div .str-img.hover2{
         	background-position: 0px -128px;
         }
         div .str-img.hover3{
         	background-position: 0px -144px;
         }
         div .str-img.hover4{
         	background-position: 0px -160px;
         }
         .str-img.click0{
         	background-position: 0px -16px;
         }
         .str-img.click1{
         	background-position: 0px -32px;
         }         
         .str-img.click2{
         	background-position: 0px -48px;
         }
         .str-img.click3{
         	background-position: 0px -64px;
         }
         .str-img.click4{
         	background-position: 0px -80px;
         }
	</style>
</head>
<body>
<div class="box">
	<ul class="clear">
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>
	<div class="str-img"></div>
</div>
	<script src="jQuery/jquery-3.1.0.min.js"></script>
	<script>
		$(function(){
			$('.box  li').mouseover(function(){
				var index = $(this).index();
				//hover后面加的是一个变量,还是一个数字,所以不需要加引号
				$('.str-img').addClass('hover'+index);
			}).mouseout(function(){
				var index = $(this).index();
				$('.str-img').removeClass('hover'+index);
			}).click(function(){
                 var index = $(this).index();
                 //attr(参数1,参数2)  参数1:代表他的属性名 
                 // 参数2代表他的属性值
                 $('.str-img').attr('class','str-img').addClass('click'+index);
			});


		});
	</script>
</body>
</html>





// 使用背景图片来实现时间显示
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>数码管显示时间2</title>
	<style type="text/css" media="screen">
		body{background-color: black;
            font-size: 60px;
            color:#ccc;
		}

	</style>
</head>
<body>
	<img src="images/0.png" alt="">
	<img src="images/0.png" alt="">
	:
	<img src="images/0.png" alt="">
	<img src="images/0.png" alt="">
	:
	<img src="images/0.png" alt="">
	<img src="images/0.png" alt="">

	<script type="text/javascript">
		setInterval(function(){
              var date = new Date();
              var shi = date.getHours();
              var fen = date.getMinutes();
              var miao = date.getSeconds();

              //字符串相加
              var imgList = document.getElementsByTagName('img');
              var timesValue = getString(shi) + getString(fen) + getString(miao);
              for(var i = 0;i < timesValue.length;i++){
              	var time = timesValue[i];
                 var numbers =  parseInt(time);
                imgList[i].src = 'images/' + numbers + '.png';
              }

		},1000);
		function getString(inputstr){
			if(inputstr < 10){
				return '0' + inputstr;
			}
			return inputstr.toString();
		}

	</script>
</body>
</html>

// 多个图片的动画
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css" media="screen">
		*{margin:0;padding:0;}
		.box{width: 760px;
			height: 300px;
			margin:30px auto;
			position: relative;
			overflow: hidden;
		}
		.box ul{
            width: 760px;
            height: 300px;
            position: absolute;
            top:0px;
            left: 0px;
		}
		.imgs>li{
			width: 760px;
			height: 300px;
			position: absolute;
			top: 0px;
			left: 0px;
			list-style: none;
			/*float: left;*/
		}
		.imgs>li>img:nth-child(1){
			position: absolute;
			top: 0px;
			left:-760px;
		}
		.imgs>li>img:nth-child(2){
			position: absolute;
			top: -300px;
			left: 0px;
		}
/*        .box>ul>li:nth-child(1){background: url(images/bg1.jpg) no-repeat;}
        .box>ul>li:nth-child(2){background: url(images/bg2.jpg) no-repeat;}
        .box>ul>li:nth-child(3){background: url(images/bg3.jpg) no-repeat;}
        .box>ul>li:nth-child(4){background: url(images/bg4.jpg) no-repeat;}
        .box>ul>li:nth-child(5){background: url(images/bg5.jpg) no-repeat;}*/
        .box .liList{
        	width: 40px;
        	height: 200px;
        	position: absolute;
        	top:50px;
        	left: 20px;
        }
        .box .liList li{
        	list-style: none;
        	height: 30px;
        	line-height: 30px;
        	background-color:rgba(233,0,0,0.5);
        	text-align: center;
        	margin-bottom: 5px;
        }
        .box .liList .active{background-color: rgba(0,0,0,0.4);}
	</style>
</head>
<body>
	<div class="box">
		<ul class="imgs">
			<li style="background: url(images/bg1.jpg) no-repeat;">
			<img src="images/con1.png" alt="">
		    <img src="images/text2.png" alt="">
			</li>

			<li style="background: url(images/bg2.jpg) no-repeat;">
				<img src="images/con2.png" alt="">
				<img src="images/text2.png" alt="">
			</li>

			<li style="background: url(images/bg3.jpg) no-repeat;">
				<img src="images/con3.png" alt="">
				<img src="images/text3.png" alt="">
			</li>

			<li style="background: url(images/bg4.jpg) no-repeat;">
				<img src="images/con4.png" alt="">
				<img src="images/text4.png" alt="">
			</li>

			<li style="background: url(images/bg5.jpg) no-repeat;">
				<img src="images/con5.png" alt="">
				<img src="images/text5.png" alt="">
			</li>
		</ul>

		<ul class="liList">
			<li class="active">1</li>
			<li>2</li>
			<li>3</li>
			<li>4</li>
			<li>5</li>
		</ul>
	</div>
	<script src='js/jquery-1.11.3.js'></script>
	<script>
		// var index = 0;
		// $('.box .imgs li:eq(0)').show().siblings().hide();
		// var timer = setInterval(function(){
		// 	var $index = $('.imgs li').eq(index);
  //           $index.fadeIn().siblings().fadeOut();
  //           $index.children().first().animate({'left':'0px'},1000,function(){
  //           	$index.children().last().animate({'top':'0px'});
  //           });
  //           $index.siblings().each(function(){
  //           	$(this).children().first().css({'left':'-760px'});
  //           	$(this).children().last().css({'top':'-300px'});
  //           });
  //           $('.liList li').eq(index).addClass('active').siblings().removeClass('active');
  //           index++; 
  //           if( index == 5 ){
  //           	index = 0;
  //           }
		// },2000);
		var index = 0;
		//设置显示第一个图片
		$('.box .imgs li:eq(0)').show().siblings().hide();
		//设置一个定时器 (注意这一点与js原生的区别)
		var timer = setInterval(function(){
			var indexs = $('.imgs li').eq(index);
			indexs.fadeIn().siblings().fadeOut();
			indexs.children().first().animate({'left':'0px'},1000,function(){
				indexs.children().last().animate({'top':'0px'});

			});
			//这是是把刚才动画过的图片再移动到原来的地方
			indexs.siblings().each(function(){
				$(this).children().first().css({'left':'-760px'});
				$(this).children().last().css({'top':'300px'});
			});
            $('.liList li').eq(index).addClass('active').siblings().removeClass('active');
			index++;
			if(index == 5){
				index = 0;
			}
		},2000);
	</script>
</body>
</html>

//多个图片动画2
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<link rel="stylesheet" href="">
	<style>
		*{ margin:0px;padding: 0px; }
        .box{ width: 760px;height:300px;margin: 10px auto;  position: relative;overflow: hidden;}
        .box ul{ position: absolute; width: 100%;height: 100%;top:0px;left:0px;}
        .image>li{ list-style: none;position: absolute;top:0px;left:0px;width: 100%;height: 100%; }
        .image>li>img:nth-child(1){ position: absolute;left: -760px;top: 0px; }
        .image>li>img:nth-child(2){ position: absolute;left: 0px;top:-300px; }

        .box .indicator{ position: absolute;left: 10px;top:30px;width: 40px;height: 100%;}
        .box .indicator>li{ list-style:none;width: 30px;height: 30px;border: 1px solid black;margin-bottom: 5px;text-align: center;line-height: 30px; }
        .box .indicator .active{ background-color: red; }
	</style>
	<script src='../jQuery/jquery-1.11.3.js'></script>
</head>
<body>
	<div class="box">
		<ul class="image">
			<li style="background: url(images/bg1.jpg) no-repeat">
				<img src="images/con1.png" alt="">
				<img src="images/text1.png" alt="">
			</li>
			<li style="background: url(images/bg2.jpg) no-repeat">
				<img src="images/con2.png" alt="">
				<img src="images/text2.png" alt="">
			</li>
			<li style="background: url(images/bg3.jpg) no-repeat">
				<img src="images/con3.png" alt="">
				<img src="images/text3.png" alt="">
			</li>
			<li style="background: url(images/bg4.jpg) no-repeat">
				<img src="images/con4.png" alt="">
				<img src="images/text4.png" alt="">
			</li>
			<li style="background: url(images/bg5.jpg) no-repeat">
				<img src="images/con5.png" alt="">
				<img src="images/text5.png" alt="">
			</li>
		</ul>

		<ul class="indicator">
			<li class="active">1</li>
			<li>2</li>
			<li>3</li>
			<li>4</li>
			<li>5</li>
		</ul>
	</div>

	<script>
		$(function(){
			var currentIndex = 0;
			var timer = setInterval(function(){
				//自己显示，其他兄弟先隐藏
                $('.image li').eq(currentIndex).fadeIn().siblings().fadeOut();

                //让自身的图片做动画
                $('.image li').eq(currentIndex).children().first().animate({"left":"0px"},'normal',function(){
                	//让第二个img从上到下做动画
                	$(this).next().animate({"top":"0px"},'normal',function(){
                		//把兄弟节点中的左img 和 上 img 复位
                        $('.image li').eq(currentIndex).siblings().each(function(){
                        	//每一个this 指向自己的一个兄弟节点
                        	$(this).children().first().css({'left':"-760px"});
                        	$(this).children().last().css({'top':"-300px"});
                        });

                        $('.indicator li').eq(currentIndex).addClass('active').siblings().removeClass('active');
                        
                        currentIndex++;
                        if( currentIndex == 5){
                        	currentIndex = 0;
                        }
                	});
                });

			},1000);
		});
	</script>
</body>
</html>


//鼠标滚动顶部出现header悬停
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
		*{margin: 0;padding: 0;}
		.container{width: 1000px;margin:0 auto;}
		img{width: 100%;display: block;border:0 none;}
		.fixed{position: fixed;top:0;left:0;}
	</style>
</head>
<body>

	<img src="images/box1.png" id="box1" alt="">
	<div class="container">
	<img src="images/box2.png" alt="">
	 <img src="images/box3.png" alt="">
	<img src="images/box4.png" alt="">
	<img src="images/box5.png" alt="">
	<img src="images/box6.png" alt="">
	<img src="images/box7.png" alt="">
	<img src="images/box8.png" alt="">
	</div>
	
	<img src="images/box9.png" alt="">

	<script type="text/javascript">
		var box1=document.getElementById("box1");
		window.onscroll=function(){
			var sTop=document.body.scrollTop||document.documentElement.scrollTop;
			var win_height=document.documentElement.clientHeight;
			if(sTop>=win_height){
				box1.className="fixed";
			}else{
				box1.className="";
			};
			
		};
	</script>

</body>
</html>

// 侧边栏广告长停
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css" media="screen">
		*{margin:0;padding:0;}
		#myDiv{
			width: 100px;
			height: 100px;
			background-color: pink;
			position: absolute;
		}
		body{
			height: 2000px;
		}
	</style>
</head>
<body>
	<div id="myDiv"></div>
	<script>
	 var divEl = document.getElementById('myDiv');
		window.onload = function(){
			
			var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
			var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			var divWidth = divEl.offsetWidth;
			var divHeight = divEl.offsetHeight;

			var left = clientWidth - divWidth;
			var top = clientHeight/2 - divHeight/2;

			divEl.style.left = left + 'px';
			divEl.style.top = top + 'px';
		}
		//noresize是整个窗体发生变化
		//onscroll是文档内容发生滚动
		document.onresize = document.onscroll = function(){ 
            //1:获取滚出去的scrollTop
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            var divHeight =  divEl.offsetHeight;

            var tops =  scrollTop + (clientHeight - divHeight)/2;
             //计算应该在的位置
            // divEl.style.top = tops + 'px';

            //使用动画设置他应该在的位置
            startTop(divEl,parseInt(tops));

		}
         function startTop(obj,endTop){
         	clearInterval(obj.timer);
         	obj.timer = setInterval(function(){
         		//获取他的当前位置
         		//2:通过
         		var current = obj.offsetTop;
         		var speed = parseInt((endTop - current))/6;
         		if(speed > 0){
         			speed = Math.ceil(speed);
         		}else{
         			speed = Math.floor(speed);
         		}
         		obj.style.top = (current + speed) + 'px';
         	    if(parseInt(obj.style.top) == parseInt(endTop)){
         	    	clearInterval(obj.timer);
         	    }
         	},20);
         }
	</script>
</body>
</html>


// 简单的美女选项卡
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<link rel="stylesheet" href="">
	<style type="text/css" media="screen">
		*{margin: 0;padding: 0;}
		.clear:after{ content: "";clear: both; display: block;overflow: hidden;height: 0;}
		.box{ width: 500px; height: 150px;border: 1px solid black;position: relative;margin: 100px auto;}
		.title{ background-color: orange;width: 500px; }
		.title>a{ text-decoration: none;color:black; background-color: orange;float:left;width: 50px;height: 30px;line-height: 30px;text-align: 30px;}
		.content1,.content2,.content3{
			position: absolute;left: 0px;top:40px;display: none;
		}
		.title .active{ background-color: white; }
	</style>
</head>
<body>
	<div class="box">
		<div class="title clear">
			<a class="active" href="">第一组</a>
			<a href="">第二组</a>
			<a href="">第三组</a>	
		</div>

		<div class="content1" style="display:block">
			<img src="images/0.jpg" alt="">
			<img src="images/2.jpg" alt="">
			<img src="images/6.jpg" alt="">
		</div>
		<div class="content2">
			<img src="images/7.jpg" alt="">
			<img src="images/8.jpg" alt="">
			<img src="images/11.jpg" alt="">
		</div>
		<div class="content3">
			<img src="images/12.jpg" alt="">
			<img src="images/14.jpg" alt="">
			<img src="images/16.jpg" alt="">
		</div>
	</div>

	<script>
		window.onload = function(){
			var aList = document.querySelectorAll('.title>a');
			var contentList = document.querySelectorAll('div[class^="content"]');
			for( var i = 0; i < aList.length;i++ ){
				aList[i].index = i;
				aList[i].onmouseover = function(){
                   // var index = this.index;
                   for( var j = 0; j < aList.length;j++ ){
                   	  if( j == this.index ){
                         aList[this.index].className = 'active';
                         contentList[this.index].style.display = 'block';
                   	  }else{
                         aList[j].className = '';
                         contentList[j].style.display = 'none';
                   	  }
                   }
				}
			}
		}
	</script>
</body>
</html>

