import { createContext, useContext } from "react";

/**
 * Shell navigation, published to the pages by the app shell.
 *
 * Pages don't render the rail themselves — they only need to be able to reach
 * it on small screens, where it lives behind a drawer. Reading it from context
 * keeps `PageHeader` free of prop drilling through every page.
 */
interface NavContextValue {
  /** Opens the navigation drawer (only meaningful below the `lg` breakpoint). */
  openNav: () => void;
}

export const NavContext = createContext<NavContextValue | null>(null);

/** The shell navigation, or null when a page renders outside the shell. */
export function useNav(): NavContextValue | null {
  return useContext(NavContext);
}
