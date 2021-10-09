const log = console.log.bind(console, '[PERF]:')

const isVideo = resource => resource.initiatorType === 'video'

const calculateSpeed = () => {
  log('calculateSpeed')
  const resources = performance.getEntriesByType('resource').filter(isVideo)
  let totalMb = 0,
    totalSeconds = 0

  for (let { duration, transferSize } of resources) {
    // log(`
    //  duration: ${duration} ms (${duration / 1e3}s)
    //  transfer: ${transferSize} B (${transferSize / 1e6}MB)
    //      mbps: ${transferSize / 1e6 / (duration / 1e3)}
    // `)
    totalSeconds += duration / 1e3
    totalMb += (transferSize * 8) / 1e6
  }
  const avgMb = totalMb / resources.length
  const avgSeconds = totalSeconds / resources.length
  const avgMbps = avgMb / avgSeconds
  log(avgMbps, 'Mbps')
}

window.calculateSpeed = calculateSpeed
