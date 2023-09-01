import path from 'path';
import fs from 'fs';




export const useLogger = () => {
    const today = new Date();
    const logDirectoryPath = "C:\\config\\logs"
    const fileName = `Fluyapp_Log_${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}.log`;
    const logFilePath = path.join(logDirectoryPath, fileName);


    const log = (message: string) => {
        try {
            const timestamp = new Date().toLocaleString();
            const logMessage = `[${timestamp}] ${message}\n\n`;

            if (!fs.existsSync(logDirectoryPath)) {
               // console.log('Log directory does not exist');
                fs.mkdirSync(logDirectoryPath, { recursive: true });
               // console.log("Directory Created");
            }
            
            if (logDirectoryPath) {
                fs.appendFileSync(logFilePath, logMessage);
               // console.log("Succes Log Creation")
            } else {
                console.log('Log path is empty');
            }
        } catch (error) {
            console.log('Error writing to log file:', error);
        }
    };

    return { log };
};
