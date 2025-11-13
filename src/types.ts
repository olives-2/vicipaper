export type Preferences = {
  directory: string;
  command: string;
  recursive: boolean;
  columns: string | undefined // The only way to receive a number is through a textfield (for now at least)
};

export type Wallpaper = {
  path: string;
  name: string;
  title: string;
  parentDir: string;
};