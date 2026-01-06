"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CodeBlock } from "./code-block"
import { PropsEditor, PropDefinition } from "./props-editor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface ComponentDemoProps<T extends PropDefinition> {
  title?: string
  description?: string
  children: React.ReactNode
  code: string
  props?: T
  defaultProps?: Record<string, unknown>
  onPropsChange?: (props: Record<string, unknown>) => void
  className?: string
  previewClassName?: string
}

export function ComponentDemo<T extends PropDefinition>({
  title,
  description,
  children,
  code,
  props,
  defaultProps = {},
  onPropsChange,
  className,
  previewClassName,
}: ComponentDemoProps<T>) {
  const [propValues, setPropValues] = React.useState<Record<string, unknown>>(defaultProps)

  const handlePropChange = (key: string, value: unknown) => {
    const newProps = { ...propValues, [key]: value }
    setPropValues(newProps)
    onPropsChange?.(newProps)
  }

  // Generate code string with current prop values
  const generateCode = () => {
    if (!props) return code

    let generatedCode = code
    Object.entries(propValues).forEach(([key, value]) => {
      if (typeof value === "string") {
        generatedCode = generatedCode.replace(
          new RegExp(`${key}="[^"]*"`, 'g'),
          `${key}="${value}"`
        )
      } else if (typeof value === "boolean") {
        if (value) {
          if (!generatedCode.includes(key)) {
            generatedCode = generatedCode.replace('>', ` ${key}>`)
          }
        } else {
          generatedCode = generatedCode.replace(new RegExp(`\\s*${key}(?=[\\s>])`, 'g'), '')
        }
      }
    })
    return generatedCode
  }

  return (
    <div className={cn("space-y-4", className)}>
      {(title || description) && (
        <div>
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {description && <p className="text-muted-foreground text-caption-l">{description}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Preview */}
        <div className={cn(
          "p-6 rounded-lg border border-zeus-border-alpha bg-card",
          "flex items-center justify-center min-h-[200px]",
          previewClassName
        )}>
          {children}
        </div>

        {/* Code & Props */}
        <div className="space-y-4">
          <Tabs defaultValue="code" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="code" className="flex-1">Code</TabsTrigger>
              {props && <TabsTrigger value="props" className="flex-1">Props</TabsTrigger>}
            </TabsList>
            <TabsContent value="code" className="mt-4">
              <CodeBlock code={generateCode()} />
            </TabsContent>
            {props && (
              <TabsContent value="props" className="mt-4">
                <PropsEditor
                  props={props}
                  values={propValues}
                  onChange={handlePropChange}
                />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Simple demo without props editor - just preview + code
export interface SimpleDemoProps {
  children: React.ReactNode
  code: string
  className?: string
  previewClassName?: string
  vertical?: boolean
}

export function SimpleDemo({
  children,
  code,
  className,
  previewClassName,
  vertical = false,
}: SimpleDemoProps) {
  return (
    <div className={cn(
      vertical ? "space-y-4" : "grid grid-cols-1 lg:grid-cols-2 gap-4",
      className
    )}>
      {/* Preview */}
      <div className={cn(
        "p-6 rounded-lg border border-zeus-border-alpha bg-card",
        previewClassName
      )}>
        {children}
      </div>

      {/* Code */}
      <CodeBlock code={code} />
    </div>
  )
}
