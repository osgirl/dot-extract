function extract(input, spec) {
  const processed = process(spec)
  if (Array.isArray(input)) {
    return input.map(x => extractSingle(x, processed))
  }
  return extractSingle(input, processed)
}

function extractSingle(input, spec) {
  if (!input) {
    return undefined
  }
  const output = {}
  for (const [specKey, specItem] of Object.entries(spec)) {
    const inputProperty = input[specKey]
    if (!specItem) {
      output[specKey] = inputProperty
      continue
    }
    if (Array.isArray(inputProperty)) {
      output[specKey] = inputProperty.map(x => extractSingle(x, specItem))
      continue
    }
    output[specKey] = extractSingle(inputProperty, specItem)
  }
  return output
}

function process(spec) {
  const processed = {}
  for (const item of spec) {
    if (!item) {
      continue
    }
    processSingle(item.split('.'), processed)
  }
  return processed
}

function processSingle(spec, obj) {
  const [item, ...rest] = spec
  if (rest.length === 0) {
    obj[item] = null
    return
  }
  let existing = obj[item]
  if (!existing) {
    existing = {}
    obj[item] = existing
  }
  processSingle(rest, existing)
}

module.exports = extract
