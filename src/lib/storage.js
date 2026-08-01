// Lightweight localStorage-backed polyfill for the `window.storage`
// key/value API that App.jsx was originally written against (the API
// available inside Claude.ai artifacts). This lets the exported project
// run standalone in any browser, persisting history entries locally.
//
// Shape matches window.storage.{get,set,delete,list}(key, shared):
//   get(key)    -> Promise<{ key, value, shared } | null>
//   set(key,v)  -> Promise<{ key, value, shared } | null>
//   delete(key) -> Promise<{ key, deleted, shared } | null>
//   list(prefix)-> Promise<{ keys, prefix, shared } | null>
//
// `shared` is accepted for API compatibility but ignored (everything is
// stored per-browser in localStorage). Swap this file out for a real
// backend-backed implementation if you need cross-device history.

const NAMESPACE = "ventureiq:";

function fullKey(key) {
  return NAMESPACE + key;
}

async function get(key, _shared = false) {
  const raw = localStorage.getItem(fullKey(key));
  if (raw === null) return null;
  return { key, value: raw, shared: false };
}

async function set(key, value, _shared = false) {
  localStorage.setItem(fullKey(key), value);
  return { key, value, shared: false };
}

async function del(key, _shared = false) {
  const existed = localStorage.getItem(fullKey(key)) !== null;
  localStorage.removeItem(fullKey(key));
  return { key, deleted: existed, shared: false };
}

async function list(prefix = "", _shared = false) {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const rawKey = localStorage.key(i);
    if (!rawKey || !rawKey.startsWith(NAMESPACE)) continue;
    const key = rawKey.slice(NAMESPACE.length);
    if (key.startsWith(prefix)) keys.push(key);
  }
  return { keys, prefix, shared: false };
}

export function installStoragePolyfill() {
  if (typeof window === "undefined") return;
  if (!window.storage) {
    window.storage = { get, set, delete: del, list };
  }
}
