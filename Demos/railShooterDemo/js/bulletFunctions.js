window.Game = window.Game || {};

//bullet mesh 
var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x333333});
var sphereGeo = new THREE.SphereGeometry(1, 6, 6);

//obj could be the player weapon's or enemy weapon's (in the future why not)
function createBullet(obj) {
    if (obj === undefined) {
        obj = Game.camera;
    }
    var sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
    sphere.position.set(obj.position.x, obj.position.y * 0.8, obj.position.z);
    //if (obj instanceof THREE.Camera) {
        var raycaster = new THREE.Raycaster();
         if(!Game.isdisplayedOn3D) {
                raycaster.setFromCamera( Game.mouse, Game.camera );
            }
            else
            {
            var direction = Game.camera.getWorldDirection();
                raycaster.set( Game.camera.position , direction );
            }
        sphere.ray = raycaster.ray;
    /*}
    else {
        var vector = cam.position.clone();
        sphere.ray = new THREE.Ray(
                obj.position,
                vector.subSelf(obj.position).normalize()
        );
    }*/
    sphere.owner = obj;
    //console.log(sphere.position);
    Game.bullets.push(sphere);
    Game.scene.add(sphere);
    return sphere;
}

function isCollide(bullet, indexTab) {
    for ( var i = 0 ; i < Game.enemies.length; i++ ) {
        if ( Game.enemies[i].position.distanceTo( bullet.position ) < Enemy.collisionRadius ) {
            console.log("colision");
            Game.removeEnemy( i );
            Game.bullets.splice(indexTab, 1);
            Game.scene.remove(bullet);
        }
    }
}

function isoutOfBorder(bullet, indexTab) {
    if( Math.abs(bullet.position.x) > Game.WidthTerrain/2 ||
        Math.abs(bullet.position.y) > Game.WidthTerrain/2 ||
        Math.abs(bullet.position.z) > Game.WidthTerrain/2
        ) {
        Game.bullets.splice(indexTab, 1);
        Game.scene.remove(bullet);
    }
}

function updateBulletsPosition() {
    var speed = 10;
    for(var i = 0; i < Game.bullets.length; i++) {
        b = Game.bullets[ i ];
        d = b.ray.direction;
        //update position
        b.translateX(speed * d.x);
        if(!Game.isdisplayedOn3D) {
            b.translateY(speed * d.y);
        }
        b.translateZ(speed * d.z);
        if( Game.bullets.length > 0 && Game.enemies.length > 0) {
            isCollide( Game.bullets[ i ], i);
            isoutOfBorder( Game.bullets[ i ], i);
        }
    }
}
