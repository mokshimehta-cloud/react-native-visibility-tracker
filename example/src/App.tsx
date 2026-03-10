import { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { VisibilityView } from 'react-native-viewport-observer';
import { FlashList } from '@shopify/flash-list';

const { width } = Dimensions.get('window');

type VideoItem = { kind: 'video'; id: string; title: string; urls: string[] };
type TextItem = { kind: 'text'; id: string; heading: string; body: string };
type BannerItem = { kind: 'block'; id: string; label: string; color: string };
type FeedItem = VideoItem | TextItem | BannerItem;

type FlatRow =
  | { kind: 'video'; id: string; url: string }
  | { kind: 'text'; id: string; heading: string; body: string }
  | { kind: 'block'; id: string; label: string; color: string };

const FEED: FeedItem[] = [
  {
    kind: 'text',
    id: 't1',
    heading: 'Welcome',
    body: 'Scroll to see videos',
  },
  {
    kind: 'video',
    id: 'v1',
    title: 'Nature',
    urls: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    ],
  },
  {
    kind: 'block',
    id: 'b1',
    label: 'Trending',
    color: '#FF6B35',
  },
  {
    kind: 'video',
    id: 'v2',
    title: 'Short Films',
    urls: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_5MB.mp4',
    ],
  },
  {
    kind: 'video',
    id: 'v3',
    title: 'Nature',
    urls: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    ],
  },
  {
    kind: 'video',
    id: 'v4',
    title: 'Nature',
    urls: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    ],
  },
  {
    kind: 'video',
    id: 'v5',
    title: 'Nature',
    urls: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    ],
  },
  {
    kind: 'video',
    id: 'v6',
    title: 'Nature',
    urls: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    ],
  },
  {
    kind: 'video',
    id: 'v7',
    title: 'Nature',
    urls: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    ],
  },
  {
    kind: 'video',
    id: 'v8',
    title: 'Nature',
    urls: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    ],
  },
  {
    kind: 'video',
    id: 'v9',
    title: 'Nature',
    urls: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    ],
  },
  {
    kind: 'video',
    id: 'v10',
    title: 'Nature',
    urls: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    ],
  },
  {
    kind: 'video',
    id: 'v11',
    title: 'Nature',
    urls: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    ],
  },
];

const flattenFeed = (feed: FeedItem[]): FlatRow[] => {
  const rows: FlatRow[] = [];

  feed.forEach((item) => {
    if (item.kind === 'video') {
      item.urls.forEach((url, i) =>
        rows.push({
          kind: 'video',
          id: `${item.id}-${i}`,
          url,
        })
      );
    } else {
      rows.push(item);
    }
  });

  return rows;
};

const DATA = flattenFeed(FEED);

// Persists video positions across FlashList remounts
const videoPositions = new Map<string, number>();

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
          onLoad={() => {
            // Seek while still paused — fires before onReadyForDisplay so
            // the first displayed frame is already at the saved position.
            const saved = videoPositions.get(url);
            if (saved) videoRef.current?.seek(saved);
          }}
          onReadyForDisplay={() => {
            isReady.current = true;
            if (isFocused.current) setPaused(false);
          }}
          onProgress={({ currentTime }) => {
            videoPositions.set(url, currentTime);
          }}
          progressUpdateInterval={1000}
          bufferConfig={{
            minBufferMs: 2500,
            maxBufferMs: 5000,
            bufferForPlaybackMs: 1000,
            bufferForPlaybackAfterRebufferMs: 2000,
          }}
        />
      </VisibilityView>
    </View>
  );
};

export default function App() {
  const renderRow = ({ item }: { item: FlatRow }) => {
    if (item.kind === 'text') {
      return (
        <View key={item.id} style={styles.textCard}>
          <Text style={styles.heading}>{item.heading}</Text>
          <Text style={styles.body}>{item.body}</Text>
        </View>
      );
    }

    if (item.kind === 'block') {
      return (
        <View
          key={item.id}
          style={[styles.banner, { backgroundColor: item.color }]}
        >
          <Text style={styles.bannerText}>{item.label}</Text>
        </View>
      );
    }

    return <VideoRow key={item.id} url={item.url} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={DATA}
        renderItem={renderRow}
        keyExtractor={(item) => item.id}
        getItemType={(item) => item.kind}
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

  video: {
    width,
    height: 500,
  },

  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 6,
    borderRadius: 8,
  },

  badgeText: {
    color: '#fff',
    fontSize: 11,
  },

  textCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  body: {
    fontSize: 14,
    marginTop: 6,
  },

  banner: {
    margin: 16,
    padding: 30,
    borderRadius: 10,
  },

  bannerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
