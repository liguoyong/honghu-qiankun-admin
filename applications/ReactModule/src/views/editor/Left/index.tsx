import React, { ReactElement, useState } from 'react'
import cl from 'classnames'
import menus from '../schema/fields/index.tsx'
interface IconProps {
  active: boolean
}
export const icons = {
  tree: ({ active }: IconProps) => {
    return (
      <svg
        className="w-6 h-6 mx-auto"
        fill="none"
        stroke={active ? 'rgba(79, 70, 229, 1)' : '#79798c'}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    )
  },
  HTML5: ({ active }: IconProps) => {
    return (
      <svg
        className="w-6 h-6 mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 512 512"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={active ? '#E44D26' : '#79798c'}
          d="M64 32l34.94 403.21L255.77 480 413 435.15 448 32zm308 132H188l4 51h176l-13.51 151.39L256 394.48l-98.68-28-6.78-77.48h48.26l3.42 39.29L256 343.07l53.42-14.92L315 264H148l-12.59-149.59H376.2z"
        ></path>
      </svg>
    )
  },
  antd: ({ active }: IconProps) => {
    return (
      <svg
        className="w-6 h-6 mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M179.92191999 517.23776c1.89952 2.10944 3.70688 4.3008 5.70880001 6.30272001C279.8848 617.87136 374.15424001 712.17664 468.41344 806.5024c11.0336 11.0336 22.01088 22.12864 32.98816 33.21856 6.91712 6.97856 13.7984 6.6048 21.6576-1.26976 37.8112-37.84192 75.61216-75.68896 113.41824-113.536l201.68192-201.86624c8.22784-8.24832 8.2176-14.35648-0.07168-22.65088-40.82176-40.85248-81.6384-81.70496-122.48064-122.53696-19.46112-19.46112-22.49216-45.40928-7.66976-66.46784 16.89088-23.99744 52.63872-28.07296 73.52832-7.50592 40.82176 40.18176 81.12128 80.88576 121.61024 121.39008 15.72864 15.73376 31.51872 31.4112 47.10912 47.28832001 22.4512 22.87616 22.65088 56.11008 0.128 78.74047999-55.86944 56.15616001-111.96928 112.08192-167.94112 168.13568a312823.92576 312823.92576 0 0 0-229.23776 229.73952c-13.0304 13.07648-28.31872 19.55328-46.89408 17.87392-12.60544-1.14176-23.51616-6.1696-32.39424-14.976a35948.48256 35948.48256 0 0 1-109.21984-109.0304c-95.89248-95.98976-191.72864-192.0512-287.69792-287.97952-9.62048-9.62048-16.96256-20.17792-19.18464-33.87904-2.98496-18.37056 1.65376-34.67264001 14.56128-47.82592 30.94016-31.5392 62.37184-62.60736 93.61408-93.8496 0.21504-0.20992 0.5376-0.32256 0.81408-0.48128 1.21855999 2.80064-1.0496 4.37248-2.30912 6.20544-8.56064 12.38528-15.70304 25.41056-19.21536 40.22271999-4.58752 19.32288-1.23392 37.4784 7.8848 54.79424001 5.45792 10.368 12.55424 19.584 20.35712 28.288 2.41152 2.70336 4.53632 5.632 6.47167999 8.69376z"
          fill={active ? '#722ed1' : '#79798c'}
        ></path>
        <path
          d="M336.04608 234.6752c0.0512-15.68256 4.98688-27.3408 14.5152-36.93568 41.2416-41.51296 82.432-83.09248 123.9296-124.35968 22.20544-22.08256 55.4496-22.34368 77.76768-0.32256 41.5488 40.99583999 82.7392 82.35008 123.8016 123.84256 13.77792 13.9264 17.85856 31.08352 11.96032001 49.792-5.66783999 17.95584-18.35008 29.27104-36.77184001 33.20832-18.5088 3.95776-34.05824-2.24768-47.22176-15.47264-26.03008-26.17344-52.16768-52.2496-78.26944-78.35648001-9.0112-9.0112-14.94016-8.97536-24.00256 0.09728001-26.76224 26.7776-53.49376 53.59616-80.31232 80.32768-18.92864 18.87744-45.37344 21.15072-66.14016 5.4272-12.8768-9.76383999-19.01568-23.17312-19.25632-37.248z"
          fill={active ? '#fa541c' : '#79798c'}
        ></path>
        <path
          d="M406.12352 509.7472c-0.12288-58.52672 46.89408-107.77088 107.7504-107.65824 60.75904 0.10752 107.72991999 47.7696 107.9296 107.5712 0.20992 60.97920001-48.08192 108.41599999-108.06784 108.3648-61.54752-0.05632-108.1344-50.25792-107.61216-108.27776z"
          fill={active ? '#d4237a' : '#79798c'}
        ></path>
        <path
          d="M179.92191999 517.23776c-18.40128-18.60096-33.90464-39.03488-37.56543998-65.8432-2.10432-15.41632 1.24416-30.33088 7.96159999-44.41088 4.00384-8.38656 8.6016-16.41472 14.18752-23.86944 0.90112-1.21344 2.16576-2.3552 2.23744-4.08064 24.51455999-24.51968 48.896-49.17248 73.58976-73.51296001 19.93728-19.6608 50.2528-19.5072 69.62688-0.06655999 19.38944 19.46624 19.3536 50.19136-0.43008 70.08256A40343.72608 40343.72608 0 0 1 184.832 500.28032c-4.95616 4.92544-7.2448 10.15808-4.91008001 16.95744z"
          fill={active ? '#4284EA' : '#79798c'}
        ></path>
      </svg>
    )
  },
  components: ({ active }: IconProps) => {
    return (
      <svg
        className="w-6 h-6 mx-auto"
        fill="none"
        stroke={active ? 'rgba(79, 70, 229, 1)' : '#79798c'}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    )
  },
}

export default function Left(): ReactElement {
  const [type, setType] = useState('basic')
  const fields = menus.find((menu) => menu.key === type)
  return (
    <div className="w-60 flex">
      <div className="w-20 overscroll-y-auto flex flex-col items-center">
        {menus.map((menu) => {
          const MenuIcon = icons[menu.icon]
          return (
            <div
              key={menu.key}
              onClick={() => setType(menu.key)}
              className={cl(
                'py-5 cursor-pointer w-20 border-transparent border-r-4 hover:bg-indigo-50',
                {
                  'border-indigo-600 shadow': menu.key === type,
                }
              )}
            >
              <MenuIcon active={menu.key === type} />
            </div>
          )
        })}
      </div>
      <div className="w-40 overscroll-y-auto p-2 space-y-2 border-r border-l border-gray-200">
        {fields?.panel}
      </div>
    </div>
  )
}