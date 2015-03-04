var Enemy = function (vector3Pos, geom, mate) {
	//console.log("new Enemy("+vector3Pos.x+", "+vector3Pos.y+", "+vector3Pos.z+")");
	THREE.Mesh.call(this, Enemy.geometry, Enemy.material );
	this.position.copy(vector3Pos);
	this.name = "Enemy";
	this.castShadow = true;
	this.receiveShadow = true;
	//console.log( this.name );
}

// static properties 
Enemy.geometry = new THREE.SphereGeometry(2, 32, 32);
Enemy.material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
Enemy.crashedMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
Enemy.type = "Enemy";
Enemy.name = "Enemy";

Enemy.prototype = Object.create( THREE.Mesh.prototype );
Enemy.prototype.constructor = Enemy;

Enemy.prototype.move = function () {

	//this.
	//this.

};
