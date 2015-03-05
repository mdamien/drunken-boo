var Enemy = function (vector3Pos, geom, mate) {
	//console.log("new Enemy("+vector3Pos.x+", "+vector3Pos.y+", "+vector3Pos.z+")");
	THREE.Object3D.call( this );

	this.add(Enemy.creatureObject3D.clone());

	this.position.copy(vector3Pos);
	this.name = "Enemy";
	this.castShadow = true;
	this.receiveShadow = true;
	// console.log( this );
}

// instantiate a loader 
var loader = new THREE.OBJMTLLoader(); 

// load a resource 
loader.load( 
    // resource URL 
    "3dModels/one-eyed-monster/Creature.obj",
    "3dModels/one-eyed-monster/Creature.mtl",

    // Function when resource is loaded 
	function ( object ) { 

		Enemy.creatureObject3D = object;
		console.log(object);

	} , 
	// Function called when downloads progress 
	function ( xhr ) { 
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' ); 
	}
);

// static properties 
 // Enemy.geometry = new THREE.SphereGeometry(2, 32, 32);
 // Enemy.material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
Enemy.crashedMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
Enemy.type = "Enemy";
Enemy.name = "Enemy";
Enemy.collisionRadius = 2;

Enemy.prototype = Object.create( THREE.Object3D.prototype );
Enemy.prototype.constructor = Enemy;

Enemy.prototype.move = function () {

	//this.
	//this.

};
