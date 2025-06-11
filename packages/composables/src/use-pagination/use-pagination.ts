import { computed, isRef, ref, unref, watch } from 'vue'
import type { MaybeRef, Ref } from 'vue'

export class InvalidOperationError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'InvalidOperationError'
  }
}

export type UsePaginationOptions = {
  /**
   * On which page to start if {@link UsePaginationOptions#pageRef} is not passed.
   * @default 1
   */
  initialPage?: number

  /**
   * Total number of items.
   * @default Infinity
   */
  total?: MaybeRef<number>

  /**
   * How to handle the case of a page size change. This will shift items through pages.
   * @default goToFirstPage
   */
  handlePageSizeChanged?: 'doNothing' | 'goToFirstPage' | 'goToLastPage'

  /**
   * How to handle the error case that the current page becomes invalid when the last page changes. Last page may change if either `total` or `pageSize` changes. `handlePageSizeChanged` takes precedence.
   * @default goToLastPage
   */
  handlePageAfterLast?: 'goToFirstPage' | 'goToLastPage'

  /**
   * Whether to throw on error or stay on last known good page.
   * @default true
   */
  throwOnError?: boolean

  /**
   * If the current page is already available pass it in here. This could be the case if e.g. the page is persisted in the URL.
   * @default A new ref will be created.
   */
  pageRef?: Ref<number>
}

/**
 * Reactively calculate the current page, first/last item on page based on page size, total items and offset.
 * Use this when working with API data where not all data is available in the frontend.
 * @example
 * ```typescript
 * // Script block
 * import { syncRef } from "@vueuse/core";
 *
 * const currentPage = ref(1)
 * const perPage = ref(10)
 * const perPageOptions = [10, 50, 100]
 * const total = ref(Infinity)
 *
 * const { pageOffset, firstItem, lastItem } = usePagination(
 *   perPage,
 *   {
 *     total,
 *     handlePageAfterLast: "goToFirstPage",
 *     handlePageSizeChanged: "goToFirstPage",
 *     pageRef: currentPage,
 *   },
 * );
 *
 * const { data, dataTotal } = reactivelyGetMyData(pageOffset, perPage)
 * syncRef(dataTotal, total, {
 *   direction: "ltr",
 *   transform: {
 *     ltr: (value) => value ?? Infinity,
 *   },
 * });
 *
 * ```
 * ```html
 * <!-- Template Block -->
 * <div class="footer-container">
 *   <span>Per Page</span>
 *   <wui-form-multiselect
 *     v-model="perPage"
 *     :options="perPageOptions"
 *     :allow-empty="false"
 *   />
 *   <span>{{
 *     t("carts.list.pagination.numberOfItems", {
 *       from: formatter(firstItem),
 *       to: formatter(lastItem),
 *       count: total,
 *     })
 *   }}</span>
 *   <wui-quick-pagination
 *     v-model="currentPage"
 *     :total-rows="total"
 *     :limit="perPage"
 *   />
 * </div>
 * ```
 *
 * @param pageSize The currently selected page size.
 * @param options Options to fine tune how to react to changes.
 */
