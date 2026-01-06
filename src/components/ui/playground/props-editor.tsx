"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export type PropType =
  | { type: "text"; default?: string }
  | { type: "number"; default?: number; min?: number; max?: number }
  | { type: "select"; options: string[]; default?: string }
  | { type: "boolean"; default?: boolean }
  | { type: "color"; default?: string }

export interface PropDefinition {
  [key: string]: PropType
}

export interface PropsEditorProps<T extends PropDefinition> {
  props: T
  values: Record<string, unknown>
  onChange: (key: string, value: unknown) => void
  className?: string
}

export function PropsEditor<T extends PropDefinition>({
  props,
  values,
  onChange,
  className,
}: PropsEditorProps<T>) {
  return (
    <div className={cn("space-y-4 p-4 rounded-lg bg-zeus-surface-elevated border border-zeus-border-alpha", className)}>
      <h4 className="text-caption-s font-medium text-zeus-text-tertiary uppercase tracking-wider">
        Props
      </h4>
      <div className="grid gap-4">
        {Object.entries(props).map(([key, propDef]) => (
          <div key={key} className="grid gap-2">
            <Label htmlFor={key} className="text-caption-l font-mono">
              {key}
            </Label>
            {propDef.type === "text" && (
              <Input
                id={key}
                type="text"
                value={(values[key] as string) ?? propDef.default ?? ""}
                onChange={(e) => onChange(key, e.target.value)}
                className="font-mono text-caption-l"
              />
            )}
            {propDef.type === "number" && (
              <Input
                id={key}
                type="number"
                min={propDef.min}
                max={propDef.max}
                value={(values[key] as number) ?? propDef.default ?? 0}
                onChange={(e) => onChange(key, Number(e.target.value))}
                className="font-mono text-caption-l"
              />
            )}
            {propDef.type === "select" && (
              <Select
                value={(values[key] as string) ?? propDef.default ?? propDef.options[0]}
                onValueChange={(value) => onChange(key, value)}
              >
                <SelectTrigger className="font-mono text-caption-l">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {propDef.options.map((option) => (
                    <SelectItem key={option} value={option} className="font-mono">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {propDef.type === "boolean" && (
              <div className="flex items-center gap-2">
                <Checkbox
                  id={key}
                  checked={(values[key] as boolean) ?? propDef.default ?? false}
                  onCheckedChange={(checked) => onChange(key, checked)}
                />
                <span className="text-caption-l text-muted-foreground">
                  {values[key] ? "true" : "false"}
                </span>
              </div>
            )}
            {propDef.type === "color" && (
              <div className="flex items-center gap-2">
                <input
                  id={key}
                  type="color"
                  value={(values[key] as string) ?? propDef.default ?? "#000000"}
                  onChange={(e) => onChange(key, e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer"
                />
                <Input
                  type="text"
                  value={(values[key] as string) ?? propDef.default ?? "#000000"}
                  onChange={(e) => onChange(key, e.target.value)}
                  className="font-mono text-caption-l flex-1"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
