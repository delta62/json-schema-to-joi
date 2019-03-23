export type ValidatorType = 'number' | 'string'

export interface Constraint {
    name: string
    params: any[]
}

export interface Validator extends Constraint {
    constraints: Constraint[]
}

export function createValidator(type: ValidatorType): Validator {
    return {
        name: type,
        params: [ ],
        constraints: [ ]
    }
}

export function addConstraint(validator: Validator, constraint: Constraint): Validator {
    return {
        name: validator.name,
        constraints: [ ...validator.constraints, constraint ],
        params: [ ]
    }
}

export function singletonConstraint<T>(name: string, value: T): Constraint {
    let params = [ value ]
    return { name, params }
}