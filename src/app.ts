import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, SceneLoader, PointLight, StandardMaterial, Color3 } from "@babylonjs/core";
import { GridMaterial } from '@babylonjs/materials';

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
        camera.upperBetaLimit = Math.PI/2;
        camera.lowerBetaLimit = 0;
        camera.upperRadiusLimit = 4;
        camera.lowerRadiusLimit = 4;
        
        // creating light
        var light: PointLight = new PointLight("light1", new Vector3(1000, 1000, 0), scene);

        // creating terrain
        var ground: Mesh = MeshBuilder.CreateGround("ground", { width: 100, height: 100 }, scene);

        var groundColor = new GridMaterial("grid")
        groundColor.majorUnitFrequency = 50;
        groundColor.majorUnitFrequency = 1;
        groundColor.mainColor = Color3.Green();
        ground.material = groundColor;
        ground.position.y = 0.1;

        // creating water (border)
        var water: Mesh = MeshBuilder.CreateGround("water", { width: 10000, height: 10000 }, scene);
        var waterColor = new StandardMaterial("groundcolor");
        waterColor.diffuseColor = Color3.Blue();
        water.material = waterColor;

        // adding player
        var player: Mesh = MeshBuilder.CreateCapsule("BEAN", {height: 1}, scene);
        player.position.y = 0.6;
        player.position.x = Math.random() //CONTINUE

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