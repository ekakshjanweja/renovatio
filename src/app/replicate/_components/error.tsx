"use client"

export function ShowError({ error }: { error: any }) {
  return (
    <>
      {error && <div>{error}</div>}
    </>
  )
}
