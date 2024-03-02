"use client"
import React from 'react'
import style from './trendSection.module.css'
import Trend from './Trend'
import { useSelectedLayoutSegment } from 'next/navigation'
import { UnviableSegments } from '@/app/(afterLogin)/layout'

export default function TrendSection() {
  const segment: string|null = useSelectedLayoutSegment()
  // usePathName() : / (...someThing) ? : 사이에 있는 값을 불러옵니다. 

  if (segment === UnviableSegments.EXPLORE) return 
  return (
    <div className={style.trendBg}>
      <div className={style.trend}>
        <h3>나를 위한 트랜드</h3>
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
      </div>
    </div>
  )
}
