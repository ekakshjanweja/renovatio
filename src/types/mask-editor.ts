declare interface EditorDimensions {
  height: number;
  width: number;
}

export interface MaskEditorProps extends EditorDimensions {
  image: string;
  cursorSize: number;
}
