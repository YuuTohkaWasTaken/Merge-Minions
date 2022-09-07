import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, Mesh, Color3, StandardMaterial } from "@babylonjs/core";


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

        // adding player summoner mesh
        var playerSummoner: Mesh = MeshBuilder.CreateCapsule("player", { height: 2 }, lvlEditScene);
        var playerSummonerColor = new StandardMaterial("color", lvlEditScene);
        playerSummonerColor.diffuseColor = Color3.Blue();
        playerSummoner.material = playerSummonerColor;
        playerSummoner.material.alpha = 0.5;

        // current level content
        var level = {
            contents: ["player", "starterFloor"],
            player: {
                position: new Vector3(0, 1, 0),
                gravity: {
                    x: 0,
                    y: -1,
                    z: 0
                },
                velocities: {
                    x: 0,
                    y: 0,
                    z: 0
                },
            },
            starterFloor: {
                position: {
                    top: Vector3.Zero(),
                    bottom: new Vector3(0, -1, 0)
                },
                material: {
                    type: "color",
                    materialParameters: Color3.Gray()
                },
                type: "ground"
            }
        }

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