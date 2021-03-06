var topMenuImage=["fxhx_icon.png","zbdb_icon.png","zjyd_icon.png","kyjy_icon.png","scyq_icon.png","jysp_icon.png","ywyc_icon.png","gsxx_icon.png","fxhx_icon.png","zbdb_icon.png","zjyd_icon.png","kyjy_icon.png","scyq_icon.png","jysp_icon.png","ywyc_icon.png","gsxx_icon.png"];//菜单对应图标名称 具体文件放到com.fr.solution.theme.sky.files.image包下面

//路径
var path = '/WebReport';
//角色名
var roleName;
//风险事件未读数
var alarmUnread = 0;
//信封未读数
var mailUnread = 0;
//大宗处理人角色
var dealRole = '大宗风控经理';
//大宗审核人角色
var auditRole = '大宗风控总监';
//大宗决策人角色
var judgeRole = '大宗政府';
//权益处理人角色
var qyDealRole = '权益风控经理';
//权益审核人角色
var qyAuditRole = '权益风控总监';
//权益决策人角色
var qyJudgeRole = '权益政府';
var rolemenu;//当前大类对应菜单
var menuId;//获取所有菜单的id，通过json文件
(function ($) {
   init();
   FS.THEME = $.extend(true, FS.THEME, {
   			config4MenuTree: {
   				/*onBeforeInit:function(element){
   					//获取大宗 权益相应菜单
   					getMenuByRoleName();
   				},*/
	   			onAfterNodeExpand: function(node, $node, $li){
			   			if(node.level==1){
			   				var $treeIcon=$li.children('ul').find(".tree-icon");
			   				console.log(node)
			   				$.each($treeIcon,function(index,item){
			   					$(item).removeClass("icon-tree-leaf icon-tree-frm icon-tree-cpt");
			   					//放图片
			   					$(item).css({"width":"1.2em","height":"1.2em","background":"url(${servletURL}?op=resource&resource=/com/fr/solution/theme/sky/files/image/"+topMenuImage[index]+")"});
			   					$(item).css({"position": "absolute","left": "2em","top":".5em","background-size":"100% 100%","background-repeat":"no-repeat"});
			   					$(item).html('');
			   					$(item).next().css("padding-left","25px");
			   					//console.log(item)
			   					/*var title=$(item).next().text();
			   					$.each(node.ChildNodes,function(ind,it){
			   						if(it.text==title){
			   							$(item).parent("li").attr("id","menu_id_"+it.id);
			   						}
			   					});*/
				   				
			   				});
			   				
			   			}
		   			$(".tree-icon").html('');
	   			},
	   			onAfterNodeCollapse: function(node, $node, $li){
		   			if(node.level >= 1){
			   			$li.children('ul').css({
				   			'background': 'none'
			   			});
			   			if(node.level ==1){
			   				var $treeIcon=$li.children('ul').find(".tree-icon");
			   				
			   				$.each($treeIcon,function(index,item){
			   					$(item).html('');
			   				});
			   			}
		   			};
		   			$(".tree-icon").html('');
	   			},
	   			/*onAfterNodeCreate: function(node, $node, $li){
		   			node.level>1&&$node.css({'border-bottom': 'solid 1px rgb(59,79,98)'});
		   			
	   			}*/
	   		 onAfterNodeCreate:function(node, $node, $li){
	               $li.attr("id","menu_id_"+node.id);
	               //进行移除
	               	if(!FS.config.isAdmin&&!judgeExsit(node)){
	               		//删除
	               		$li.remove();
	               	}
	            },
   			},
   			
            config4tabPane: {
                style: 'alpha',
                isCollapsible: false,
                hasHomepageBtn: true
            },
            config4navigation: {
            	onAfterInit: function () {
                $("#fs-navi-message").remove();
                $("#fs-frame-search").remove();
                $("#fs-navi-favorite").remove();
                $('#fs-frame-menu').css('background-color','transparent');
                $('.fui-bsb').css('background-color','rgba(13,23,80,0.5)');
                $('.fui-fhc').css('color','transparent');
                $('.fui-fht').css('text-shadow','0');  
               /* 添加风险预警按钮*/
                var html='<li class="fs-navibar-item" id="monitor"><i class="icon-navi-message"></i><span class="fx_num">0</span></li><li class="fs-navibar-item" id="qs_emails"><i class="emails_bac"></i><span class="mail_num">0</span><audio id="audio" src="audio/8438.mp3"></audio></li>'
                	$("#fs-navi-admin").before(html);
                /*点击铃铛打开风险事件查看页面  风险事件id名为 2683*/
                var user_name=FS.config.username;
                /*user_position 用户所属部门*/
				var user_position=FS.config.position;
				
				$('#qs_emails').on("click",function(){
					$(".mail_num").css("color","rgb(0,176,244)");
					$(".emails_bac").addClass('emails_bac_click');
					
				}).on("mouseleave",function(){
					$(".mail_num").css("color","#fff");
					$(".emails_bac").removeClass('emails_bac_click');
				});
				$('#monitor').on("click",function(){
					$(".fx_num").css("color","rgb(0,176,244)");
					$(this).addClass('fui-bsc');
					console.log("zuo");
					//如果存在二级目录
					if($(menuId.ROOT).find('ul').length!=0){
						//将二级菜单显示
						$(menuId.ROOT).find('ul').css('display','block');
					}else{
						//如果没有则触发
						$(menuId.ROOT).find('a').trigger('click');										
					}
					//显示不清零
					//$(".fx_num").html(0);
				
					//风险事件不需要判断角色类型
					//需要判断大宗还是权益
					var type=getQueryString("type");
					if(type==0){
						$(menuId.DZFXSJ).find('a').trigger('click');
					}else if(type==1){
						$(menuId.QYFXSJ).find('a').trigger('click');
					}
					
					
					//将未读消息变已读
					//显示不清零
					//setUnReadFxsjToRead(path);
					
				}).on("mouseleave",function(){
					$(".fx_num").css("color","#fff");
					$(this).removeClass('fui-bsc');
				});
				/* 添加返回导航页的 Li*/
				$("#fs-navi-admin").on("click",function(){
					var $nav_a = $("<a href='/WebReport/navigation/navigation.html' class='mynav'>导航页</a>");
					if($(".mynav")){
						$(".mynav").remove();
					}
					setTimeout(function(){
						$(".fs-admin-combo").children().first().after($nav_a);
					},100)
				});
					
				
				//console.log(navLi);
				
				/*$('body').on('click','#monitor',function(){
					
					//如果存在二级目录
					if($('#menu_id_097').find('ul').length!=0){
						//将二级菜单显示
						$('#menu_id_097').find('ul').css('display','block');
					}else{
						//如果没有则触发
						$('#menu_id_097').find('a').trigger('click');										
					}
					$(".fx_num").html(0);
				
					//风险事件不需要判断角色类型
					$('#menu_id_2683').find('a').trigger('click');
					
					//将未读消息变已读
					setUnReadFxsjToRead(path);
					//getUnReadFxsjCount(path);    
					
				})*/
			/*	
            $('#menu_id_2683 a').addEventListener('click',function(){
		            	 setUnReadFxsjToRead(path);
		             })*/
               //点击个人邮箱   根据不同部门打开不同风险填报页面
               $("#qs_emails").click(function(){
            	   
				//如果存在二级目录
				if($(menuId.ROOT).find('ul').length!=0){
					//将二级菜单显示
					$(menuId.ROOT).find('ul').css('display','block');
				}else{
					//如果没有则触发
					$(menuId.ROOT).find('a').trigger('click');
				}
				//显示数不清零
				//$(".mail_num").html(0);
				if(roleName!=null){
					if(roleName.indexOf(dealRole)!=-1){
						$(menuId.DZCLR).find('a').trigger('click');
					}else if(roleName.indexOf(auditRole)!=-1){
						$(menuId.DZSHR).find('a').trigger('click');
					}else if(roleName.indexOf(judgeRole)!=-1){
						$(menuId.DZJCR).find('a').trigger('click');
					}else if(roleName.indexOf(qyDealRole)!=-1){
						$(menuId.QYCLR).find('a').trigger('click');
					}else if(roleName.indexOf(qyAuditRole)!=-1){
						$(menuId.QYSHR).find('a').trigger('click');
					}else if(roleName.indexOf(qyJudgeRole)!=-1){
						$(menuId.QYJCR).find('a').trigger('click');
					}else{
						console.log('角色不匹配');
						FR.Msg.toast('您没有要处理的事件');
					}
				}
				//getAllUnReadCount(path);
				//显示数不清零
				//setAllUnReadToRead(path);
               });
            }
           },
          //框架布局配置属性  
           config4frame: {
		        resizable: false,
		        west: {
		            width: '12%' 
		        },
		        east: {
			        width: '88%'
		        }
		    },
   			
        });
   
function init(){
	getMenuByRoleName();
	getRoleNameByUserName(path);
	getUnReadFxsjCount(path);
	getAllUnReadCount(path);
	//获取菜单id
	getMenuIdByJson();
	/*定时调取数据  风险事件条数*/
	setInterval(function(){
		getUnReadFxsjCount(path);
		getAllUnReadCount(path);
	},10000);
};
/**
 * 通过username获取角色名
 * @param fr_path 系统路径
 * 
 */
function getRoleNameByUserName(fr_path) {
	var result=new Object();
    var domain = fr_path + '/getRole';
   // console.log(domain);
	$.ajax({  
		type: "POST",  
		url: domain,  
		dataType:"json", 
		success: function(data){  
			result = data;
			roleName = data.roleName;
		//	console.log(roleName);
			/*alert('调取成功')*/
		},  
		error: function(json){  
			console.log(json);
			result = json;
		  /*  alert("调取失败");  */
		}  
	}); 
	return result;
};
/**
 * 获取风险事件的未读数
 * @param fr_path 系统路径
 */
function getUnReadFxsjCount(fr_path) {
	var result=new Object();
	//fr_path为空使用默认地址
    var domain = fr_path + '/notReadMsg';
    var audio=$("#audio").get(0);
	var type=getQueryString("type");
	type++;
	$.ajax({  
		type: "POST",  
		url: domain,  
		data:{"type":type},
		dataType:"json", 
		success: function(data){ 
			result = data;
			var fxsj_num=alarmUnread;
			//console.log('beforefxsj_num------'+fxsj_num);
			alarmUnread = data.unReadCount;
			$(".fx_num").html(alarmUnread);
			//console.log('afters------'+alarmUnread);
			/*风险事件增加时触发报警*/
			if(fxsj_num<alarmUnread){
				audio.play();
			}
		},  
		error: function(json){  
			/*console.log(json);*/
			result = json;
		  /*  alert("调取失败");  */
		}  
	}); 
	return result;
};
/**
 * 风险事件的未读变已读
 * @param fr_path 系统路径
 */
function setUnReadFxsjToRead(fr_path) {
	var result=new Object();
    var domain = fr_path + '/readMsg';
    var type=getQueryString("type");
	type++;
	$.ajax({  
		type: "POST",  
		url: domain,  
		dataType:"json", 
		data:{"type":type},
		success: function(data){  
			//console.log(data);
			result = data;
			//成功变0
			alarmUnread = 0;
			$(".fx_num").html(alarmUnread);
			//console.log('风险事件未读数变0');
			//console.log(alarmUnread);
		},  
		error: function(json){  
			result = json;
		  /*  alert("调取失败");  */
		}  
	}); 
	return result;
};
/**
 * 获取所有事件的未读数
 * @param fr_path 系统路径
 */
function getAllUnReadCount(fr_path) {
	var result=new Object();
    var domain = fr_path + '/getAllUnReadMsg';
    var type=getQueryString("type");
	type++;
	$.ajax({  
		type: "POST",  
		url: domain,  
		data:{"type":type},
		dataType:"json", 
		success: function(data){  
			result = data;
			mailUnread = data.unReadAllCount;
			$(".mail_num").html(mailUnread);
			/*alert('调取成功')*/
		},  
		error: function(json){  
			result = json;
		  /*  alert("调取失败");  */
		}  
	}); 
	return result;
};
/**
 * 所有事件的未读变已读
 * @param fr_path 系统路径
 */
function setAllUnReadToRead(fr_path) {
	var result=new Object();
    var domain = fr_path + '/readAllUnReadMsg';
    //console.log(domain);
	$.ajax({  
		type: "POST",  
		url: domain,  
		dataType:"json", 
		async:'false',
		success: function(data){  
			console.log(data);
			result = data;
			//成功变0
			mailUnread = 0;
			//console.log('信息未读数变0');
			//console.log(mailUnread);
			/*alert('调取成功')*/
		},  
		error: function(json){  
			console.log(json);
			result = json;
		  /*  alert("调取失败");  */
		}  
	}); 
	return result;
};
/**
 * 根据自定义角色名称获取对应菜单节点
 */
function getMenuByRoleName() {
	var result=new Object();
    var domain = path + '/getMenuByRoleName';
	$.ajax({  
		type: "POST",  
		url: domain,  
		data:{"roleType": getQueryString("type")},
		dataType:"json", 
		success: function(data){  
			//rolemenu = eval("("+data.rolemenu+")");
			rolemenu=JSON.parse(data.rolemenu);
			console.log(rolemenu);
			/*alert('调取成功')*/
		},  
		error: function(json){  
			//console.log(json);
			//result = json;
		  /*  alert("调取失败");  */
		}  
	}); 
	return result;
};
/**
 * 通过文件获取各个菜单对应的id
 */
function getMenuIdByJson() {
	var result=new Object();
    var domain = path + '/menuId.json';
	// $.ajax({  
	// 	type: "GET",  
	// 	url: domain,  
	// 	dataType:"json", 
	// 	success: function(data){
	// 		rolemenu=JSON.parse(data);
	// 		console.log(rolemenu);
	// 	},  
	// 	error: function(json){  
	// 	}  
	// }); 
	$.ajax({  
		url : domain,  
		datatype: "json",        
		async : false,  
		data :{},  
		success : function(result) {  
			menuId=result;
			console.log(result);
		}  
	 }); 
	return menuId;
};
/**
 * 判断当前节点是否应该显示
 */
function judgeExsit(node){
	var isExist=false;
	$.each(rolemenu,function(index,item){
		if((node.id+"")==(item.pid+"")||(node.id+"")==(item.id+"")){
			isExist=true;
			return isExist
		}
	});
	//console.log(isExist)
	return isExist;
}
function getQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
})(jQuery);
