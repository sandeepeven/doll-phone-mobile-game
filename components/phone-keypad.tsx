import { KEYS_PER_ROW, type PhoneKey } from "@/constants/phone-keys";
import { StyleSheet, View } from "react-native";
import { PhoneButton } from "./phone-button";

type PhoneKeypadProps = {
  keys: PhoneKey[];
  keyHeight: number;
  gap: number;
  onPress: (phoneKey: PhoneKey) => void;
};

function PhoneKeypad({ keys, keyHeight, gap, onPress }: PhoneKeypadProps) {
  const rows: PhoneKey[][] = [];
  for (let i = 0; i < keys.length; i += KEYS_PER_ROW) {
    rows.push(keys.slice(i, i + KEYS_PER_ROW));
  }

  return (
    <View style={{ gap }}>
      {rows.map((row) => (
        <View key={row[0].label} style={[styles.row, { gap }]}>
          {row.map((phoneKey) => (
            <PhoneButton
              key={phoneKey.label}
              phoneKey={phoneKey}
              height={keyHeight}
              onPress={onPress}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

export { PhoneKeypad };

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
