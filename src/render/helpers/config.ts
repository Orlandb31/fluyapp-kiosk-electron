import fs from "fs";

let settings: any = {}

try {
    const data = fs.readFileSync('C:\\config-kiosk\\config.json');
    const json = data.toString('utf8');
    settings = JSON.parse(json);

    console.log(settings)
} catch (e) {

    settings = {
        "branchUuid": "cb833842-4b56-4bdb-9ecc-1d9b9db4ef87"
    }

}


export default settings;
