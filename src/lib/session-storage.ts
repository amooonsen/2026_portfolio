/**
 * Type-safe session storage utilities with automatic error handling.
 * All operations gracefully fail in environments without sessionStorage support (SSR, private browsing).
 */

/**
 * Safely retrieves a value from sessionStorage.
 *
 * @param key - The storage key to retrieve
 * @returns The stored value, or null if not found or if an error occurs
 *
 * @example
 * ```typescript
 * const seen = getSessionItem("intro-seen");
 * if (seen) {
 *   // User has seen the intro
 * }
 * ```
 */
export function getSessionItem(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    // SessionStorage unavailable (SSR, private browsing, quota exceeded)
    return null;
  }
}

/**
 * Safely stores a value in sessionStorage.
 *
 * @param key - The storage key to set
 * @param value - The value to store (will be converted to string)
 * @returns true if successful, false if storage fails
 *
 * @example
 * ```typescript
 * const success = setSessionItem("intro-seen", "1");
 * if (!success) {
 *   console.warn("Failed to cache intro state");
 * }
 * ```
 */
export function setSessionItem(key: string, value: string): boolean {
  try {
    sessionStorage.setItem(key, value);
    return true;
  } catch {
    // Storage failed (quota exceeded, private browsing, etc.)
    return false;
  }
}

/**
 * Safely removes a value from sessionStorage.
 *
 * @param key - The storage key to remove
 * @returns true if successful, false if removal fails
 *
 * @example
 * ```typescript
 * removeSessionItem("temp-data");
 * ```
 */
export function removeSessionItem(key: string): boolean {
  try {
    sessionStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a session storage key exists (has been set).
 *
 * @param key - The storage key to check
 * @returns true if the key exists with any value, false otherwise
 *
 * @example
 * ```typescript
 * if (hasSessionItem("intro-seen")) {
 *   skipIntro();
 * }
 * ```
 */
export function hasSessionItem(key: string): boolean {
  return getSessionItem(key) !== null;
}

/**
 * Safely clears all sessionStorage items.
 * Use with caution as this affects all keys in the session.
 *
 * @returns true if successful, false if clear fails
 *
 * @example
 * ```typescript
 * // Clear all session cache on logout
 * clearSession();
 * ```
 */
export function clearSession(): boolean {
  try {
    sessionStorage.clear();
    return true;
  } catch {
    return false;
  }
}
