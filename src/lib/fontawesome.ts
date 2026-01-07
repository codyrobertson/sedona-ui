/**
 * Font Awesome Configuration
 *
 * This file sets up Font Awesome with:
 * - Free solid, regular, and brands icons
 * - Custom kit icons (etch, utility-fill, whiteboard styles)
 *
 * Import this file once in your app layout to initialize the library.
 *
 * Available prefixes:
 * - fas: Free Solid
 * - far: Free Regular
 * - fab: Free Brands
 * - faes: Kit Etch Solid (custom)
 * - faufsb: Kit Utility Fill Semibold (custom)
 * - fawsb: Kit Whiteboard Semibold (custom)
 */

import { library, config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"

// Prevent Font Awesome from adding its CSS since we're doing it manually
config.autoAddCss = false

// Free icon packs
import { fas } from "@fortawesome/free-solid-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"
import { fab } from "@fortawesome/free-brands-svg-icons"

// Custom kit icons
import { faes, faufsb, fawsb } from "@awesome.me/kit-1655babbde/icons"

// Add all icons to the library
library.add(
  fas,    // Free solid icons (fas prefix)
  far,    // Free regular icons (far prefix)
  fab,    // Free brands icons (fab prefix)
  faes,   // Kit: Etch Solid (faes prefix)
  faufsb, // Kit: Utility Fill Semibold (faufsb prefix)
  fawsb,  // Kit: Whiteboard Semibold (fawsb prefix)
)

export { library, config }
