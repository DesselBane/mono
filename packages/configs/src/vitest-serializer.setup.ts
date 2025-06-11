import { expect } from 'vitest'
// @ts-expect-error There are no types for this package. The only reason we import it here like this is that the configs package is not the end user
import vue3SnapshotSerializer from 'vue3-snapshot-serializer'

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
expect.addSnapshotSerializer(vue3SnapshotSerializer)
