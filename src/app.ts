import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, Mesh, Color3, StandardMaterial, UniversalCamera } from "@babylonjs/core";


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
            1) add shape builder *CURRENT
            2) add buttons
            3) add portals
            4) add wind
            5) add improper shapes
            6) add gravity walls
        */

        // adding camera
        var lvlEditorCam: UniversalCamera = new UniversalCamera("camera", new Vector3(0, 3, -3), lvlEditScene);
        lvlEditorCam.attachControl(canvas, true);
        lvlEditorCam.target = Vector3.Zero();
        
        // adding ambient light to the level editor
        var ambientLight: HemisphericLight = new HemisphericLight("ambient light", new Vector3(0, 0, 0), lvlEditScene);
        ambientLight.specular = new Color3(0, 0, 0);

        // adding player summoner mesh
        var playerSummoner: Mesh = MeshBuilder.CreateCapsule("player", { height: 1 }, lvlEditScene);
        playerSummoner.position.y = 0.5;
        var playerSummonerColor = new StandardMaterial("color", lvlEditScene);
        playerSummonerColor.diffuseColor = Color3.Blue();
        playerSummoner.material = playerSummonerColor;
        playerSummoner.material.alpha = 0.5;

        // adding starter floor
        var starterFloor: Mesh = MeshBuilder.CreateBox("floor", {height: 1, width: 3, depth: 3}, lvlEditScene);
        starterFloor.position.y = -0.5;

        // current level content
        var level = {
            contents: ["player", "starterFloor"],
            player: {
                position: new Vector3(0, 0.5, 0),
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
                position: new Vector3(0, -0.5, 0),
                material: {
                    type: "color",
                    materialParameters: Color3.Gray()
                },
                dimensions: {
                    width: 3,
                    height: 1,
                    depth: 3
                },
                type: "ground"
            }
        }

        // camera movement, level editing, etc.
        window.addEventListener("keydown", (ev) => {
            if (ev.key == "w") {
                
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            lvlEditScene.render();
        });
    }
}
new App();