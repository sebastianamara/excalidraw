import { isDarwin } from "../constants";
import { t } from "../i18n";
import { getShortcutKey } from "../utils";
import { ActionName } from "./types";

export type ShortcutName =
  | SubtypeOf<
      ActionName,
      | "toggleTheme"
      | "loadScene"
      | "clearCanvas"
      | "cut"
      | "copy"
      | "paste"
      | "copyStyles"
      | "pasteStyles"
      | "selectAll"
      | "deleteSelectedElements"
      | "duplicateSelection"
      | "sendBackward"
      | "bringForward"
      | "sendToBack"
      | "bringToFront"
      | "copyAsPng"
      | "copyAsSvg"
      | "group"
      | "ungroup"
      | "gridMode"
      | "zenMode"
      | "stats"
      | "addToLibrary"
      | "viewMode"
      | "flipHorizontal"
      | "flipVertical"
      | "hyperlink"
      | "toggleLock"
    >
  | "saveScene"
  | "imageExport";

const shortcutMap: Record<ShortcutName, string[]> = {
  toggleTheme: [getShortcutKey("Shift+Alt+D")],
  saveScene: [getShortcutKey("CtrlOrCmd+S")],
  loadScene: [getShortcutKey("CtrlOrCmd+O")],
  clearCanvas: [getShortcutKey("CtrlOrCmd+Delete")],
  imageExport: [getShortcutKey("CtrlOrCmd+Shift+E")],
  cut: [getShortcutKey("CtrlOrCmd+X")],
  copy: [getShortcutKey("CtrlOrCmd+C")],
  paste: [getShortcutKey("CtrlOrCmd+V")],
  copyStyles: [getShortcutKey("CtrlOrCmd+Alt+C")],
  pasteStyles: [getShortcutKey("CtrlOrCmd+Alt+V")],
  selectAll: [getShortcutKey("CtrlOrCmd+A")],
  deleteSelectedElements: [getShortcutKey("Delete")],
  duplicateSelection: [
    getShortcutKey("CtrlOrCmd+D"),
    getShortcutKey(`Alt+${t("helpDialog.drag")}`),
  ],
  sendBackward: [getShortcutKey("CtrlOrCmd+[")],
  bringForward: [getShortcutKey("CtrlOrCmd+]")],
  sendToBack: [
    isDarwin
      ? getShortcutKey("CtrlOrCmd+Alt+[")
      : getShortcutKey("CtrlOrCmd+Shift+["),
  ],
  bringToFront: [
    isDarwin
      ? getShortcutKey("CtrlOrCmd+Alt+]")
      : getShortcutKey("CtrlOrCmd+Shift+]"),
  ],
  copyAsPng: [getShortcutKey("Shift+Alt+C")],
  copyAsSvg: [],
  group: [getShortcutKey("CtrlOrCmd+G")],
  ungroup: [getShortcutKey("CtrlOrCmd+Shift+G")],
  gridMode: [getShortcutKey("CtrlOrCmd+'")],
  zenMode: [getShortcutKey("Alt+Z")],
  stats: [getShortcutKey("Alt+/")],
  addToLibrary: [],
  flipHorizontal: [getShortcutKey("Shift+H")],
  flipVertical: [getShortcutKey("Shift+V")],
  viewMode: [getShortcutKey("Alt+R")],
  hyperlink: [getShortcutKey("CtrlOrCmd+K")],
  toggleLock: [getShortcutKey("CtrlOrCmd+Shift+L")],
};

export type CustomShortcutName = string;

let customShortcutMap: Record<CustomShortcutName, string[]> = {};

export const registerCustomShortcuts = (
  shortcuts: Record<CustomShortcutName, string[]>,
) => {
  customShortcutMap = { ...customShortcutMap, ...shortcuts };
};

export const getShortcutFromShortcutName = (
  name: ShortcutName | CustomShortcutName,
) => {
  const shortcuts =
    name in customShortcutMap
      ? customShortcutMap[name as CustomShortcutName]
      : shortcutMap[name as ShortcutName];
  // if multiple shortcuts available, take the first one
  return shortcuts && shortcuts.length > 0 ? shortcuts[0] : "";
};
