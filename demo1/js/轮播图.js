$(function(){
	
	var $container=$('#container')
	var $list=$('#list')
	var $spans=$('#posintsDiv>span')
	var $prev=$('#prev')
	var $next=$('#next')
	var page_width= 600
	var time=400
	var item_time=10
	var cont=$spans.length
	var index=0
	var targetIndex=0
	var  running=false
	
	$prev.click(function(){
		nextPage(false)
	})
	$next.click(function(){
		nextPage(true)
	})
	
	var intervalId=setInterval(function(){
		nextPage(true)
	},3000)
	
	$container.hover(function(){
		clearInterval(intervalId)
	},function(){
		intervalId=setInterval(function(){
			nextPage(true)
		},3000)
	})
	
	$spans.click(function(){
		var targetIndex=$(this).index()
		
		if(targetIndex!=index){
			nextPage(targetIndex)
		}
		
	})
	
	
	
	function nextPage(flag){
		
		if(running){
			return     //为true  直接结束
		}
		running=true   //开始翻页
		
		var curren=$list.position().left
		
		if(typeof flag==='boolean'){
			var offset=flag? -page_width:page_width
		}else{
			offset=-(flag-index)*page_width  //index：当前页  flag：被点击页
		}
		
		var item_offset=offset/(time/item_time)
		var traget=offset+curren
		
		var intervalId=setInterval(function(){
			curren+= item_offset
			
			if(curren===traget){
				clearInterval(intervalId)
				
				running=false  //标识停止翻页
				
				
				if(curren===-(cont+1)*page_width){
					curren=-page_width
				}else if(curren===0){
					curren=-cont*page_width
				}
				
			}
			$list.css('left',curren)
		},item_time)
		
		updatePoins(flag)
	
	}
	
	
	function updatePoins(flag){
			
			if(typeof flag === 'boolean'){
				if(flag){
					targetIndex=index+1
					if(targetIndex===cont){//右边的 1.jpg
						targetIndex=0
					}
				}else{
					targetIndex=index-1
					if(targetIndex===-1){  //左边的  5.jpg
						targetIndex=cont-1
					}
				}
			}else{
				targetIndex=flag
			}
			
			
			
			
			/*$spans.eq(index).removeClass('on')
			$spans.eq(targetIndex).addClass('on')*/
			/*$spans[index].className=' '*/
			$spans.filter('[index]').removeClass('on')
			$spans[targetIndex].className='on'
			
			
			index=targetIndex
		}
	
	
	
	
	
	
	
	
	
	
	
	
})
