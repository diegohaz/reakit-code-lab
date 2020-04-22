export type Skin = {
  annotation: string;
  name: string;
  hexcode: string;
  shortcodes: string[];
  emoji: string;
  text: string;
  type: number;
  order: number;
  group: number;
  subgroup: number;
  version: number;
  tone: number;
};

export type Emoji = {
  annotation: string;
  name: string;
  hexcode: string;
  shortcodes: string[];
  tags: string[];
  emoji: string;
  text: string;
  type: number;
  order: number;
  group: number;
  subgroup: number;
  version: number;
  skins?: Skin[];
};
