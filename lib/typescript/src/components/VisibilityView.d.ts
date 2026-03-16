export type VisibilityViewRef = {
    /** Returns the current focused state without triggering a re-render. */
    checkIsFocused: () => boolean;
};
declare const VisibilityView: import("react").ForwardRefExoticComponent<Readonly<Omit<Readonly<{
    onAccessibilityAction?: ((event: import("react-native").AccessibilityActionEvent) => unknown) | undefined;
    onAccessibilityTap?: (() => unknown) | undefined;
    onLayout?: ((event: import("react-native").LayoutChangeEvent) => unknown) | undefined;
    onMagicTap?: (() => unknown) | undefined;
    onAccessibilityEscape?: (() => unknown) | undefined;
}>, "onMoveShouldSetResponder" | "onMoveShouldSetResponderCapture" | "onResponderGrant" | "onResponderMove" | "onResponderReject" | "onResponderRelease" | "onResponderStart" | "onResponderEnd" | "onResponderTerminate" | "onResponderTerminationRequest" | "onStartShouldSetResponder" | "onStartShouldSetResponderCapture" | "onMouseEnter" | "onMouseLeave" | "onClick" | "onClickCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onBlur" | "onBlurCapture" | "onFocus" | "onFocusCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "nativeBackgroundAndroid" | "nativeForegroundAndroid" | "renderToHardwareTextureAndroid" | "hasTVPreferredFocus" | "nextFocusDown" | "nextFocusForward" | "nextFocusLeft" | "nextFocusRight" | "nextFocusUp" | "focusable" | "tabIndex" | "shouldRasterizeIOS" | "accessibilityIgnoresInvertColors" | "accessibilityViewIsModal" | "accessibilityShowsLargeContentViewer" | "accessibilityLargeContentTitle" | "aria-modal" | "accessibilityElementsHidden" | "accessibilityLanguage" | "accessibilityRespondsToUserInteraction" | "accessible" | "accessibilityLabel" | "accessibilityHint" | "aria-label" | "accessibilityRole" | "role" | "accessibilityState" | "accessibilityValue" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "accessibilityActions" | "aria-busy" | "aria-checked" | "aria-disabled" | "aria-expanded" | "aria-selected" | "aria-hidden" | "accessibilityLabelledBy" | "aria-labelledby" | "accessibilityLiveRegion" | "aria-live" | "importantForAccessibility" | "screenReaderFocusable" | "children" | "style" | "collapsable" | "collapsableChildren" | "id" | "testID" | "nativeID" | "needsOffscreenAlphaCompositing" | "hitSlop" | "pointerEvents" | "removeClippedSubviews" | "experimental_accessibilityOrder"> & Omit<Readonly<{
    onMoveShouldSetResponder?: ((e: import("react-native").GestureResponderEvent) => boolean) | undefined;
    onMoveShouldSetResponderCapture?: ((e: import("react-native").GestureResponderEvent) => boolean) | undefined;
    onResponderGrant?: ((e: import("react-native").GestureResponderEvent) => void | boolean) | undefined;
    onResponderMove?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onResponderReject?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onResponderRelease?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onResponderStart?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onResponderEnd?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onResponderTerminate?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onResponderTerminationRequest?: ((e: import("react-native").GestureResponderEvent) => boolean) | undefined;
    onStartShouldSetResponder?: ((e: import("react-native").GestureResponderEvent) => boolean) | undefined;
    onStartShouldSetResponderCapture?: ((e: import("react-native").GestureResponderEvent) => boolean) | undefined;
}>, "onMouseEnter" | "onMouseLeave" | "onClick" | "onClickCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onBlur" | "onBlurCapture" | "onFocus" | "onFocusCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "nativeBackgroundAndroid" | "nativeForegroundAndroid" | "renderToHardwareTextureAndroid" | "hasTVPreferredFocus" | "nextFocusDown" | "nextFocusForward" | "nextFocusLeft" | "nextFocusRight" | "nextFocusUp" | "focusable" | "tabIndex" | "shouldRasterizeIOS" | "accessibilityIgnoresInvertColors" | "accessibilityViewIsModal" | "accessibilityShowsLargeContentViewer" | "accessibilityLargeContentTitle" | "aria-modal" | "accessibilityElementsHidden" | "accessibilityLanguage" | "accessibilityRespondsToUserInteraction" | "accessible" | "accessibilityLabel" | "accessibilityHint" | "aria-label" | "accessibilityRole" | "role" | "accessibilityState" | "accessibilityValue" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "accessibilityActions" | "aria-busy" | "aria-checked" | "aria-disabled" | "aria-expanded" | "aria-selected" | "aria-hidden" | "accessibilityLabelledBy" | "aria-labelledby" | "accessibilityLiveRegion" | "aria-live" | "importantForAccessibility" | "screenReaderFocusable" | "children" | "style" | "collapsable" | "collapsableChildren" | "id" | "testID" | "nativeID" | "needsOffscreenAlphaCompositing" | "hitSlop" | "pointerEvents" | "removeClippedSubviews" | "experimental_accessibilityOrder"> & Omit<Readonly<{
    onMouseEnter?: ((event: import("react-native").MouseEvent) => void) | undefined;
    onMouseLeave?: ((event: import("react-native").MouseEvent) => void) | undefined;
}>, "onClick" | "onClickCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onBlur" | "onBlurCapture" | "onFocus" | "onFocusCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "nativeBackgroundAndroid" | "nativeForegroundAndroid" | "renderToHardwareTextureAndroid" | "hasTVPreferredFocus" | "nextFocusDown" | "nextFocusForward" | "nextFocusLeft" | "nextFocusRight" | "nextFocusUp" | "focusable" | "tabIndex" | "shouldRasterizeIOS" | "accessibilityIgnoresInvertColors" | "accessibilityViewIsModal" | "accessibilityShowsLargeContentViewer" | "accessibilityLargeContentTitle" | "aria-modal" | "accessibilityElementsHidden" | "accessibilityLanguage" | "accessibilityRespondsToUserInteraction" | "accessible" | "accessibilityLabel" | "accessibilityHint" | "aria-label" | "accessibilityRole" | "role" | "accessibilityState" | "accessibilityValue" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "accessibilityActions" | "aria-busy" | "aria-checked" | "aria-disabled" | "aria-expanded" | "aria-selected" | "aria-hidden" | "accessibilityLabelledBy" | "aria-labelledby" | "accessibilityLiveRegion" | "aria-live" | "importantForAccessibility" | "screenReaderFocusable" | "children" | "style" | "collapsable" | "collapsableChildren" | "id" | "testID" | "nativeID" | "needsOffscreenAlphaCompositing" | "hitSlop" | "pointerEvents" | "removeClippedSubviews" | "experimental_accessibilityOrder"> & Omit<Readonly<{
    onClick?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onClickCapture?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerEnter?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerEnterCapture?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerLeave?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerLeaveCapture?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerMove?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerMoveCapture?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerCancel?: ((e: import("react-native").PointerEvent) => void) | undefined;
    onPointerCancelCapture?: ((e: import("react-native").PointerEvent) => void) | undefined;
    onPointerDown?: ((e: import("react-native").PointerEvent) => void) | undefined;
    onPointerDownCapture?: ((e: import("react-native").PointerEvent) => void) | undefined;
    onPointerUp?: ((e: import("react-native").PointerEvent) => void) | undefined;
    onPointerUpCapture?: ((e: import("react-native").PointerEvent) => void) | undefined;
    onPointerOver?: ((e: import("react-native").PointerEvent) => void) | undefined;
    onPointerOverCapture?: ((e: import("react-native").PointerEvent) => void) | undefined;
    onPointerOut?: ((e: import("react-native").PointerEvent) => void) | undefined;
    onPointerOutCapture?: ((e: import("react-native").PointerEvent) => void) | undefined;
    onGotPointerCapture?: ((e: import("react-native").PointerEvent) => void) | undefined;
    onGotPointerCaptureCapture?: ((e: import("react-native").PointerEvent) => void) | undefined;
    onLostPointerCapture?: ((e: import("react-native").PointerEvent) => void) | undefined;
    onLostPointerCaptureCapture?: ((e: import("react-native").PointerEvent) => void) | undefined;
}>, "onClick" | "onBlur" | "onBlurCapture" | "onFocus" | "onFocusCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "nativeBackgroundAndroid" | "nativeForegroundAndroid" | "renderToHardwareTextureAndroid" | "hasTVPreferredFocus" | "nextFocusDown" | "nextFocusForward" | "nextFocusLeft" | "nextFocusRight" | "nextFocusUp" | "focusable" | "tabIndex" | "shouldRasterizeIOS" | "accessibilityIgnoresInvertColors" | "accessibilityViewIsModal" | "accessibilityShowsLargeContentViewer" | "accessibilityLargeContentTitle" | "aria-modal" | "accessibilityElementsHidden" | "accessibilityLanguage" | "accessibilityRespondsToUserInteraction" | "accessible" | "accessibilityLabel" | "accessibilityHint" | "aria-label" | "accessibilityRole" | "role" | "accessibilityState" | "accessibilityValue" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "accessibilityActions" | "aria-busy" | "aria-checked" | "aria-disabled" | "aria-expanded" | "aria-selected" | "aria-hidden" | "accessibilityLabelledBy" | "aria-labelledby" | "accessibilityLiveRegion" | "aria-live" | "importantForAccessibility" | "screenReaderFocusable" | "children" | "style" | "collapsable" | "collapsableChildren" | "id" | "testID" | "nativeID" | "needsOffscreenAlphaCompositing" | "hitSlop" | "pointerEvents" | "removeClippedSubviews" | "experimental_accessibilityOrder"> & Omit<Readonly<{
    onBlur?: ((event: import("react-native").BlurEvent) => void) | undefined;
    onBlurCapture?: ((event: import("react-native").BlurEvent) => void) | undefined;
    onFocus?: ((event: import("react-native").FocusEvent) => void) | undefined;
    onFocusCapture?: ((event: import("react-native").FocusEvent) => void) | undefined;
}>, "onClick" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "nativeBackgroundAndroid" | "nativeForegroundAndroid" | "renderToHardwareTextureAndroid" | "hasTVPreferredFocus" | "nextFocusDown" | "nextFocusForward" | "nextFocusLeft" | "nextFocusRight" | "nextFocusUp" | "focusable" | "tabIndex" | "shouldRasterizeIOS" | "accessibilityIgnoresInvertColors" | "accessibilityViewIsModal" | "accessibilityShowsLargeContentViewer" | "accessibilityLargeContentTitle" | "aria-modal" | "accessibilityElementsHidden" | "accessibilityLanguage" | "accessibilityRespondsToUserInteraction" | "accessible" | "accessibilityLabel" | "accessibilityHint" | "aria-label" | "accessibilityRole" | "role" | "accessibilityState" | "accessibilityValue" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "accessibilityActions" | "aria-busy" | "aria-checked" | "aria-disabled" | "aria-expanded" | "aria-selected" | "aria-hidden" | "accessibilityLabelledBy" | "aria-labelledby" | "accessibilityLiveRegion" | "aria-live" | "importantForAccessibility" | "screenReaderFocusable" | "children" | "style" | "collapsable" | "collapsableChildren" | "id" | "testID" | "nativeID" | "needsOffscreenAlphaCompositing" | "hitSlop" | "pointerEvents" | "removeClippedSubviews" | "experimental_accessibilityOrder"> & Omit<Readonly<{
    onTouchCancel?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onTouchCancelCapture?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onTouchEnd?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onTouchEndCapture?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onTouchMove?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onTouchMoveCapture?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onTouchStart?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onTouchStartCapture?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
}>, "onClick" | "nativeBackgroundAndroid" | "nativeForegroundAndroid" | "renderToHardwareTextureAndroid" | "hasTVPreferredFocus" | "nextFocusDown" | "nextFocusForward" | "nextFocusLeft" | "nextFocusRight" | "nextFocusUp" | "focusable" | "tabIndex" | "shouldRasterizeIOS" | "accessibilityIgnoresInvertColors" | "accessibilityViewIsModal" | "accessibilityShowsLargeContentViewer" | "accessibilityLargeContentTitle" | "aria-modal" | "accessibilityElementsHidden" | "accessibilityLanguage" | "accessibilityRespondsToUserInteraction" | "accessible" | "accessibilityLabel" | "accessibilityHint" | "aria-label" | "accessibilityRole" | "role" | "accessibilityState" | "accessibilityValue" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "accessibilityActions" | "aria-busy" | "aria-checked" | "aria-disabled" | "aria-expanded" | "aria-selected" | "aria-hidden" | "accessibilityLabelledBy" | "aria-labelledby" | "accessibilityLiveRegion" | "aria-live" | "importantForAccessibility" | "screenReaderFocusable" | "children" | "style" | "collapsable" | "collapsableChildren" | "id" | "testID" | "nativeID" | "needsOffscreenAlphaCompositing" | "hitSlop" | "pointerEvents" | "removeClippedSubviews" | "experimental_accessibilityOrder"> & Omit<Readonly<{
    nativeBackgroundAndroid?: import("react-native/types_generated/Libraries/Components/View/ViewPropTypes").AndroidDrawable | undefined;
    nativeForegroundAndroid?: import("react-native/types_generated/Libraries/Components/View/ViewPropTypes").AndroidDrawable | undefined;
    renderToHardwareTextureAndroid?: boolean | undefined;
    hasTVPreferredFocus?: boolean | undefined;
    nextFocusDown?: number | undefined;
    nextFocusForward?: number | undefined;
    nextFocusLeft?: number | undefined;
    nextFocusRight?: number | undefined;
    nextFocusUp?: number | undefined;
    focusable?: boolean | undefined;
    tabIndex?: 0 | -1;
    onClick?: ((event: import("react-native").GestureResponderEvent) => unknown) | undefined;
}>, "shouldRasterizeIOS" | "accessibilityIgnoresInvertColors" | "accessibilityViewIsModal" | "accessibilityShowsLargeContentViewer" | "accessibilityLargeContentTitle" | "aria-modal" | "accessibilityElementsHidden" | "accessibilityLanguage" | "accessibilityRespondsToUserInteraction" | "accessible" | "accessibilityLabel" | "accessibilityHint" | "aria-label" | "accessibilityRole" | "role" | "accessibilityState" | "accessibilityValue" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "accessibilityActions" | "aria-busy" | "aria-checked" | "aria-disabled" | "aria-expanded" | "aria-selected" | "aria-hidden" | "accessibilityLabelledBy" | "aria-labelledby" | "accessibilityLiveRegion" | "aria-live" | "importantForAccessibility" | "screenReaderFocusable" | "children" | "style" | "collapsable" | "collapsableChildren" | "id" | "testID" | "nativeID" | "needsOffscreenAlphaCompositing" | "hitSlop" | "pointerEvents" | "removeClippedSubviews" | "experimental_accessibilityOrder"> & Omit<Readonly<{
    shouldRasterizeIOS?: boolean | undefined;
}>, "accessibilityIgnoresInvertColors" | "accessibilityViewIsModal" | "accessibilityShowsLargeContentViewer" | "accessibilityLargeContentTitle" | "aria-modal" | "accessibilityElementsHidden" | "accessibilityLanguage" | "accessibilityRespondsToUserInteraction" | "accessible" | "accessibilityLabel" | "accessibilityHint" | "aria-label" | "accessibilityRole" | "role" | "accessibilityState" | "accessibilityValue" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "accessibilityActions" | "aria-busy" | "aria-checked" | "aria-disabled" | "aria-expanded" | "aria-selected" | "aria-hidden" | "accessibilityLabelledBy" | "aria-labelledby" | "accessibilityLiveRegion" | "aria-live" | "importantForAccessibility" | "screenReaderFocusable" | "children" | "style" | "collapsable" | "collapsableChildren" | "id" | "testID" | "nativeID" | "needsOffscreenAlphaCompositing" | "hitSlop" | "pointerEvents" | "removeClippedSubviews" | "experimental_accessibilityOrder"> & Omit<Readonly<Omit<Readonly<{
    accessibilityLabelledBy?: (string | undefined) | (Array<string> | undefined);
    "aria-labelledby"?: string | undefined;
    accessibilityLiveRegion?: ("none" | "polite" | "assertive") | undefined;
    "aria-live"?: ("polite" | "assertive" | "off") | undefined;
    importantForAccessibility?: ("auto" | "yes" | "no" | "no-hide-descendants") | undefined;
    screenReaderFocusable?: boolean;
}>, "accessibilityIgnoresInvertColors" | "accessibilityViewIsModal" | "accessibilityShowsLargeContentViewer" | "accessibilityLargeContentTitle" | "aria-modal" | "accessibilityElementsHidden" | "accessibilityLanguage" | "accessibilityRespondsToUserInteraction" | "accessible" | "accessibilityLabel" | "accessibilityHint" | "aria-label" | "accessibilityRole" | "role" | "accessibilityState" | "accessibilityValue" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "accessibilityActions" | "aria-busy" | "aria-checked" | "aria-disabled" | "aria-expanded" | "aria-selected" | "aria-hidden"> & Omit<Readonly<{
    accessibilityIgnoresInvertColors?: boolean | undefined;
    accessibilityViewIsModal?: boolean | undefined;
    accessibilityShowsLargeContentViewer?: boolean | undefined;
    accessibilityLargeContentTitle?: string | undefined;
    "aria-modal"?: boolean | undefined;
    accessibilityElementsHidden?: boolean | undefined;
    accessibilityLanguage?: string | undefined;
    accessibilityRespondsToUserInteraction?: boolean | undefined;
}>, "accessible" | "accessibilityLabel" | "accessibilityHint" | "aria-label" | "accessibilityRole" | "role" | "accessibilityState" | "accessibilityValue" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "accessibilityActions" | "aria-busy" | "aria-checked" | "aria-disabled" | "aria-expanded" | "aria-selected" | "aria-hidden"> & {
    accessible?: boolean | undefined;
    accessibilityLabel?: string | undefined;
    accessibilityHint?: string | undefined;
    "aria-label"?: string | undefined;
    accessibilityRole?: import("react-native").AccessibilityRole | undefined;
    role?: import("react-native").Role | undefined;
    accessibilityState?: import("react-native").AccessibilityState | undefined;
    accessibilityValue?: import("react-native").AccessibilityValue | undefined;
    "aria-valuemax"?: import("react-native").AccessibilityValue["max"] | undefined;
    "aria-valuemin"?: import("react-native").AccessibilityValue["min"] | undefined;
    "aria-valuenow"?: import("react-native").AccessibilityValue["now"] | undefined;
    "aria-valuetext"?: import("react-native").AccessibilityValue["text"] | undefined;
    accessibilityActions?: ReadonlyArray<import("react-native/types_generated/Libraries/Components/View/ViewAccessibility").AccessibilityActionInfo> | undefined;
    "aria-busy"?: boolean | undefined;
    "aria-checked"?: (boolean | undefined) | "mixed";
    "aria-disabled"?: boolean | undefined;
    "aria-expanded"?: boolean | undefined;
    "aria-selected"?: boolean | undefined;
    "aria-hidden"?: boolean | undefined;
}>, "children" | "style" | "collapsable" | "collapsableChildren" | "id" | "testID" | "nativeID" | "needsOffscreenAlphaCompositing" | "hitSlop" | "pointerEvents" | "removeClippedSubviews" | "experimental_accessibilityOrder"> & Omit<Readonly<{
    children?: React.ReactNode;
    style?: import("react-native/types_generated/Libraries/StyleSheet/StyleSheet").ViewStyleProp | undefined;
    collapsable?: boolean | undefined;
    collapsableChildren?: boolean | undefined;
    id?: string;
    testID?: string | undefined;
    nativeID?: string | undefined;
    needsOffscreenAlphaCompositing?: boolean | undefined;
    hitSlop?: import("react-native/types_generated/Libraries/StyleSheet/EdgeInsetsPropType").EdgeInsetsOrSizeProp | undefined;
    pointerEvents?: ("auto" | "box-none" | "box-only" | "none") | undefined;
    removeClippedSubviews?: boolean | undefined;
    experimental_accessibilityOrder?: Array<string> | undefined;
}>, never>> & {
    threshold?: number;
    onFocus?: () => void;
    onBlur?: () => void;
} & import("react").RefAttributes<VisibilityViewRef>>;
export default VisibilityView;
//# sourceMappingURL=VisibilityView.d.ts.map