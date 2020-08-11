import { ReactElement } from "react";

/**
 * Checks if all Component properties are defined.
 *
 * Intended to be used on Components that have no optional props.
 * Helps avoid having to perform prop checking in the parent Component, e.g.:
 * {(propA && propB) && <Component propA={propA} propB={propB}/>}
 */
function checkProps(Component: ReactElement) {

  if (!Component.props) {
    return Component;
  }

  for (let i = 0; i < Object.values(Component.props).length; i++) {
    if (Object.entries(Component.props)[i][1] === undefined) {
      return null;
    }
  }

  return Component;
}

export {checkProps};
