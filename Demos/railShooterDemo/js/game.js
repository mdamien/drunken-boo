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
    //Game.camera.rotation.y = THREE.Math.degToRad(0);
   // Game.camera.lookAt(new THREE.Vector3(0,0,0));
    Game.scene.add(Game.camera);

    Game.renderer.shadowMapEnabled = true;
    Game.renderer.shadowMapSoft = true;

    Game.createTerrain();

    Game.PlayerSpeed = 20;

    Game.path = Game.calculatePath();
    Game.currentCheckpoint = 0;

    Game.camera.position.copy(Game.path[Game.currentCheckpoint]);

    // console.log(Game.camera.position);

    // for(var i=0; i<Game.path.length; i++)
    //     console.log(Game.path[i]);

/*    Game.controls;
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
*/
    function setOrientationControls(e) {
    if (!e.alpha) {
      return;
    }

/*        controls = new THREE.DeviceOrientationControls(Game.camera, true);
        controls.connect();
        controls.update();*/

        Game.element.addEventListener('click', Game.fullscreen, false);

        window.removeEventListener('deviceorientation', setOrientationControls, true);
      }
      window.addEventListener('deviceorientation', setOrientationControls, true);

      //demo taken from the threeJs repository
      Game.add_elements();

      window.addEventListener('resize', Game.resize, false);
      setTimeout(Game.resize, 1);   
}

Game.createTerrain = function()
{
    var terrainWidth = 1024;
    var boxWidth = 5;
    var boxHeight = 20;
    var density = 0.3;
    var planeGeometry = new THREE.PlaneGeometry(terrainWidth, terrainWidth);
    var material = new THREE.MeshPhongMaterial( { ambient: 0x333333, color: 0xffffff, specular: 0xffffff, shininess: 50 } );

    var terrainMesh = new THREE.Mesh(planeGeometry, material);

    terrainMesh.receiveShadow = true;

    terrainMesh.rotation.x = THREE.Math.degToRad(-90);
    terrainMesh.updateMatrix();

    for(var i=0; i<terrainWidth*terrainWidth*density/(100*boxWidth*boxWidth); i++)
    {
        var boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxWidth);
        var boxMaterial = new THREE.MeshPhongMaterial( { ambient: '#'+Math.floor(Math.random()*16777215).toString(16)
, color: 0xffffff, specular: 0xffffff, shininess: 50 } );

        var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

        boxMesh.position.x = terrainWidth/2 * ( 2.0 * Math.random() - 1.0 );
        boxMesh.position.z = terrainWidth/2 * ( 2.0 * Math.random() - 1.0 );
        boxMesh.position.y = boxHeight/2;

        boxMesh.castShadow = true;

        boxMesh.updateMatrix();

        boxMesh.matrixAutoUpdate = false;

        Game.scene.add(boxMesh);
    }

   // mesh.rotation. = ;

    terrainMesh.matrixAutoUpdate = false;

    Game.scene.add( terrainMesh );

    // console.log("terrain");
}

Game.calculatePath = function()
{
    var path = [];
    var checkpoints = 3;

    for(var i=0; i<checkpoints; i++)
        path.push(new THREE.Vector3( 0, 2, 256*i ));

    return path;
}

Game.add_elements = function ()
{
    var ambient = new THREE.AmbientLight( 0xffffff );
    ambient.color.setHSL( 0.1, 0.3, 0.4 );
    Game.scene.add( ambient );


    var dirLight = new THREE.DirectionalLight( 0xffffff, 0.200 );
    dirLight.position.set( 512, 1024, 0 );
    dirLight.color.setHSL( 0.1, 0.7, 1 );
    dirLight.target.position.set(0, 0, 0);
    dirLight.castShadow = true;
    //dirLight.shadowCameraVisible = true; // only for debugging

    Game.scene.add( dirLight );

    var dirLightLeft = new THREE.DirectionalLight( 0xffffff, 0.125 );
    dirLightLeft.position.set( -10, 0, 0 );
    dirLightLeft.color.setHSL( 0.1, 0.7, 1 );

    Game.scene.add( dirLightLeft );


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

    // if distance to the next checkpoint is shorter than distance to travel this tick 
    // then increment checkpoint

    var translateDistance = Game.PlayerSpeed*dt;

    Game.update.vectorMove = Game.update.vectorMove || new THREE.Vector3;

    if(Game.camera.position.distanceTo(Game.path[Game.currentCheckpoint]) < translateDistance)
    {
        if(Game.currentCheckpoint < Game.path.length-1)
            Game.currentCheckpoint++;
        else
            Game.currentCheckpoint=0;

        Game.update.vectorMove.subVectors(Game.path[Game.currentCheckpoint],Game.camera.position);
        // substract position vector of the camera from position vector of the checkpoint to get translation vector
        //console.log(Game.update.vectorMove);

        Game.camera.lookAt(Game.path[Game.currentCheckpoint]);
        console.log(Game.camera.rotation);
    }


    //Game.camera.translateOnAxis(Game.update.vectorMove.normalize(), translateDistance);
    Game.camera.translateZ(-translateDistance);

/*    if(Game.isdisplayedOn3D) {
        Game.controls.update(dt);
    }
    else {
        Game.controls.update(dt);
    }*/



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
