import type { SimplifyDeep, UnknownRecord } from 'type-fest'
import { z } from 'zod/v4'
import type { ZodLiteral, ZodString } from 'zod/v4'

export type Prompt = {
  name: string
  message: string
  prefix?: string
  suffix?: string
}

export type InputPrompt = Prompt & {
  type: 'input'
}

export type ListPrompt = Prompt & {
  type: 'list'
  choices: readonly { name: string; value: string }[]
}

export type AllowedPrompt = InputPrompt | ListPrompt

export type AllowedPrompQuestions = readonly AllowedPrompt[]

export type ValueForPrompt<TPrompt extends AllowedPrompt> =
  TPrompt extends InputPrompt
    ? string
    : TPrompt extends ListPrompt
      ? TPrompt['choices'][number]['value']
      : never

export type AnswersForPrompQuestions<TPrompts extends AllowedPrompQuestions> =
  SimplifyDeep<{
    [Entry in TPrompts[number]['name']]: ValueForPrompt<
      Extract<TPrompts[number], { name: Entry }>
    >
  }>

/**
 * Zod
 */

export type SchemaForPrompt<TPrompt extends AllowedPrompt> =
  TPrompt extends InputPrompt
    ? ZodString
    : TPrompt extends ListPrompt
      ? ZodLiteral<TPrompt['choices'][number]['value']>
      : never

export type AnswerSchemaForPrompQuestions<
  TPrompts extends AllowedPrompQuestions,
> = SimplifyDeep<{
  [Entry in TPrompts[number]['name']]: SchemaForPrompt<
    Extract<TPrompts[number], { name: Entry }>
  >
}>

export function createPrompts<const TPrompt extends AllowedPrompQuestions>(
  prompts: TPrompt,
) {
  const unfinishedAnswers: UnknownRecord = {}

  for (const singlePrompt of prompts) {
    switch (singlePrompt.type) {
      case 'input': {
        unfinishedAnswers[singlePrompt.name] = z.string()
        break
      }
      case 'list': {
        unfinishedAnswers[singlePrompt.name] = z.literal(
          singlePrompt.choices.map((choice) => choice.value),
        )
      }
    }
  }

  const answers = unfinishedAnswers as AnswerSchemaForPrompQuestions<TPrompt>

  const answerSchema = z.looseObject(answers)

  const turboOptionsSchema = z.object({
    turbo: z.object({
      paths: z.object({
        root: z.string(),
        cwd: z.string(),
        workspace: z.string(),
      }),
      configs: z.array(
        z.object({
          turboConfigPath: z.string(),
          workspacePath: z.string(),
          isRootConfig: z.boolean(),
          config: z.object({
            ui: z.string().optional(),
            globalEnv: z.array(z.string()).optional(),
            globalPassThroughEnv: z.array(z.string()).optional(),
            tasks: z.record(
              z.string(),
              z
                .object({
                  dependsOn: z.array(z.string()).optional(),
                  outputs: z.array(z.string()).optional(),
                  persitent: z.boolean().optional(),
                  cache: z.boolean().optional(),
                  interruptible: z.boolean().optional(),
                })
                .optional(),
            ),
          }),
        }),
      ),
    }),
  })

  const setHelperOptionsSchema = z.looseObject({
    root: turboOptionsSchema.extend(answerSchema.shape),
  })

  return {
    answerSchema,
    setHelperOptionsSchema,
    prompts,
  }
}
