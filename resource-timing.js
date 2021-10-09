const log = console.log.bind(console, '[PERF]:')

const isVideo = resource => resource.initiatorType === 'video'

const calculateQuality = () => {
  log('calculateQuality')
  const resources = performance.getEntriesByType('resource').filter(isVideo)
  let totalMB = 0,
    totalSeconds = 0

  for (let { duration, transferSize } of resources) {
    // log(`
    //  duration: ${duration} ms (${duration / 1e3}s)
    //  transfer: ${transferSize} B (${transferSize / 1e6}MB)
    //      mbps: ${transferSize / 1e6 / (duration / 1e3)}
    // `)
    totalSeconds += duration / 1e3
    totalMB += transferSize / 1e6
  }
  const avgMB = totalMB / resources.length
  const avgSeconds = totalSeconds / resources.length
  log(avgMB / avgSeconds)
}

window.calculateQuality = calculateQuality
