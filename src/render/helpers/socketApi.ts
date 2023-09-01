import { RtMessageDTO } from "@fluyappgo/commons";
//import AsyncStorage from '@react-native-community/async-storage';
//import { Alert } from "react-native";

const io = require('socket.io-client')

const SocketApi = (url: string) => {

    //const token = `Bearer ${AsyncStorage.getItem('userToken')}`;
    const socket = io.connect(url,
        {
            //auth: { token },
            path: "/socket/socket.io",
            reconnect: true,
            transports: ["websocket"],
            upgrade: false,
            forceNew: true

        })


    function message(onMessageReceived: any) {
        socket.on('message', onMessageReceived)
    }

    function unregisterHandler() {
        socket.off('message');
        socket.off('counter');
        socket.off('done');
        socket.off('subscribe');
        socket.disconnect();
    }

    socket.on('error', function () {
        //location.reload()
        //Alert.alert(`ERROR EN WS`)
    })


    socket.on('connect_error', function () {
        //Alert.alert(`ERROR EN CONNECT ERROR`)
        console.log('connect_error')
        //location.reload()
    })

    function disconnect(customFunc: Function) {
        socket.on("disconnect", customFunc);
    }

    socket.on('reconnect', function () {
        //location.reload()
        //Alert.alert(`RECONNECT FIRED`)
        console.log('reconnect fired!');
    });

    function join(data: RtMessageDTO, cb: any) {
        socket.emit('subscribe', data, cb)
    }

    function done(onMessageReceived: any) {
        socket.on('done', onMessageReceived)
    }

    function counter(onMessageReceived: any) {
        socket.on('counter', onMessageReceived)
    }

    function leave(data: RtMessageDTO, cb: any) {
        socket.emit('unsubscribe', data, cb)
    }

    function getAvailableUsers(counter: any) {
        socket.on('counter', counter)
    }


    return {
        join,
        done,
        leave,
        message,
        counter,
        getAvailableUsers,
        unregisterHandler,
        disconnect
    }
}

export { SocketApi };