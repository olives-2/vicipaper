import {
  ActionPanel,
  Action,
  Icon,
  getPreferenceValues,
  Grid,
  closeMainWindow
} from '@vicinae/api';
import { Preferences, Wallpaper } from './types';
import { getWallpaperList } from './util';
import { exec } from 'node:child_process';

const preferences = getPreferenceValues<Preferences>();

export default function WallpaperGrid() {
  const wallpapers = getWallpaperList(preferences.directory, preferences.recursive);
  return (
    <Grid
      columns={preferences.columns && !Number.isNaN(preferences.columns) ?
        Number(preferences.columns) :
        3}
      aspectRatio="16/9"
      fit={Grid.Fit.Fill}
      searchBarPlaceholder="Browse wallpapers..."
    >
      <Grid.EmptyView
        icon={Icon.EyeDisabled}
        title="No wallpaper"
        description="No wallpaper exists in this directory or the directory doesn't exist" />
      {wallpapers.map(wallpaper => (
        <Grid.Item
          key={wallpaper.path}
          content={wallpaper.path}
          title={wallpaper.title}
          icon={{
            source: wallpaper.path
          }}
          actions={
            <ActionPanel>
              <Action title="Set wallpaper" icon={Icon.Image} onAction={() => setWallpaper(wallpaper, preferences.command)} />
              <Action.CopyToClipboard title="Copy wallpaper path" content={wallpaper.path} />
              <Action.Open title="Open wallpaper with default application" icon={Icon.Image} target={wallpaper.path} />
              <Action.Open title="Show wallpaper directory" icon={Icon.Folder} target={wallpaper.parentDir} />
            </ActionPanel>
          }
        />
      ))}
    </Grid>
  );
}

/**
 * Sets the wallpaper using a custom command.
 * @param wallpaper The wallpaper to set
 * @param command The custom command
 */
export function setWallpaper(wallpaper: Wallpaper, command: string) {
  exec(command.replace(/\%img\%/g, `"${wallpaper.path}"`));
  closeMainWindow();
}