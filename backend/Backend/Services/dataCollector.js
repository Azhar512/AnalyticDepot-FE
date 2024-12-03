import os from 'os';
import { promisify } from 'util';
import { exec } from 'child_process';
const execAsync = promisify(exec);

class DataCollector {
  constructor() {
    this.data = {
      storage: {
        used: 0,
        total: 0,
        files: []
      },
      performance: {
        apiRequests: {
          total: 0,
          success: 0,
          failed: 0
        },
        userEngagement: {
          activeUsers: 0,
          newUsers: 0,
          retention: 0
        },
        systemHealth: {
          cpuUsage: 0,
          memoryUsage: 0,
          networkLatency: 0
        }
      },
      tokenStats: {
        today: 0,
        yesterday: 0,
        avgPerDay: 0
      }
    };
    
    this.listeners = new Set();
  }

  async collectSystemMetrics() {
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
      const { stdout } = await execAsync('ping -n 1 google.com');
      const match = stdout.match(/time=(\d+\.?\d*)/);
      const networkLatency = match ? parseFloat(match[1]) : 0;

      this.data.performance.systemHealth = {
        cpuUsage: Math.round(cpuUsage),
        memoryUsage: Math.round(memoryUsage),
        networkLatency: Math.round(networkLatency)
      };

      this.notifyListeners('systemHealth');
    } catch (error) {
      console.error('Error collecting system metrics:', error);
    }
  }

  async collectStorageMetrics() {
    try {
        const { stdout } = await execAsync('wmic logicaldisk get size,freespace,caption');      
      const lines = stdout.split('\n');
      const [_, line] = lines;
      const [filesystem, size, used, available, percentage] = line.split(/\s+/);

      this.data.storage = {
        ...this.data.storage,
        used: parseInt(percentage),
        total: parseInt(size)
      };

      this.notifyListeners('storage');
    } catch (error) {
      console.error('Error collecting storage metrics:', error);
    }
  }

  trackApiRequest(success) {
    const apiRequests = this.data.performance.apiRequests;
    apiRequests.total++;
    if (success) {
      apiRequests.success++;
    } else {
      apiRequests.failed++;
    }
    this.notifyListeners('apiRequests');
  }

  trackUserEngagement(type) {
    const engagement = this.data.performance.userEngagement;
    switch(type) {
      case 'active':
        engagement.activeUsers++;
        break;
      case 'new':
        engagement.newUsers++;
        break;
      case 'retention':
        engagement.retention = (engagement.activeUsers / (engagement.activeUsers + engagement.newUsers)) * 100;
        break;
    }
    this.notifyListeners('userEngagement');
  }

  trackTokenUsage(tokens) {
    const stats = this.data.tokenStats;
    stats.today += tokens;
    stats.avgPerDay = (stats.today + stats.yesterday) / 2;
    this.notifyListeners('tokenStats');
  }

  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners(updateType) {
    const update = {
      type: updateType,
      data: updateType === 'all' ? this.data : this.data[updateType]
    };
    this.listeners.forEach(callback => callback(update));
  }

  startCollecting() {
    setInterval(() => this.collectSystemMetrics(), 5000);
    setInterval(() => this.collectStorageMetrics(), 60000);
    
    // Reset daily stats at midnight
    setInterval(() => {
      this.data.tokenStats.yesterday = this.data.tokenStats.today;
      this.data.tokenStats.today = 0;
      this.notifyListeners('tokenStats');
    }, 24 * 60 * 60 * 1000);

    // Initial collection
    this.collectSystemMetrics();
    this.collectStorageMetrics();
  }
}

export default new DataCollector();