# @devx-commerce/react-native-viewport-observer

A React Native library that tracks whether a view is visible on screen. Built for smooth video feed experiences — plays a video when it scrolls into view and pauses it when it scrolls out, without extra load or jank.

Works on both **iOS** and **Android** using native viewport observers.

## Installation

```sh
npm install @devx-commerce/react-native-viewport-observer
```

or

```sh
yarn add @devx-commerce/react-native-viewport-observer
```

## Usage

Wrap any component with `VisibilityView`. It fires `onFocus` when the view becomes visible and `onBlur` when it leaves the screen.

```tsx
import { VisibilityView } from '@devx-commerce/react-native-viewport-observer';

<VisibilityView
  style={{ flex: 1 }}
  threshold={0.8}
  onFocus={() => console.log('visible')}
  onBlur={() => console.log('hidden')}
>
  {/* your content */}
</VisibilityView>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `threshold` | `number` | `0.5` | Fraction of the view that must be visible to trigger `onFocus`. Range: `0.0` – `1.0` |
| `onFocus` | `() => void` | — | Called when the view enters the viewport |
| `onBlur` | `() => void` | — | Called when the view exits the viewport |
| `style` | `ViewStyle` | — | Standard React Native view styles |
| `...ViewProps` | — | — | All other standard View props are supported |

## Example — Auto-play Video Feed

This is the primary use case: a scrollable feed where videos auto-play when visible and pause when scrolled away.

```tsx
import { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { VisibilityView } from '@devx-commerce/react-native-viewport-observer';
import { FlashList } from '@shopify/flash-list';

const videos = [
  { id: '1', url: 'https://example.com/video1.mp4' },
  { id: '2', url: 'https://example.com/video2.mp4' },
  { id: '3', url: 'https://example.com/video3.mp4' },
];

const VideoRow = ({ url }: { url: string }) => {
  const [paused, setPaused] = useState(true);
  const videoRef = useRef<any>(null);
  const isReady = useRef(false);
  const isFocused = useRef(false);

  return (
    <View style={styles.videoContainer}>
      <VisibilityView
        style={{ flex: 1 }}
        threshold={0.8}
        onFocus={() => {
          isFocused.current = true;
          // Only play once the video is ready to display
          if (isReady.current) setPaused(false);
        }}
        onBlur={() => {
          isFocused.current = false;
          setPaused(true);
        }}
      >
        <Video
          ref={videoRef}
          source={{ uri: url }}
          paused={paused}
          repeat
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
          onReadyForDisplay={() => {
            isReady.current = true;
            // Start playing if already in view
            if (isFocused.current) setPaused(false);
          }}
        />
      </VisibilityView>
    </View>
  );
};

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={videos}
        renderItem={({ item }) => <VideoRow url={item.url} />}
        keyExtractor={(item) => item.id}
        estimatedItemSize={500}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    height: 500,
    backgroundColor: 'black',
    marginVertical: 6,
  },
});
```

## How it works

`VisibilityView` uses native view tracking on iOS and Android to detect how much of the view is within the visible screen area. When the visible fraction crosses the `threshold`, it fires `onFocus`. When it drops below, it fires `onBlur`.

This is more reliable and performant than JS-based scroll position calculations because:
- No scroll event listeners needed
- Works with any scroll container (`FlatList`, `FlashList`, `ScrollView`, etc.)
- Native-level precision — no frame drops

## Tips

- Use `threshold={0.8}` for videos so they only play when mostly visible
- Use `threshold={0.1}` for lazy-loading content that should trigger early
- Combine with `onReadyForDisplay` from `react-native-video` to avoid playing before the first frame is decoded (prevents black flash)
- Save video playback position in a `Map` keyed by URL to resume from the same spot when the video re-enters view

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
