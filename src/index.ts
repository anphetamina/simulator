import { F1TelemetryClient, constants } from "@racehub-io/f1-telemetry-client";
import $ from 'jquery'
const { PACKETS } = constants;

/*
*   'port' is optional, defaults to 20777
*   'bigintEnabled' is optional, setting it to false makes the parser skip bigint values,
*                   defaults to true
*   'forwardAddresses' is optional, it's an array of Address objects to forward unparsed telemetry to. each address object is comprised of a port and an optional ip address
*                   defaults to undefined
*   'skipParsing' is optional, setting it to true will make the client not parse and emit content. You can consume telemetry data using forwardAddresses instead.
*                   defaults to false
*/
const client = new F1TelemetryClient({ port: 20777 });

$("#motion").load('public/index.html', () => {
    client.on(PACKETS.event, console.log);
    client.on(PACKETS.motion, console.log);
    client.on(PACKETS.carSetups, console.log);
    client.on(PACKETS.lapData, console.log);
    client.on(PACKETS.session, console.log);
    client.on(PACKETS.participants, console.log);
    client.on(PACKETS.carTelemetry, console.log);
    client.on(PACKETS.carStatus, console.log);
    client.on(PACKETS.finalClassification, console.log);
    client.on(PACKETS.lobbyInfo, console.log);
    client.on(PACKETS.carDamage, console.log);
    client.on(PACKETS.sessionHistory, console.log);

    setTimeout(() => {
        let el = document.getElementById('motion')
        if (el) {
            el.innerHTML = '20'
        }
    }, 2000);
})



// // to start listening:
client.start();

// and when you want to stop:
// client.stop();

export default client