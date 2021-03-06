/**
 * Top level program arguments
 */
export default interface Args {
  /** Input schema file. If omitted, stdin is used. */
  file?: string

  /** Name of the joi object to call in the code */
  name: string

  /** Whether or not unknown properties are allowed */
  'allow-unknown': boolean

  /** The output file to print results to. If omitted, stdout is used. */
  output?: string

  /** Text to prepend to the start of the generated output */
  preamble?: string
}
