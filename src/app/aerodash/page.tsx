"use client"

import { useState } from "react"
import {
  Button,
  ButtonRoot,
  ButtonUnderlay,
  ButtonInner,
  ButtonCap,
  ButtonLabel,
  ButtonWell,
  SectionHeader,
  Input,
  Chip,
  SegmentedRoot,
  SegmentedItem,
  Card,
  CardValue,
  CardMeta,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
  Switch,
  Checkbox,
  RadioGroupRoot,
  RadioItem,
  Tooltip,
  TooltipProvider,
  Avatar,
  Skeleton,
  ProgressBar,
  ProgressCircle,
  Alert,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectSeparator,
  Toast,
  ToastProvider,
  useToast,
  TableRoot,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  Combobox,
  type ComboboxOption,
  DataTable,
  type DataTableColumn,
  // Shell composites
  AppShell,
  ShellHeader,
  ShellNav,
  ShellRail,
  AppContent,
  AppFooter,
  TopNavRoot,
  OsTab,
  TopNavTabs,
  GlobalSearch,
  FilterIcon,
  SideRail,
  RailKicker,
  RailCard,
  RailLogo,
  RailLabel,
  RailItem,
  IconRail,
  IconRailItem,
  HeaderBar,
  HeaderBrand,
  HeaderNav,
  HeaderNavLink,
  HeaderActions,
  HeaderCta,
  StatsBar,
  StatsSection,
  StatsItem,
  StatsTicker,
  StatsIcons,
  colors,
  fontSize,
  fontWeight,
  letterSpacing,
  fonts,
} from "@/components/aerodash"

const ShellIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
)
const FlagIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M5 21V4M5 4h12l-2 4 2 4H5" strokeLinejoin="round" />
  </svg>
)
const StarIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path
      d="M12 3l2.6 5.6 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.6l1.1-6L3.4 9.4l6-.8L12 3z"
      strokeLinejoin="round"
    />
  </svg>
)
const CheckIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const XIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
  </svg>
)
const SearchIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <circle cx="11" cy="11" r="6" />
    <path d="M16 16l5 5" strokeLinecap="round" />
  </svg>
)
const BangIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
    <path d="M12 4v10M12 18v2" strokeLinecap="round" />
  </svg>
)
const TrashIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M4 6h16M9 6V4h6v2M6 6l1 14h10l1-14" strokeLinejoin="round" />
  </svg>
)
const EditIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M14 4l6 6L9 21H3v-6L14 4z" strokeLinejoin="round" />
  </svg>
)

