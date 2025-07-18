import { ref, unref } from 'vue'
import type { MaybeRef } from 'vue'
import { noop } from '@desselbane/ts-helpers'
import {
  InvalidOperationError,
  usePagination,
  usePaginationWithData,
} from './use-pagination'
import type { UsePaginationOptions } from './use-pagination'

type setupOptions = {
  pageSize?: MaybeRef<number>
  options?: UsePaginationOptions
}

function usePaginationSetup(setupOptions: setupOptions = {}) {
  const pageSize = setupOptions.pageSize ?? 7
  const options = setupOptions.options ?? {}

  return usePagination(pageSize, options)
}

function usePaginationWithDataSetup<TData>(
  data: MaybeRef<TData[]>,
  setupOptions: setupOptions = {},
) {
  const pageSize = setupOptions.pageSize ?? 7
  const options = setupOptions.options ?? {}
  return usePaginationWithData(data, pageSize, options)
}

describe(usePagination, () => {
  it.each([
    {
      pageSize: 7,
      expectedOffset: 0,
      page: 1,
    },
    {
      pageSize: 7,
      expectedOffset: 7,
      page: 2,
    },
    {
      pageSize: 7,
      expectedOffset: 14,
      page: 3,
    },
    {
      pageSize: 2,
      expectedOffset: 6,
      page: 4,
    },
    {
      pageSize: 1,
      expectedOffset: 6,
      page: 7,
    },
  ])(
    'should calc offset $expectedOffset for size $pageSize and page $page',
    ({ page, pageSize, expectedOffset }) => {
      const { pageOffset } = usePaginationSetup({
        pageSize,
        options: {
          initialPage: page,
        },
      })

      expect(unref(pageOffset)).toBe(expectedOffset)
    },
  )

  describe('nextPage', () => {
    it('should increase the page', () => {
      const { currentPage, nextPage, pageOffset } = usePaginationSetup()

      expect(unref(currentPage)).toBe(1)

      nextPage()

      expect(unref(currentPage)).toBe(2)
      expect(unref(pageOffset)).toBe(7)
    })

    it('should set pageOffset when setting current page', () => {
      const { currentPage, pageOffset, pageSize } = usePaginationSetup()

      expect(unref(currentPage)).toBe(1)
      expect(unref(pageOffset)).toBe(0)

      currentPage.value = 2

      expect(unref(currentPage)).toBe(2)
      expect(unref(pageOffset)).toBe(unref(pageSize))
    })

    it('should throw after last page (throwOnError:true)', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(noop)

      const { nextPage, currentPage } = usePaginationSetup({
        pageSize: 7,
        options: {
          total: 7,
          throwOnError: true,
        },
      })

      expect(unref(currentPage)).toBe(1)

      expect(() => {
        nextPage()
      }).toThrow(InvalidOperationError)

      warnSpy.mockRestore()
    })

    it('should stay on last page (throwOnError:false)', () => {
      const { nextPage, currentPage } = usePaginationSetup({
        pageSize: 7,
        options: {
          total: 7,
          throwOnError: false,
        },
      })

      expect(unref(currentPage)).toBe(1)

      nextPage()

      expect(unref(currentPage)).toBe(1)
    })

    it('should stay on last known page when page is set directly', () => {
      const { currentPage } = usePaginationSetup({
        pageSize: 4,
        options: {
          initialPage: 2,
          total: 16,
          throwOnError: false,
        },
      })

      expect(unref(currentPage)).toBe(2)

      currentPage.value = 20

      expect(unref(currentPage)).toBe(2)
    })

    it('should return to first page if currentPage is set to NaN', () => {
      const { currentPage } = usePaginationSetup({
        pageSize: 4,
        options: {
          initialPage: 2,
          total: 16,
          throwOnError: false,
        },
      })

      expect(unref(currentPage)).toBe(2)

      currentPage.value = Number.NaN

      expect(unref(currentPage)).toBe(1)
    })
  })

  describe('handlePageAfterLast', () => {
    it('should revertTo first page when total changes', () => {
      const total = ref(7)

      const { currentPage } = usePaginationSetup({
        pageSize: 4,
        options: {
          initialPage: 2,
          handlePageAfterLast: 'goToFirstPage',
          total,
        },
      })

      expect(unref(currentPage)).toBe(2)

      total.value = 3

      expect(unref(currentPage)).toBe(1)
    })

    it('should revertTo last page when total changes', () => {
      const total = ref(7)

      const { currentPage } = usePaginationSetup({
        pageSize: 2,
        options: {
          initialPage: 4,
          handlePageAfterLast: 'goToLastPage',
          total,
        },
      })

      expect(unref(currentPage)).toBe(4)

      total.value = 3

      expect(unref(currentPage)).toBe(2)
    })

    it('should revertTo first page when pageSize changes', () => {
      const pageSize = ref(4)

      const { currentPage } = usePaginationSetup({
        pageSize,
        options: {
          initialPage: 3,
          handlePageAfterLast: 'goToFirstPage',
          handlePageSizeChanged: 'doNothing',
          total: 16,
        },
      })

      expect(unref(currentPage)).toBe(3)

      pageSize.value = 8

      expect(unref(currentPage)).toBe(1)
    })

    it('should revertTo last page when pageSize changes', () => {
      const pageSize = ref(4)

      const { currentPage } = usePaginationSetup({
        pageSize,
        options: {
          initialPage: 3,
          handlePageAfterLast: 'goToLastPage',
          handlePageSizeChanged: 'doNothing',
          total: 16,
        },
      })

      expect(unref(currentPage)).toBe(3)

      pageSize.value = 8

      expect(unref(currentPage)).toBe(2)
    })
  })

  describe('handlePageSizeChanged', () => {
    it('should doNothing', () => {
      const pageSize = ref(4)

      const { currentPage } = usePaginationSetup({
        pageSize,
        options: {
          initialPage: 2,
          handlePageSizeChanged: 'doNothing',
          total: 16,
        },
      })

      expect(unref(currentPage)).toBe(2)

      pageSize.value = 8

      expect(unref(currentPage)).toBe(2)
    })

    it('should goToFirstPage', () => {
      const pageSize = ref(4)

      const { currentPage } = usePaginationSetup({
        pageSize,
        options: {
          initialPage: 3,
          handlePageSizeChanged: 'goToFirstPage',
          // Take opposite action here to ensure handlePageSizeChanged takes precedence
          handlePageAfterLast: 'goToLastPage',
          total: 16,
        },
      })

      expect(unref(currentPage)).toBe(3)

      pageSize.value = 8

      expect(unref(currentPage)).toBe(1)
    })

    it('should goToLastPage', () => {
      const pageSize = ref(4)

      const { currentPage } = usePaginationSetup({
        pageSize,
        options: {
          initialPage: 3,
          handlePageSizeChanged: 'goToLastPage',
          // Take opposite action here to ensure handlePageSizeChanged takes precedence
          handlePageAfterLast: 'goToFirstPage',
          total: 16,
        },
      })

      expect(unref(currentPage)).toBe(3)

      pageSize.value = 8

      expect(unref(currentPage)).toBe(2)
    })
  })

  describe('previousPage', () => {
    it('should decrease the page', () => {
      const { currentPage, previousPage, pageOffset } = usePaginationSetup({
        options: {
          initialPage: 2,
        },
      })

      expect(unref(currentPage)).toBe(2)

      previousPage()

      expect(unref(currentPage)).toBe(1)
      expect(unref(pageOffset)).toBe(0)
    })

    it('should set pageOffset when setting current page', () => {
      const { currentPage, pageOffset } = usePaginationSetup({
        options: {
          initialPage: 2,
        },
      })

      expect(unref(currentPage)).toBe(2)
      expect(unref(pageOffset)).toBe(7)

      currentPage.value = 1

      expect(unref(currentPage)).toBe(1)
      expect(unref(pageOffset)).toBe(0)
    })

    it('should throw if at 1 and previousPage is called (option throwOnError: true)', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(noop)

      const { previousPage, currentPage } = usePaginationSetup({
        options: {
          throwOnError: true,
        },
      })

      expect(unref(currentPage)).toBe(1)

      expect(() => {
        previousPage()
      }).toThrow(InvalidOperationError)

      warnSpy.mockRestore()
    })

    it('should stay at page 1 if at 1 and previousPage is called (option throwOnError: false)', () => {
      const { previousPage, currentPage } = usePaginationSetup({
        options: {
          throwOnError: false,
        },
      })

      expect(unref(currentPage)).toBe(1)

      previousPage()

      expect(unref(currentPage)).toBe(1)
    })
  })

  it('should use passed page ref if available', () => {
    const underlyingPageRef = ref(2)
    const { currentPage } = usePaginationSetup({
      options: {
        pageRef: underlyingPageRef,
      },
    })

    expect(unref(currentPage)).toBe(2)

    underlyingPageRef.value = 3

    expect(unref(currentPage)).toBe(3)
  })

  it('should sync changes to page ref if available', () => {
    const underlyingPageRef = ref(2)
    const { currentPage } = usePaginationSetup({
      options: {
        throwOnError: false,
        pageRef: underlyingPageRef,
      },
    })

    expect(unref(currentPage)).toBe(2)

    underlyingPageRef.value = -1

    expect(unref(currentPage)).toBe(1)
  })

  it.each([
    {
      pageSize: 4,
      total: 16,
      page: 3,
      expectedFirstItem: 9,
      expectedLastItem: 12,
    },
    {
      pageSize: 8,
      total: 15,
      page: 2,
      expectedFirstItem: 9,
      expectedLastItem: 15,
    },
    {
      pageSize: 4,
      total: 0,
      page: 1,
      expectedFirstItem: 0,
      expectedLastItem: 0,
    },
    {
      pageSize: 4,
      total: undefined,
      page: 3,
      expectedFirstItem: 9,
      expectedLastItem: 12,
    },
  ])(
    'should correctly compute first/last Item pageSize: $pageSize, total: $total, page: $page, expectedFirstItem: $expectedFirstItem, expectedLastItem: $expectedLastItem',
    ({ pageSize, page, total, expectedFirstItem, expectedLastItem }) => {
      const { firstItem, lastItem } = usePaginationSetup({
        pageSize,
        options: {
          total,
          initialPage: page,
        },
      })

      expect(unref(firstItem)).toBe(expectedFirstItem)
      expect(unref(lastItem)).toBe(expectedLastItem)
    },
  )
})

describe(usePaginationWithData, () => {
  const defaultData = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  describe('data', () => {
    it('should correctly show the first page', () => {
      const { paginatedData } = usePaginationWithDataSetup(defaultData, {
        pageSize: 4,
      })

      expect(unref(paginatedData)).toStrictEqual([1, 2, 3, 4])
    })

    it('should be reactive', () => {
      const data = ref([...defaultData])
      const { paginatedData } = usePaginationWithDataSetup(data, {
        pageSize: 4,
      })

      expect(unref(paginatedData)).toStrictEqual([1, 2, 3, 4])

      data.value[0] = 9

      expect(unref(paginatedData)).toStrictEqual([9, 2, 3, 4])
    })
  })
})
