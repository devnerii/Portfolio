module.exports = {
  apps: [
    {
      name: 'my-app',
      script: 'npm',
      args: 'start',
      instances: 'max', // Usa o máximo de instâncias disponíveis (modo cluster)
      exec_mode: 'cluster', // Modo cluster para melhor uso de CPU
      autorestart: true, // Reinicia automaticamente em caso de falha
      watch: true, // Habilita o watch mode para reiniciar em caso de mudanças
      max_memory_restart: '16G', // Reinicia se o uso de memória exceder 16GB
      log_date_format: 'YYYY-MM-DD HH:mm Z', // Formato de data para os logs
      error_file: './logs/err.log', // Arquivo para logs de erro
      out_file: './logs/out.log', // Arquivo para logs de saída
      merge_logs: true, // Mescla logs de todas as instâncias em um único arquivo
      ignore_watch: ['node_modules', 'logs'], // Ignora mudanças nesses diretórios
      env: {
        NODE_ENV: 'development',
        NODE_OPTIONS: '--max-old-space-size=16384', // Define o limite de memória para 16GB
      },
      env_production: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--max-old-space-size=16384', // Define o limite de memória para 16GB
      },
    },
  ],
};