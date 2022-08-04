import { getReferenceName } from '../utility/styleUtility'

describe('Separete Key from Name', () => {
  it('Separate Simple Name', () => {
    expect(getReferenceName('Large / Super')).toEqual('largeSuper')
    expect(getReferenceName('Large /  Super')).toEqual('largeSuper')
    expect(getReferenceName('Large /Super')).toEqual('largeSuper')
    expect(getReferenceName('Large/Super')).toEqual('largeSuper')
    expect(getReferenceName('XXLarge/Super')).toEqual('xXLargeSuper')
  })

  it('Lower case on first name', () => {
    expect(getReferenceName('LargeName')).toEqual('largeName')
    expect(getReferenceName('LargeName/SmallName')).toEqual(
      'largeNameSmallName'
    )
  })

  it('Separate Name with space', () => {
    expect(getReferenceName('Large / Super man')).toEqual('largeSuperMan')
    expect(getReferenceName('Large /  Super man')).toEqual('largeSuperMan')
    expect(getReferenceName('Large /Super man')).toEqual('largeSuperMan')
    expect(getReferenceName('Large/Super man')).toEqual('largeSuperMan')
    expect(getReferenceName('XXLarge/Super man')).toEqual('xXLargeSuperMan')
    expect(getReferenceName('Spider man/Super man')).toEqual(
      'spiderManSuperMan'
    )
    expect(getReferenceName('Spider man/Super / man')).toEqual(
      'spiderManSuperMan'
    )
  })

  it('Separate two folder', () => {
    expect(getReferenceName('Large / Super / man')).toEqual('largeSuperMan')
    expect(getReferenceName('Large /  Super / man')).toEqual('largeSuperMan')
    expect(getReferenceName('Large /Super /man')).toEqual('largeSuperMan')
    expect(getReferenceName('Large/Super /man')).toEqual('largeSuperMan')
    expect(getReferenceName('XXLarge/Super /  man')).toEqual('xXLargeSuperMan')
  })

  // TODO: Try add "x / / lksdjf" style to figma and check real style name
  it('Ignore Empty Foler', () => {
    expect(getReferenceName('/Large/Super /man')).toEqual('largeSuperMan')
    expect(getReferenceName('//Large/Super /man')).toEqual('largeSuperMan')
    expect(getReferenceName('///Large/Super /man')).toEqual('largeSuperMan')
    expect(getReferenceName('/ /Large/Super /man')).toEqual('largeSuperMan')
  })
})
