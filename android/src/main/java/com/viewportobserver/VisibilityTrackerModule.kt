package com.viewportobserver

import com.facebook.react.bridge.ReactApplicationContext

class VisibilityTrackerModule(reactContext: ReactApplicationContext) :
  NativeViewportObserverSpec(reactContext) {

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  companion object {
    const val NAME = NativeViewportObserverSpec.NAME
  }
}
