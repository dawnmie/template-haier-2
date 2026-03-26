/**
 * OBaaS 实例 · Supabase Storage（supabase-js）封装（Vue / JS）
 *
 * 用法：`import { supabase } from '@/services/supabase'`，将 `supabase` 传入下列函数。
 *
 * 平台自测：仓库根 `scripts/storage-instance-sdk-smoke.ts` → `pnpm run test:storage-instance`
 *
 * 实例根 URL + `/storage/v1`；私桶属主与 JWT `sub` 相关。
 */

/** @param {import('@supabase/supabase-js').SupabaseClient} client */
export async function storageEnsureBucket(client, bucket, options = {}) {
  const { error } = await client.storage.createBucket(bucket, {
    public: options.public ?? false,
    fileSizeLimit: options.fileSizeLimit ?? 5_242_880,
  })
  if (error && !/already exists|Bucket already exists|Duplicate/i.test(error.message)) {
    throw new Error(error.message)
  }
}

/** @param {import('@supabase/supabase-js').SupabaseClient} client */
export async function storageUpload(client, bucket, path, body, opts = {}) {
  const { data, error } = await client.storage.from(bucket).upload(path, body, {
    upsert: opts.upsert ?? true,
    contentType: opts.contentType,
  })
  if (error) throw new Error(error.message)
  return data?.path ?? path
}

/** @param {import('@supabase/supabase-js').SupabaseClient} client */
export async function storageDownloadText(client, bucket, path) {
  const { data, error } = await client.storage.from(bucket).download(path)
  if (error) throw new Error(error.message)
  return await data.text()
}

/** @param {import('@supabase/supabase-js').SupabaseClient} client */
export async function storageList(client, bucket, folder, listOpts = {}) {
  const { data, error } = await client.storage.from(bucket).list(folder, {
    limit: listOpts.limit ?? 100,
    offset: listOpts.offset ?? 0,
    sortBy: listOpts.sortBy ?? { column: 'name', order: 'asc' },
  })
  if (error) throw new Error(error.message)
  return data ?? []
}

/** @param {import('@supabase/supabase-js').SupabaseClient} client */
export async function storageRemove(client, bucket, paths) {
  const { error } = await client.storage.from(bucket).remove(paths)
  if (error) throw new Error(error.message)
}

/** @param {import('@supabase/supabase-js').SupabaseClient} client */
export function storageGetPublicUrl(client, bucket, path) {
  return client.storage.from(bucket).getPublicUrl(path)
}

/** @param {import('@supabase/supabase-js').SupabaseClient} client */
export async function storageCreateSignedUrl(client, bucket, path, expiresInSeconds) {
  const { data, error } = await client.storage
    .from(bucket)
    .createSignedUrl(path, expiresInSeconds)
  if (error) throw new Error(error.message)
  if (!data?.signedUrl) throw new Error('createSignedUrl: empty signedUrl')
  return data.signedUrl
}
