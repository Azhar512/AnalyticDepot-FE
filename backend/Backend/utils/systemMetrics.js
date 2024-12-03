import os from 'os';
import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);

export const getStorageMetrics = async () => {
  try {
    if (process.platform === 'win32') {
      const { stdout } = await execAsync('wmic logicaldisk get size,freespace,caption');
      return stdout;
    } else {
      const { stdout } = await execAsync('df -h /');
      return stdout;
    }
  } catch (error) {
    console.error('Storage metrics error:', error);
    return 'Unable to retrieve storage metrics';
  }
};

export const getSystemMetrics = async () => {
  try {
    const cpus = os.cpus();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    
    const cpuUsage = cpus.reduce((acc, cpu) => {
      const total = Object.values(cpu.times).reduce((a, b) => a + b);
      const idle = cpu.times.idle;
      return acc + ((total - idle) / total) * 100;
    }, 0) / cpus.length;

    const memoryUsage = ((totalMem - freeMem) / totalMem) * 100;

    let networkLatency = 0;
    try {
      const { stdout } = await execAsync(
        process.platform === 'win32' 
          ? 'ping -n 1 google.com' 
          : 'ping -n 1 google.com'
      );
      const match = stdout.match(/time[<|=](\d+)/);
      networkLatency = match ? parseFloat(match[1]) : 0;
    } catch (networkError) {
      console.error('Network latency check failed:', networkError);
    }

    return {
      cpuUsage: Math.round(cpuUsage),
      memoryUsage: Math.round(memoryUsage),
      networkLatency: Math.round(networkLatency)
    };
  } catch (error) {
    console.error('System metrics error:', error);
    return {
      cpuUsage: 0,
      memoryUsage: 0,
      networkLatency: 0
    };
  }
};