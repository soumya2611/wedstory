/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Custom Vite plugin to handle local config updates
const weddingConfigPlugin = () => ({
  name: 'save-wedding-config',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/save-config' && req.method === 'POST') {
        try {
          const body = await new Promise((resolve, reject) => {
            let data = '';
            req.on('data', chunk => data += chunk);
            req.on('end', () => resolve(data));
            req.on('error', reject);
          });
          
          const configData = JSON.parse(body);
          const configPath = path.resolve(__dirname, 'src/weddingConfig.json');
          
          fs.writeFileSync(configPath, JSON.stringify(configData, null, 2), 'utf-8');
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Configuration saved successfully!' }));
        } catch (error) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: error.message }));
        }
      } else if (req.url === '/api/upload-file' && req.method === 'POST') {
        try {
          const body = await new Promise((resolve, reject) => {
            let data = '';
            req.on('data', chunk => data += chunk);
            req.on('end', () => resolve(data));
            req.on('error', reject);
          });
          
          const { filename, base64Data } = JSON.parse(body);
          if (!filename || !base64Data) {
            throw new Error('Filename or image data is missing');
          }
          
          // Remove prefix like "data:image/png;base64," or "data:audio/mp3;base64,"
          const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          if (!matches || matches.length !== 3) {
            throw new Error('Invalid base64 data format');
          }
          
          const buffer = Buffer.from(matches[2], 'base64');
          
          // Sanitize filename to prevent directory traversal
          const safeFilename = filename.replace(/[^a-zA-Z0-9_\.-]/g, '');
          const publicDir = path.resolve(__dirname, 'public');
          
          // Ensure public directory exists
          if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
          }
          
          const filePath = path.resolve(publicDir, safeFilename);
          fs.writeFileSync(filePath, buffer);
          
          // Return the relative URL from public root
          const relativeUrl = `/${safeFilename}`;
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, url: relativeUrl }));
        } catch (error) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: error.message }));
        }
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), weddingConfigPlugin()],
});

