import * as React from "react";
import {
  unstable_useCompositeState as useCompositeState,
  unstable_useComposite as useComposite,
  unstable_CompositeOptions as CompositeOptions,
  unstable_CompositeHTMLProps as CompositeHTMLProps,
  unstable_CompositeInitialState as CompositeInitialState,
  useBox,
} from "reakit";
import { createHook, createComponent } from "reakit-system";

export type InitialState = CompositeInitialState;

export const useComboboxState = (initialState: InitialState = {}) => {
  const combobox = useCompositeState({
    ...initialState,
    unstable_virtual: true,
  });
  return combobox;
};

useComboboxState.__keys = useCompositeState.__keys;

const useCombobox = createHook<
  CompositeOptions,
  React.InputHTMLAttributes<HTMLInputElement> & CompositeHTMLProps
>({
  name: "Combobox",
  compose: useComposite,
  useState: useComboboxState,
  useProps(options, { onKeyDown, onKeyUp, ...htmlProps }) {
    return {
      role: "combobox",
      "aria-haspopup": "grid",
      "aria-expanded": true,
      "aria-controls": `${options.baseId}-grid`,
      ...htmlProps,
    };
  },
  useComposeProps(options, htmlProps) {
    const { onKeyUp, onKeyDown, ...compositeHTMLProps } = useComposite(
      options,
      htmlProps,
      true
    );
    const onKey = (handler?: React.KeyboardEventHandler) => (
      event: React.KeyboardEvent
    ) => {
      const inputHasFocus = options.currentId === null;
      if (inputHasFocus) {
        if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
          return;
        }
      } else if (event.key.startsWith("Arrow")) {
        event.preventDefault();
      }
      if (event.key === " ") {
        return;
      }
      handler?.(event);
    };
    return {
      ...compositeHTMLProps,
      onKeyDown: onKey(onKeyDown),
      onKeyUp: onKey(onKeyUp),
    };
  },
});

export const Combobox = createComponent({ as: "input", useHook: useCombobox });

const useComboboxGrid = createHook<CompositeOptions, CompositeHTMLProps>({
  name: "ComboboxGrid",
  compose: useBox,
  useState: useComboboxState,
  useProps(options, htmlProps) {
    return {
      role: "grid",
      id: `${options.baseId}-grid`,
      ...htmlProps,
    };
  },
});

export const ComboboxGrid = createComponent({
  as: "div",
  useHook: useComboboxGrid,
});
