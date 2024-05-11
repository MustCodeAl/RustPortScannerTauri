import {invoke} from "@tauri-apps/api/tauri";
import "./App.css";


function App() {

    async function startScan() {

        const ip = (document.getElementById("ip") as HTMLInputElement).value;

        const startPort = (document.getElementById("startPort") as HTMLInputElement).valueAsNumber;


        const endPort = (document.getElementById("endPort") as HTMLInputElement).valueAsNumber;


        for (let port = startPort; port <= endPort; port++) {

            invoke("scan_port", {ip, port}).then(isOpen => {
                const results = document.getElementById('results');
                if (isOpen) {
                    results!.innerHTML += `Port ${port} is open <br>`;
                }
            });

        }
        // learn more about tauri commands at https://tauri.app/v1/guides/features/command
    }

    return (
        <div className="container">
            <h1>Bolt's first Port Scanner</h1>
            <body>
            <input id={"ip"} type="text" placeholder="IP Address"/>
            <input id={"startPort"} type="number" placeholder="Start Port"/>
            <input id={"endPort"} type="number" placeholder="End Port"/>
            <button onClick={startScan}>Start Scan</button>


            <div id="results"></div>

            </body>

        </div>
    );
}


export default App;
