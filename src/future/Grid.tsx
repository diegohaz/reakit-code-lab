import * as React from "react";
import {
  unstable_useCompositeState as useCompositeState,
  unstable_useComposite as useComposite,
  unstable_CompositeOptions as CompositeOptions,
  unstable_CompositeHTMLProps as CompositeHTMLProps,
  unstable_useCompositeGroup as useCompositeGroup,
  unstable_CompositeGroupOptions as CompositeGroupOptions,
  unstable_CompositeGroupHTMLProps as CompositeGroupHTMLProps,
  unstable_useCompositeItem as useCompositeItem,
  unstable_CompositeItemOptions as CompositeItemOptions,
  unstable_CompositeItemHTMLProps as CompositeItemHTMLProps,
  unstable_CompositeInitialState as CompositeInitialState,
  unstable_CompositeStateReturn as CompositeStateReturn,
} from "reakit";
import { createHook, createComponent } from "reakit-system";

export type InitialState = CompositeInitialState & { virtual?: boolean };

export const useGridState = ({
  virtual,
  ...initialState
}: InitialState = {}) => {
  const grid = useCompositeState({
    ...initialState,
    unstable_virtual: virtual,
  });
  return grid;
};

useGridState.__keys = useCompositeState.__keys;

const useGrid = createHook<CompositeOptions, CompositeHTMLProps>({
  name: "Grid",
  compose: useComposite,
  useState: useGridState,
  useProps(_, htmlProps) {
    return { role: "grid", ...htmlProps };
  },
});

export const Grid = createComponent({ as: "div", useHook: useGrid });

const useGridRow = createHook<CompositeGroupOptions, CompositeGroupHTMLProps>({
  name: "GridRow",
  compose: useCompositeGroup,
  useState: useGridState,
  useProps(_, htmlProps) {
    return { role: "row", ...htmlProps };
  },
});

export const GridRow = createComponent({ as: "div", useHook: useGridRow });

const useGridCell = createHook<
  CompositeItemOptions & Pick<CompositeStateReturn, "move">,
  CompositeItemHTMLProps
>({
  name: "GridCell",
  compose: useCompositeItem,
  useState: useGridState,
  useProps(options, { onClick: htmlOnClick, ...htmlProps }) {
    const onClick = (event: React.MouseEvent) => {
      htmlOnClick?.(event);
      if (event.defaultPrevented) return;
      if (options.id) {
        options.move?.(options.id);
      }
    };
    return { role: "gridcell", onClick, ...htmlProps };
  },
});

export const GridCell = createComponent({ as: "span", useHook: useGridCell });
