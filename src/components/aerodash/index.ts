// AeroDash component family — y2k chrome aesthetic, shadcn-style primitives.

// System manifest
export {
  aerodashComponentCategories,
  aerodashComponentIds,
  aerodashComponents,
  aerodashCssEntryPoints,
} from "./manifest"
export type {
  AerodashComponentCategory,
  AerodashComponentEntry,
  AerodashComponentKind,
} from "./manifest"

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

// Avatar
export { Avatar } from "./avatar"
export type { AvatarProps } from "./avatar"

// Skeleton
export { Skeleton } from "./skeleton"
export type { SkeletonProps } from "./skeleton"

// Progress
export { ProgressBar, ProgressCircle } from "./progress"
export type { ProgressBarProps, ProgressCircleProps } from "./progress"

// Alert
export { Alert } from "./alert"
export type { AlertProps } from "./alert"

// Tabs
export { TabsRoot, TabsList, TabsTrigger, TabsContent } from "./tabs"
export type { TabsListProps, TabsTriggerProps, TabsContentProps } from "./tabs"

// DropdownMenu
export {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
} from "./dropdown-menu"
export type { DropdownMenuContentProps, DropdownMenuItemProps } from "./dropdown-menu"

// Select
export {
  SelectRoot,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from "./select"
export type { SelectTriggerProps, SelectContentProps, SelectItemProps } from "./select"

// Toast
export { Toast, ToastProvider, useToast } from "./toast"
export type { ToastProps, ToastProviderProps, ToastOptions } from "./toast"

// Table
export {
  TableRoot,
  TableHead,
  TableBody,
  TableFoot,
  TableRow,
  TableHeader,
  TableCell,
  TableCaption,
} from "./table"
export type {
  TableRootProps,
  TableRowProps,
  TableHeaderProps,
  TableCellProps,
} from "./table"

// Combobox
export { Combobox } from "./combobox"
export type { ComboboxProps, ComboboxOption } from "./combobox"

// DataTable
export { DataTable } from "./data-table"
export type { DataTableProps, DataTableColumn, DataTableSort } from "./data-table"
export {
  defaultAccessor,
  defaultFilter,
  filterDataTableRows,
  getNextDataTableSort,
  paginateDataTableRows,
  sortDataTableRows,
} from "./data-table-core"
export type { DataTableState } from "./data-table-core"
export { useDataTableState } from "./data-table-state"
export type { UseDataTableStateProps } from "./data-table-state"

// Shared state primitives
export { useControllableState } from "./use-controllable-state"
export type {
  ControllableStateSetter,
  UseControllableStateProps,
} from "./use-controllable-state"

// AeroDash shell composites ───────────────────────────────────────────────

// TitleBlock
export {
  TitleBlock,
  TitleBlockRoot,
  TitleBlockBody,
  BoardNum,
  BrandBlock,
  StatusBlock,
} from "./title-block"
export type {
  TitleBlockProps,
  TitleBlockRootProps,
  TitleBlockBodyProps,
  BoardNumProps,
  BrandBlockProps,
  StatusBlockProps,
} from "./title-block"

// TopNav
export {
  TopNavRoot,
  OsTab,
  TopNavTabs,
  GlobalSearch,
  FilterIcon,
} from "./top-nav"
export type {
  TopNavRootProps,
  OsTabProps,
  TopNavTabsProps,
  GlobalSearchProps,
  FilterIconProps,
} from "./top-nav"

// SideRail
export {
  SideRail,
  RailKicker,
  RailCard,
  RailLogo,
  RailLabel,
  RailItem,
  IconRail,
  IconRailItem,
} from "./side-rail"
export type {
  SideRailProps,
  RailKickerProps,
  RailCardProps,
  RailLogoProps,
  RailLabelProps,
  RailItemProps,
  IconRailProps,
  IconRailItemProps,
} from "./side-rail"

// AppShell + Footer
export {
  AppShell,
  ShellHeader,
  ShellNav,
  ShellRail,
  AppContent,
  AppFooter,
} from "./shell"
export type { AppShellProps, AppContentProps, AppFooterProps } from "./shell"

// HeaderBar (production-style brand header)
export {
  HeaderBar,
  HeaderBrand,
  HeaderNav,
  HeaderNavLink,
  HeaderActions,
  HeaderCta,
} from "./header-bar"
export type {
  HeaderBarProps,
  HeaderBrandProps,
  HeaderNavProps,
  HeaderNavLinkProps,
  HeaderActionsProps,
  HeaderCtaProps,
} from "./header-bar"

// StatsBar (live-metrics ticker strip)
export {
  StatsBar,
  StatsSection,
  StatsItem,
  StatsTicker,
  StatsIcons,
} from "./stats-bar"
export type {
  StatsBarProps,
  StatsSectionProps,
  StatsItemProps,
  StatsTickerProps,
} from "./stats-bar"

// Underlying primitives (rarely used directly)
export { Chrome, chromeVariants } from "./chrome"
export type { ChromeProps } from "./chrome"
export { IconTile, iconTileVariants } from "./icon-tile"
export type { IconTileProps } from "./icon-tile"

// Design tokens
export {
  radii,
  colors,
  motion,
  fonts,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
} from "./tokens"
export type { RadiusKey } from "./tokens"
