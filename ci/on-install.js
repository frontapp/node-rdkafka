const fs = require('fs');
const { spawn } = require('child_process');
const { exit } = require('process');

async function main() {
  if (fs.existsSync('./build')) {
    process.stdout.write('-- node-rdkafka bindings already installed, skipping\n');
    return;
  }

  const prebuildFileName = `${process.platform}-${process.arch}-ABI-${process.versions.modules}`;
  const prebuildFilePath = `./prebuilds/${prebuildFileName}.tar.gz`;

  if (fs.existsSync(prebuildFilePath)) {
    process.stdout.write(`-- Unpacking "${prebuildFilePath}" archive...\n`);
    const tarCmd = spawn('tar', [
      'xzvf',
      `${prebuildFilePath}`
    ]);
    tarCmd.stdout.pipe(process.stdout);
    tarCmd.stderr.pipe(process.stderr);
  } else {
    process.stdout.write(`Missing node-rdkafka for ${prebuildFilePath}". Building from source.`);
    exit(1);
  }
}

main().catch(err => console.error(err));