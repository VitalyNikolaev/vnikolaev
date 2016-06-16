/**
 * Created by nikolaev on 10.06.16.
 */
var THREE = require('three');
var SPE = require('shader-particle-engine');

var scene, camera, renderer, clock;
var emitter, particleGroup;
var particleCount = 900;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    particleCount = 70;   
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x4dc1f2);
    clock = new THREE.Clock();
    scene.fog = new THREE.Fog( renderer.getClearColor(), 20, 0 );
    document.body.appendChild( renderer.domElement );
}
function initParticles() {
    particleGroup = new SPE.Group({
        texture: {
            value: THREE.ImageUtils.loadTexture('assets/cloud.png')
        },
        blending: THREE.NormalBlending,
        fog: true,
        maxParticleCount:1500
    });
    emitter = new SPE.Emitter({
        particleCount: particleCount,
        maxAge: {
            value: 3,
        },
        position: {
            value: new THREE.Vector3( 0, 0, -50 ),
            spread: new THREE.Vector3( 150, 80, 150 )
        },
        velocity: {
            value: new THREE.Vector3( 0, 0, 25 )
        },
        wiggle: {
            spread: 20
        },
        size: {
            value: 100,
            spread: 30
        },
        opacity: {
            value: [ 0, 1, 0 ]
        },
        color: {
            value: new THREE.Color( 1, 1, 1 ),
            spread: new THREE.Color( 0.1, 0.1, 0.1 )
        },
        angle: {
            value: [ 0, Math.PI * 0.125 ]
        }
    });
    particleGroup.addEmitter( emitter );
    scene.add( particleGroup.mesh );

}
function animate() {
    requestAnimationFrame( animate );
    render( clock.getDelta() );
}
function render( dt ) {
    particleGroup.tick( dt );
    renderer.render( scene, camera );
}
window.addEventListener( 'resize', function() {
    var w = window.innerWidth,
        h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize( w, h );
}, false );
init();
initParticles();
setTimeout(animate, 0);

window.onload = function() { document.body.className = ''; };
window.ontouchmove = function() { return false; };
window.onorientationchange = function() { document.body.scrollTop = 0; };