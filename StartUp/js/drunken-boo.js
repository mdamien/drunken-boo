window.Game = window.Game || {};

Game.add_element = function ()
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
}

Game.init = function () {
	  Game.clock = new THREE.Clock();

	  Game.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      Game.element = Game.renderer.domElement;
      Game.container = document.getElementById('example');
      Game.container.appendChild(Game.element);

      Game.effect = new THREE.StereoEffect(Game.renderer);

      Game.scene = new THREE.Scene();

      Game.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 15000);
      Game.camera.position.set(0, 10, 0);
      Game.scene.add(Game.camera);

      Game.controls = new THREE.OrbitControls(Game.camera, Game.element);
      Game.controls.rotateUp(Math.PI / 4);
      Game.controls.target.set(
        Game.camera.position.x + 0.1,
        Game.camera.position.y,
        Game.camera.position.z
      );
      Game.controls.noZoom = true;
      Game.controls.noPan = true;

      
/*
      Game.controls2 = new THREE.FlyControls( Game.camera );

      controls2.movementSpeed = 2500;
      controls2.domElement = Game.container;
      controls2.rollSpeed = Math.PI / 6;
      controls2.autoForward = false;
      controls2.dragToLook = false
*/

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

      Game.add_element();

      window.addEventListener('resize', Game.resize, false);
      setTimeout(Game.resize, 1);	
}

Game.addLight = function ( h, s, l, x, y, z ) {

	

}

Game.resize = function ()
{
	var width = Game.container.offsetWidth;
	var height = Game.container.offsetHeight;

	Game.camera.aspect = width / height;
	Game.camera.updateProjectionMatrix();

	Game.renderer.setSize(width, height);
	Game.effect.setSize(width, height);
}


Game.update = function (dt) 
{
	Game.resize();

    Game.camera.updateProjectionMatrix();

    Game.controls.update(dt);

    //controls2.update(dt);

    //Game.camera.position.x += dt*100;
}

Game.onWindowResize = function( event ) {
	 var width = Game.container.offsetWidth;
      var height = Game.container.offsetHeight;

      Game.camera.aspect = width / height;
      Game.camera.updateProjectionMatrix();

      Game.renderer.setSize(width, height);
      Game.effect.setSize(width, height);
}

//

Game.animate = function() {
 	requestAnimationFrame(Game.animate);
      Game.update(Game.clock.getDelta());
      Game.render(Game.clock.getDelta());
	
}

Game.render = function () {
  Game.effect.render(Game.scene, Game.camera);
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
