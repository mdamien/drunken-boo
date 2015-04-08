var Weapon = function (vector3Pos, geom, mate) {
	console.log("new Weapon("+vector3Pos.x+", "+vector3Pos.y+", "+vector3Pos.z+")");
	//THREE.Object3D.call( this );
	THREE.Mesh.call(this, Weapon.geometry, Weapon.material );
	this.position.copy(vector3Pos);
	this.name = "Weapon";
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
		console.log("the mesh is loaded in the class Weapon");
		Weapon.weaponObject3D = object;
	} , 
	// Function called when downloads progress 
	function ( xhr ) { 
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded in Weapon Class' ); 
	}
);

// static properties 
Weapon.geometry = new THREE.SphereGeometry(2, 32, 32);
Weapon.material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
//Weapon.crashedMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
Weapon.type = "Weapon";
Weapon.name = "Weapon";
Weapon.collisionRadius = 2;

//Weapon.prototype = Object.create( THREE.Object3D.prototype );
Weapon.prototype = Object.create( THREE.Mesh.prototype );
Weapon.prototype.constructor = Weapon;

Weapon.prototype.move = function () {

	//this.
	//this.

};