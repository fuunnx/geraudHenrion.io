'use strict'

import {periodic} from 'xstream'

//var _rx2 = _interopRequireDefault(_rx)

var _performanceNow = require('performance-now')

var _performanceNow2 = _interopRequireDefault(_performanceNow)

var _raf = require('raf')

var _raf2 = _interopRequireDefault(_raf)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

function makeAnimationDriver() {
  return function animationDriver(sink$, streamAdapter) {
    var _streamAdapter$makeSu = streamAdapter.makeSubject()

    var observer = _streamAdapter$makeSu.observer
    var stream = _streamAdapter$makeSu.stream


    var previousTime = (0, _performanceNow2.default)()
    var frameHandle = void 0

    function tick(timestamp) {
      observer.next({
        timestamp: timestamp,
        delta: timestamp - previousTime
      })

      previousTime = timestamp

      frameHandle = (0, _raf2.default)(tick)
    }

    tick(previousTime)

    stream.interval = function (period) {
      return periodic(period)
    }

    stream.dispose = function () {
      _raf2.default.cancel(frameHandle)
    }

    return stream
  }
}

module.exports = {
  makeAnimationDriver: makeAnimationDriver
}
