import UIKit
import React

class VisibilityView: UIView {

    @objc var threshold: NSNumber = 0.5
    @objc var trackDuringScroll: Bool = false
    @objc var onVisibilityChange: RCTDirectEventBlock?

    private var isCurrentlyVisible = false

    // Last sampled scroll offset, used only when `trackDuringScroll` is false to
    // detect an in-flight scroll and suppress emission until it settles.
    private var lastContentOffset: CGPoint?

    // Nearest ancestor scroll view, used only to clip the visible rect. WEAK on purpose:
    // we never message it during teardown, so its lifetime is irrelevant to safety.
    private weak var cachedScrollView: UIScrollView?

    // Scroll is sampled with a display link instead of KVO on the scroll view.
    //
    // KVO here observed a foreign object this view does not own (an ancestor scroll view,
    // shared with React Native and other VisibilityViews). Every KVO teardown variant
    // (weak ref, strong ref, NSKeyValueObservation) crashed in `removeObserver` during the
    // navigation-pop view-tree teardown, inside `_NSKeyValueRetainedObservationInfoForObject`
    // — the scroll view's shared KVO observation list gets a dangling entry and our removal
    // walks it. A display link registers no observer on any foreign object, so there is
    // nothing to tear down unsafely and nothing to corrupt: it cannot reproduce that crash.
    // A weak proxy target keeps the link from retaining self.
    private var displayLink: CADisplayLink?
    private var displayLinkProxy: DisplayLinkProxy?

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
            startSampling()
            checkVisibility()
        } else {
            stopSampling()
        }
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        // Catches initial render and any layout-driven position changes
        checkVisibility()
    }

    override func removeFromSuperview() {
        stopSampling()
        super.removeFromSuperview()
    }

    deinit {
        stopSampling()
    }

    // MARK: – Scroll sampling (display link; no KVO on the scroll view)

    private func startSampling() {
        stopSampling()
        cachedScrollView = findParentScrollView()
        let proxy = DisplayLinkProxy(self)
        let link = CADisplayLink(target: proxy, selector: #selector(DisplayLinkProxy.tick(_:)))
        link.preferredFramesPerSecond = 30
        link.add(to: .main, forMode: .common)
        displayLinkProxy = proxy
        displayLink = link
    }

    private func stopSampling() {
        displayLink?.invalidate()
        displayLink = nil
        displayLinkProxy = nil
        cachedScrollView = nil
    }

    fileprivate func onDisplayTick() {
        // Opt-out of during-scroll emission (the default): while the scroll
        // offset is changing, suppress focus/blur and report only once it
        // settles — mirrors the Android during-scroll suppression. The display
        // link keeps running either way (never gated), so other consumers still
        // get their settle updates and the no-KVO crash fix is untouched.
        // With `trackDuringScroll` on, emit every frame so an on-screen view
        // keeps reporting focus while the list scrolls.
        if !trackDuringScroll, let scrollView = cachedScrollView {
            let offset = scrollView.contentOffset
            let scrolling = offset != (lastContentOffset ?? offset)
            lastContentOffset = offset
            if scrolling { return }
        }
        checkVisibility()
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

    // MARK: – Visibility calculation

    private func checkVisibility() {
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

// Weak proxy so the CADisplayLink does not retain the VisibilityView. Avoids a retain
// cycle and lets deinit run (which invalidates the link).
private final class DisplayLinkProxy {
    weak var target: VisibilityView?

    init(_ target: VisibilityView) {
        self.target = target
    }

    @objc func tick(_ link: CADisplayLink) {
        target?.onDisplayTick()
    }
}
