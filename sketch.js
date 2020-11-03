//Creating variables
var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var humanSprite,humanIMG, humanSprite2,humanIMG2;
var packageBody,ground,redside1,redside2,redbottom,redside1Sprite,redside2Sprite,redbottomSprite;

//Declaring the constants.
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

//preload function.
function preload() {
	//Loading images to four variables.
	helicopterIMG=loadImage("helicopter.png");
	packageIMG=loadImage("package.png");
	humanIMG = loadImage("human.png");
	humanIMG2 = loadImage("human.png");
}

//setup function.
function setup() {
	//Creating the canvas area.
	createCanvas(800, 700);
	//Setting rectMode as CENTER.
	rectMode(CENTER);
	
	//Creating a 2 sprites naming it as humanSprite and humanSprite2.
	humanSprite=createSprite(100,590,10,10);
	//Adding image to it.
	humanSprite.addImage(humanIMG)
	//Adjusting its size.
	humanSprite.scale=0.1

	humanSprite2=createSprite(670,590,10,10);
	//Adding image to it.
	humanSprite2.addImage(humanIMG2)
	//Adjusting its size.
	humanSprite2.scale=0.1

	//Creating a sprite named packageSprite.
	packageSprite=createSprite(50, 50, 10,10);
	//Adding image to it.
	packageSprite.addImage(packageIMG);
	//Adjusting its size.
	packageSprite.scale = 0.2;

	//Creating a sprite named helicopterSprite.
	helicopterSprite=createSprite(50, 130, 10,10);
	//Adding image to it.
	helicopterSprite.addImage(helicopterIMG);
	//Adjusting its size.
	helicopterSprite.scale = 0.8;

	//Creating a sprite named groundSprite.
	groundSprite=createSprite(width/2, height-35, width,10);
	//Giving white color to it.
	groundSprite.shapeColor=color(255);

	//Creating an Engine and storing it in the variable engine.
	engine = Engine.create();
	//Storing 'engine.world' in the variable world.
	world = engine.world;

	//Creating a circle body named packageBody.
	packageBody = Bodies.circle(50 , 130 , 8 , {restitution:0, isStatic:true});
	//Adding it to Matter.World.
	World.add(world, packageBody);

	//Creating a rectangle body named ground.
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
	//Adding it to Matter.World.
	World.add(world, ground);

	//Creating three sprites for the red box.
	//Giving red color to them.
	redside1Sprite = createSprite(290, 610, 20, 100);
	redside1Sprite.shapeColor=color("RED");

	redside2Sprite = createSprite(510,610,20,100);
	redside2Sprite.shapeColor=color("RED");

	redbottomSprite = createSprite(400,650,200,20);
	redbottomSprite.shapeColor=color("RED");

	//Creating three rectangle bodies for the red box.
	//Adding them to Matter.world.
	redbottom = Bodies.rectangle(400, 650, 200, 55, {isStatic:true});
	World.add(world,redbottom);

	redside1 = Bodies.rectangle(290, 610, 20, 100, {isStatic:true});
	World.add(world,redside1);

	redside2= Bodies.rectangle(510, 610, 20, 100, {isStatic:true});
	World.add(world,redside2);

	//Running the previously created engine.
	Engine.run(engine);
}

//draw function.
function draw() {
	//Setting rectMode as CENTER.
	rectMode(CENTER);
	//Setting background color as black.
	background(rgb(46,48,47));
	
	redbottomSprite.x = redbottom.position.x
	redbottomSprite.y = redbottom.position.y
	redside1Sprite.x = redside1.position.x
	redside1Sprite.y = redside1.position.y
	redside2Sprite.x = redside2.position.x
	redside2Sprite.y = redside2.position.y
	packageSprite.x= packageBody.position.x 
	packageSprite.y= packageBody.position.y 


	//Displaying text under certain conditions.

	if(packageSprite.isTouching(redbottomSprite)) {
			fill("white");
			textFont("segoe script");
			textStyle(BOLD);
			textSize(30);
			text("WELL DONE!", 280,310);
	}


	if(packageSprite.isTouching(groundSprite)) {
		fill("white");
		textFont("segoe script");
		textStyle(BOLD);
		textSize(30);
		text("YOU LOSE!", 290,300);
}

	fill("ORANGE");
    textSize(40);
    textStyle(BOLD);
    textFont("Arial");
	text("AKSHAY'S SUPPLY MISSION - 2 2020",50,80);


	fill("LIGHTGREEN");
    textSize(20);
    textStyle(BOLD);
    textFont("Arial");
	text("PRESS DOWN ARROW KEY ",10,380);

	fill("BLUE");
    textSize(20);
    textStyle(BOLD);
    textFont("Arial");
	text("TO DROP THE PACKAGE",10,410);

	fill("LIGHTGREEN");
    textSize(20);
    textStyle(BOLD);
    textFont("Arial");
	text("PRESS RIGHT ARROW KEY ",520,250);

	fill("BLUE");
    textSize(20);
    textStyle(BOLD);
    textFont("Arial");
	text("TO MOVE HELICOPTER RIGHT",500,280);

	fill("LIGHTGREEN");
    textSize(20);
    textStyle(BOLD);
    textFont("Arial");
	text("PRESS LEFT ARROW KEY ",520,410);

	fill("BLUE");
    textSize(20);
    textStyle(BOLD);
    textFont("Arial");
	text("TO MOVE HELICOPTER LEFT",500,440);

	//Displaying all sprites on the screen.
  	drawSprites();
}

//keyPressed function.
function keyPressed() {
	//Moving helicopterSprite towards left when Left arrow key is pressed and packageSprite's y position is less than 200.
	if (keyCode === LEFT_ARROW && packageSprite.y < 200) {
		helicopterSprite.x=helicopterSprite.x-30;    
		if(packageSprite.y < 200) {
			translation={x:-30,y:0}
			Matter.Body.translate(packageBody, translation)	
		}
	} 
	
	//Moving helicopterSprite towards right when Right arrow key is pressed and packageSprite's y position is less than 200.
	else if (keyCode === RIGHT_ARROW && packageSprite.y < 200) {
		helicopterSprite.x=helicopterSprite.x+30;
		if(packageSprite.y < 200) {
			translation={x:30,y:0}
			Matter.Body.translate(packageBody, translation)	
		}
	}

	//Making the packageBody fall on ground when Down arrow key is pressed and packageSprite's y is less than 200.
 	else if (keyCode === DOWN_ARROW && packageSprite.y < 200) {
    	Matter.Body.setStatic(packageBody, false);
  	}
}