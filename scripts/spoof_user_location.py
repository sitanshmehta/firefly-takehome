import asyncio
import json
import random
import time
import websockets

lat = 43.6550
lon = -79.3800
magnitude = 0.00005

clients = set()

async def broadcast():
    global lat, lon
    while True:
        lat += (random.random() - 0.5) * magnitude
        lon += (random.random() - 0.5) * magnitude

        payload = {
            "coords": {
                "lat": lat,
                "long": lon,
                "accuracy": random.uniform(5, 15)
            },
            "time": int(time.time() * 1000)
        }

        message = json.dumps(payload)

        if clients:
            await asyncio.gather(*[client.send(message) for client in clients])
        print("Sent:", message)
        await asyncio.sleep(2)

async def handler(websocket):
    clients.add(websocket)
    try:
        await websocket.wait_closed()
    finally:
        clients.remove(websocket)

async def main():
    server = await websockets.serve(handler, "0.0.0.0", 8000)
    print("WebSocket server started on ws://localhost:8000")
    await broadcast()

if __name__ == "__main__":
    asyncio.run(main())
