import {readFileSync} from 'fs'
import path from 'path'

const logFilePath = path.join(process.env.HOME, '.pm2/logs/flexux-error.log');
export default function handler(req, res) {
    try {
      const files = readFileSync(logFilePath);
      const logContent = files
        .toString()
        .split('\n')
        .filter((line) => line)
        .join('\n');
      res.status(200).send(logContent);

    } catch (error) {
      res.status(500).send(`Error reading logs: ${error.message}`);
    }
  }