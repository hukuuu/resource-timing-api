const log = console.log.bind(console, '[PERF]:')

const isVideo = resource => resource.initiatorType === 'video'

const calculateSpeed = () => {
  log('calculateSpeed')
  const resources = performance.getEntriesByType('resource').filter(isVideo)
  let totalMb = 0,
    totalSeconds = 0

  for (let { duration, transferSize } of resources) {
    totalSeconds += duration / 1e3
    totalMb += (transferSize * 8) / 1e6
  }
  const avgMb = totalMb / resources.length
  const avgSeconds = totalSeconds / resources.length
  const avgMbps = avgMb / avgSeconds
  log(avgMbps, 'Mbps')
}

window.calculateSpeed = calculateSpeed
