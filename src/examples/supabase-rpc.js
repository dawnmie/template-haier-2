/**
 * OBaaS · 通过 supabase-js 调用 PostgREST RPC（存储过程）的通用封装。
 *
 * 用法：`import { supabase } from '@/services/supabase'` 与本模块中的函数；参数名须与存储过程 IN 参数一致（如 p_id、p_title）。
 */

import { supabase } from '@/services/supabase'

/**
 * @param {string} name 存储过程名，如 sp_list_items
 * @param {Record<string, unknown>} params 命名参数
 * @returns {Promise<unknown>}
 */
export async function rpc(name, params = {}) {
  const { data, error } = await supabase.rpc(name, params)
  if (error) throw new Error(error.message)
  return data
}

/** 取 RPC 第一行（单行 SELECT 或数组首元素） */
export function firstRow(data) {
  if (data == null) return undefined
  return Array.isArray(data) ? data[0] : data
}