const SedonaLogo = (
  <svg width="548" height="101" viewBox="0 0 548 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#sedona-logo-clip)">
      <path d="M236.191 33.7811L253.394 33.7516C256.109 33.7516 259.503 33.6336 262.188 34.0172C262.955 34.1352 262.896 34.3123 263.28 34.9615C263.546 37.1157 247.699 57.9196 245.781 61.2541C243.42 65.3558 235.777 65.4149 231.204 66.0346C222.912 67.0379 214.265 68.3953 205.973 69.6052C215.918 63.4673 215.888 62.5525 222.528 53.1096L236.191 33.7811Z" fill="#ffffff"/>
      <path d="M144.978 19.9709C149.788 19.4988 162.418 19.8234 167.848 19.8234H214.147C210.459 24.4268 206.386 30.1811 202.816 34.991C185.258 35.1976 167.228 34.6369 149.67 35.2271C146.719 35.3156 144.063 39.7715 142.44 42.0142L197.593 42.0437L186.055 57.6245L142.853 57.4179L130.873 57.6245L125.62 64.8247H181.009C177.822 69.6347 172.54 76.3628 169.028 81.1727L126.299 81.0252L107.147 81.2023C103.488 81.1728 98.5898 80.0514 97.2619 76.0972C95.7865 71.7003 99.4456 67.6281 101.865 64.264L119.069 40.5388C126.919 29.7975 130.519 22.3317 144.978 19.9709ZM57.7198 19.9709C64.2118 19.4988 75.0416 19.8234 81.8287 19.8234L125.797 19.8529L113.994 34.6664H79.4679C74.1268 34.6664 68.3725 34.5189 63.0609 34.755C59.6378 34.9025 56.864 39.1813 54.8574 41.7486H83.009C87.819 41.7486 92.5109 41.6306 97.3209 41.9257C101.806 42.1913 106.734 45.3192 103.577 50.2472C99.4751 56.6802 94.5176 62.7001 90.1207 68.9265C84.396 77.0415 77.8745 80.7301 67.8414 80.9957L0 80.9662L12.5414 64.7657C30.0697 64.5591 47.6867 65.1198 65.2151 64.5591C68.3725 64.4706 71.53 59.3951 73.271 57.0638C58.5165 56.8868 43.762 57.3294 29.0369 56.8573C26.9418 56.8868 22.604 55.0277 22.5744 52.5785C22.5449 47.975 29.9517 41.1584 32.4895 37.7059C39.8077 27.7318 45.0013 22.0071 57.7198 19.9709ZM489.024 19.6463C493.038 19.1447 503.602 19.4398 508.294 19.4398H547.747C543.852 26.4924 539.514 33.6336 535.413 40.5978L511.127 81.2908L487.519 81.2613L495.989 67.333L499.913 60.6935L475.863 60.6639L463.027 81.2613L438.623 81.2908C443.551 72.7332 450.043 63.4673 455.296 54.8802C460.637 46.6176 465.771 38.237 471.23 30.063C475.303 23.9547 482.001 20.8562 489.024 19.6463Z" fill="#ffffff"/>
      <path d="M497.257 33.8697L515.701 33.9287C513.192 38.4141 510.123 43.2536 507.438 47.6799H501.802L483.683 47.6504C487.254 41.6896 489.821 35.2861 497.257 33.8697Z" fill="#022231"/>
    </g>
    <path d="M284.763 20.5432C284.763 20.5432 307.084 30.4547 312.435 27.1791C317.619 24.0057 318.321 0 318.321 0C318.321 0 327.03 22.5988 333.023 23.9421C339.097 25.3036 356.911 8.64974 356.911 8.64974C356.911 8.64974 346.795 30.5681 350.064 35.7642C353.417 41.0923 377.826 41.8905 377.826 41.8905C377.826 41.8905 355.096 50.2379 353.765 56.3054C352.408 62.4869 369.378 80.3829 369.378 80.3829C369.378 80.3829 347.021 70.182 341.607 73.4237C336.377 76.5544 335.535 100.644 335.535 100.644C335.535 100.644 326.73 78.1672 320.75 76.8358C314.708 75.4905 297.014 92.0675 297.014 92.0675C297.014 92.0675 306.962 69.8512 303.609 64.6481C300.188 59.3389 275.663 58.9317 275.663 58.9317C275.663 58.9317 298.771 50.066 300.244 43.8526C301.667 37.8478 284.763 20.5432 284.763 20.5432Z" fill="#3B9CEC"/>
    <path d="M329.906 31.6732C335.943 31.9901 340.057 55.2581 334.099 57.0454C331.388 57.2555 329.107 51.5685 328.484 49.3341C327.097 44.3608 326.083 38.0479 328.157 33.1225C328.467 32.3869 329.18 31.8897 329.906 31.6732Z" fill="#FEFEFE"/>
    <path d="M318.853 33.037C319.159 33.0752 319.454 33.175 319.72 33.3305C324.773 36.2098 326.497 57.1586 320.802 58.6811C315.026 58.5379 312.672 34.1879 318.853 33.037Z" fill="#FEFEFE"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M258.322 19.936C264.11 19.936 269.804 19.8898 275.593 20.0678L281.57 26.187V26.1879L281.578 26.1958C281.584 26.2023 281.595 26.2135 281.609 26.228C281.638 26.2573 281.682 26.3027 281.74 26.3628C281.856 26.4834 282.03 26.6644 282.251 26.8979C282.694 27.3658 283.331 28.0455 284.091 28.8803C285.206 30.105 286.577 31.6537 287.996 33.353C287.77 34.1049 287.454 34.8591 287.035 35.6049C282.461 43.0117 277.65 50.5663 272.604 57.7075C272.41 57.9827 272.219 58.2581 272.029 58.5327L254.01 65.4467L267.353 65.6674C261.927 74.0412 256.795 80.8246 244.305 81.6391L176.405 81.5805C181.363 74.4098 187.028 66.9139 192.192 59.8022L221.289 19.9946L258.322 19.936ZM262.188 34.395C259.503 34.0114 256.109 34.1294 253.394 34.1294L236.19 34.1586L222.528 53.4878C215.889 62.9305 215.918 63.8451 205.973 69.9829C214.265 68.773 222.912 67.4159 231.204 66.4126C235.778 65.7929 243.42 65.7337 245.781 61.6323C247.699 58.2978 263.546 37.4935 263.28 35.3393C262.897 34.6902 262.955 34.513 262.188 34.395ZM285.878 24.769C286.372 25.2984 286.973 25.9519 287.646 26.6997V26.7006C286.973 25.9527 286.372 25.2986 285.878 24.769Z" fill="#ffffff"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M432.063 19.3714C438.79 19.3714 445.459 19.1652 452.246 19.4602C459.122 19.7258 464.493 26.4832 461.276 33.0638C458.709 38.3163 454.459 44.2472 451.184 49.2932L430.557 81.1927L406.596 81.1634C415.803 66.4974 426.367 50.9757 435.957 36.4573C436.606 35.3656 436.341 34.0083 435.072 34.0081H412.615C411.346 34.0083 409.694 35.0999 409.045 36.1917L399.041 51.2112L379.389 81.1634H373.292L371.982 79.7825C371.981 79.7811 371.978 79.778 371.975 79.7747C371.968 79.7678 371.958 79.7565 371.943 79.7415C371.915 79.7109 371.871 79.6632 371.813 79.6009C371.696 79.4757 371.521 79.2882 371.298 79.0462C370.852 78.5616 370.213 77.8585 369.448 76.9944C367.915 75.2608 365.897 72.9015 363.932 70.3704C363.617 69.9653 363.308 69.5574 363.002 69.1507C367.368 62.4472 371.781 55.7614 376.197 49.0804C376.909 48.7947 377.507 48.5594 377.958 48.386C378.259 48.2702 378.494 48.1814 378.651 48.1224C378.73 48.093 378.789 48.0702 378.827 48.0559C378.846 48.0489 378.861 48.0435 378.869 48.0403C378.873 48.0388 378.877 48.038 378.879 48.0374L378.88 48.0364L398.812 40.7171L382.084 40.1692C384.052 37.1908 386.018 34.213 387.976 31.2337C392.491 24.3583 398.422 21.0833 406.448 19.5784C409.193 19.2243 413.53 19.3421 416.393 19.3421L432.063 19.3714Z" fill="#ffffff"/>
    <defs>
      <clipPath id="sedona-logo-clip">
        <rect width="547.984" height="62.2641" fill="#ffffff" transform="translate(0 19.3512)"/>
      </clipPath>
    </defs>
  </svg>
)

