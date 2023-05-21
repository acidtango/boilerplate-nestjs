import { Language } from '../../domain/models/Language'

export const JUNIOR_XP = {
  id: '994e8e5f-d82a-4e16-bfae-33d279e86a72',
  title: 'Junior XP: Cómo practicar eXtreme Programming y no morir en el intento',
  description:
    'Es fácil obsesionarse con el framework o lenguaje de programación que se van a convertir en los más demandados, sin valorar en la misma medida las metodologías de trabajo y, como consecuencia, parece que no somos del todo conscientes del impacto que pueden llegar a tener, tanto en el aspecto técnico como en el día a día de nuestra relación con el equipo. En esta sesión trataré de transmitir los beneficios que me ha aportado a mí, como junior, haber comenzado mi camino en el mundo del desarrollo aplicando eXtreme Programming, centrándome en sus valores (comunicación, feedback, simplicidad, coraje y respeto), sus principios y algunas de sus prácticas. La charla estaría orientada o podría ser útil principalmente a personas con poca experiencia profesional, que están interesados en aprender mecánicas ágiles de comunicación y trabajo en equipo, aunque veremos que buena parte del contenido puede aplicarse también a perfiles con más experiencia.',
  language: Language.SPANISH,
  cospeakers: [] as string[],
}

export const IMPROVING_TESTS = {
  id: 'e063c2a2-abd6-4872-8829-b9cb2d9bb648',
  title: 'Mejorando nuestros test con aserciones sobre nuestro dominio',
  description:
    '¿Alguna vez has leído un test y has pensado que era muy complejo de entender lo que estabas aseverando? A mi si me ha pasado, y tras tiempo dándole vueltas, he encontrado la forma de que nuestros tests hablen el mismo idioma que nuestro código. Veremos cómo podemos usar Jest, para mejorar las aserciones de nuestros tests creando las nuestras propias',
  language: Language.SPANISH,
  cospeakers: [] as string[],
}
