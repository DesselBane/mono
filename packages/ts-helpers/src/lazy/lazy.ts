export function lazy<TLazyReturn>(
  creator: () => TLazyReturn,
): () => TLazyReturn {
  let cache: TLazyReturn

  return () => {
    cache ??= creator()
    return cache
  }
}
