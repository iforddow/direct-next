import { useContext } from "react";
import { VisualEditingContext } from "../provider/visual-editing-provider";

// Custom hook to use the context
export function useVisualEditing() {
  const context = useContext(VisualEditingContext);
  if (context === undefined) {
    throw new Error(
      "useVisualEditing must be used within a VisualEditingProvider",
    );
  }
  return context;
}
