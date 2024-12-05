import { ChartBarSquareIcon, BoltIcon, ArrowTrendingUpIcon, UsersIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Análisis avanzado basado en IA',
    description:
      'ValorTrack utiliza algoritmos de inteligencia artificial para analizar en profundidad tus partidas en Valorant. Esta característica innovadora permite identificar patrones de juego, detectar áreas de mejora específicas y ofrecer recomendaciones personalizadas para potenciar tu rendimiento',
    icon: ChartBarSquareIcon,
  },
  {
    name: 'Retroalimentación en instantanea',
    description:
      'Con ValorTrack, obtendrás retroalimentación sobre tus decisiones, movimientos y habilidades en el juego. La plataforma te informará sobre qué estás haciendo bien y en qué áreas puedes mejorar, lo que te permitirá ajustar tu enfoque y tomar decisiones más informadas en justo despues de terminar tu partida.',
    icon: BoltIcon,
  },
  {
    name: 'Entrenamiento adaptativo',
    description:
      'Nos adaptamos a tu estilo de juego y a tu progreso individual. A medida que avanzas y mejoras, la plataforma ajusta sus recomendaciones y desafíos para mantenerte desafiado y ayudarte a crecer constantemente como jugador. Esta característica innovadora asegura que recibas un entrenamiento personalizado y relevante en todo momento.',
    icon: ArrowTrendingUpIcon,
  },
  {
    name: 'Comunidad de jugadores',
    description:
      'ValorTrack no solo se trata de mejorar individualmente, sino de conectarte con otros jugadores que comparten tu pasión por Valorant. La plataforma cuenta con una comunidad integrada donde puedes interactuar, compartir consejos y estrategias, y participar en desafíos amistosos. Esta característica fomenta el aprendizaje colaborativo y la colaboración entre jugadores, lo que lleva a un crecimiento colectivo.',
    icon: UsersIcon,
  },
]

export default function HomeBody() {
  return (
    <div className="dark:bg-gray-950 bg-[#fcf8ed] sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-VALORANT text-center tracking-tight text-rose-600 sm:text-4xl">
            Mejora ahora mismo
          </p>
          <p className="mt-6 text-lg leading-8 dark:text-gray-400 text-neutral-700">
          Atrévete a dar el siguiente paso y lleva tu gameplay en Valorant a nuevos horizontes. Con ValorTrack, tienes a tu disposición las herramientas más innovadoras para analizar, aprender y superarte en cada partida. No te conformes con ser solo otro jugador, aprovecha esta oportunidad y desbloquea todo tu potencial en Valorant. ¡La mejora está a tu alcance!
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-[#0db196]">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0db196]">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 dark:text-gray-400 text-neutral-700">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}