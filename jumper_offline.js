const mineflayer = require('mineflayer');

function startBot () {
  const bot = mineflayer.createBot({
    host: 'XDXDXDXD',        // replace with your server IP
    port: 25565,
    username: 'damnbot',
    version: '1.21.4',
    auth: 'offline',
    keepAlive: true
  });

  bot.on('kicked',  r => console.log('Kicked:', r));
  bot.on('error',   e => console.error('Error:', e));
  bot.on('end', () => {
    console.log('[INFO] Disconnected – retrying in 5s');
    setTimeout(startBot, 5000);
  });

  bot.once('spawn', () => {
    console.log('[INFO] Spawned – starting loops');

    setInterval(() => {
      if (!bot.entity?.onGround) return;
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 300);
    }, 4500);

    setInterval(() => {
      const actions = [
        () => {
          const yaw = bot.entity.yaw + (Math.random() - 0.5) * Math.PI / 2;
          const pitch = bot.entity.pitch + (Math.random() - 0.5) * 0.2;
          bot.look(yaw, pitch, true);
        },
        () => {
          bot.setControlState('forward', true);
          setTimeout(() => bot.setControlState('forward', false), 300);
        },
        () => {
          bot.setControlState('sneak', true);
          setTimeout(() => bot.setControlState('sneak', false), 800);
        },
        () => bot.swingArm('right')
      ];
      actions[Math.floor(Math.random() * actions.length)]();
    }, 30000);
  });
}

startBot();
