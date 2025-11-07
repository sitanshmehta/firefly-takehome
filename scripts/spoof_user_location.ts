import WebSocket, { WebSocketServer } from "ws";

interface Coordinates {
    lat: number;
    long: number;
    accuracy: number;
}

interface UserLocation {
    coords: Coordinates;
    time: number;
}

const wss = new WebSocketServer({ port: 8000 });

let long: -79.3800;
let lat: 43.6550

function rand_drift(val: number, magnitude: 0.00002){
    return val + (Math.random() - 0.5)*magnitude;
}

function broadcast(location: UserLocation){
    const msg = JSON.stringify(location);
    wss.clients.forEach((client) =>{
        if(client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    })
}

setInterval(() => {
  lat = rand_drift(lat);
  long = rand_drift(long);

  const payload: UserLocation = {
    coords: {
      lat,
      long,
      accuracy: Math.random() * 10 + 5, // meters
    },
    time: Date.now(),
  };

  broadcast(payload);
  console.log("Sent:", payload);
}, 2000); // every 2 seconds