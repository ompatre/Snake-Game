var canvas,ctx;
var width=10;
var head=[20,0];
var array=[
		[0,0],
		[10,0],
		[20,0],
		];
var length=3;

var food=new Food(Math.ceil((490*Math.random())/10)*10,Math.ceil((490*Math.random())/10)*10);

var	isRight=true,isLeft=false,isUp=false,isDown=false;

function Food(x,y){
	this.x=x;
	this.y=y;
}

function init(){
	window.addEventListener("keydown",doKeyDown,false);
	canvas=document.getElementById("canvas");
	ctx=canvas.getContext("2d");
	document.getElementById("score").innerHTML=0;
	timer=setInterval(play, 100);
	return timer;
}

function display(value,index,array){
	ctx.fillRect(value[0],value[1],width,width);
}

function play(){
	var snake=document.getElementById("snake");
	ctx.drawImage(snake,0, 0, canvas.width, canvas.height);   	

	ctx.fillStyle="black";
	array.forEach(display);

	if(head[0]==food.x && head[1]==food.y){
		food.x=Math.ceil((490*Math.random())/10)*10;
		food.y=Math.ceil((490*Math.random())/10)*10;

		tail=array[0]
		nextTail=array[1]
		var newTail;
		if(nextTail[0]==tail[0]+width){
			newTail=[tail[0]-width,tail[1]]
		}		
		if(nextTail[0]==tail[0]-width){
			newTail=[tail[0]+width,tail[1]]
		}
		if(nextTail[1]==tail[1]+width){
			newTail=[tail[0],tail[1]-width]
		}		
		if(nextTail[1]==tail[1]-width){
			newTail=[tail[0],tail[1]+width]
		}
		array.splice(0,0,newTail);	
		length+=1;	
		document.getElementById("score").innerHTML=length-3;
	}


	ctx.fillStyle="red";
	ctx.fillRect(food.x,food.y,width,width);

	if(isRight){
		array.shift();
		head=[head[0]+width,head[1]];
		array.push(head);
	}

	if(isLeft){
		array.shift();
		head=[head[0]-width,head[1]];
		array.push(head);	
	}

	if(isUp){
		array.shift();
		head=[head[0],head[1]-width];
		array.push(head);
	}

	if(isDown){
		array.shift();
		head=[head[0],head[1]+width];
		array.push(head);
	}

	for(i=0;i<length-1;i++){
		if((array[i][0]==head[0]) && (array[i][1]==head[1])){
	  		clearTimeout(timer);
			alert("Game Over");			
		}
	}

	if(head[0]<-10 || head[0]>canvas.width){
	  	clearTimeout(timer);
		alert("Game Over");		
	}
	if(head[1]<-10 || head[1]>canvas.height){
	  	clearTimeout(timer);
		alert("Game Over");
	}

}

function doKeyDown(e){

	if(!isRight && e.keyCode==37){
		isLeft=true;
		isDown=false;
		isUp=false;
		isRight=false;
  	}

  	if(!isDown && e.keyCode==38){
   		isLeft=false;
		isDown=false;
		isUp=true;
		isRight=false;	
	}

	if(!isLeft && e.keyCode==39){
		isLeft=false;
		isDown=false;
		isUp=false;
		isRight=true;
  	}

	if(!isUp && e.keyCode==40){
    	isLeft=false;
		isDown=true;
		isUp=false;
		isRight=false;
	}
}

