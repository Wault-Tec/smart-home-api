export default function(...args) {
  const params = {}

  args.map((arg) => {
    for (const [key, value] of Object.entries(arg)) {
      if(value !== undefined && value !== "") {
        params[key] = value
      }
    }
  })
  return params
}