import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToInteractive: number;
}

interface PerformanceAnalyticsProps {
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
}

const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({ 
  onMetricsUpdate 
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'layout-shift') {
          console.log('CLS:', entry.value);
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
      });
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift', 'first-input'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const measurePerformance = () => {
      if (!window.performance || !window.performance.timing) return;

      const timing = window.performance.timing;
      const navigation = window.performance.navigation;

      const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
      const firstContentfulPaint = timing.responseStart - timing.navigationStart;
      const timeToInteractive = timing.domInteractive - timing.navigationStart;

      // Get Web Vitals
      const getLCP = () => {
        return new Promise((resolve) => {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            resolve(lastEntry.startTime);
          });
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
          setTimeout(() => resolve(0), 5000);
        });
      };

      const getCLS = () => {
        return new Promise((resolve) => {
          let clsValue = 0;
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
          });
          observer.observe({ entryTypes: ['layout-shift'] });
          setTimeout(() => resolve(clsValue), 5000);
        });
      };

      const getFID = () => {
        return new Promise((resolve) => {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            if (entries.length > 0) {
              resolve(entries[0].processingStart - entries[0].startTime);
            }
          });
          observer.observe({ entryTypes: ['first-input'] });
          setTimeout(() => resolve(0), 5000);
        });
      };

      Promise.all([getLCP(), getCLS(), getFID()]).then(([lcp, cls, fid]) => {
        const performanceMetrics: PerformanceMetrics = {
          pageLoadTime,
          firstContentfulPaint,
          largestContentfulPaint: lcp as number,
          cumulativeLayoutShift: cls as number,
          firstInputDelay: fid as number,
          timeToInteractive
        };

        setMetrics(performanceMetrics);
        onMetricsUpdate?.(performanceMetrics);

        // Log to console for debugging
        console.table(performanceMetrics);

        // Send to analytics service (optional)
        if (process.env.NODE_ENV === 'production') {
          // Send to your analytics service
          // analytics.track('performance_metrics', performanceMetrics);
        }
      });
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, [onMetricsUpdate]);

  // Monitor Core Web Vitals
  useEffect(() => {
    setIsMonitoring(true);

    const reportWebVitals = (metric: any) => {
      console.log(`${metric.name}:`, metric.value);
      
      // Send to analytics
      if (process.env.NODE_ENV === 'production') {
        // analytics.track(metric.name, { value: metric.value });
      }
    };

    // Import web-vitals library if available
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(reportWebVitals);
      getFID(reportWebVitals);
      getFCP(reportWebVitals);
      getLCP(reportWebVitals);
      getTTFB(reportWebVitals);
    }).catch(() => {
      console.log('Web vitals library not available');
    });

    return () => {
      setIsMonitoring(false);
    };
  }, []);

  // Memory monitoring
  useEffect(() => {
    const checkMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const memoryInfo = {
          used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
          total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
          limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
        };
        console.log('Memory usage:', memoryInfo);
      }
    };

    const interval = setInterval(checkMemory, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Network monitoring
  useEffect(() => {
    const checkConnection = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        console.log('Network info:', {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink + ' Mbps',
          rtt: connection.rtt + ' ms'
        });
      }
    };

    checkConnection();
    
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', checkConnection);
      return () => connection.removeEventListener('change', checkConnection);
    }
  }, []);

  if (!metrics || !isMonitoring) {
    return null;
  }

  // Development overlay (remove in production)
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed top-20 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50">
        <h4 className="font-bold mb-2">Performance Metrics</h4>
        <div className="space-y-1">
          <div>Load Time: {metrics.pageLoadTime}ms</div>
          <div>FCP: {metrics.firstContentfulPaint}ms</div>
          <div>LCP: {metrics.largestContentfulPaint}ms</div>
          <div>CLS: {metrics.cumulativeLayoutShift.toFixed(3)}</div>
          <div>FID: {metrics.firstInputDelay}ms</div>
          <div>TTI: {metrics.timeToInteractive}ms</div>
        </div>
      </div>
    );
  }

  return null;
};

// Performance monitoring hook
export const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isOptimal, setIsOptimal] = useState(true);

  const checkPerformance = (newMetrics: PerformanceMetrics) => {
    setMetrics(newMetrics);
    
    // Check if performance is optimal
    const isLCPGood = newMetrics.largestContentfulPaint < 2500;
    const isCLSGood = newMetrics.cumulativeLayoutShift < 0.1;
    const isFIDGood = newMetrics.firstInputDelay < 100;
    const isTTIGood = newMetrics.timeToInteractive < 3800;

    setIsOptimal(isLCPGood && isCLSGood && isFIDGood && isTTIGood);
  };

  return { metrics, isOptimal, checkPerformance };
};

// Performance optimization utilities
export const optimizeImage = (src: string, width?: number, height?: number) => {
  // Add image optimization logic here
  if (width || height) {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    return `${src}?${params.toString()}`;
  }
  return src;
};

export const lazyLoadComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) => {
  return React.lazy(importFunc);
};

// Resource hints utility
export const addResourceHints = () => {
  // Preconnect to external domains
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://server-backend-zetounlabs.onrender.com'
  ];

  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    document.head.appendChild(link);
  });

  // DNS prefetch for less critical domains
  const prefetchDomains = [
    'https://www.google-analytics.com',
    'https://stats.g.doubleclick.net'
  ];

  prefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
};

export default PerformanceAnalytics;