export function usePagination(
  pageSize: MaybeRef<number>,
  options: UsePaginationOptions = {},
) {
  const initialPage = options.initialPage ?? 1
  const total = options.total ?? Infinity
  const handlePageSizeChanged = options.handlePageSizeChanged ?? 'goToFirstPage'
  const handlePageAfterLast = options.handlePageAfterLast ?? 'goToLastPage'
  const throwOnError = options.throwOnError ?? true

  const page = options.pageRef ?? ref(initialPage)

  const lastPage = computed(() => {
    let page = Math.ceil(unref(total) / unref(pageSize))
    if (page < 1) {
      page = 1
    }

    return page
  })

  watch(
    page,
    (nextPage, previousPage) => {
      if (
        !Number.isInteger(nextPage) ||
        Number.isNaN(nextPage) ||
        nextPage < 1
      ) {
        if (throwOnError) {
          throw new InvalidOperationError(
            `Can not decrease page below 1 or newPage is not a valid integer: ${nextPage}`,
          )
        }
        page.value = 1
      }

      if (nextPage > unref(lastPage)) {
        if (throwOnError) {
          throw new InvalidOperationError(
            `Can not increase page above lastPage: ${unref(lastPage)}`,
          )
        }
        page.value = previousPage ?? 1
      }
    },
    {
      immediate: true,
      flush: 'sync',
    },
  )

  if (handlePageSizeChanged !== 'doNothing' && isRef(pageSize)) {
    watch(
      pageSize,
      () => {
        switch (handlePageSizeChanged) {
          case 'goToFirstPage': {
            page.value = 1
            break
          }
          case 'goToLastPage': {
            page.value = unref(lastPage)
            break
          }
        }
      },
      {
        flush: 'sync',
      },
    )
  }

  watch(
    lastPage,
    (nextLastPage) => {
      if (unref(page) > nextLastPage) {
        page.value = handlePageAfterLast === 'goToFirstPage' ? 1 : nextLastPage
      }
    },
    {
      immediate: true,
      flush: 'sync',
    },
  )

  const pageOffset = computed(() => (unref(page) - 1) * unref(pageSize))

  const firstItem = computed(() => (total === 0 ? 0 : unref(pageOffset) + 1))
  const lastItem = computed(() =>
    Math.min(unref(total), unref(pageOffset) + unref(pageSize)),
  )

  function nextPage(): void {
    page.value += 1
  }

  function previousPage() {
    page.value -= 1
  }

  return {
    pageSize,
    pageOffset,
    nextPage,
    previousPage,
    currentPage: page,
    firstItem,
    lastItem,
  }
}

export type UsePaginationWithDataOptions = Omit<UsePaginationOptions, 'total'>

/**
 * Reactively calculate the current page, first/last item on page based on page size, total items and offset.
 * Use this when working with local data where all data is available in the frontend.
 * @example
 * ```typescript
 * // Script block
 * const currentPage = ref(1)
 * const perPage = ref(10)
 * const perPageOptions = [10, 50, 100]
 * const data = ref([1, 2, 3, 4, 5, 6])
 *
 * const { paginatedData, firstItem, lastItem } = usePaginationWithData(
 *   data,
 *   perPage,
 *   {
 *     handlePageAfterLast: "goToFirstPage",
 *     handlePageSizeChanged: "goToFirstPage",
 *     pageRef: currentPage,
 *   },
 * );
 * ```
 * ```html
 * <!-- Template Block -->
 * <ul>
 *   <li v-for="item in paginatedData">{{item}}</li>
 * </ul>
 * <div class="footer-container">
 *   <span>Per Page</span>
 *   <wui-form-multiselect
 *     v-model="perPage"
 *     :options="perPageOptions"
 *     :allow-empty="false"
 *   />
 *   <span>{{
 *     t("carts.list.pagination.numberOfItems", {
 *       from: formatter(firstItem),
 *       to: formatter(lastItem),
 *       count: data.length,
 *     })
 *   }}</span>
 *   <wui-quick-pagination
 *     v-model="currentPage"
 *     :total-rows="data.length"
 *     :limit="perPage"
 *   />
 * </div>
 * ```

 * @param data The input data to be paginated.
 * @param pageSize The currently selected page size.
 * @param options Options to fine tune how to react to changes.
 */
export function usePaginationWithData<TData>(
  data: MaybeRef<TData[]>,
  pageSize: MaybeRef<number>,
  options: UsePaginationWithDataOptions = {},
) {
  const pagination = usePagination(pageSize, {
    ...options,
    total: computed(() => unref(data).length),
  })
  const { pageOffset } = pagination

  const paginatedData = computed(() => {
    const localData = unref(data)

    return localData.slice(
      unref(pageOffset),
      unref(pageOffset) + unref(pageSize),
    )
  })

  return {
    ...pagination,
    paginatedData,
  }
}
