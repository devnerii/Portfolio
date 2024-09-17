module.exports = {
  apps: [
    {
      name: 'Portfolio',
      script: 'npm',
      args: 'start',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      merge_logs: true,
      ignore_watch: ['node_modules', 'logs'],
      node_args: '--max-old-space-size=8192',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};