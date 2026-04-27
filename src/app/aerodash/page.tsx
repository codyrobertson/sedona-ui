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
  InputAddon,
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

export default function AerodashPlayground() {
  const [tab, setTab] = useState("active")
  const [chips, setChips] = useState(["Active", "Treasury", "High Impact"])

  return (
    <TooltipProvider delayDuration={150}>
    <main className="min-h-screen bg-[#f7f9fc] px-12 py-16">
      <h1 className="mb-2 text-[20px] font-[950] uppercase tracking-[0.04em] text-[#080c12]">
        AeroDash · Component Library
      </h1>
      <p className="mb-10 text-[11px] uppercase tracking-[0.1em] text-[#657282]">
        y2k chrome aesthetic · 11 primitives
      </p>

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
          <Card id="U" title="Dasher_01" idTone="white">
            <CardValue>4,821</CardValue>
            <CardMeta>Core Contributor</CardMeta>
          </Card>
          <Card id="A" title="Activity" idTone="green">
            <p className="text-[12px]">Proposal #128 created</p>
            <p className="text-[12px]">Vote cast: FOR</p>
            <p className="text-[12px]">Treasury transfer</p>
          </Card>
          <Card variant="dashed" id="—" title="Placeholder" idTone="white">
            <CardMeta>Drag content here</CardMeta>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-4 border-t border-[#e3e9f1] pt-6">
          <Card title="Default" id="01">
            <CardMeta>Ready</CardMeta>
          </Card>
          <Card state="selected" title="Selected" id="02">
            <CardMeta>Active</CardMeta>
          </Card>
          <Card state="disabled" title="Disabled" id="03">
            <CardMeta>Locked</CardMeta>
          </Card>
          <Card state="loading" title="Loading" id="04">
            <CardMeta>Fetching…</CardMeta>
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

      <Section title="Tooltip">
        <div className="flex items-center gap-4">
          <Tooltip content="Top tooltip" side="top" withProvider={false}>
            <Button variant="secondary">Hover top</Button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" side="bottom" withProvider={false}>
            <Button variant="secondary">Hover bottom</Button>
          </Tooltip>
          <Tooltip content="Right tooltip" side="right" withProvider={false}>
            <Button variant="secondary">Hover right</Button>
          </Tooltip>
          <Tooltip content="Left tooltip" side="left" withProvider={false}>
            <Button variant="secondary">Hover left</Button>
          </Tooltip>
        </div>
      </Section>

      <Section title="Dialog">
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
                This action cannot be undone.
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
      </Section>
    </main>
    </TooltipProvider>
  )
}
