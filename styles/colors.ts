export const Colors = {
  white: "#FFFFFF",
  ink: "#4A2545",
  inkSoft: "#8A5C82",
  background: "#FFE3EF",
  backgroundDots: "#FFC9DF",
  shell: "#FF5FA2",
  shellEdge: "#D63D82",
  shellHighlight: "#FF8DC0",
  screen: "#EAF8FF",
  screenGlow: "#C9EEFF",
  bezel: "#4A2545",
  accent: "#FFD43B",
  lightIdle: "#FFE066",
  lightPlaying: "#FF922B",
  lightPlayingOff: "#B8550A",
};

/** Darkens a #RRGGBB color by the given fraction (0-1). */
export function shade(hex: string, amount = 0.2) {
  const value = parseInt(hex.slice(1), 16);
  const channel = (shift: number) =>
    Math.round(((value >> shift) & 0xff) * (1 - amount));
  return `rgb(${channel(16)}, ${channel(8)}, ${channel(0)})`;
}
