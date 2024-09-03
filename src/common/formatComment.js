export function formatComment(count) {
  if (count > 1000) {
    return "999+"
  }
  return count
}