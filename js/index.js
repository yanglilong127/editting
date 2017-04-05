$(function(){	

	//选择圆角大小、运动速度和点击的li的索引值
	var number_value={
		runSpeed:[],  
		borderSize:8,
		index:0,
		gridSize:30 
	};
	var index_lock=false;   //true：box里的li可以更换背景  false不可以
	addGrid(number_value.gridSize);    //调出网格
	//用于存储li下的p标签里面的文本内容
	var stringArray=['多啦A梦','文本2','文本3','文本4','文本5','文本6','文本7','文本8'];
	//var runSpeed=[];
	//添加元素覆盖盒子时触发	
	$('#addBox').hover(
		function(){
			$("#addBox ul").fadeIn(1000);
			if($("#smallPic ul li").length)
				$("#smallPic").stop(true).animate({top:155,padding:5},500);
			else $("#smallPic").css({padding:0},500);
		},
		function(){
			$("#addBox ul").fadeOut(500);
			$("#smallPic").stop(true).animate({top:35},500);
		});
	//点击添加盒子类型时触发
	$("#addBox ul li").click(function(eve){
		eve.stopPropagation();
		//判断选择圆角矩形还是矩形
		var index=$(this).index();
		if(index===0 || index===1){
			if(index===0)
				var borderRadius='borderRadius';
			else if(index===1)
				var borderRadius=' ';
			//var borderRadius=(index===0)? 'borderRadius' : ' ';
			var $li=$('<li class="'+borderRadius+'"><p></p></li>');
			var lis=$("#box ul.box_first").append($li).children();
			//li的索引值
			var  li_index=lis.length;
			number_value.runSpeed[li_index-1]=1000;
			$("#box ul.box_first li").eq(li_index-1).find('p').text(stringArray[li_index-1]);
			//runSpeed.push(1000);
			
			//alert(li_index);
			//控件的背景
			var widgetPic="url(./images/widget"+li_index+".PNG)";
			var suoyingPic="./images/widget"+li_index+".PNG";
			//添加左侧栏缩影
			var suoyingLi="<li><img width='100' height='100'></li>"
			$("#smallPic").css({top:155,padding:5});
			$('#smallPic ul').append(suoyingLi).find('li').eq(li_index-1).find('img').attr('src',suoyingPic);
			$("#box ul.box_first li").eq(li_index-1)
			.css({'backgroundImage':widgetPic})
			.bind('mouseover',function(){
				$(this).find('p').stop(true).animate({'bottom':'0'},1000);
				//console.log(number_value.runSpeed)
			})
			.bind('mouseout',function(){
				$(this).find('p').stop(true).animate({'bottom':'-30px'},1000);
			})
			.draggable({
				scroll:true,
				cursor:'move',
				start:function(){
					//console.log(1111);
					//addGrid(number_value.gridSize);
				},
				snap:'#zhezhao .box_second li',
				stop:function(){
					addGrid(number_value.gridSize);
					//$("#box ul.box_second").html('');
				}
			})
			.resizable({
				animate:true,
				helper:'ui-resizable-helpBorder'
			})
			.click(function(event){	
				event.stopPropagation();   //组织冒泡事件
				number_value.index=$(this).index();	
				//点击单个盒子li后再点击要进行换肤的皮肤即可进行换肤
				if(index_lock){
					$("#change_bg ul li").unbind('click');
					//console.log('1111'+index_lock)
					$("#change_bg ul li").bind('click',function(){
						var bg_li_index=$(this).index()+1;
						$("#box ul.box_first li").eq(number_value.index).css({'background':'url(./images/widget'+bg_li_index+'.PNG)'});
						$('#smallPic ul li').eq(number_value.index).find('img').attr('src','./images/widget'+bg_li_index+'.PNG');
					});
				}
				$(document).unbind('keydown');  //先解绑键盘事件，防止多个目标同时运动
				var _self=$(this);
				var left=$(this).offset().left-$("#box").offset().left;
				var top=$(this).offset().top-$("#box").offset().top;
				//console.log(left);console.log(top);
				//选中元素后用键盘上下左右来进行微调元素位置
				$(document).bind('keydown',function(e){
					//上：38  右：39  下：40  左：37
					var keyWhich=e.which;

					switch(keyWhich){
						case 38: top=top-3; break;
						case 39: left=left+3; break;
						case 40: top=top+3; break;
						case 37: left=left-3; break;
						default: break;
					}
					_self.css({left:left,top:top});		
				});	

				//鼠标右键按下菜单出现
				$(this).bind('mousedown',function(ev){
					number_value.index=$(this).index();	
					mousedownWhich(ev);
				});
			});


			//鼠标右击缩影里面的li删除当前要删除的盒子里的li
			$("#smallPic ul li").mouseover(function(){
				number_value.index=$(this).index();	
				$(document).bind('mousedown',function(e){
					mousedownWhich(e);
				});
				
			}).mouseout(function(){
				$(document).unbind('mousedown');
			});

		}
		//显示矩形背景图片进行换肤
		else if(index===2){
			$("#change_bg ul li").unbind('click');
			var change_bg_liLen=$('#change_bg ul li').length;
			for(var i=1; i<=change_bg_liLen; i++){
				$('#change_bg ul li').eq(i-1).find('img').attr('src',"./images/widget"+i+".PNG");
			}
			$('#change_bg').css({'display':'block'});
			index_lock=true;
		}
		//显示大背景图片进行换肤
		else if(index===3){
			$("#change_bg ul li").unbind('click');
			var change_bg_liLen=$('#change_bg ul li').length;
			for(var i=1; i<=change_bg_liLen; i++){
				$('#change_bg ul li').eq(i-1).find('img').attr('src',"./images/bg-"+i+".jpg");
			}
			$('#change_bg').css({'display':'block'});
			//点击li进行换肤
			$("#change_bg ul li").bind('click',function(){
				var bg_li_index=$(this).index()+1;
				$("#box").css({'background':'url(./images/bg-'+bg_li_index+'.jpg)'});
			});
			index_lock=false;

		}
		else if(index===4){		//隐藏换肤
			$("#change_bg").css({'display':'none'});
		}   			
		else if(index===5)   //网格隐现切换
			$("#zhezhao").toggleClass('styleToggle');
		
	});

	


	//鼠标右键按下事件
	function mousedownWhich(ev){
		ev.stopPropagation();		
		var left=ev.clientX;
		var top=ev.clientY;			
		var which=ev.which;  //判断是鼠标哪个键按下   1 = 鼠标左键 left; 2 = 鼠标中键; 3 = 鼠标右键
		if(which===3){
			$("#menu").css({left:left,top:top,display:'block'});
			$("#menu li").bind('click',function(e){
				e.stopPropagation();
				var li_menu=$(this).index();  //获取选择的哪个数据
				$(this).parent().css({display:'none'});
					li_menu_switch(li_menu);
				
				
			});
		}
		
	};

	//菜单是选择速度还是圆角大小
	function li_menu_switch(li_menu){
		var index=number_value.index;   //索引值
		if(li_menu===0){	//设置运动速度
			$("#inp").attr('title','请输入速度大小').tooltip();			
			//alert(number_value.index)
			$("#submit").unbind('click');
			$("#submit").bind('click',function(){
				//$("#box ul.box_first li").eq(number_value.index).unbind('mouseover mouseout');
				var value=parseInt($('#inp').val());   //注意数据类型转换，输入框的值
				//alert(typeof(value)==='number');
				if(value){
					//console.log(index);
					//runSpeed[index]=value;
					//number_value.runSpeed=runSpeed;
					//console.log(runSpeed);
					number_value.runSpeed[index]=value;
					

					$("#box ul.box_first li").each(function(i,ele){
						$(this).bind('mouseover',function(){
							$(this).find('p').stop(true).animate({'bottom':'0'},number_value.runSpeed[i]);
						
						})
						.bind('mouseout',function(){
							$(this).find('p').stop(true).animate({'bottom':'-30px'},number_value.runSpeed[i]);
							//console.log(number_value.runSpeed);
						});
						
					});
					
				}
		    });
		    return;
		}
		else if(li_menu===1){	//设置圆角大小
			$("#inp").attr('title','请输入圆角大小').tooltip();
			$("#submit").unbind('click');
			$("#submit").click(function(){
				var value=parseInt($('#inp').val());   //注意数据类型转换，输入框的值
				if(value){
					number_value.borderSize=value;
					$("#box ul.box_first li").eq(index).css({borderRadius:number_value.borderSize});
				}	 
		    });
		    
		}
		else if(li_menu===2){	//设置长宽度大小
			$("#inp").attr('title','请输入长宽，以(英文)分号隔开').tooltip();
			$("#submit").unbind('click');
			$("#submit").click(function(){
				var value=$("#inp").val();
				if(value){
					var value=value.split(';')
					var width=parseInt(value[0]);      //长
					var height=parseInt(value[1]);      //宽
					$("#box ul.box_first li").eq(index).css({width:width,height:height});
				}	 
		    });
		    
		}	
		else if(li_menu===4){	//设置网格大小
			$("#inp").attr('title','请输入网格大小').tooltip();
			$("#submit").unbind('click');
			$("#submit").click(function(){
				var value=$("#inp").val();
				if(value){
					number_value.gridSize=value;
					addGrid(number_value.gridSize);
				}	 
		    });

		}	

	};
	

	//点击菜单删除当前要删除的盒子里的li
	$("#menu li").click(function(){
		var menuLi_index=$(this).index();
		if(menuLi_index===3){
			var answer=window.confirm('你确定删除吗？');
			if(answer){
				$("#box ul.box_first li").eq(number_value.index).remove();
				$("#smallPic ul li").eq(number_value.index).remove();
			}
		}
	});

	
	

	//拖动放下
	$('html,body',document).droppable({
		drop:function(event,ui){
			var BoxWidth=$('#box').width();    //获取盒子的宽度
			//var BoxLeft=$('#box').offset().left;    //获取盒子离左边的距离
			var LiLeft=ui.draggable.position().left;		//获取拖动的盒子离左边的距离
			var LiWidth=ui.draggable.width();
			//console.log(LiWidth);
			var Lidistance=LiLeft+LiWidth;
			if(Lidistance>BoxWidth){
				$("#box").animate({width:Lidistance},500);
			}
			
		}
	});

	//解绑键盘事件
	$(document).click(function(){
		$(this).unbind('keydown');
	});
	
	//菜单
	$("#menu").menu();
	$(document).click(function(){
		$("#menu").css({display:'none'});
	});


	//点击左侧栏伸缩折叠按钮
	var key_num=1;  //1:折叠  2:展开
	$("#btn_left").click(function(){
		if(key_num===1){   //折叠
			$("#leftBar").hide();
			$(this).animate({left:100},function(){
				$("#btn_left").text('展开>>');
			});
			key_num=2;
			return;
		}
		if(key_num===2){
			$("#leftBar").show();
			$(this).animate({left:210},function(){
				$("#btn_left").text('折叠<<');
			});
			key_num=1;
		}
	});


	//添加网格
	function addGrid(value){
		$("#box ul.box_second").html('');   //清空内容
		var boxWidth=$("#box").width();   //获取盒子的宽度
		var boxHeight=$("#box").height();   //获取盒子的长度
		var isWidInt=Number.isInteger(boxWidth/value)   //判断是否能除尽
		var isHeiInt=Number.isInteger(boxHeight/value)   //判断是否能除尽
		var li_width_number=isWidInt? parseInt(boxWidth/value) : parseInt(boxWidth/value)+1;   //横着放li的个数
		
		var li_height_number=isHeiInt? parseInt(boxHeight/value) : parseInt(boxHeight/value)+1;   //竖着放li的个数
		var ul_width=li_width_number*value;			//放网格ul的宽度
		var ul_height=li_height_number*value;			//放网格ul的宽度
		$("#box ul.box_second").css({width:ul_width,height:ul_height});
		//console.log(li_width_number*li_height_number);
		var li_nr='';
		
		for(var i=0; i<li_width_number*li_height_number; i++){
			li_nr+='<li></li>';
		}
		li_nr=$(li_nr);
		$("#box ul.box_second").append(li_nr);
		$("#box ul.box_second li").css({width:value,height:value});
		
	};
	

		

});