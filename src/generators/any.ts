import { ObjectSchema } from '../schema'
import { Validator, addConstraint, constraint, validator } from './validator'
import generateValidator from './index'

/* NOT IMPLEMENTED:
 * - type[]
 */

export default function generateAnyValidator(schema: ObjectSchema): Validator {
  let v = validator('any')

  if (schema.hasOwnProperty('enum')) {
    v = addConstraint(v, constraint('valid', ...schema.enum))
  }

  if (schema.hasOwnProperty('const')) {
    v = addConstraint(v, constraint('valid', schema.const))
  }

  if (schema.hasOwnProperty('description')) {
    v = addConstraint(v, constraint('description', schema.description))
  }

  if (schema.hasOwnProperty('default')) {
    v = addConstraint(v, constraint('default', schema.default))
  }

  if (schema.hasOwnProperty('examples')) {
    v = addConstraint(v, constraint.apply(null, [ 'example', ...schema.examples! ]))
  }

  if (schema.hasOwnProperty('if')) {
    let opts: { then?: Validator; otherwise?: Validator } = { }
    if (schema.hasOwnProperty('then')) {
      opts.then = generateValidator(schema.then!)
    }
    if (schema.hasOwnProperty('else')) {
      opts.otherwise = generateValidator(schema.else!)
    }

    v = addConstraint(v, constraint('when', generateValidator(schema.if!), opts))
  }

  return v
}
