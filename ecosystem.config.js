// PM2 process config.
//
// output: 'standalone' (next.config.ts) means the production entry point is
// .next/standalone/server.js, NOT `next start` / `npm start`. The standalone
// server bundles its own minimal node_modules, so the VPS doesn't need a full
// `npm install` — just `npm ci` locally/in CI-equivalent step during build,
// then copy the two folders standalone doesn't include automatically
// (see deploy.sh).
//
// Usage on the VPS:
//   pm2 start ecosystem.config.js
//   pm2 save
//   pm2 startup   (once, to survive reboots)

module.exports = {
  apps: [
    {
      name: "portfolio",
      script: ".next/standalone/server.js",
      cwd: "/var/www/portfolio/web",
      instances: 1,
      exec_mode: "fork", // single instance is fine for a personal site; switch to "cluster" + instances > 1 only if traffic ever warrants it
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "127.0.0.1", // bind to loopback only — Apache is the public-facing side
      },
      // Standalone server.js is fast to boot; no need for a long kill timeout.
      kill_timeout: 5000,
      max_restarts: 10,
      autorestart: true,
    },
  ],
};
