"use strict";

import { requireNativeComponent } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
const NativeVisibilityView = requireNativeComponent('VisibilityView');
export default function VisibilityView({
  threshold = 0.5,
  onFocus,
  onBlur,
  ...rest
}) {
  return /*#__PURE__*/_jsx(NativeVisibilityView, {
    ...rest,
    threshold: threshold,
    onVisibilityChange: event => {
      const {
        focused
      } = event.nativeEvent;
      if (focused) {
        onFocus?.();
      } else {
        onBlur?.();
      }
    }
  });
}
//# sourceMappingURL=VisibilityView.js.map