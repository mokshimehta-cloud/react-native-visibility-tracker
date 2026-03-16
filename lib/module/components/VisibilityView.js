"use strict";

import { requireNativeComponent } from 'react-native';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
const NativeVisibilityView = requireNativeComponent('VisibilityView');
const VisibilityView = /*#__PURE__*/forwardRef(function VisibilityView({
  threshold = 0.5,
  onFocus,
  onBlur,
  ...rest
}, ref) {
  const isFocusedRef = useRef(false);
  useImperativeHandle(ref, () => ({
    checkIsFocused: () => isFocusedRef.current
  }));
  return /*#__PURE__*/_jsx(NativeVisibilityView, {
    ...rest,
    threshold: threshold,
    onVisibilityChange: event => {
      const {
        focused
      } = event.nativeEvent;
      isFocusedRef.current = focused;
      if (focused) {
        onFocus?.();
      } else {
        onBlur?.();
      }
    }
  });
});
export default VisibilityView;
//# sourceMappingURL=VisibilityView.js.map