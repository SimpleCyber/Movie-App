import { View } from "react-native";
import { WebView } from "react-native-webview";

const YouTubePlayer = ({ videoKey }: { videoKey: string }) => {
  return (
    <View className="flex-1 bg-black">
      <WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{
          uri: `https://www.youtube.com/embed/${videoKey}?controls=1&autoplay=1`,
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default YouTubePlayer;