const chromeEyebrowStyle: React.CSSProperties = {
  fontFamily: fonts.display,
  fontSize: fontSize.micro,
  fontWeight: fontWeight.heavy,
  letterSpacing: letterSpacing.chrome,
  textTransform: "uppercase",
  color: colors.muted,
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#657282]">
        {title}
      </h2>
      <div className="rounded-lg border border-[#e3e9f1] bg-white p-6">{children}</div>
    </section>
  )
}

const FRUIT_OPTIONS: ComboboxOption[] = [
  { value: "apple", label: "Apple", hint: "Fr" },
  { value: "banana", label: "Banana", hint: "Fr" },
  { value: "cherry", label: "Cherry", hint: "Fr" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
  { value: "fig", label: "Fig" },
  { value: "grape", label: "Grape", disabled: true },
  { value: "kiwi", label: "Kiwi" },
  { value: "lemon", label: "Lemon" },
  { value: "mango", label: "Mango" },
]

interface Person {
  id: number
  name: string
  role: string
  score: number
  status: "Active" | "Pending" | "Idle"
}

const PEOPLE: Person[] = [
  { id: 1, name: "Cody Reilly",     role: "Engineer",   score: 1284, status: "Active" },
  { id: 2, name: "Mackenzie R.",    role: "Designer",   score: 982,  status: "Active" },
  { id: 3, name: "Avery Thompson",  role: "PM",         score: 645,  status: "Pending" },
  { id: 4, name: "Jordan Lee",      role: "Engineer",   score: 1422, status: "Active" },
  { id: 5, name: "Rowan Park",      role: "Researcher", score: 287,  status: "Idle" },
  { id: 6, name: "Sasha Kim",       role: "Designer",   score: 1107, status: "Active" },
  { id: 7, name: "Quinn Walters",   role: "Engineer",   score: 73,   status: "Idle" },
  { id: 8, name: "Riley Brooks",    role: "PM",         score: 511,  status: "Pending" },
  { id: 9, name: "Drew Carter",     role: "Researcher", score: 921,  status: "Active" },
  { id: 10, name: "Hayden Voss",    role: "Engineer",   score: 1690, status: "Active" },
  { id: 11, name: "Logan Pierce",   role: "PM",         score: 412,  status: "Idle" },
  { id: 12, name: "Morgan Steele",  role: "Designer",   score: 1338, status: "Active" },
]

const PERSON_COLUMNS: DataTableColumn<Person>[] = [
  { key: "name",   header: "Name",   sortable: true },
  { key: "role",   header: "Role",   sortable: true },
  { key: "score",  header: "Score",  sortable: true, numeric: true },
  {
    key: "status",
    header: "Status",
    sortable: true,
    cell: (row) => (
      <Chip
        variant={row.status === "Active" ? "green" : row.status === "Pending" ? "warn" : "default"}
        size="sm"
      >
        {row.status}
      </Chip>
    ),
  },
]

function ToastButtons() {
  const toast = useToast()
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="secondary"
        onClick={() =>
          toast.show({
            tone: "info",
            title: "Heads up",
            description: "Something happened.",
          })
        }
      >
        Info
      </Button>
      <Button
        variant="success"
        onClick={() =>
          toast.show({
            tone: "success",
            title: "Saved",
            description: "Your changes were committed.",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="warn"
        onClick={() =>
          toast.show({
            tone: "warn",
            title: "Heads up",
            description: "This will eat 4MB of memory.",
          })
        }
      >
        Warn
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          toast.show({
            tone: "danger",
            title: "Failed",
            description: "Could not connect to the server.",
            action: { label: "Retry", onClick: () => {} },
          })
        }
      >
        Danger
      </Button>
    </div>
  )
}

export default function AerodashPlayground() {
  const [tab, setTab] = useState("active")
  const [chips, setChips] = useState(["Active", "Treasury", "High Impact"])
  const [progressVal, setProgressVal] = useState(62)
  const [selectVal, setSelectVal] = useState<string | undefined>()
  const [comboValue, setComboValue] = useState<string | string[] | null>(null)
  const [comboMulti, setComboMulti] = useState<string | string[] | null>([])
  const [bookmarks, setBookmarks] = useState({ proposals: true, votes: false, tx: true })

  return (
    <ToastProvider position="top-right">
    <TooltipProvider delayDuration={150}>
    <main data-ad-page="" className="min-h-screen bg-[#f7f9fc] px-12 py-16">
      <h1 className="mb-2 text-[20px] font-[950] uppercase tracking-[0.04em] text-[#080c12]">
        AeroDash · Component Library
      </h1>
      <p className="mb-10 text-[11px] uppercase tracking-[0.1em] text-[#657282]">
        y2k chrome aesthetic · 22 primitives + 6 shell composites
      </p>

      <Section title="HeaderBar + StatsBar · Sedona Production Header">
        <div className="overflow-hidden" style={{ borderRadius: 4, border: "1.5px solid #05070b" }}>
          <HeaderBar>
            <HeaderBrand logoHeight={26}>{SedonaLogo}</HeaderBrand>
            <div className="flex-1" />
            <HeaderNav>
              <HeaderNavLink href="#trading" active>Trading</HeaderNavLink>
              <HeaderNavLink href="#docs">Docs</HeaderNavLink>
            </HeaderNav>
            <HeaderActions>
              <HeaderCta tone="dark">Enter Competition</HeaderCta>
              <HeaderCta tone="primary">Connect</HeaderCta>
            </HeaderActions>
          </HeaderBar>
          <StatsBar>
            <StatsSection label="Platform Stats">
              <StatsItem icon={StatsIcons.clock}  label="Ends In"  value="0m 0s" />
              <StatsItem icon={StatsIcons.trophy} label="Jackpot"  value="$750" />
              <StatsItem icon={StatsIcons.bars}   label="Tokens"   value="1" />
            </StatsSection>
            <StatsSection label="Top Pools">
              <StatsTicker symbol="$LYON" price="$0.000003" change={0.0024} />
              <StatsTicker symbol="$LYON" price="$0.000003" change={0} />
              <StatsTicker symbol="$LYON" price="$0.000003" change={-0.018} />
            </StatsSection>
          </StatsBar>
          <div style={{ background: "#0f1218", color: "#cbd5e1", padding: "32px 20px", textAlign: "center", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            ↑ Live Sedona-style header — logo, docs link, orange CTAs, then stats ticker with platform stats and top-pool prices.
          </div>
        </div>
      </Section>

      <Section title="AppShell · Full Layout (HeaderBar + StatsBar + Content + Footer)">
        <div
          className="overflow-hidden"
          style={{ borderRadius: 4, height: 720 }}
        >
          <AppShell bordered={false}>
            <ShellHeader>
              <HeaderBar>
                <HeaderBrand logoHeight={26}>{SedonaLogo}</HeaderBrand>
                <div className="flex-1" />
                <HeaderNav>
                  <HeaderNavLink href="#trading" active>Trading</HeaderNavLink>
                  <HeaderNavLink href="#docs">Docs</HeaderNavLink>
                </HeaderNav>
                <HeaderActions>
                  <HeaderCta tone="dark">Enter Competition</HeaderCta>
                  <HeaderCta tone="primary">Connect</HeaderCta>
                </HeaderActions>
              </HeaderBar>
            </ShellHeader>

            <ShellNav>
              <StatsBar>
                <StatsSection label="Platform Stats">
                  <StatsItem icon={StatsIcons.clock}  label="Ends In"  value="0m 0s" />
                  <StatsItem icon={StatsIcons.trophy} label="Jackpot"  value="$750" />
                  <StatsItem icon={StatsIcons.bars}   label="Tokens"   value="1" />
                </StatsSection>
                <StatsSection label="Top Pools">
                  <StatsTicker symbol="$LYON" price="$0.000003" change={0.0024} />
                  <StatsTicker symbol="$LYON" price="$0.000003" change={0} />
                  <StatsTicker symbol="$LYON" price="$0.000003" change={-0.018} />
                </StatsSection>
              </StatsBar>
            </ShellNav>

            <AppContent style={{ padding: 0 }}>
              <header style={{ padding: "18px 22px 14px", color: colors.ink }}>
                <h1
                  className="m-0 inline-flex items-center uppercase"
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: fontWeight.black,
                    fontSize: fontSize.xl,
                    lineHeight: 1.05,
                    letterSpacing: letterSpacing.wide,
                    gap: 10,
                  }}
                >
                  Active Competition: Diplomacy
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    aria-hidden
                  >
                    <path
                      d="M12 3l2.6 5.6 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.6l1.1-6L3.4 9.4l6-.8L12 3z"
                      strokeLinejoin="round"
                    />
                  </svg>
                </h1>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: fontSize.xs,
                    color: colors.muted,
                    letterSpacing: "0.02em",
                  }}
                >
                  <span>Markets</span>
                  <span style={{ margin: "0 6px" }}>›</span>
                  <span
                    style={{
                      color: colors.cyanDeep,
                      fontWeight: fontWeight.semibold,
                      textDecoration: "underline",
                      textUnderlineOffset: 2,
                    }}
                  >
                    Active
                  </span>
                  <span style={{ margin: "0 6px" }}>›</span>
                  <span style={{ color: colors.ink, fontWeight: fontWeight.semibold }}>
                    Diplomacy
                  </span>
                </div>
              </header>
              <div aria-hidden style={{ height: 2, background: colors.ink }} />
              <div style={{ padding: "16px 14px 14px" }}>
              <p
                className="mb-5"
                style={{ color: colors.muted, fontSize: fontSize.sm, maxWidth: 560 }}
              >
                Trade live agent pools using market cap, momentum, and diplomacy Elo.
              </p>

              <div
                className="mb-0 flex items-center gap-3"
                style={{
                  paddingBottom: 12,
                  borderBottom: `1px solid ${colors.line}`,
                  marginBottom: 12,
                }}
              >
                <Input rootSize="md" placeholder="Search Agents" leadingIcon={SearchIcon} rootClassName="flex-1 max-w-md" />
                <div className="flex items-center gap-2">
                  <span style={chromeEyebrowStyle}>Elo</span>
                  <SelectRoot defaultValue="all">
                    <SelectTrigger />
                    <SelectContent>
                      <SelectItem value="all">All Elo</SelectItem>
                      <SelectItem value="1500">1500+</SelectItem>
                      <SelectItem value="1700">1700+</SelectItem>
                    </SelectContent>
                  </SelectRoot>
                </div>
                <div className="flex items-center gap-2">
                  <span style={chromeEyebrowStyle}>Sort</span>
                  <SelectRoot defaultValue="mcap">
                    <SelectTrigger />
                    <SelectContent>
                      <SelectItem value="mcap">Highest Market Capitalization</SelectItem>
                      <SelectItem value="elo">Highest Elo</SelectItem>
                      <SelectItem value="change">Biggest 24h Change</SelectItem>
                    </SelectContent>
                  </SelectRoot>
                </div>
              </div>

              <TableRoot>
                <TableHead>
                  <TableRow>
                    <TableHeader>#</TableHeader>
                    <TableHeader>Token</TableHeader>
                    <TableHeader numeric align="right">Elo</TableHeader>
                    <TableHeader numeric align="right">Change</TableHeader>
                    <TableHeader numeric align="right">MCAP</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow interactive>
                    <TableCell style={{ color: colors.muted }}>1.</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar fallback="L" size="sm" />
                        <div>
                          <div className="font-[800]">
                            Lyonnaise Protocol{" "}
                            <span style={{ color: colors.muted, fontWeight: fontWeight.semibold, marginLeft: 6 }}>$LYON</span>
                          </div>
                          <div style={{ color: colors.muted, fontSize: fontSize.xs, marginTop: 2 }}>
                            Diplomacy agent focused on western tempo, coalition pivots, and pressure through Burgundy.
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell numeric style={{ color: colors.green, fontWeight: fontWeight.black }}>1684</TableCell>
                    <TableCell numeric style={{ color: colors.green, fontWeight: fontWeight.black }}>+0.00%</TableCell>
                    <TableCell numeric style={{ fontWeight: fontWeight.black }}>$2.97K</TableCell>
                  </TableRow>
                </TableBody>
              </TableRoot>
              </div>
            </AppContent>

            <AppFooter
              brand="Sedona"
              description="markets · governance · treasury"
              stamp={<>v1.0.0<br/>BETA</>}
            />
          </AppShell>
        </div>
      </Section>

      <Section title="Button">
        <div className="grid grid-cols-[110px_repeat(4,1fr)] gap-3 mb-3 text-[9px] font-[950] uppercase tracking-[0.1em] text-[#657282]">
          <div />
          <div>Default</div>
          <div>Hover</div>
          <div>Focus</div>
          <div>Disabled</div>
        </div>
        <div className="space-y-3">
          {[
            { key: "primary",   label: "Primary",   icon: ShellIcon, text: "Execute", end: undefined },
            { key: "secondary", label: "Secondary", icon: ShellIcon, text: "Review",  end: undefined },
            { key: "dark",      label: "Dark",      icon: StarIcon,  text: "Action",  end: undefined },
            { key: "danger",    label: "Danger",    icon: XIcon,     text: "Delete",  end: XIcon },
            { key: "warn",      label: "Warn",      icon: BangIcon,  text: "Mark",    end: BangIcon },
            { key: "success",   label: "Success",   icon: CheckIcon, text: "Support", end: undefined },
          ].map(({ key, label, icon, text, end }) => (
            <div key={key} className="grid grid-cols-[110px_repeat(4,1fr)] items-center gap-3">
              <div className="text-[10px] font-[950] uppercase tracking-[0.06em] text-[#657282]">{label}</div>
              <Button variant={key as never} icon={icon} endIcon={end}>{text}</Button>
              <Button variant={key as never} icon={icon} endIcon={end}>{text}</Button>
              <Button variant={key as never} icon={icon} endIcon={end}>{text}</Button>
              <Button variant={key as never} icon={icon} endIcon={end} disabled>{text}</Button>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-4 border-t border-[#e3e9f1] pt-6">
          <Button size="sm" icon={ShellIcon}>Small</Button>
          <Button size="md" icon={ShellIcon}>Medium</Button>
          <Button size="lg" icon={ShellIcon}>Large</Button>
        </div>
        <div className="mt-6 border-t border-[#e3e9f1] pt-6">
          <p className="mb-3 text-[10px] uppercase tracking-[0.1em] text-[#657282]">Compound API</p>
          <ButtonRoot variant="primary">
            <ButtonUnderlay />
            <ButtonInner>
              <ButtonCap>{ShellIcon}</ButtonCap>
              <ButtonLabel>Composed</ButtonLabel>
              <ButtonWell>
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M4 2l4 4-4 4" />
                </svg>
              </ButtonWell>
            </ButtonInner>
          </ButtonRoot>
        </div>
      </Section>

      <Section title="SectionHeader">
        <div className="space-y-4">
          <SectionHeader icon={ShellIcon}>Overview</SectionHeader>
          <SectionHeader variant="active" icon={FlagIcon}>Active Now</SectionHeader>
          <SectionHeader variant="dark" icon={StarIcon}>Featured</SectionHeader>
          <SectionHeader variant="dotted" icon={ShellIcon}>Placeholder</SectionHeader>
          <div className="flex items-start gap-4">
            <SectionHeader size="sm" icon={ShellIcon}>Small</SectionHeader>
            <SectionHeader size="md" icon={ShellIcon}>Medium</SectionHeader>
            <SectionHeader size="lg" icon={ShellIcon}>Large</SectionHeader>
          </div>
        </div>
      </Section>

      <Section title="Input">
        <div className="space-y-4 max-w-md">
          <Input placeholder="Default input…" />
          <Input placeholder="With leading icon…" leadingIcon={SearchIcon} />
          <Input placeholder="With both addons…" leadingIcon={SearchIcon} trailingIcon={XIcon} />
          <Input placeholder="Invalid state" invalid defaultValue="bad@input" />
          <Input rootSize="sm" placeholder="Small" />
          <Input rootSize="lg" placeholder="Large" />
        </div>
      </Section>

      <Section title="Chip">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Chip>Default</Chip>
            <Chip variant="cyan">Treasury</Chip>
            <Chip variant="pink">Risk</Chip>
            <Chip variant="warn">High Impact</Chip>
            <Chip variant="green">Active</Chip>
            <Chip variant="dark">Dark</Chip>
          </div>
          <div className="flex flex-wrap gap-2">
            {chips.map((c) => (
              <Chip
                key={c}
                variant="cyan"
                onDismiss={() => setChips((prev) => prev.filter((x) => x !== c))}
              >
                {c}
              </Chip>
            ))}
            {chips.length === 0 && (
              <button
                className="text-[11px] underline"
                onClick={() => setChips(["Active", "Treasury", "High Impact"])}
              >
                Reset
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Chip size="sm">Small</Chip>
            <Chip size="md">Medium</Chip>
            <Chip size="lg">Large</Chip>
          </div>
        </div>
      </Section>

      <Section title="SegmentedControl">
        <div className="space-y-4">
          <SegmentedRoot value={tab} onChange={setTab}>
            <SegmentedItem value="all">All</SegmentedItem>
            <SegmentedItem value="active">Active</SegmentedItem>
            <SegmentedItem value="pending">Pending</SegmentedItem>
            <SegmentedItem value="completed">Completed</SegmentedItem>
            <SegmentedItem value="drafts">Drafts</SegmentedItem>
          </SegmentedRoot>
          <SegmentedRoot defaultValue="grid" variant="slanted">
            <SegmentedItem value="list">List</SegmentedItem>
            <SegmentedItem value="grid">Grid</SegmentedItem>
            <SegmentedItem value="table">Table</SegmentedItem>
            <SegmentedItem value="map">Map</SegmentedItem>
          </SegmentedRoot>
          <div className="text-[11px] uppercase tracking-[0.1em] text-[#657282]">
            current: {tab}
          </div>
        </div>
      </Section>

      <Section title="Card">
        <div className="grid grid-cols-3 gap-4">
          <Card
            id="01"
            title="Header Cap"
            status="Live"
            statusTone="green"
            footer={
              <>
                <span>Action Footer</span>
                <Button size="sm" endIcon={null}>Open</Button>
              </>
            }
          >
            <CardValue>123.4M</CardValue>
            <CardMeta>Content well + metadata strip + status rail</CardMeta>
          </Card>
          <Card id="02" title="Treasury">
            <CardValue>$128.4M</CardValue>
            <CardMeta>Total value locked</CardMeta>
          </Card>
          <Card id="#128" title="Proposal" status="Active" statusTone="cyan">
            <p className="text-[13px] font-bold">Allocate Funds to Dev Grants Q2</p>
            <CardMeta>62% support · 38% oppose</CardMeta>
          </Card>
        </div>
      </Section>

      <Section title="Switch · Checkbox · Radio">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.1em] text-[#657282]">Switch</p>
            <div className="flex items-center gap-4">
              <Switch defaultChecked />
              <Switch />
              <Switch defaultChecked size="sm" />
              <Switch defaultChecked size="lg" />
              <Switch disabled defaultChecked />
            </div>
          </div>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.1em] text-[#657282]">Checkbox</p>
            <div className="flex items-center gap-4">
              <Checkbox defaultChecked />
              <Checkbox />
              <Checkbox defaultChecked={"indeterminate" as never} />
              <Checkbox defaultChecked size="sm" />
              <Checkbox defaultChecked size="lg" />
              <Checkbox disabled defaultChecked />
            </div>
          </div>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.1em] text-[#657282]">Radio</p>
            <RadioGroupRoot defaultValue="b">
              <RadioItem value="a">Option A</RadioItem>
              <RadioItem value="b">Option B</RadioItem>
              <RadioItem value="c" disabled>Option C (disabled)</RadioItem>
            </RadioGroupRoot>
          </div>
        </div>
      </Section>

      <Section title="Tooltip · Dialog">
        <div className="flex items-center gap-4">
          <Tooltip content="Top tooltip" side="top" withProvider={false}>
            <Button variant="secondary">Hover top</Button>
          </Tooltip>
          <Tooltip content="Right tooltip" side="right" withProvider={false}>
            <Button variant="secondary">Hover right</Button>
          </Tooltip>
          <DialogRoot>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogClose />
              </DialogHeader>
              <DialogBody>
                <DialogDescription>
                  This will permanently delete your account and remove your data from our servers.
                </DialogDescription>
              </DialogBody>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button variant="danger" icon={XIcon}>Delete</Button>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>
        </div>
      </Section>

      <Section title="Avatar">
        <div className="flex items-end gap-4">
          <Avatar fallback="MR" size="xs" />
          <Avatar fallback="MR" size="sm" status="online" />
          <Avatar fallback="CR" size="md" status="busy" />
          <Avatar fallback="JL" size="lg" status="away" shape="square" />
          <Avatar fallback="?"  size="xl" status="offline" />
          <Avatar src="/sedona-favicon.png" alt="Sedona" fallback="S" size="lg" />
        </div>
      </Section>

      <Section title="Skeleton">
        <div className="space-y-4 max-w-md">
          <Skeleton variant="circle" height={48} width={48} />
          <Skeleton height={20} width="80%" />
          <Skeleton height={20} width="65%" />
          <Skeleton variant="text" lines={3} />
          <Skeleton height={120} />
        </div>
      </Section>

      <Section title="Progress">
        <div className="space-y-6 max-w-lg">
          <div>
            <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.1em] text-[#657282]">
              <span>Determinate · {progressVal}%</span>
              <button
                onClick={() => setProgressVal((v) => (v >= 100 ? 0 : v + 13))}
                className="underline"
              >
                Step
              </button>
            </div>
            <ProgressBar value={progressVal} />
          </div>
          <div>
            <div className="mb-2 text-[10px] uppercase tracking-[0.1em] text-[#657282]">Tones</div>
            <div className="space-y-2">
              <ProgressBar value={42} tone="ink" />
              <ProgressBar value={68} tone="cyan" />
              <ProgressBar value={91} tone="green" />
              <ProgressBar value={28} tone="warn" />
              <ProgressBar value={56} tone="pink" />
            </div>
          </div>
          <div>
            <div className="mb-2 text-[10px] uppercase tracking-[0.1em] text-[#657282]">Indeterminate</div>
            <ProgressBar value={null} />
          </div>
          <div>
            <div className="mb-2 text-[10px] uppercase tracking-[0.1em] text-[#657282]">Circular</div>
            <div className="flex items-center gap-6">
              <ProgressCircle value={progressVal} size="sm" />
              <ProgressCircle value={progressVal} />
              <ProgressCircle value={progressVal} size="lg" tone="cyan" />
              <ProgressCircle value={null} tone="ink" />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Alert">
        <div className="space-y-3 max-w-xl">
          <Alert tone="info" title="Heads up">A new version of the protocol is live.</Alert>
          <Alert tone="success" title="Saved">All changes were committed to main.</Alert>
          <Alert tone="warn" title="Watch out">This action will incur gas fees.</Alert>
          <Alert tone="danger" title="Failed">Transaction reverted: insufficient balance.</Alert>
          <Alert tone="info" onDismiss={() => {}}>Dismissable, no title.</Alert>
        </div>
      </Section>

      <Section title="Tabs">
        <TabsRoot defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="billing" disabled>Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="text-[12px]">Overview panel — summaries and headline numbers.</p>
          </TabsContent>
          <TabsContent value="activity">
            <p className="text-[12px]">Activity feed — recent events and transitions.</p>
          </TabsContent>
          <TabsContent value="settings">
            <p className="text-[12px]">Settings — preferences and configuration.</p>
          </TabsContent>
        </TabsRoot>
      </Section>

      <Section title="DropdownMenu · Select">
        <div className="flex items-start gap-8">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.1em] text-[#657282]">Dropdown</p>
            <DropdownMenuRoot>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" endIcon={
                  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3.5L5 6.5L8 3.5" />
                  </svg>
                }>Actions</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Bookmarks</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={bookmarks.proposals}
                  onCheckedChange={(v) => setBookmarks((b) => ({ ...b, proposals: !!v }))}
                >
                  Proposals
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={bookmarks.votes}
                  onCheckedChange={(v) => setBookmarks((b) => ({ ...b, votes: !!v }))}
                >
                  Votes
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={bookmarks.tx}
                  onCheckedChange={(v) => setBookmarks((b) => ({ ...b, tx: !!v }))}
                >
                  Transactions
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem icon={EditIcon} shortcut="⌘E">Edit</DropdownMenuItem>
                <DropdownMenuItem icon={StarIcon} shortcut="⌘D">Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem icon={TrashIcon} variant="danger" shortcut="⌘⌫">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuRoot>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.1em] text-[#657282]">Select</p>
            <SelectRoot value={selectVal} onValueChange={setSelectVal}>
              <SelectTrigger placeholder="Choose region…" />
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Americas</SelectLabel>
                  <SelectItem value="us-east">US East</SelectItem>
                  <SelectItem value="us-west">US West</SelectItem>
                  <SelectItem value="ca-central">CA Central</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>EMEA</SelectLabel>
                  <SelectItem value="eu-west">EU West</SelectItem>
                  <SelectItem value="eu-north">EU North</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>APAC</SelectLabel>
                  <SelectItem value="ap-south">AP South</SelectItem>
                  <SelectItem value="ap-east">AP East</SelectItem>
                </SelectGroup>
              </SelectContent>
            </SelectRoot>
          </div>
        </div>
      </Section>

      <Section title="Toast">
        <ToastButtons />
        <p className="mt-4 text-[10px] uppercase tracking-[0.1em] text-[#657282]">
          Toasts show top-right · auto dismiss 4s · click ✕ to dismiss early
        </p>
        <div className="mt-4 max-w-md">
          <Toast tone="info" title="Inline toast">Use &lt;Toast&gt; directly for static content.</Toast>
        </div>
      </Section>

      <Section title="Combobox">
        <div className="flex items-start gap-8">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.1em] text-[#657282]">Single</p>
            <Combobox
              options={FRUIT_OPTIONS}
              value={comboValue}
              onChange={setComboValue}
              placeholder="Pick a fruit…"
            />
          </div>
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.1em] text-[#657282]">Multi</p>
            <Combobox
              options={FRUIT_OPTIONS}
              value={comboMulti}
              onChange={setComboMulti}
              multiple
              placeholder="Pick fruits…"
            />
          </div>
        </div>
      </Section>

      <Section title="Table (primitive)">
        <TableRoot>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Role</TableHeader>
              <TableHeader numeric align="right">Score</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {PEOPLE.slice(0, 4).map((p) => (
              <TableRow key={p.id} interactive>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.role}</TableCell>
                <TableCell numeric>{p.score.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </Section>

      <Section title="DataTable (composite)">
        <DataTable
          data={PEOPLE}
          columns={PERSON_COLUMNS}
          getRowKey={(p) => p.id}
          pageSize={5}
          filterable
        />
      </Section>
    </main>
    </TooltipProvider>
    </ToastProvider>
  )
}
