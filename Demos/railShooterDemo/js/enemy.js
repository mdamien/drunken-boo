


var Enemy = function (vector3Pos, radius) {

	THREE.Mesh.call(this, geometry, material2);

}

// static variables 
Enemy.geometry = new THREE.SphereGeometry( this, radius, 32, 32);
Enemy.material2 = new THREE.MeshBasicMaterial( { color: 0xffffff } );


Enemy.prototype = Object.create( THREE.Mesh.prototype );

Enemy.prototype.move = function () {

	//this.
	//this.

};
