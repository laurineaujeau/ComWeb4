import asyncio
import websockets

async def clientHandler(websocket,path):
    clients.append(websocket)
    while True:
        try:
            message = await websocket.recv()
            for client in clients:
                print("Serveur : "+message)
                await client.send(message)
        except websockets.ConnectionClosed:
            clients.remove(websocket)
            break


clients = []
server = websockets.serve(clientHandler, "localhost", 12345)
asyncio.get_event_loop().run_until_complete(server)
asyncio.get_event_loop().run_forever()
