const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const prebuildFileName = `${process.platform}-${process.arch}-ABI-${process.versions.modules}`;
  const prebuildFilePath = `./prebuilds/${prebuildFileName}.tar.gz`;

  process.stdout.write(`Preparing "./prebuilds/${prebuildFileName}.tar.gz" archive...\n`);
  const tarCmd = spawn('tar', [
    'czvf',
    `${prebuildFilePath}`,
    './build',
  ]);
  tarCmd.stdout.pipe(process.stdout);
  tarCmd.stderr.pipe(process.stderr)
}

main().catch(err => console.error(err));