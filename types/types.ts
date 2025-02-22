export const ScreenType = {
  Journal: { name: "Journal", id: 1 },
  Chat: { name: "Chat", id: 2 },
  Join: { name: "Join", id: 3 },
  Profile: { name: "Profile", id: 4 },
};

export type ScreenType = keyof typeof ScreenType;
