import { requireNativeComponent } from 'react-native';
import type { ViewProps, NativeSyntheticEvent } from 'react-native';
import { forwardRef, useImperativeHandle, useRef } from 'react';

type VisibilityEvent = {
  focused: boolean;
};

type NativeProps = ViewProps & {
  threshold?: number;
  trackDuringScroll?: boolean;
  onVisibilityChange?: (event: NativeSyntheticEvent<VisibilityEvent>) => void;
};

const NativeVisibilityView =
  requireNativeComponent<NativeProps>('VisibilityView');

type Props = ViewProps & {
  threshold?: number;
  /**
   * Emit focus/blur DURING an active scroll instead of only after it settles.
   * Off by default. When off, the view reports visibility on settle only
   * (Android suppresses its checks mid-scroll; iOS suppresses emission while
   * the scroll offset is changing). Opt in per-view where live during-scroll
   * visibility is worth the extra work — e.g. keeping an on-screen video
   * playing while the list scrolls.
   */
  trackDuringScroll?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
};

export type VisibilityViewRef = {
  /** Returns the current focused state without triggering a re-render. */
  checkIsFocused: () => boolean;
};

const VisibilityView = forwardRef<VisibilityViewRef, Props>(
  function VisibilityView(
    { threshold = 0.5, trackDuringScroll = false, onFocus, onBlur, ...rest },
    ref
  ) {
    const isFocusedRef = useRef(false);

    useImperativeHandle(ref, () => ({
      checkIsFocused: () => isFocusedRef.current,
    }));

    return (
      <NativeVisibilityView
        {...rest}
        threshold={threshold}
        trackDuringScroll={trackDuringScroll}
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
