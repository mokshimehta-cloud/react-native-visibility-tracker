import { requireNativeComponent } from 'react-native';
import type { ViewProps, NativeSyntheticEvent } from 'react-native';
import { forwardRef, useImperativeHandle, useRef } from 'react';

type VisibilityEvent = {
  focused: boolean;
};

type NativeProps = ViewProps & {
  threshold?: number;
  onVisibilityChange?: (event: NativeSyntheticEvent<VisibilityEvent>) => void;
};

const NativeVisibilityView =
  requireNativeComponent<NativeProps>('VisibilityView');

type Props = ViewProps & {
  threshold?: number;
  onFocus?: () => void;
  onBlur?: () => void;
};

export type VisibilityViewRef = {
  /** Returns the current focused state without triggering a re-render. */
  checkIsFocused: () => boolean;
};

const VisibilityView = forwardRef<VisibilityViewRef, Props>(
  function VisibilityView({ threshold = 0.5, onFocus, onBlur, ...rest }, ref) {
    const isFocusedRef = useRef(false);

    useImperativeHandle(ref, () => ({
      checkIsFocused: () => isFocusedRef.current,
    }));

    return (
      <NativeVisibilityView
        {...rest}
        threshold={threshold}
        onVisibilityChange={(event) => {
          const { focused } = event.nativeEvent;
          isFocusedRef.current = focused;
          if (focused) {
            onFocus?.();
          } else {
            onBlur?.();
          }
        }}
      />
    );
  }
);

export default VisibilityView;
