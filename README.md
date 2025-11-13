
# Vicipaper - Wallpaper extension for Vicinae

<div style="display: flex; justify-content: center; align-items: center;">
    <img src="./assets/extension_icon.png" width=256>
</div>

This is a [Vicinae](https://github.com/vicinaehq/vicinae) extension that allows you to set a wallpaper using a custom command. It *should* be compatible with Raycast, but it has not been tested.

## Installing

Clone this repository and go to the project root. From there, run

```bash
npm install
npm run build
```

To run the extension in dev mode, run:

```bash
npm install
npm run dev
```

## Usage

Run the [Deeplink](vicinae://extensions/Matis_Olives/wallpaper/wallpaper-setter) or run the "Set Wallpaper" command in Vicinae, fill the preferences, search and select for the wallpaper to set!

### Actions

- "Set Wallpaper": sets the wallpaper's 
- "Copy Wallpaper path": copies the wallpaper's path to the clipboard.
- "Open Wallpaper": opens the wallpaper using your system's default application for the wallpaper's file type.
- "Show Wallpaper directory": opens the wallpaper's parent folder / directory using your system's default file browser.

## Preferences

| Preference | Description                                                                                                         | Required/Optional | Default |
|------------|---------------------------------------------------------------------------------------------------------------------|-------------------|---------|
| Directory  | Set the directory in which wallpapers are stored                                                                    | Required          | N/A     |
| Command    | Set the command to run to apply the wallpaper. References to "%img" will be replaced with the path of the wallpaper | Required          | N/A     |
|  Recursive | Make the wallpaper search recursive                                                              | Optional          | False   |
| Columns    | Number of columns to display                                                                                        | Optional          | 3       |

### Example command

If using [Matugen](https://github.com/InioX/matugen), you can use a command similar to this:

```sh
matugen image %img% # %img% will be replaced by the image path
```

For [SWWW](https://github.com/LGFae/swww), you could use something like this:

```sh
swww img %img%
```