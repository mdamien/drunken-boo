window.Game = window.Game || {};

Game.init = function () {
	Game.container = document.createElement( 'div' );
		document.body.appendChild( Game.container );

	Game.clock = new THREE.Clock();

	// Game.camera

	Game.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 15000 );
	Game.camera.position.z = 250;

	Game.controls = new THREE.FlyControls( Game.camera );

	Game.controls.movementSpeed = 2500;
	Game.controls.domElement = Game.container;
	Game.controls.rollSpeed = Math.PI / 6;
	Game.controls.autoForward = false;
	Game.controls.dragToLook = false

	// Game.scene

	Game.scene = new THREE.Scene();
	Game.scene.fog = new THREE.Fog( 0x000000, 3500, 15000 );
	Game.scene.fog.color.setHSL( 0.51, 0.4, 0.01 );

	// world

	var s = 250;

	var cube = new THREE.BoxGeometry( s, s, s );
	var material = new THREE.MeshPhongMaterial( { ambient: 0x333333, color: 0xffffff, specular: 0xffffff, shininess: 50 } );


	for ( var i = 0; i < 3000; i ++ ) {

		var mesh = new THREE.Mesh( cube, material );

		mesh.position.x = 8000 * ( 2.0 * Math.random() - 1.0 );
		mesh.position.y = 8000 * ( 2.0 * Math.random() - 1.0 );
		mesh.position.z = 8000 * ( 2.0 * Math.random() - 1.0 );

		mesh.rotation.x = Math.random() * Math.PI;
		mesh.rotation.y = Math.random() * Math.PI;
		mesh.rotation.z = Math.random() * Math.PI;

		mesh.matrixAutoUpdate = false;
		mesh.updateMatrix();

		Game.scene.add( mesh );

	}


	// lights

	var ambient = new THREE.AmbientLight( 0xffffff );
	ambient.color.setHSL( 0.1, 0.3, 0.2 );
	Game.scene.add( ambient );


	var dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
	dirLight.position.set( 0, -1, 0 ).normalize();
	Game.scene.add( dirLight );

	dirLight.color.setHSL( 0.1, 0.7, 0.5 );

	// lens flares

	Game.textureFlare0 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare0.png" );
	Game.textureFlare2 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare2.png" );
	Game.textureFlare3 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare3.png" );

	this.addLight( 0.55, 0.9, 0.5, 5000, 0, -1000 );
	this.addLight( 0.08, 0.8, 0.5,    0, 0, -1000 );
	this.addLight( 0.995, 0.5, 0.9, 5000, 5000, -1000 );



	// Game.renderer

	Game.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	Game.renderer.setClearColor( Game.scene.fog.color );
	Game.renderer.setPixelRatio( window.devicePixelRatio );
	Game.renderer.setSize( window.innerWidth, window.innerHeight );
	Game.container.appendChild( Game.renderer.domElement );

	//

	Game.renderer.gammaInput = true;
	Game.renderer.gammaOutput = true;

	// Game.stats

	Game.stats = new Stats();
	Game.container.appendChild( Game.stats.domElement );

	// events

	window.addEventListener( 'resize', Game.onWindowResize, false );
}

Game.addLight = function ( h, s, l, x, y, z ) {

	var light = new THREE.PointLight( 0xffffff, 1.5, 4500 );
	light.color.setHSL( h, s, l );
	light.position.set( x, y, z );
	Game.scene.add( light );

	var flareColor = new THREE.Color( 0xffffff );
	flareColor.setHSL( h, s, l + 0.5 );

	var lensFlare = new THREE.LensFlare( Game.textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor );

	lensFlare.add( Game.textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	lensFlare.add( Game.textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	lensFlare.add( Game.textureFlare2, 512, 0.0, THREE.AdditiveBlending );

	lensFlare.add( Game.textureFlare3, 60, 0.6, THREE.AdditiveBlending );
	lensFlare.add( Game.textureFlare3, 70, 0.7, THREE.AdditiveBlending );
	lensFlare.add( Game.textureFlare3, 120, 0.9, THREE.AdditiveBlending );
	lensFlare.add( Game.textureFlare3, 70, 1.0, THREE.AdditiveBlending );

	lensFlare.customUpdateCallback = Game.lensFlareUpdateCallback;
	lensFlare.position.copy( light.position );

	Game.scene.add( lensFlare );

}

Game.lensFlareUpdateCallback = function (object) {
	var f, fl = object.lensFlares.length;
	var flare;
	var vecX = -object.positionScreen.x * 2;
	var vecY = -object.positionScreen.y * 2;


	for( f = 0; f < fl; f++ ) {

		   flare = object.lensFlares[ f ];

		   flare.x = object.positionScreen.x + vecX * flare.distance;
		   flare.y = object.positionScreen.y + vecY * flare.distance;

		   flare.rotation = 0;

	}

	object.lensFlares[ 2 ].y += 0.025;
	object.lensFlares[ 3 ].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad( 45 );
}
				

//

Game.onWindowResize = function( event ) {

	Game.renderer.setSize( window.innerWidth, window.innerHeight );

	Game.camera.aspect = window.innerWidth / window.innerHeight;
	Game.camera.updateProjectionMatrix();

}

//

Game.animate = function() {

	requestAnimationFrame( Game.animate );

	Game.render();
	Game.stats.update();

}

Game.render = function () {

	var delta = Game.clock.getDelta();

	Game.controls.update( delta );
	Game.renderer.render( Game.scene, Game.camera );

}


//start the game
Game.init();
Game.animate();
