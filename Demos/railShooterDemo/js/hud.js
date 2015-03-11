/*
//TODO generalise the data to make it reusable
var HUB = function (arraysData) {
	this.data = new Array();
	//copy the array content by value
	this.data = arraysData.slice();
} */
var originPos = [
	new THREE.Vector3( 0, 40, 0 ),
	new THREE.Vector3( 0, 120 , 0 ),
	new THREE.Vector3( 200 , 40 , 0 )
];


var HUD = function (gunS, enemy, score) {

	var canvas1 = document.createElement('canvas');
	var context1 = canvas1.getContext('2d');
	context1.font = "Bold 20px Arial";
	context1.fillStyle = "rgba(255,0,0,0.95)";
	
	this.data = new Array();
	this.data[ 0 ] = gunS;
	this.data[ 1 ] = enemy;
	this.data[ 2 ] = score;

	 for(var index = 0; index < this.data.length; index++) {
		context1.fillText( this.data[ index ], originPos[ index ].x, originPos[ index ].y );
	}

	var texture1 = new THREE.Texture(canvas1);
	var material1 = new THREE.MeshBasicMaterial( { map: texture1, side:THREE.DoubleSide } );
	material1.transparent = true;
    texture1.needsUpdate = true;
    this.mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(canvas1.width, canvas1.height),
        material1
    );
}

HUD.prototype.constructor = HUD;


HUD.prototype.addToParent  = function( parent ) {
	parent.add( this.mesh );
}

