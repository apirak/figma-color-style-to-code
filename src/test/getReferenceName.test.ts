import { getReferenceName } from '../utility/styleUtility'

describe('Separete Key from Name', () => {
  it('Separate Simple Name', () => {
    expect(getReferenceName('Large / Super')).toEqual('largeSuper')
    expect(getReferenceName('Large /  Super')).toEqual('largeSuper')
    expect(getReferenceName('Large /Super')).toEqual('largeSuper')
    expect(getReferenceName('Large/Super')).toEqual('largeSuper')
    expect(getReferenceName('XXLarge/Super')).toEqual('xXLargeSuper')
    expect(getReferenceName('Large/Super/Land/Man/Show/Spider/Man')).toEqual(
      'largeSuperLandManShowSpiderMan'
    )
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

  it('Remove folder branding', () => {
    expect(getReferenceName('Branding/Large/Super /man')).toEqual(
      'largeSuperMan'
    )
    expect(getReferenceName('Branding//Large/Super /man')).toEqual(
      'largeSuperMan'
    )
    expect(getReferenceName('Branding/Large/Branding/Super/Sport')).toEqual(
      'largeBrandingSuperSport'
    )
  })

  it('Remove folder Day and Night', () => {
    expect(getReferenceName('Day/Large/Super /man')).toEqual('largeSuperMan')
    expect(getReferenceName('Day/Large/Super /man')).toEqual('largeSuperMan')
    expect(getReferenceName('Night/Large/Super /man')).toEqual('largeSuperMan')
    expect(getReferenceName('Night/Large/Super /man')).toEqual('largeSuperMan')
    expect(getReferenceName('Day/Large Day/Super /man')).toEqual(
      'largeDaySuperMan'
    )
    expect(getReferenceName('Night/Large Day/Super /man')).toEqual(
      'largeDaySuperMan'
    )
  })
})
