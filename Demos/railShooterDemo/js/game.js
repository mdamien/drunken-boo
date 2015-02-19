window.Game = window.Game || {};

Game.init = function () {
    Game.clock = new THREE.Clock();
    Game.isdisplayedOn3D = false;

    Game.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    Game.element = Game.renderer.domElement;
    Game.container = document.getElementById('example');
    Game.container.appendChild(Game.element);

    //instanciate a new stereoEffect even if it's not used afterward
    Game.effect = new THREE.StereoEffect(Game.renderer);
    Game.scene = new THREE.Scene();

    Game.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 15000);
    Game.camera.position.set(0, 10, 0);
    Game.scene.add(Game.camera);

    Game.controls;
    if(Game.isdisplayedOn3D){
        Game.controls = new THREE.OrbitControls(Game.camera, Game.element);
        Game.controls.rotateUp(Math.PI / 4);
        Game.controls.target.set(
            Game.camera.position.x + 0.1,
            Game.camera.position.y,
            Game.camera.position.z
        );
        Game.controls.noZoom = true;
        Game.controls.noPan = true;
    }
    else
    {
        Game.controls = new THREE.FlyControls( Game.camera );
        Game.controls.movementSpeed = 2500;
        Game.controls.domElement = Game.container;
        Game.controls.rollSpeed = Math.PI / 6;
        Game.controls.autoForward = false;
        Game.controls.dragToLook = false
    }

    function setOrientationControls(e) {
    if (!e.alpha) {
      return;
    }

        controls = new THREE.DeviceOrientationControls(Game.camera, true);
        controls.connect();
        controls.update();

        Game.element.addEventListener('click', Game.fullscreen, false);

        window.removeEventListener('deviceorientation', setOrientationControls, true);
      }
      window.addEventListener('deviceorientation', setOrientationControls, true);

      //demo taken from the threeJs repository
      Game.add_elements();

      window.addEventListener('resize', Game.resize, false);
      setTimeout(Game.resize, 1);	
}

Game.add_elements = function ()
{
  var ambient = new THREE.AmbientLight( 0xffffff );
  ambient.color.setHSL( 0.1, 0.3, 0.2 );
  Game.scene.add( ambient );


  var dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
  dirLight.position.set( 0, -1, 0 ).normalize();
  Game.scene.add( dirLight );

  dirLight.color.setHSL( 0.1, 0.7, 0.5 );

  var s = 250;

  var cube = new THREE.BoxGeometry( s, s, s );
  var material = new THREE.MeshPhongMaterial( { ambient: 0x333333, color: 0xffffff, specular: 0xffffff, shininess: 50 } );


  for ( var i = 0; i < 40; i ++ ) {

    var mesh = new THREE.Mesh( cube, material );
    mesh.position.x = 8000 * ( 2.0 * Math.random() - 1.0 );
    mesh.position.y = 8000 * ( 2.0 * Math.random() - 1.0 );
    mesh.position.z = 8000 * ( 2.0 * Math.random() - 1.0 );

    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;

    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();

    //Game.scene.add( mesh );
    Game.scene.add( mesh );
  }

var geometry = new THREE.SphereGeometry( 5, 32, 32);
var material2 = new THREE.MeshBasicMaterial( { color: 0xffffff } );


  for ( var i = 0; i < 1000; i ++ ) {

    sphere = new THREE.Mesh( geometry, material2);
    sphere.position.x = 8000 * ( 2.0 * Math.random() - 1.0 );
    sphere.position.y = 8000 * ( 2.0 * Math.random() - 1.0 );
    sphere.position.z = 8000 * ( 2.0 * Math.random() - 1.0 );
    
    Game.scene.add( sphere );
  }

    var ambient = new THREE.AmbientLight( 0xffffff );
    ambient.color.setHSL( 0.1, 0.3, 0.2 );
    Game.scene.add( ambient );


    var dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
    dirLight.position.set( 0, -1, 0 ).normalize();
    Game.scene.add( dirLight );

    dirLight.color.setHSL( 0.1, 0.7, 0.5 );

    /*Game.textureFlare0 = THREE.ImageUtils.loadTexture( "textures/lensflare0.png" );
    Game.textureFlare2 = THREE.ImageUtils.loadTexture( "textures/lensflare2.png" );
    Game.textureFlare3 = THREE.ImageUtils.loadTexture( "textures/lensflare3.png" );

    this.addLight( 0.55, 0.9, 0.5, 5000, 0, -1000 );
    this.addLight( 0.08, 0.8, 0.5,    0, 0, -1000 );
    this.addLight( 0.995, 0.5, 0.9, 5000, 5000, -1000 );*/
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

Game.resize = function ()
{
	var width = Game.container.offsetWidth;
	var height = Game.container.offsetHeight;

	Game.camera.aspect = width / height;
	Game.camera.updateProjectionMatrix();

	Game.renderer.setSize(width, height);
    if(Game.isdisplayedOn3D) {
	   Game.effect.setSize(width, height);
    }
}


Game.update = function (dt) 
{
	Game.resize();

    Game.camera.updateProjectionMatrix();

    if(Game.isdisplayedOn3D) {
        Game.controls.update(dt);
    }
    else {
        Game.controls.update(dt);
    }



    //Game.camera.position.x += dt*100;
}

Game.onWindowResize = function( event ) {
	var width = Game.container.offsetWidth;
    var height = Game.container.offsetHeight;

    Game.camera.aspect = width / height;
    Game.camera.updateProjectionMatrix();

    Game.renderer.setSize(width, height);
    if(Game.isdisplayedOn3D) {
        Game.effect.setSize(width, height);
    }
}

//

Game.animate = function() {
 	requestAnimationFrame(Game.animate);
      Game.update(Game.clock.getDelta());
      Game.render(Game.clock.getDelta());
	
}

Game.render = function () {
    if (Game.isdisplayedOn3D) {
        Game.effect.render(Game.scene, Game.camera);
    }
    else
    {
        Game.renderer.render(Game.scene, Game.camera);
    }
}

Game.fullscreen = function () {
 if (Game.container.requestFullscreen) {
    Game.container.requestFullscreen();
  } else if (Game.container.msRequestFullscreen) {
    Game.container.msRequestFullscreen();
  } else if (Game.container.mozRequestFullScreen) {
    Game.container.mozRequestFullScreen();
  } else if (Game.container.webkitRequestFullscreen) {
    Game.container.webkitRequestFullscreen();
  }
}


//start the game
Game.init();
Game.animate();
