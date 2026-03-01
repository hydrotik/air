import { createServer } from './index';

const PORT = 5200;

async function main() {
  const { app } = await createServer(PORT);
  await app.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`\n  ⚡ AIr server running on http://localhost:${PORT}`);
  console.log(`  📡 Collector: ws://localhost:${PORT}/ws/collector`);
  console.log(`  📊 Dashboard: ws://localhost:${PORT}/ws/dashboard`);
  console.log(`  📋 API:       http://localhost:${PORT}/api/\n`);
}

main().catch((err) => {
  console.error('Failed to start AIr server:', err);
  process.exit(1);
});
