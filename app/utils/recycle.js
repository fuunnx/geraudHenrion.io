// FROM https://github.com/cyclejs/recycle
import now from 'performance-now'

function isFunction (value) {
  return typeof value === 'function'
}

function isObject (value) {
  return typeof value === 'object'
}

function isBoolean (value) {
  return typeof value === 'boolean'
}

function isStream (value) {
  return !!value && (isFunction(value.subcribe) || isFunction(value.addListener))
}

function isArray (array) {
  return Array.isArray(array)
}

const SourceType = either({
  'object': (sources) => isObject(sources) && !isArray(sources) && !isStream(sources),
  'stream': isStream,
  'boolean': isBoolean,
  'function': isFunction,
  'array': isArray,
  'undefined': (val) => typeof val === 'undefined',
})

export function recycler (Cycle, app, drivers) {
  let {sinks, sources, run} = Cycle(app, drivers)
  let dispose = run()

  return (app, newDrivers) => {
    dispose = recycle(Cycle, app, newDrivers, drivers, {dispose})
  }
}

export function recycle (Cycle, app, drivers, oldDrivers, {dispose}) {
  dispose()
  const {run} = Cycle(app, drivers)
  const newDispose = run()

  Object.keys(drivers).forEach(driverName => {
    const driver = drivers[driverName]
    if(typeof driver.replayLog === 'function') {
      driver.replayLog(oldDrivers[driverName].log)
    }
  })

  return newDispose
}

export function recyclable (driver) {
  let log = []
  let proxySources = {}
  let replaying = false

  function logStream (stream, identifier) {
    proxySources[identifier] = stream

    return stream.debug(event => {
      if (!replaying) log.push({identifier, event, time: now()})
    })
  }

  function logSourceFunction (func, identifier = '') {
    return function wrappedSourceFunction (...args) {
      const source = SourceType(func(...args))
      const funcIdentifier = identifier + '/' + func.name + '(' + args.join() + ')'

      return source.when({
        'object': (value) => logSourceObject(value, funcIdentifier),
        'stream': (stream) => logStream(stream, funcIdentifier),
        'function': (func) => logSourceFunction(func, funcIdentifier),
        'boolean': bool => bool,
        'array': array => array,
        'undefined': val => val,
      })
    }
  }

  function logSourceObject (sources, identifier = '') {
    const newSources = {}

    for (const sourceProperty in sources) {
      const value = SourceType(sources[sourceProperty])

      const propertyIdentifier = identifier + '/' + sourceProperty

      const loggedSource = value.when({
        'object': (value) => logSourceObject(value, propertyIdentifier),
        'stream': (stream) => logStream(stream, propertyIdentifier),
        'function': (func) => logSourceFunction(func.bind(sources), propertyIdentifier),
        'array': array => array,
        'boolean': bool => bool,
        'undefined': val => val
      })

      newSources[sourceProperty] = loggedSource

      if (sourceProperty === '_namespace') {
        newSources[sourceProperty] = sources[sourceProperty]
      }
    }

    return newSources
  }

  function recyclableDriver (sink$, streamAdaptor) {
    const sources = SourceType(driver(sink$, streamAdaptor))

    return sources.when({
      'object': (sources) => logSourceObject(sources),
      'stream': (source$) => logStream(source$, ':root'),
      'function': (func) => logSourceFunction(func, ':root'),
      'boolean': bool => bool,
      'array': (array) => array,
      'undefined': val => val,
    })
  }

  recyclableDriver.replayLog = function replayLog (newLog) {
    replaying = true

    log = newLog

    log.forEach((logEvent) => {
      const mockStream = {
        shamefullySendNext: () => {},
      } // there are missing events identifier from custom component...
      // temp fix, wait for official library release
      ;(proxySources[logEvent.identifier] || mockStream)
        .shamefullySendNext(logEvent.event)
    })

    replaying = false
  }

  recyclableDriver.log = log

  return recyclableDriver
}

function either (states) {
  return (value) => ({
    when (handlers) {
      const stateKeys = Object.keys(states).sort()
      const handlersKeys = Object.keys(handlers).sort()

      stateKeys.forEach((_, index) => {
        if (stateKeys[index] !== handlersKeys[index]) {
          throw new Error(`Must handle possible state ${stateKeys[index]}`)
        }
      })

      let called = 0
      let returnValue

      for (const state of Object.keys(states)) {
        const stateValidator = states[state]

        if (stateValidator(value) && called < 1) {
          returnValue = handlers[state](value)

          called += 1
        }
      }

      if (called === 0) {
        throw new Error(`Unhandled possible type: ${value}`)
      }

      return returnValue
    },

    _value: value,
  })
}
