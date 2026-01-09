export interface BrandNavItem {
  label: string
  href: string
  icon: string
  description: string
}

export const brandNavigation: BrandNavItem[] = [
  {
    label: "Overview",
    href: "/brand",
    icon: "home",
    description: "Brand at a glance",
  },
  {
    label: "Logo",
    href: "/brand/logo",
    icon: "diamond",
    description: "Logomark & usage",
  },
  {
    label: "Colors",
    href: "/brand/colors",
    icon: "palette",
    description: "Zeus color system",
  },
  {
    label: "Typography",
    href: "/brand/typography",
    icon: "type",
    description: "Fonts & scale",
  },
  {
    label: "Voice & Tone",
    href: "/brand/voice",
    icon: "message-circle",
    description: "Tone & messaging",
  },
  {
    label: "Patterns",
    href: "/brand/patterns",
    icon: "layers",
    description: "Gradients & textures",
  },
  {
    label: "Press Kit",
    href: "/brand/press-kit",
    icon: "download",
    description: "Media assets",
  },
  {
    label: "Social",
    href: "/brand/social",
    icon: "share-2",
    description: "Social templates",
  },
]
