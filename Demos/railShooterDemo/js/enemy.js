
var Enemy = function (vector3Pos, radius) {

	var geometry = new THREE.SphereGeometry( this, radius, 32, 32);
	var material2 = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	THREE.Mesh.call(this, geometry, material2);

}

Enemy.prototype = Object.create( THREE.Mesh.prototype );

Enemy.prototype.move = function () {

	//this.
	//this.

};