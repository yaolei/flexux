module.exports = {
    apps: [
      {
        name: 'flexux',
        script: 'npm',
        args:"run start",
        log_date_format: 'YYYY-MM-DD HH:mm Z',
        max_memory_restart: '100M',
        log_rotate: {
          days: 2, 
          size: '100M', 
          expire: 3, 
        },
      },
    ],
  };