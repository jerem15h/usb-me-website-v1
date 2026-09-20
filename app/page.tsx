import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { Thesis } from '@/components/thesis'
import { Ladder } from '@/components/ladder'
import { Pipeline } from '@/components/pipeline'
import { Memory } from '@/components/memory'
import { Device } from '@/components/device'
import { Benchmark } from '@/components/benchmark'
import { Workspace } from '@/components/workspace'
import { Control } from '@/components/control'
import { Access } from '@/components/access'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <div className="min-h-dvh">
      <SiteNav />
      <main>
        <Hero />
        <Thesis />
        <Ladder />
        <Pipeline />
        <Memory />
        <Device />
        <Benchmark />
        <Workspace />
        <Control />
        <Access />
      </main>
      <SiteFooter />
    </div>
  )
}
