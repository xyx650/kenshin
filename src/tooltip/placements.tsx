import { placements } from 'rc-tooltip/lib/placements'
import { BuildInPlacements } from 'rc-trigger'

// 允许自动调整
const autoAdjustOverflowEnabled = {
  adjustX: 1,
  adjustY: 1
}

// 禁止自动调整
const autoAdjustOverflowDisabled = {
  adjustX: 0,
  adjustY: 0
}

// 偏移量
const targetOffset = [0, 0]

// 调整溢出
export interface AdjustOverflow {
  adjustX?: 0 | 1;
  adjustY?: 0 | 1;
}

// 位置属性接口
export interface PlacementsConfig {
  arrowWidth?: number;
  horizontalArrowShift?: number;
  verticalArrowShift?: number;
  arrowPointAtCenter?: boolean;
  autoAdjustOverflow?: boolean | AdjustOverflow;
}

// 获取溢出选项
export function getOverflowOptions(autoAdjustOverflow?: boolean | AdjustOverflow) {
  if (typeof autoAdjustOverflow === 'boolean') {
    return autoAdjustOverflow ? autoAdjustOverflowEnabled : autoAdjustOverflowDisabled
  }
  return {
    ...autoAdjustOverflowDisabled,
    ...autoAdjustOverflow
  }
}

// 获取位置
export default function getPlacements(config: PlacementsConfig) {
  const {
    arrowWidth = 5,
    horizontalArrowShift = 16,
    verticalArrowShift = 8,
    autoAdjustOverflow
  } = config

  const placementMap: BuildInPlacements = {
    left: {
      points: ['cr', 'cl'],
      offset: [-4, 0]
    },
    right: {
      points: ['cl', 'cr'],
      offset: [4, 0]
    },
    top: {
      points: ['bc', 'tc'],
      offset: [0, -4]
    },
    bottom: {
      points: ['tc', 'bc'],
      offset: [0, 4]
    },
    topLeft: {
      points: ['bl', 'tc'],
      offset: [-(horizontalArrowShift + arrowWidth), -4]
    },
    leftTop: {
      points: ['tr', 'cl'],
      offset: [-4, -(verticalArrowShift + arrowWidth)]
    },
    topRight: {
      points: ['br', 'tc'],
      offset: [horizontalArrowShift + arrowWidth, -4]
    },
    rightTop: {
      points: ['tl', 'cr'],
      offset: [4, -(verticalArrowShift + arrowWidth)]
    },
    bottomRight: {
      points: ['tr', 'bc'],
      offset: [horizontalArrowShift + arrowWidth, 4]
    },
    rightBottom: {
      points: ['bl', 'cr'],
      offset: [4, verticalArrowShift + arrowWidth]
    },
    bottomLeft: {
      points: ['tl', 'bc'],
      offset: [-(horizontalArrowShift + arrowWidth), 4]
    },
    leftBottom: {
      points: ['br', 'cl'],
      offset: [-4, verticalArrowShift + arrowWidth]
    }
  }
  Object.keys(placementMap).forEach(key => {
    placementMap[key] = config.arrowPointAtCenter
      ? {
        ...placementMap[key],
        overflow: getOverflowOptions(autoAdjustOverflow),
        targetOffset
      }
      : {
        ...placements[key],
        overflow: getOverflowOptions(autoAdjustOverflow)
      }

    placementMap[key].ignoreShake = true
  })
  return placementMap
}
