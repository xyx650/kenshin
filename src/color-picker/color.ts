const hsv2hsl = function(hue: number, sat: number, val: number) {
  let l = (2 - sat) * val
  let sl = sat * val
  sl /= l < 1 ? l : 2 - l
  sl = sl || 0
  l /= 2
  return [hue, sl, l]
}

// is '1.0' or not
const isOnePointZero = function(n: string | number) {
  return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1
}

// a string contains '%'
const isPercentage = function(n: string | number) {
  return typeof n === 'string' && n.indexOf('%') !== -1
}

//
const bound01 = function(value: string | number, max: number) {
  if (isOnePointZero(value)) value = '100%'

  const processPercent = isPercentage(value)
  value = Math.min(max, Math.max(0, parseFloat(value as string)))

  // Automatically convert percentage into number
  if (processPercent) {
    value = parseInt(String(value * max), 10) / 100
  }

  // Handle floating point rounding errors
  if (Math.abs(value - max) < 0.000001) {
    return 1
  }

  // Convert into [0, 1] range if it isn't already
  return value % max / parseFloat(max.toString())
}

//十六进制转换
const toHex = function({ r, g, b }: { r: number; g: number; b: number }) {
  const hexOne = function(value: number) {
    value = Math.min(Math.round(value), 255)
    return value.toString(16)
  }

  if (isNaN(r) || isNaN(g) || isNaN(b)) return ''

  return '#' + hexOne(r) + hexOne(g) + hexOne(b)
}

// 16 转 10 进制
const parseHexChannel = function(hex: string): number {
  return parseInt(hex, 16)
}

