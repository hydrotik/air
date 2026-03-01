import { createServer } from './index';

const PORT = 5200;

async function main() {
  const { app } = await createServer(PORT);
  await app.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`\n  🔬 AI-RUM Server running on http://localhost:${PORT}`);
  console.log(`  📡 Collector endpoint: ws://localhost:${PORT}/ws/collector`);
  console.log(`  📊 Dashboard endpoint: ws://localhost:${PORT}/ws/dashboard`);
  console.log(`  📋 REST API: http://localhost:${PORT}/api/\n`);
}

main().catch((err) => {
  console.error('Failed to start AI-RUM server:', err);
  process.exit(1);
});
