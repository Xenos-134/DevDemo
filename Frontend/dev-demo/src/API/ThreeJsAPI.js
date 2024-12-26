//ThreeJs imports
import * as THREE from 'three'; 
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import MODEL from '../static/iphone_16_pro_max.glb'
import MAP from '../static/studio_small_03.jpg'

export default class ThreeJsApi {    
    static scene = null;
    static camera = null;
    static renderer = null;
    static loader = null;
    static controls = null;
    static mesh = null;
    static textureLoader = null;



    static init(div_id) {
        this.loader = new GLTFLoader();
        this.scene = new THREE.Scene();
        //scene.background = new THREE.Color( "transparent" );
        this.camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 ); 
        this.camera.position.set(10, 30, 100);
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth*0.40, window.innerHeight*0.60 );
        document.getElementById(div_id).appendChild(this.renderer.domElement)

        var light = new THREE.DirectionalLight(0x404040, 50);
        this.scene.add( light );

        /*
        var dirLight = new THREE.DirectionalLight( 0xffffff );
        dirLight.position.set(10, 0, 0);
        scene.add( dirLight );
        */

        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.enableZoom = false;

        this.textureLoader = new THREE.TextureLoader();
        var texture = this.textureLoader.load(MAP);
        texture.mapping = THREE.EquirectangularReflectionMapping;

        this.loader.load(MODEL, function(gltf) {
            ThreeJsApi.mesh = gltf.scene.children[ 0 ];
            let scaleFactor = 60;
            ThreeJsApi.mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
            ThreeJsApi.mesh.traverse((node) => {
                if (node.isMesh) node.material.envMap = texture;
                });
                ThreeJsApi.mesh.rotation.z = -Math.PI/180 * 210;
                ThreeJsApi.mesh.rotation.y = -Math.PI/180 * 10;
            ThreeJsApi.scene.add(ThreeJsApi.mesh);

        }, undefined, function(error) {
            console.error(error);
        });

        function animate() {
            if(ThreeJsApi.mesh) {
                ThreeJsApi.mesh.rotation.z -= 0.005;
            }

            ThreeJsApi.renderer.render(ThreeJsApi.scene, ThreeJsApi.camera);
        }

        this.renderer.setAnimationLoop(animate);
        }      
    }
    
    