"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
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
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="py-8 text-center">
      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-zeus-surface-neutral flex items-center justify-center">
        <Icon icon="server" className="w-6 h-6 text-zeus-text-tertiary" />
      </div>
      <p className="text-zeus-text-primary text-body-s font-medium mb-1">
        No Active Instances
      </p>
      <p className="text-zeus-text-tertiary text-caption-l">
        Deploy a model to start running inference on GPU
      </p>
    </div>
  )
}

export default GPUInstancesSection
