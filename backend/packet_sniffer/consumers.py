from channels.consumer import AsyncConsumer

class PacketConsumer(AsyncConsumer):
    async def websocket_connect(self,event):
        print("connected",event)

        await self.send({"type": "websocket.accept",
                         })



        await self.send({"type":"websocket.send",
                         "text":0})





    async def websocket_receive(self,event):
        # when messages is received from websocket
        print("receive",event)



        await self.send({"type": "websocket.send",
                         "text":"Het"})




    async def websocket_disconnect(self, event):
        # when websocket disconnects
        print("disconnected", event)