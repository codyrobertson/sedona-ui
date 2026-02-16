"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShaderLab } from "@/components/playground/shader-lab"
import { AsciiConverter } from "@/components/playground/ascii-converter"

export default function PlaygroundClient() {
  return (
    <div className="min-h-screen bg-zeus-surface-default">
      <div className="max-w-[1600px] mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-heading-lg font-bold text-zeus-text-primary">Playground</h1>
          <p className="text-body-s text-zeus-text-secondary mt-1">
            Experiment with shaders and visual effects
          </p>
        </div>
        <Tabs defaultValue="shaders" className="w-full">
          <TabsList>
            <TabsTrigger value="shaders">Shader Lab</TabsTrigger>
            <TabsTrigger value="ascii">ASCII Converter</TabsTrigger>
          </TabsList>
          <TabsContent value="shaders">
            <ShaderLab />
          </TabsContent>
          <TabsContent value="ascii">
            <AsciiConverter />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
