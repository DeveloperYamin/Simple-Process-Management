/**
 * The TypeScript code defines an Express server that manages processes with logs and allows creating,
 * retrieving, and deleting processes.
 * @property {string} time - The `time` property in the `ProcessLog` type represents the timestamp when
 * a log entry was created for a specific process. It stores the time in a string format.
 * @property {string} message - The `message` property in the code snippet is a simple JSON object with
 * a message key that contains a string of emojis. When a GET request is made to the root endpoint
 * `'/'`, the server responds with this JSON object as a message.
 */

import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});


type ProcessLog = {
  time: string;
  message: string;
};

type  ProcessData = {
  creationTime: string;
  logs: ProcessLog[];
};

const processes: { [pid: number]: ProcessData } = {};

// Create a new process
app.get('/create-process', (_req: Request, res: Response) => {
  const pid = Math.floor(Math.random() * 900000) + 100000;
  const creationTime = new Date().toLocaleString();
  processes[pid] = { creationTime, logs: [] };
  res.status(201).json(`PID: ${pid}, Creation Time: ${creationTime}`);
});

// Get all processes
app.get('/get-all', (_req: Request, res: Response) => {
  res.status(200).json(Object.entries(processes).map(([pid, data]) => ({ pid: parseInt(pid), ...data })));
});

// Get logs for a specific process
app.get('/get-single/:pid', (req: Request, res: Response) => {
  const pid = parseInt(req.params.pid);
  if (processes[pid]) {
    res.status(200).json(processes[pid].logs);
  } else {
    res.status(404).json(`Process with PID ${pid} not found`);
  }
});

// Delete a process
app.delete('/delete-process/:pid', (req: Request, res: Response) => {
  const pid = parseInt(req.params.pid);
  if (processes[pid]) {
    delete processes[pid];
    res.status(200).json(`Process with PID ${pid} has been deleted successfully`);
  } else {
    res.status(404).json(`Process with PID ${pid} not found`);
  }
});

// Simulating process logs
setInterval(() => {
  Object.keys(processes).forEach(pid => {
    const processData = processes[parseInt(pid)];
    const now = new Date().toLocaleString();
    processData.logs.push({ time: now, message: `Log entry for process ${pid}` });
  });
}, 60000); // Every minute


export default app;
