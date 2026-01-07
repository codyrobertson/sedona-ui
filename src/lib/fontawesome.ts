/**
 * Font Awesome Configuration
 *
 * This file sets up Font Awesome with the icons we need.
 *
 * Available prefixes:
 * - fass: Sharp Solid
 * - fas: Free Solid
 * - far: Free Regular
 * - fab: Free Brands
 * - faes: Kit Etch Solid (use for landing/branding)
 * - faufsb: Kit Utility Fill Semibold
 * - fawsb: Kit Whiteboard Semibold
 *
 * USAGE:
 * - For common UI icons: <Icon icon="check" /> (uses DEFAULT_ICON_PREFIX)
 * - For kit icons: <Icon icon={["faes", "check"]} />
 * - For brands: <Icon icon={["fab", "discord"]} />
 */

import { library, config, type IconPrefix } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"

// Prevent Font Awesome from adding its CSS since we're doing it manually
config.autoAddCss = false

/**
 * DEFAULT ICON PREFIX
 * Change this to switch all icons to a different style.
 * Options: "fass" (Sharp Solid), "fas" (Free Solid), "faes" (Etch), etc.
 */
export const DEFAULT_ICON_PREFIX: IconPrefix = "fass"

// Import Sharp Solid (primary)
import { fass } from "@fortawesome/sharp-solid-svg-icons"
// Import free icons as fallback
import { fas } from "@fortawesome/free-solid-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"
import { fab } from "@fortawesome/free-brands-svg-icons"

// Import kit icons
import { faes, faufsb, fawsb } from "@awesome.me/kit-1655babbde/icons"

// Register all icon packs with the library
library.add(fass, fas, far, fab, faes, faufsb, fawsb)

export { library, config }
