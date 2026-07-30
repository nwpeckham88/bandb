import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 720,
    title: 'Backdoors & Breaches - AI Incident Master',
    backgroundColor: '#0a0d14',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false // Allows fetching local Ollama endpoints without CORS issues in Electron
    },
    autoHideMenuBar: true,
  });

  const startUrl = process.env.VITE_DEV_SERVER_URL || `file://${path.join(__dirname, 'dist/index.html')}`;

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(startUrl);
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
