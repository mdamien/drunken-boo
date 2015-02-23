var Enemy = function (vector3Pos, geom, mate) {
	console.log("new Enemy("+vector3Pos.x+", "+vector3Pos.y+", "+vector3Pos.z+")");
	THREE.Mesh.call(this, Enemy.geometry, Enemy.material );
	this.position.copy(vector3Pos);
	console.log( this.position );
}

// static properties 
Enemy.geometry = new THREE.SphereGeometry(2, 32, 32);
Enemy.material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
Enemy.castShadow = true;
Enemy.receiveShadow = true;
Enemy.type = "Enemy";

Enemy.prototype = Object.create( THREE.Mesh.prototype );
Enemy.prototype.constructor = Enemy;

Enemy.prototype.move = function () {

	//this.
	//this.

};
