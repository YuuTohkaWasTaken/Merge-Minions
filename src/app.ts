import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, Mesh, Color3 } from "@babylonjs/core";


class App {
    constructor() {
        // create the canvas html element and attach it to the webpage
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        // defining default engine and scenes
        var engine = new Engine(canvas, true);
        var lvlEditScene = new Scene(engine); // level editor
        var lvlTestScene = new Scene(engine); // level test
        var lvlPlayScene = new Scene(engine); // level play

        // creating level editor
        /*
        todo:
            1) add rectangle builder 
            2) add buttons
            3) add portals
            4) add wind
            5) add improper shapes
            6) create default level creator *CURRENT
        */

        // adding camera
        var camera: ArcRotateCamera = new ArcRotateCamera("Camera", 0, Math.PI / 4, 3, new Vector3(0, 0, 0), lvlEditScene);
        camera.attachControl(canvas, true);
        
        // adding ambient light to the level editor
        var ambientLight: HemisphericLight = new HemisphericLight("ambient light", new Vector3(0, 0, 0), lvlEditScene);
        ambientLight.specular = new Color3(0, 0, 0);

        // adding player mesh

        // current level content
        var level

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (lvlEditScene.debugLayer.isVisible()) {
                    lvlEditScene.debugLayer.hide();
                } else {
                    lvlEditScene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            lvlEditScene.render();
        });
    }
}
new App();