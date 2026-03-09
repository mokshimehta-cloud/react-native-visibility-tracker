import UIKit
import React

class VisibilityView: UIView {

    @objc var threshold: NSNumber = 0.5
    @objc var onVisibilityChange: RCTDirectEventBlock?

    private var isCurrentlyVisible = false
    private var isScrolling = false
    private var scrollStopTimer: Timer?
    private let scrollStopDelay: TimeInterval = 0.15
    private var lastTimerReset: CFTimeInterval = 0

    // Cached once on attach – avoids repeated superview traversal on every frame
    private weak var cachedScrollView: UIScrollView?
    private var isObservingScrollView = false

    private static let kContentOffset = "contentOffset"

    override init(frame: CGRect) {
        super.init(frame: frame)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    // MARK: – Lifecycle

    override func didMoveToWindow() {
        super.didMoveToWindow()
        if window != nil {
            attachScrollObserver()
            checkVisibility()
        } else {
            detachScrollObserver()
            scrollStopTimer?.invalidate()
            scrollStopTimer = nil
        }
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        // Catches initial render and any layout-driven position changes
        if !isScrolling {
            checkVisibility()
        }
    }

    override func removeFromSuperview() {
        detachScrollObserver()
        scrollStopTimer?.invalidate()
        super.removeFromSuperview()
    }

    deinit {
        detachScrollObserver()
        scrollStopTimer?.invalidate()
    }

    // MARK: – Scroll observation (replaces CADisplayLink polling)

    private func attachScrollObserver() {
        detachScrollObserver()
        guard let sv = findParentScrollView() else { return }
        cachedScrollView = sv
        sv.addObserver(self, forKeyPath: Self.kContentOffset, options: .new, context: nil)
        isObservingScrollView = true
    }

    private func detachScrollObserver() {
        guard isObservingScrollView, let sv = cachedScrollView else { return }
        sv.removeObserver(self, forKeyPath: Self.kContentOffset)
        isObservingScrollView = false
        cachedScrollView = nil
    }

    // KVO fires on the main thread whenever the scroll view's contentOffset changes.
    // This replaces 30 fps CADisplayLink polling with zero-cost idle behaviour.
    override func observeValue(
        forKeyPath keyPath: String?,
        of object: Any?,
        change: [NSKeyValueChangeKey: Any]?,
        context: UnsafeMutableRawPointer?
    ) {
        if keyPath == Self.kContentOffset {
            onScrollDetected()
        }
    }

    // MARK: – Scroll state

    private func findParentScrollView() -> UIScrollView? {
        var current: UIView? = superview
        while let view = current {
            if let scrollView = view as? UIScrollView {
                return scrollView
            }
            current = view.superview
        }
        return nil
    }

    private func onScrollDetected() {
        isScrolling = true
        // Throttle to once per frame (~16 ms) so N views observing the same scroll view
        // don't each invalidate/create a Timer on every KVO callback.
        let now = CACurrentMediaTime()
        guard now - lastTimerReset >= 0.016 else { return }
        lastTimerReset = now
        scrollStopTimer?.invalidate()
        scrollStopTimer = Timer.scheduledTimer(withTimeInterval: scrollStopDelay, repeats: false) { [weak self] _ in
            self?.isScrolling = false
            self?.checkVisibility()
        }
    }

    // MARK: – Visibility calculation

    private func checkVisibility() {
        guard !isScrolling else { return }

        guard let window = window else {
            updateVisibility(false)
            return
        }

        var visibleRect = window.bounds

        if let scrollView = cachedScrollView {
            let scrollViewFrame = scrollView.convert(scrollView.bounds, to: window)
            visibleRect = scrollViewFrame.intersection(window.bounds)
        }

        let viewFrame = convert(bounds, to: window)
        let intersection = viewFrame.intersection(visibleRect)

        if intersection.isNull || bounds.height == 0 {
            updateVisibility(false)
            return
        }

        updateVisibility(intersection.height / bounds.height >= CGFloat(truncating: threshold))
    }

    private func updateVisibility(_ visible: Bool) {
        if visible == isCurrentlyVisible { return }
        isCurrentlyVisible = visible
        onVisibilityChange?(["focused": visible])
    }
}
