var scene, renderer, camera, container, animation ,mixer, mesh;
var clock = new THREE.Clock();

function render() {

    requestAnimationFrame( render );
    
    if ( mixer !== null ) {

        var delta = clock.getDelta();
        mixer.update(delta);

    }

    renderer.render( scene, camera );

}

function onWindowResize() {

    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( container.offsetWidth, container.offsetHeight );

}

function setupScene( result, data ) {

    scene = new THREE.Scene();
    scene.add( new THREE.GridHelper( 10, 2.5 ) );

}

function setupLights() {

    var directionalLight = new THREE.DirectionalLight( 0xb8b8b8 );
    directionalLight.position.set(1, 1, 1).normalize();
    directionalLight.intensity = 1.0;
    scene.add( directionalLight );

    directionalLight = new THREE.DirectionalLight( 0xb8b8b8 );
    directionalLight.position.set(-1, 0.6, 0.5).normalize();
    directionalLight.intensity = 0.5;
    scene.add(directionalLight);

    directionalLight = new THREE.DirectionalLight();
    directionalLight.position.set(-0.3, 0.6, -0.8).normalize( 0xb8b8b8 );
    directionalLight.intensity = 0.45;
    scene.add(directionalLight);

}

function loadGeometry( data, url ) {

    var loader = new THREE.JSONLoader();
    var texturePath = THREE.Loader.prototype.extractUrlBase( url );
    data = loader.parse( data, texturePath );

    if ( data.materials === undefined ) {

        console.log('using default material');
        data.materials = [new THREE.MeshLambertMaterial( { color: 0xb8b8b8 } )];

    }

    var material = new THREE.MultiMaterial( data.materials );

    if ( data.geometry.animations !== undefined && data.geometry.animations.length > 0 ) {

        console.log( 'loading animation' );
        data.materials[ 0 ].skinning = true;
        mesh = new THREE.SkinnedMesh( data.geometry, material, false );

        mixer = new THREE.AnimationMixer( mesh );
        var randomAnimationIndex = THREE.Math.randInt( 0, mesh.geometry.animations.length - 1 );
        animation = mixer.clipAction( mesh.geometry.animations[ randomAnimationIndex ] );

    } else {

        console.warn( 'no animation found' );
    }

    setupScene();
    setupLights();
    scene.add( mesh );

    // the marine is huge, scale it down
    mesh.scale.setScalar(0.02);


    if ( animation != null ) {

        console.log( 'playing random animation "' + animation.getClip().name + '"' );
        animation.play();
    }

    render()
}

function loadData( data, url ) {

    if ( data.metadata.type === 'Geometry' ) {

        loadGeometry( data, url );

    } else {

        console.warn( url + 'is not a geomettry' );

    }

}

function init( url ) {

    container = document.createElement( 'div' );
    container.id = 'viewport';
    document.body.appendChild( container );

    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true  } );
    renderer.setSize( container.offsetWidth, container.offsetHeight );
    renderer.setClearColor( 0x000000, 0 );
    container.appendChild( renderer.domElement );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    var aspect = container.offsetWidth / container.offsetHeight;
    camera = new THREE.PerspectiveCamera( 50, aspect, 0.01, 50 );
    orbit = new THREE.OrbitControls( camera, container );
    orbit.addEventListener( 'change', render );
    camera.position.z = 5;
    camera.position.x = 5;
    camera.position.y = 5;
    var target = new THREE.Vector3( 0, 1, 0 );
    camera.lookAt( target );
    orbit.target = target;
    camera.updateProjectionMatrix();

    window.addEventListener( 'resize', onWindowResize, false );

	var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ( x ) {

        if ( xhr.readyState === xhr.DONE ) {

            if ( xhr.status === 200 || xhr.status === 0  ) {

                loadData( JSON.parse( xhr.responseText ), url );

            } else {

                console.error( 'could not load json ' + xhr.status );

            }

        }

    };
    xhr.open( 'GET', url, true );
    xhr.withCredentials = false;
    xhr.send( null );

}
