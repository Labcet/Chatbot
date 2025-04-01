module.exports = {
  apps : [
    {
      name: "chatbot-api",
      script: "./src/app.js",
      watch: true,
      max_memory_restart: "1000M",
      exec_mode: "cluster",
      instances: "1",
      //cron
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }
  ],
}