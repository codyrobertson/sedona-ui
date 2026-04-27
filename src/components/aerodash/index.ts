// AeroDash component family — y2k chrome aesthetic, shadcn-style primitives.

// Button
export {
  Button,
  ButtonRoot,
  ButtonUnderlay,
  ButtonInner,
  ButtonCap,
  ButtonLabel,
  ButtonWell,
} from "./button"
export type {
  ButtonProps,
  ButtonRootProps,
  ButtonUnderlayProps,
  ButtonInnerProps,
  ButtonCapProps,
  ButtonLabelProps,
  ButtonWellProps,
} from "./button"

// SectionHeader
export {
  SectionHeader,
  SectionHeaderRoot,
  SectionHeaderChrome,
  SectionHeaderIcon,
  SectionHeaderLabel,
  SectionHeaderEnd,
} from "./section-header"
export type {
  SectionHeaderProps,
  SectionHeaderRootProps,
  SectionHeaderChromeProps,
  SectionHeaderIconProps,
  SectionHeaderLabelProps,
  SectionHeaderEndProps,
} from "./section-header"

// Input
export { Input, InputRoot, InputControl, InputAddon } from "./input"
export type { InputProps, InputRootProps, InputControlProps, InputAddonProps } from "./input"

// Chip
export { Chip, ChipRoot, ChipLabel, ChipDismiss } from "./chip"
export type { ChipProps, ChipRootProps, ChipLabelProps, ChipDismissProps } from "./chip"

// SegmentedControl
export { SegmentedRoot, SegmentedItem } from "./segmented"
export type { SegmentedRootProps, SegmentedItemProps } from "./segmented"

// Card
export {
  Card,
  CardRoot,
  CardHeader,
  CardHeaderId,
  CardHeaderTitle,
  CardHeaderStatus,
  CardBody,
  CardValue,
  CardMeta,
  CardFooter,
} from "./card"
export type {
  CardProps,
  CardRootProps,
  CardHeaderProps,
  CardHeaderIdProps,
  CardHeaderTitleProps,
  CardHeaderStatusProps,
  CardBodyProps,
  CardValueProps,
  CardMetaProps,
  CardFooterProps,
} from "./card"

// Dialog
export {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "./dialog"
export type { DialogContentProps, DialogHeaderProps, DialogBodyProps, DialogFooterProps } from "./dialog"

// Switch
export { Switch } from "./switch"
export type { SwitchProps } from "./switch"

// Checkbox
export { Checkbox } from "./checkbox"
export type { CheckboxProps } from "./checkbox"

// RadioGroup
export { RadioGroupRoot, RadioBare, RadioItem } from "./radio-group"
export type { RadioGroupRootProps, RadioBareProps, RadioItemProps } from "./radio-group"

// Tooltip
export {
  Tooltip,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
} from "./tooltip"
export type { TooltipProps, TooltipContentProps } from "./tooltip"

// Underlying primitives (rarely used directly)
export { Chrome, chromeVariants } from "./chrome"
export type { ChromeProps } from "./chrome"
export { IconTile, iconTileVariants } from "./icon-tile"
export type { IconTileProps } from "./icon-tile"

// Design tokens
export { radii, colors, motion } from "./tokens"
export type { RadiusKey } from "./tokens"
