package com.visibilitytracker

import com.facebook.react.bridge.ReactApplicationContext

class VisibilityTrackerModule(reactContext: ReactApplicationContext) :
  NativeVisibilityTrackerSpec(reactContext) {

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  companion object {
    const val NAME = NativeVisibilityTrackerSpec.NAME
  }
}
