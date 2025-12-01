import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-pulse text-sapient-purple">Carregando cena 3D...</div>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}
