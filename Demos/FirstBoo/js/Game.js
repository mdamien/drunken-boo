window.Game = window.Game || {};

Game.init = function () {

    Game.clock = new THREE.Clock();
    Game.isdisplayedOn3D = false;
    Game.raycaster = new THREE.Raycaster();
    Game.mouse = new THREE.Vector2();
    Game.nbObject = 1;
    Game.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    Game.element = Game.renderer.domElement;
    Game.container = document.getElementById('example');
    Game.container.appendChild(Game.element);
    //instanciate a new stereoEffect even if it's not used afterward
    Game.effect = new THREE.StereoEffect(Game.renderer);
    Game.scene = new THREE.Scene();
    
    Game.camera;
    Game.controls;
    if(Game.isdisplayedOn3D){
        Game.camera = new THREE.PerspectiveCamera(90, 1, 0.01, 7000);
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
        Game.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 15000);
        Game.controls = new THREE.FlyControls( Game.camera );
        Game.controls.movementSpeed = 2500;
        Game.controls.domElement = Game.container;
        Game.controls.rollSpeed = Math.PI / 6;
        Game.controls.autoForward = false;
        Game.controls.dragToLook = false;
        

        window.addEventListener('mousemove', onMouseMove, true);
    }
    Game.camera.position.set(0, 10, 0);
    Game.scene.add(Game.camera);

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


      Game.showNbObject();
      window.addEventListener('resize', Game.resize, false);
      setTimeout(Game.resize, 1);	
      console.log(window.Game);
      console.log("end of init");

      //Game.showRay();
}

Game.remove = function ()
{
    //remove all the element 
    for(var element in Game.object) {
        Game.scene.remove( element );
        //Game.renderer.deallocateObject( element );
    }
    Game.camera.position.set(0, 10, 0);
    //add new elememnts
    Game.add_elements();
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
  var specialMaterial = new THREE.MeshPhongMaterial( { ambient: 0x330033, color: 0xff00ff, specular: 0xffffff, shininess: 50 } );

  for ( var i = 0; i < 40 ; i ++ ) {

    var mesh = new THREE.Mesh( cube, material);

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

    Game.addObjectCatchable( cube, specialMaterial);

    var ambient = new THREE.AmbientLight( 0xffffff );
    ambient.color.setHSL( 0.1, 0.3, 0.2 );
    Game.scene.add( ambient );


    var dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
    dirLight.position.set( 0, -1, 0 ).normalize();
    Game.scene.add( dirLight );

    dirLight.color.setHSL( 0.1, 0.7, 0.5 );
}

Game.addObjectCatchable = function ( geometry, material) {

  for( var i = 0; i < /*Game.nbObject*/ 1; i++) {
    var mesh = new THREE.Mesh( geometry, material );

    mesh.position.x = 8000 * ( 2.0 * Math.random() - 1.0 );
    mesh.position.y = 8000 * ( 2.0 * Math.random() - 1.0 );
    mesh.position.z = 8000 * ( 2.0 * Math.random() - 1.0 );

    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;

    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();

    mesh.name = "toCollect";

    Game.scene.add( mesh );
  }
 
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
   // console.log("resize");
}


Game.update = function (dt) 
{
	Game.resize();

    Game.camera.updateProjectionMatrix();

   // console.log(Game.mouse);

    Game.controls.update(dt);

    Game.showRay();

    Game.collission();

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

function onMouseMove( event ) {
    event.preventDefault();

    Game.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    Game.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    //console.log( "Mouse " + Game.mouse.x  + " " + Game.mouse.y );
}

Game.animate = function() {
 	requestAnimationFrame(Game.animate);
      if( Game.nbObject <= 0) {
        Game.remove();
        Game.nbObject = 1;
      }
      Game.update(Game.clock.getDelta());
      Game.render(Game.clock.getDelta());
	
}

Game.render = function () {
    if (Game.isdisplayedOn3D) {
        Game.effect.render(Game.scene, Game.camera);
    }
    else {
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

Game.catchBlock = function ( element ) {

    if(element.name == "toCollect") {
        console.log("test");
        Game.nbObject--;
        Game.showNbObject();
        Game.scene.remove( element );
    }
}

Game.showNbObject = function() {
    var dom = document.getElementById( "nbObject" );
    dom.appendChild.innerHTML += "<p>Number of object "+ Game.nbObject +"<p>";
}

Game.collission = function () {
    var center = new THREE.Vector2 (
            Game.container.offsetWidth,
            Game.container.offsetHeight
        );
    
    if( Game.isdisplayedOn3D ) {
        // the screen is divided in 2 parts
        center.x /= 2;
        center.y /= 2;
    }
    //otherwise the mouse is tracked
    else {
        center.x = Game.mouse.x;
        center.y = Game.mouse.y;
    }

    Game.raycaster.setFromCamera( Game.mouse, Game.camera );
    var intersects = Game.raycaster.intersectObjects( Game.scene.children);

    if(intersects.length > 0) {
        //console.log(Game.scene.children.length);
        Game.catchBlock(intersects[0].object);
    }
}

Game.showRay = function ( )
{
    Game.ray;
    if( Game.ray !== undefined)
    {
        Game.scene.remove( Game.ray );
    }
    //show raycast
    var material = new THREE.LineBasicMaterial( {color : 0x0000ff});
    var geometry = new THREE.Geometry();

    console.log("Showray");
    //console.log(Game.raycaster);

    /*geometry.vertices.push( new THREE.Vector3( Game.raycaster.ray.origin.x, 
                                               Game.raycaster.ray.origin.y,
                                               Game.raycaster.ray.origin.z 
                                            )
                        );

*/
   /* geometry.vertices.push( new THREE.Vector3( Game.raycaster.ray.origin.x + (Game.raycaster.ray.direction.x * 100000), 
                                               Game.raycaster.ray.origin.y + (Game.raycaster.ray.direction.y * 100000),
                                               Game.raycaster.ray.origin.z + (Game.raycaster.ray.direction.z * 100000) 
                                            )
                        );  */

    geometry.vertices.push( new THREE.Vector3( Game.mouse.x, Game.mouse.y, 0) );
    geometry.vertices.push( new THREE.Vector3( 100000, 0, 0 ) );
    Game.ray = new THREE.Line(geometry, material);
   // console.log(Game.ray);  
    Game.scene.add( Game.ray );
}

Game.reset = function () {
    Game.init();
}


//start the game
Game.init();
Game.animate();
