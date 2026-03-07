package com.visibilitytracker

import android.graphics.Rect
import android.os.Handler
import android.os.Looper
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event
import com.facebook.react.views.scroll.ReactScrollView
import com.facebook.react.views.scroll.ReactHorizontalScrollView

class VisibilityChangeEvent(
    surfaceId: Int,
    viewTag: Int,
    private val focused: Boolean
) : Event<VisibilityChangeEvent>(surfaceId, viewTag) {
    override fun getEventName() = "topVisibilityChange"
    override fun getEventData(): WritableMap = Arguments.createMap().also {
        it.putBoolean("focused", focused)
    }
}

class VisibilityView(
    private val reactContext: ThemedReactContext
) : FrameLayout(reactContext) {

    private var isFocused = false
    private var threshold = 0.5f
    private var isScrolling = false
    private var parentScrollView: ViewGroup? = null

    private val handler = Handler(Looper.getMainLooper())
    private val scrollStopDelay = 150L

    // Reusable Rect objects to avoid allocation during scroll
    private val viewRect = Rect()
    private val scrollRect = Rect()
    private val intersectionRect = Rect()

    private val scrollStopRunnable = Runnable {
        isScrolling = false
        checkVisibility()
    }

    private val scrollListener = View.OnScrollChangeListener { _, _, _, _, _ ->
        onScrollDetected()
    }

    fun setThreshold(value: Float) {
        threshold = value
    }

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
        
        // Find and cache the parent scroll view ONCE
        parentScrollView = findParentReactScrollView()
        parentScrollView?.setOnScrollChangeListener(scrollListener)
        
        // Initial visibility check (delayed to ensure layout is complete)
        handler.postDelayed({ checkVisibility() }, 100)
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        parentScrollView?.setOnScrollChangeListener(null)
        parentScrollView = null
        handler.removeCallbacks(scrollStopRunnable)
    }

    private fun findParentReactScrollView(): ViewGroup? {
        var current = parent
        while (current != null) {
            if (current is ReactScrollView || current is ReactHorizontalScrollView) {
                return current as ViewGroup
            }
            current = current.parent
        }
        return null
    }

    private fun onScrollDetected() {
        if (!isScrolling) {
            isScrolling = true
            updateFocus(false)
        }
        handler.removeCallbacks(scrollStopRunnable)
        handler.postDelayed(scrollStopRunnable, scrollStopDelay)
    }

    private fun checkVisibility() {
        if (isScrolling || !isAttachedToWindow || height == 0) {
            if (!isScrolling) updateFocus(false)
            return
        }

        val isVisible = getGlobalVisibleRect(viewRect)
        if (!isVisible) {
            updateFocus(false)
            return
        }

        val scrollView = parentScrollView
        val visibleHeight: Float

        if (scrollView != null) {
            scrollView.getGlobalVisibleRect(scrollRect)
            intersectionRect.set(viewRect)
            
            if (!intersectionRect.intersect(scrollRect)) {
                updateFocus(false)
                return
            }
            visibleHeight = intersectionRect.height().toFloat()
        } else {
            visibleHeight = viewRect.height().toFloat()
        }

        val ratio = visibleHeight / height.toFloat()
        updateFocus(ratio >= threshold)
    }

    private fun updateFocus(visible: Boolean) {
        if (visible == isFocused) return
        isFocused = visible

        try {
            val dispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, id)
            val surfaceId = UIManagerHelper.getSurfaceId(reactContext)
            dispatcher?.dispatchEvent(VisibilityChangeEvent(surfaceId, id, visible))
        } catch (_: Exception) {}
    }
}