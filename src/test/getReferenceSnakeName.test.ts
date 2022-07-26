import { getReferenceSnakeName } from '../utility/styleUtility'

describe('Separete Key from Name', () => {
  // it('Separate Simple Name', () => {
  //   expect('x').toEqual('x')
  // })
  it('Separate Simple Name', () => {
    expect(getReferenceSnakeName('Large / Super')).toEqual('large_super')
    expect(getReferenceSnakeName('Large /  Super')).toEqual('large_super')
    expect(getReferenceSnakeName('Large /Super')).toEqual('large_super')
    expect(getReferenceSnakeName('Large/Super')).toEqual('large_super')
    expect(getReferenceSnakeName('XXLarge/Super')).toEqual('x_x_large_super')
  })

  it('Lower case on first name', () => {
    expect(getReferenceSnakeName('LargeName')).toEqual('large_name')
    expect(getReferenceSnakeName('LargeName/SmallName')).toEqual(
      'large_name_small_name'
    )
  })

  it('Separate Name with space', () => {
    expect(getReferenceSnakeName('Large / Super man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('Large /  Super man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('Large /Super man')).toEqual('large_super_man')
    expect(getReferenceSnakeName('Large/Super man')).toEqual('large_super_man')
    expect(getReferenceSnakeName('XXLarge/Super man')).toEqual(
      'x_x_large_super_man'
    )
    expect(getReferenceSnakeName('Spider man/Super man')).toEqual(
      'spider_man_super_man'
    )
    expect(getReferenceSnakeName('Spider man/Super / man')).toEqual(
      'spider_man_super_man'
    )
  })

  it('Separate two folder', () => {
    expect(getReferenceSnakeName('Large / Super / man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('Large /  Super / man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('Large /Super /man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('Large/Super /man')).toEqual('large_super_man')
    expect(getReferenceSnakeName('XXLarge/Super /  man')).toEqual(
      'x_x_large_super_man'
    )
  })

  // TODO: Try add "x / / lksdjf" style to figma and check real style name
  it('Ignore Empty Foler', () => {
    expect(getReferenceSnakeName('/Large/Super /man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('//Large/Super /man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('///Large/Super /man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('/ /Large/Super /man')).toEqual(
      'large_super_man'
    )
  })

  it('Should remain underscore', () => {
    expect(getReferenceSnakeName('Large / Super_man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('Large /  Super_man_land')).toEqual(
      'large_super_man_land'
    )
    expect(getReferenceSnakeName('Large /Super spider_Launch')).toEqual(
      'large_super_spider_launch'
    )
    expect(getReferenceSnakeName('Large/_Super_do_not_love')).toEqual(
      'large_super_do_not_love'
    )
  })

  it('Should replace % with opacity', () => {
    expect(getReferenceSnakeName('Large / Spider 10%')).toEqual(
      'large_spider_opacity_10'
    )
    expect(getReferenceSnakeName('Large / Spider_10%')).toEqual(
      'large_spider_opacity_10'
    )
    expect(getReferenceSnakeName('Large / Spider_10% / abc')).toEqual(
      'large_spider_opacity_10_abc'
    )
  })

  it('Remove folder branding', () => {
    expect(getReferenceSnakeName('Branding/Large/Super /man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('Branding//Large/Super /man')).toEqual(
      'large_super_man'
    )
    expect(
      getReferenceSnakeName('Branding/Large/Branding/Super/Sport')
    ).toEqual('large_branding_super_sport')
  })

  it('Remove folder Day and Night', () => {
    expect(getReferenceSnakeName('Day/Large/Super /man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('Day/Large/Super /man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('Night/Large/Super /man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('Night/Large/Super /man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('Day/Large Day/Super /man')).toEqual(
      'large_day_super_man'
    )
    expect(getReferenceSnakeName('Night/Large Day/Super /man')).toEqual(
      'large_day_super_man'
    )
  })
})
