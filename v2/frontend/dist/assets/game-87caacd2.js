(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function e(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=e(o);fetch(o.href,i)}})();var r=(n=>(n.UP="UP",n.DOWN="DOWN",n.LEFT="LEFT",n.RIGHT="RIGHT",n))(r||{});const g=n=>{switch(n){case"UP":return"DOWN";case"DOWN":return"UP";case"LEFT":return"RIGHT";case"RIGHT":return"LEFT"}},c={FRAME_HEIGHT:600,FRAME_WIDTH:400,BLOCK_SIZE:20};class a{constructor(t,e){this.x=t,this.y=e}static generateRandomPosition(){const t=Math.floor(Math.random()*(c.FRAME_WIDTH/c.BLOCK_SIZE)),e=Math.floor(Math.random()*(c.FRAME_HEIGHT/c.BLOCK_SIZE));return new a(t,e)}static from(t){return new a(t.x,t.y)}equals(t){return this.x===t.x&&this.y===t.y}}class u{constructor(t=a.generateRandomPosition()){this.position=new a(t.x,t.y)}getPosition(){return this.position}}class l{constructor(t,e){this.direction=t,this.position=e}getPosition(){return this.position}getDirection(){return this.direction}}class h{constructor(t,e){this.position=t,this.direction=e}getPosition(){return this.position}getDirection(){return this.direction}turnTo(t){this.direction=t}moveOneStep(){const t=c.FRAME_HEIGHT/c.BLOCK_SIZE,e=c.FRAME_WIDTH/c.BLOCK_SIZE,s=t-1,o=e-1;switch(this.direction){case r.UP:this.position.y===0?this.position.y=s:this.position.y-=1;break;case r.DOWN:this.position.y===s?this.position.y=0:this.position.y+=1;break;case r.LEFT:this.position.x===0?this.position.x=o:this.position.x-=1;break;case r.RIGHT:this.position.x===o?this.position.x=0:this.position.x+=1;break}}}class m{constructor(){this.items=[]}enqueue(t){this.items.push(t)}dequeue(){return this.items.shift()}asArray(){return this.items}}class p{constructor(t=3){this.body=[],this.directionChanges=new m,this.populateBody(t)}populateBody(t){for(let e=0;e<t;e++){const s=new h(new a(1,e+1),r.UP);this.body.push(s)}}appendBodyPart(){const t=this.getTail();let e;switch(t.getDirection()){case r.UP:e=new a(t.getPosition().x,t.getPosition().y+1);break;case r.DOWN:e=new a(t.getPosition().x,t.getPosition().y-1);break;case r.LEFT:e=new a(t.getPosition().x+1,t.getPosition().y);break;case r.RIGHT:e=new a(t.getPosition().x-1,t.getPosition().y);break}this.body.push(new h(e,t.getDirection()))}getBody(){return this.body}getHead(){return this.body[0]}getTail(){return this.body.at(-1)||new h(new a(0,0),r.UP)}getLength(){return this.body.length}getPositions(){return this.body.map(t=>t.getPosition())}shouldEatFood(t){return this.getHead().getPosition().equals(t)}eat(){this.appendBodyPart()}turnSnakeTo(t){const e=this.getHead();if(t===e.getDirection()||t===g(e.getDirection()))return;const s=a.from(e.getPosition()),o=new l(t,s);this.directionChanges.enqueue(o)}collisionHappened(){for(const[t,e]of Object.entries(this.body))if(parseInt(t)>0&&this.getHead().getPosition().equals(e.getPosition()))return!0;return!1}moveOneStep(){let t=!1;this.directionChanges.asArray().forEach(e=>{this.body.forEach((s,o,i)=>{e.getPosition().equals(s.getPosition())&&(s.turnTo(e.getDirection()),o===i.length-1&&(t=!0))})}),t&&this.directionChanges.dequeue(),this.body.forEach(e=>e.moveOneStep())}}class f{constructor(){this.food=new u,this.snake=new p,this.status={score:0,startTime:Date.now(),gameEnded:!1}}turnSnakeTo(t){this.snake.turnSnakeTo(t)}runCycle(){return this.snake.collisionHappened()&&(this.status.gameEnded=!0),this.snake.shouldEatFood(this.food.getPosition())&&(this.snake.eat(),this.food=new u,this.status.score+=1),this.snake.moveOneStep(),this.status}getSnakePositions(){return this.snake.getPositions()}getFoodPosition(){return this.food.getPosition()}}class y{constructor(t,e,s){this.window=t,this.document=e,this.context=s,this.game=new f,this.previousTimestamp=0,this.context.fillStyle="white",this.addKeyboardListeners()}start(){this.gameLoop()}gameLoop(t=0){const e=t-this.previousTimestamp;if(!this.previousTimestamp||e>=200){this.previousTimestamp=t;const s=this.game.runCycle();if(s.gameEnded)return this.gameOver(s);this.updateView(s);const{FRAME_WIDTH:o,FRAME_HEIGHT:i}=c;this.context.clearRect(0,0,o,i),this.drawFrame()}this.window.requestAnimationFrame(this.gameLoop.bind(this))}gameOver(t){}addKeyboardListeners(){const t=new Map([["ArrowUp",r.UP],["ArrowDown",r.DOWN],["ArrowLeft",r.LEFT],["ArrowRight",r.RIGHT]]);this.document.addEventListener("keydown",e=>{t.has(e.key)&&this.game.turnSnakeTo(t.get(e.key))})}drawBlock(t,e){const{BLOCK_SIZE:s}=c;this.context.fillRect(t*s,e*s,1*s,1*s)}drawFood({x:t,y:e}){this.drawBlock(t,e)}drawSnake(t){t.forEach(({x:e,y:s})=>{this.drawBlock(e,s)})}drawFrame(){const t=this.game.getSnakePositions(),e=this.game.getFoodPosition();this.drawFood(e),this.drawSnake(t)}formatElapsedTime(t){const e=d=>d<10?"0"+d.toString():d,s=e(t.getUTCHours()),o=e(t.getUTCMinutes()),i=e(t.getUTCSeconds());return`${s}:${o}:${i}`}updateView(t){const e=document.getElementById("score");e.innerText=t.score.toString();const s=document.getElementById("time"),o=new Date(Date.now()-t.startTime);s.innerText=this.formatElapsedTime(o)}}document.addEventListener("DOMContentLoaded",function(){const t=document.getElementById("game-canvas").getContext("2d");new y(window,document,t).start()});
