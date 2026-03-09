package com.visibilitytracker

import android.graphics.Rect
import android.os.Handler
import android.os.Looper
import android.view.ViewGroup
import android.view.ViewTreeObserver
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
    private var lastScrollY = 0
    private var lastScrollX = 0

    // Cached once on attach – avoids repeated tree walks every frame
    private var cachedScrollView: ViewGroup? = null

    // Pre-allocated to eliminate Rect GC churn in the hot path
    private val viewRect = Rect()
    private val scrollRect = Rect()

    private val handler = Handler(Looper.getMainLooper())
    private val scrollStopDelay = 150L

    private val scrollStopRunnable = Runnable {
        isScrolling = false
        checkVisibility()
    }

    // Fires whenever any scroll in the view tree changes – replaces 60 fps polling loop.
    // We filter by our cached parent so unrelated scroll views don't cause false blur events.
    private val scrollChangedListener = ViewTreeObserver.OnScrollChangedListener {
        val sv = cachedScrollView ?: return@OnScrollChangedListener
        val sy = sv.scrollY
        val sx = sv.scrollX
        if (sy != lastScrollY || sx != lastScrollX) {
            lastScrollY = sy
            lastScrollX = sx
            onScrollDetected()
        }
    }

    // Catches initial layout, orientation changes, keyboard show/hide, etc.
    // During active scroll this is a negligible boolean check.
    private val globalLayoutListener = ViewTreeObserver.OnGlobalLayoutListener {
        if (!isScrolling) checkVisibility()
    }

    fun setThreshold(value: Float) {
        threshold = value
        if (!isScrolling) checkVisibility()
    }

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
        cachedScrollView = findParentReactScrollView()
        cachedScrollView?.let {
            lastScrollY = it.scrollY
            lastScrollX = it.scrollX
        }
        with(viewTreeObserver) {
            addOnScrollChangedListener(scrollChangedListener)
            addOnGlobalLayoutListener(globalLayoutListener)
        }
        // Defer until the first layout pass completes
        handler.postDelayed({ checkVisibility() }, 100)
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        if (viewTreeObserver.isAlive) {
            viewTreeObserver.removeOnScrollChangedListener(scrollChangedListener)
            viewTreeObserver.removeOnGlobalLayoutListener(globalLayoutListener)
        }
        handler.removeCallbacksAndMessages(null)
        cachedScrollView = null
    }

    private fun findParentReactScrollView(): ViewGroup? {
        var p = parent
        while (p != null) {
            if (p is ReactScrollView || p is ReactHorizontalScrollView) return p as ViewGroup
            p = p.parent
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
        if (isScrolling) return

        if (!isAttachedToWindow || height == 0) {
            updateFocus(false)
            return
        }

        if (!getGlobalVisibleRect(viewRect)) {
            updateFocus(false)
            return
        }

        cachedScrollView?.let { sv ->
            sv.getGlobalVisibleRect(scrollRect)
            if (!viewRect.intersect(scrollRect)) {
                updateFocus(false)
                return
            }
        }

        updateFocus(viewRect.height().toFloat() / height.toFloat() >= threshold)
    }

    private fun updateFocus(visible: Boolean) {
        if (visible == isFocused) return
        isFocused = visible
        try {
            val dispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, id)
            val surfaceId = UIManagerHelper.getSurfaceId(reactContext)
            dispatcher?.dispatchEvent(VisibilityChangeEvent(surfaceId, id, visible))
        } catch (_: Exception) {
        }
    }
}
