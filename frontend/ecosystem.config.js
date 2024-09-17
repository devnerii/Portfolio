module.exports = {
  apps: [
    {
      name: 'Portoflio',
      script: 'npm',
      args: 'start',
      instances: 'max', // Usa o máximo de instâncias disponíveis (modo cluster)
      exec_mode: 'cluster', // Modo cluster para melhor uso de CPU
      autorestart: true, // Reinicia automaticamente em caso de falha
      watch: true, // Habilita o watch mode para reiniciar em caso de mudanças
      log_date_format: 'YYYY-MM-DD HH:mm Z', // Formato de data para os logs
      error_file: './logs/err.log', // Arquivo para logs de erro
      out_file: './logs/out.log', // Arquivo para logs de saída
      merge_logs: true, // Mescla logs de todas as instâncias em um único arquivo
      ignore_watch: ['node_modules', 'logs'], // Ignora mudanças nesses diretórios
      node_args: '--max-old-space-size=8192', // Define a quantidade máxima de memória
    },
  ],
};