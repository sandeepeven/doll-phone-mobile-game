import { Colors, Fonts } from "@/styles";
import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntennaLight } from "./antenna-light";

type PhoneBodyProps = PropsWithChildren<{
  width: number;
  isPlaying: boolean;
  lightPattern: number;
}>;

const SPEAKER_HOLES = 7;

function PhoneBody({ width, isPlaying, lightPattern, children }: PhoneBodyProps) {
  return (
    <View style={[styles.wrapper, { width }]}>
      <View style={styles.antenna}>
        <AntennaLight isPlaying={isPlaying} patternIndex={lightPattern} />
      </View>
      <View style={styles.edge}>
        <View style={styles.shell}>
          <View style={styles.speaker}>
            {Array.from({ length: SPEAKER_HOLES }, (_, i) => (
              <View key={i} style={styles.speakerHole} />
            ))}
          </View>
          {children}
          <Text style={styles.brand}>Doll Phone</Text>
        </View>
      </View>
    </View>
  );
}

export { PhoneBody };

const RADIUS = 44;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: "center",
  },
  antenna: {
    position: "absolute",
    top: -6,
    right: 54,
    width: 22,
    height: 40,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    backgroundColor: Colors.shellEdge,
    alignItems: "center",
  },
  edge: {
    flex: 1,
    marginTop: 18,
    borderRadius: RADIUS,
    backgroundColor: Colors.shellEdge,
    paddingBottom: 10,
  },
  shell: {
    flex: 1,
    borderRadius: RADIUS,
    backgroundColor: Colors.shell,
    borderTopWidth: 4,
    borderTopColor: Colors.shellHighlight,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 10,
  },
  speaker: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginBottom: 12,
  },
  speakerHole: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.shellEdge,
  },
  brand: {
    marginTop: 8,
    textAlign: "center",
    fontFamily: Fonts.bold,
    fontSize: 16,
    letterSpacing: 2,
    color: Colors.shellHighlight,
  },
});