const hsl2hsv = function(hue: number, sat: number, light: number) {
  sat = sat / 100
  light = light / 100
  let smin = sat
  const lmin = Math.max(light, 0.01)
  let sv
  let v

  light *= 2
  sat *= light <= 1 ? light : 2 - light
  smin *= lmin <= 1 ? lmin : 2 - lmin
  v = (light + sat) / 2
  sv = light === 0 ? 2 * smin / (lmin + smin) : 2 * sat / (light + sat)

  return {
    h: hue,
    s: sv * 100,
    v: v * 100
  }
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
const rgb2hsv = function(r: number, g: number, b: number) {
  r = bound01(r, 255)
  g = bound01(g, 255)
  b = bound01(b, 255)

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s
  let v = max

  const d = max - min
  s = max === 0 ? 0 : d / max

  if (max === min) {
    h = 0 // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h = (h || 0) / 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  }
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
const hsv2rgb = function(h: number, s: number, v: number) {
  h = bound01(h, 360) * 6
  s = bound01(s, 100)
  v = bound01(v, 100)

  const i = Math.floor(h)
  const f = h - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  const mod = i % 6
  const r = [v, q, p, p, t, v][mod]
  const g = [t, v, v, q, p, p][mod]
  const b = [p, p, t, v, v, q][mod]

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

export default class Color {
  _hue: number
  _saturation: number
  _value: number
  _alpha: number | string
  enableAlpha: boolean
  format: string
  value: string | number

  [key: string]: any

  constructor(options: Color) {
    this._hue = 0
    this._saturation = 100
    this._value = 100
    this._alpha = 100

    this.enableAlpha = false
    this.format = 'hex'
    this.value = ''

    options = options || {}

    for (let option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = (options as any)[option]
      }
    }

    this.doOnChange()
  }

  set(prop: string | { [key: string]: string }, value?: string | number) {
    if (arguments.length === 1 && typeof prop === 'object') {
      for (let p in prop) {
        if (prop.hasOwnProperty(p)) {
          this.set(p, prop[p])
        }
      }
      return
    }

    this['_' + prop] = value
    this.doOnChange()
  }

  get(prop: string): string | number {
    return this['_' + prop]
  }

  toRgb() {
    return hsv2rgb(this._hue, this._saturation, this._value)
  }

  fromString(value: string) {
    if (!value) {
      this._hue = 0
      this._saturation = 100
      this._value = 100
      this.doOnChange()
      return
    }

    const fromHSV = (h: number, s: number, v: number) => {
      this._hue = h
      this._saturation = s
      this._value = v

      this.doOnChange()
    }

    if (value.indexOf('hsl') !== -1) {
      const parts = value
        .replace(/hsla|hsl|\(|\)/gm, '')
        .split(/\s|,/g)
        .filter(val => val !== '')
        .map((val, index) => index > 2 ? parseFloat(val) : parseInt(val, 10))

      if (parts.length === 4) {
        this._alpha = Math.floor(parseFloat(parts[3].toString()) * 100)
      }
      if (parts.length >= 3) {
        const { h, s, v } = hsl2hsv(parts[0], parts[1], parts[2])
        fromHSV(h, s, v)
      }
    } else if (value.indexOf('hsv') !== -1) {
      const parts = value
        .replace(/hsva|hsv|\(|\)/gm, '')
        .split(/\s|,/g)
        .filter(val => val !== '')
        .map((val, index) => index > 2 ? parseFloat(val) : parseInt(val, 10))

      if (parts.length === 4) {
        this._alpha = Math.floor(parseFloat(parts[3].toString()) * 100)
      }
      if (parts.length >= 3) {
        fromHSV(parts[0], parts[1], parts[2])
      }
    } else if (value.indexOf('rgb') !== -1) {
      const parts = value
        .replace(/rgba|rgb|\(|\)/gm, '')
        .split(/\s|,/g)
        .filter(val => val !== '')
        .map((val, index) => index > 2 ? parseFloat(val) : parseInt(val, 10))

      if (parts.length === 4) {
        this._alpha = Math.floor(parseFloat(parts[3].toString()) * 100)
      }
      if (parts.length >= 3) {
        const { h, s, v } = rgb2hsv(parts[0], parts[1], parts[2])
        fromHSV(h, s, v)
      }
    } else if (value.indexOf('#') !== -1) {
      const hex = value.replace('#', '').trim()
      let r, g, b

      if (hex.length === 3) {
        r = parseHexChannel(hex[0] + hex[0])
        g = parseHexChannel(hex[1] + hex[1])
        b = parseHexChannel(hex[2] + hex[2])
      } else if (hex.length === 6) {
        r = parseHexChannel(hex.substring(0, 2))
        g = parseHexChannel(hex.substring(2, 4))
        b = parseHexChannel(hex.substring(4))
      }

      const { h, s, v } = rgb2hsv(<number>r, <number>g, <number>b)
      fromHSV(h, s, v)
    }
  }

  doOnChange() {
    const { _hue, _saturation, _value, _alpha, format } = this

    if (this.enableAlpha) {
      switch (format) {
        case 'hsl': {
          const hsl = hsv2hsl(_hue, _saturation / 100, _value / 100)
          this.value = `hsla(${_hue}, ${Math.round(hsl[1] * 100)}%, ${Math.round(hsl[2] * 100)}%, ${+_alpha / 100})`
          break
        }
        case 'hsv':
          this.value = `hsva(${_hue}, ${Math.round(_saturation)}%, ${Math.round(_value)}%, ${+_alpha / 100})`
          break
        default: {
          const { r, g, b } = hsv2rgb(_hue, _saturation, _value)
          this.value = `rgba(${r}, ${g}, ${b}, ${+_alpha / 100})`
        }
      }
    } else {
      switch (format) {
        case 'hsl': {
          const hsl = hsv2hsl(_hue, _saturation / 100, _value / 100)
          this.value = `hsl(${_hue}, ${Math.round(hsl[1] * 100)}%, ${Math.round(hsl[2] * 100)}%)`
          break
        }
        case 'hsv':
          this.value = `hsv(${_hue}, ${Math.round(_saturation)}%, ${Math.round(_value)}%)`
          break
        case 'rgb': {
          const { r, g, b } = hsv2rgb(_hue, _saturation, _value)
          this.value = `rgb(${r}, ${g}, ${b})`
          break
        }
        default:
          this.value = toHex(hsv2rgb(_hue, _saturation, _value))
      }
    }
  }
}
