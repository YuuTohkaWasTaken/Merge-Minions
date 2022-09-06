import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, SceneLoader, PointLight, StandardMaterial, Color3, AmmoJSPlugin, PhysicsImpostor, OimoJSPlugin, CannonJSPlugin } from "@babylonjs/core";
import * as CANNON from 'cannon';

class App {
    constructor() {
        // create the canvas html element and attach it to the webpage
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        // initialize babylon scene and engine
        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);

        // creating camera
        var camera: ArcRotateCamera = new ArcRotateCamera("Camera", 0, Math.PI / 4, 3, new Vector3(0, 1, 0), scene);
        camera.attachControl(canvas, true);
        
        // creating light
        var light: PointLight = new PointLight("light1", new Vector3(1000, 1000, 0), scene);

        // creating ground
        var ground: Mesh = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
    }
}
new App();