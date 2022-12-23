export const enum ActorType {
  SYSTEM = 'SYSTEM',
  HUMAN = 'HUMAN',
}

export type ActorPrimitives = {
  credentials: string
  type: ActorType
}

export abstract class Actor {
  abstract toPrimitives(): ActorPrimitives
}
