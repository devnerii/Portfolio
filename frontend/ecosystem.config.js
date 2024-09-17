module.exports = {
    apps: [
      {
        name: 'Portfolio',
        script: 'npm',
        args: 'run start',
        watch: true,
        env: {
          NODE_ENV: 'production',
          NODE_OPTIONS: '--max-old-space-size=8192'
        },
        // Executa o build antes de iniciar o servidor
        post_update: ['npm install', 'npm run build']
      }
    ]
  };