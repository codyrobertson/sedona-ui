"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { EmptyState } from "@/components/ui/empty-state"
import { GPUInstanceCard } from "./GPUInstanceCard"
import { useGPUDeploy } from "@/contexts/gpu-deploy-context"

export interface GPUInstancesSectionProps {
  className?: string
}

export function GPUInstancesSection({ className }: GPUInstancesSectionProps) {
  const {
    instances,
    isTerminating,
    viewInstanceDetails,
    terminateInstance,
    getActiveInstances,
  } = useGPUDeploy()

  const activeInstances = getActiveInstances()
  const hasInstances = activeInstances.length > 0

  return (
    <div className={cn("space-y-4", className)}>
      {/* Section Header */}
      <div className="rounded-xl overflow-hidden border border-zeus-border-alpha">
        <div className="px-4 py-2.5 bg-zeus-surface-elevated border-b border-zeus-border-alpha">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon icon="server" className="w-4 h-4 text-zeus-accent-purple" />
              <h2 className="text-body-s font-semibold text-zeus-text-primary">
                GPU Instances
              </h2>
            </div>
            <span className="text-caption-s text-zeus-text-tertiary">
              {activeInstances.length} {activeInstances.length === 1 ? "instance" : "instances"} running
            </span>
          </div>
        </div>

        <div className="p-4 bg-zeus-surface-elevated">
          {hasInstances ? (
            <div className="grid gap-3">
              {activeInstances.map((instance) => (
                <GPUInstanceCard
                  key={instance.id}
                  instance={instance}
                  onViewDetails={viewInstanceDetails}
                  onTerminate={terminateInstance}
                  isTerminating={isTerminating === instance.id}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              className="border-0 bg-transparent px-2 py-8"
              eyebrow="Compute"
              icon={<Icon icon="server" className="h-6 w-6" />}
              title="No GPU instances running"
              description="Deploy a model when you are ready to spin up inference infrastructure and monitor it here."
              analytics={{
                surface: "gpu_instances",
                variant: "no_instances",
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default GPUInstancesSection
