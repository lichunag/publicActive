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




